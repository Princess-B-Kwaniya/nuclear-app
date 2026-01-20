-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  role TEXT CHECK (role IN ('Hospital Administrator', 'Logistics Manager', 'Compliance Officer')),
  initials TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, role, initials)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    COALESCE(new.raw_user_meta_data->>'role', 'Hospital Administrator'),
    COALESCE(new.raw_user_meta_data->>'initials', SUBSTRING(new.email, 1, 2))
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- 2. SHIPMENTS
CREATE TABLE IF NOT EXISTS public.shipments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  isotope TEXT NOT NULL,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  status TEXT CHECK (status IN ('In Transit', 'At Customs', 'Dispatched', 'Delivered', 'Pending')),
  eta TIMESTAMPTZ NOT NULL,
  status_color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Shipments are viewable by authenticated users" 
ON public.shipments FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can create shipments" 
ON public.shipments FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update shipments" 
ON public.shipments FOR UPDATE TO authenticated USING (true);


-- 3. COMPLIANCE ALERTS
CREATE TABLE IF NOT EXISTS public.compliance_alerts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  severity TEXT CHECK (severity IN ('warning', 'info', 'error')),
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.compliance_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Alerts are viewable by authenticated users" 
ON public.compliance_alerts FOR SELECT TO authenticated USING (true);

-- 4. PERMITS
CREATE TABLE IF NOT EXISTS public.permits (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  expiry_date TIMESTAMPTZ NOT NULL,
  status TEXT CHECK (status IN ('valid', 'expiring', 'expired')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.permits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permits are viewable by authenticated users" 
ON public.permits FOR SELECT TO authenticated USING (true);

-- 5. ACTIVITIES
CREATE TABLE IF NOT EXISTS public.activities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  time TIMESTAMPTZ DEFAULT NOW(),
  event TEXT NOT NULL,
  type TEXT CHECK (type IN ('delivery', 'procurement', 'customs', 'alert', 'approval')),
  user_id UUID REFERENCES auth.users(id)
);

ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Activities are viewable by authenticated users" 
ON public.activities FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can insert activities" 
ON public.activities FOR INSERT TO authenticated WITH CHECK (true);

-- 6. DELIVERIES (For dashboard stats/calendar)
CREATE TABLE IF NOT EXISTS public.deliveries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  date DATE NOT NULL,
  time TIME NOT NULL,
  isotope TEXT NOT NULL,
  destination TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.deliveries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Deliveries viewable by authenticated users" 
ON public.deliveries FOR SELECT TO authenticated USING (true);

-- Seed Data for NuClear Supply Chain App

-- 1. Shipments
INSERT INTO public.shipments (isotope, origin, destination, status, eta, status_color) VALUES 
('Tc-99m', 'Oak Ridge, TN', 'Memorial Hospital, NYC', 'In Transit', NOW() + INTERVAL '2 days', 'bg-blue-100 text-blue-800'),
('I-131', 'Chalk River, ON', 'Johns Hopkins, MD', 'At Customs', NOW() + INTERVAL '3 days', 'bg-yellow-100 text-yellow-800'),
('Mo-99', 'ANSTO, Australia', 'Mayo Clinic, MN', 'Dispatched', NOW() + INTERVAL '5 days', 'bg-purple-100 text-purple-800'),
('F-18', 'Nordion, Canada', 'Cleveland Clinic, OH', 'Delivered', NOW() - INTERVAL '1 day', 'bg-green-100 text-green-800'),
('Ga-68', 'IRE, Belgium', 'Stanford Medical, CA', 'Pending', NOW() + INTERVAL '7 days', 'bg-gray-100 text-gray-800');

-- 2. Compliance Alerts
INSERT INTO public.compliance_alerts (severity, title, description) VALUES 
('warning', 'License Renewal', 'License renewal due in 30 days'),
('info', 'Quality Check', 'Routine quality inspection scheduled for next week');
-- Add a critical one if needed
-- ('error', 'Customs Hold', 'Shipment SHP-999 held at customs for documentation');

-- 3. Activities
INSERT INTO public.activities (event, type, time) VALUES 
('Shipment cleared customs in Newark', 'customs', NOW() - INTERVAL '2 hours'),
('New procurement request submitted for Tc-99m', 'procurement', NOW() - INTERVAL '4 hours'),
('Delivery confirmed at Memorial Hospital', 'delivery', NOW() - INTERVAL '1 day'),
('Compliance alert: License renewal due', 'alert', NOW() - INTERVAL '2 days'),
('Quality inspection approved for batch B-2024-001', 'approval', NOW() - INTERVAL '3 days');

-- 4. Deliveries (Upcoming)
INSERT INTO public.deliveries (date, time, isotope, destination) VALUES 
(CURRENT_DATE + 1, '14:30', 'Tc-99m', 'Memorial Hospital, NYC'),
(CURRENT_DATE + 2, '09:00', 'I-131', 'Johns Hopkins, MD'),
(CURRENT_DATE + 3, '16:45', 'Mo-99', 'Mayo Clinic, MN'),
(CURRENT_DATE + 4, '08:30', 'Ga-68', 'Stanford Medical, CA');

-- 5. Permits (Sample)
INSERT INTO public.permits (name, expiry_date, status) VALUES 
('Import License US-2024', NOW() + INTERVAL '30 days', 'expiring'),
('Transport Permit CA-99', NOW() + INTERVAL '180 days', 'valid'),
('Handling Cert H-55', NOW() - INTERVAL '5 days', 'expired');
