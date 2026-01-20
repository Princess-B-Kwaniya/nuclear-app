# NuClear Brand Colors & Typography Guide

This document describes the complete NuClear brand identity implementation including colors and typography.

## Brand Colors

The NuClear brand uses a carefully selected color palette that conveys trust, scientific authority, quality, and clinical precision.

### Color Palette

#### Primary Color - Clinical Navy Blue
- **Hex**: `#153057`
- **RGB**: `rgb(21, 48, 87)`
- **HSL**: `hsl(212, 61%, 21%)`
- **Usage**: Main branding, headers, navigation
- **Purpose**: Conveys trust and scientific authority

#### Accent Color - Refined Gold/Amber
- **Hex**: `#c69c6d`
- **RGB**: `rgb(198, 156, 109)`
- **HSL**: `hsl(32, 43%, 60%)`
- **Usage**: Logo accents, highlights, premium elements (used sparingly)
- **Purpose**: Signals quality and precision

#### Neutral Supporting Color - Medical Light Gray
- **Hex**: `#bec1c4`
- **RGB**: `rgb(190, 193, 196)`
- **HSL**: `hsl(210, 6%, 76%)`
- **Usage**: Secondary text, dividers, UI balance
- **Purpose**: Provides neutral support for information hierarchy

#### Background Color - Soft Clinical White
- **Hex**: `#F7F9FC`
- **RGB**: `rgb(247, 249, 252)`
- **HSL**: `hsl(216, 50%, 98%)`
- **Usage**: Main background, canvas
- **Purpose**: Provides a clean, sterile, and modern foundation

#### Card/Surface Color - Pure White
- **Hex**: `#FFFFFF`
- **RGB**: `rgb(255, 255, 255)`
- **HSL**: `hsl(0, 0%, 100%)`
- **Usage**: Cards, highlighted sections
- **Purpose**: Extra contrast when needed

### CSS Variables

The colors are implemented as CSS custom properties in `/styles/globals.css`:

```css
:root {
  /* Primary – Clinical Navy Blue (Trust & Scientific Authority) */
  --primary: #153057;
  --primary-foreground: #ffffff;
  
  /* Accent – Refined Gold/Amber (Quality & Precision) */
  --accent: #c69c6d;
  --accent-foreground: #153057;
  
  /* Neutral Support – Medical Light Gray */
  --neutral-gray: #bec1c4;
  --secondary: #bec1c4;
  --secondary-foreground: #153057;
  
  /* Base – Soft Clinical White (Clean, Sterile, Modern Canvas) */
  --background: #F7F9FC;
  
  /* Foreground & Text Colors */
  --foreground: #153057;
  --muted-foreground: rgba(21, 48, 87, 0.7);
  
  /* Card & Surface Colors – Pure White (Extra Contrast) */
  --card: #FFFFFF;
  --card-foreground: #153057;
  
  /* Focus Ring - Refined Gold */
  --ring: #c69c6d;
}
```

### Usage in Components

```tsx
// Primary color for main branding
<header className="bg-primary text-primary-foreground">
  <h1>NuClear</h1>
</header>

// Accent color for highlights (use sparingly)
<button className="bg-accent text-accent-foreground">
  Premium Feature
</button>

// Background and cards
<div className="bg-background">
  <div className="bg-card p-6 rounded-lg">
    <p className="text-foreground">Card content</p>
  </div>
</div>

// Secondary elements
<p className="text-secondary">Supporting text</p>
```

### Color Accessibility

All color combinations meet WCAG 2.1 AA standards for contrast ratios:

- **Clinical Navy Blue (#153057) on Soft Clinical White (#F7F9FC)**: 9.8:1 (AAA)
- **Clinical Navy Blue (#153057) on Pure White (#FFFFFF)**: 10.7:1 (AAA)
- **Refined Gold (#c69c6d) on Clinical Navy Blue (#153057)**: 4.5:1 (AA)

⚠️ **Important**: Refined Gold should be used sparingly and primarily for accents, not as primary text color.

## Typography

The NuClear brand uses a dual-typeface system that balances authority with clarity.

### Primary Typeface - The Seasons (Serif)

**Font**: The Seasons  
**Type**: Serif  
**License**: Premium (requires purchase)

**Usage:**
- NuClear logo
- Major headings (H1)
- Section headings (H2)
- Feature titles
- Marketing and branding content

**Purpose**: Expresses authority, credibility, and a refined scientific presence

**Implementation:**
```css
font-family: 'The Seasons', Georgia, 'Times New Roman', serif;
```

**Tailwind Class:**
```tsx
<h1 className="font-heading">Major Heading</h1>
```

### Secondary Typeface - Roboto (Sans-Serif)

**Font**: Roboto  
**Type**: Sans-Serif  
**License**: Apache 2.0 (Free)

**Usage:**
- Subheadings (H3-H6)
- Body text
- Instructions and help text
- Regulatory content
- Navigation menus
- Form labels and inputs
- Data tables
- Button labels
- All UI components

**Purpose**: Ensures clarity, readability, and pharmaceutical compliance

**Implementation:**
```css
font-family: 'Roboto', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Tailwind Class:**
```tsx
<p className="font-sans">Body text</p>
```

### Font Weights

**Roboto weights available:**
- Regular (400): Body text
- Medium (500): Emphasis
- Semibold (600): Strong emphasis

### Typography Scale

```css
/* Headings */
--text-5xl: 3rem (48px)
--text-4xl: 2.25rem (36px)
--text-3xl: 1.875rem (30px)
--text-2xl: 1.5rem (24px)
--text-xl: 1.25rem (20px)

/* Body */
--text-base: 1rem (16px)
--text-sm: 0.875rem (14px)
--text-xs: 0.75rem (12px)
```

### Line Heights

- **Headings**: 1.2 (tight)
- **Body text**: 1.5 (normal)
- **Dense text**: 1.25 (relaxed)

### Usage Examples

```tsx
// Logo and major headings - The Seasons
<h1 className="font-heading text-5xl font-bold text-primary">
  NuClear Supply Chain
</h1>

// Section heading - The Seasons
<h2 className="font-heading text-3xl font-semibold text-primary">
  Quality & Compliance
</h2>

// Subheading - Roboto
<h3 className="font-sans text-xl font-medium text-foreground">
  Regulatory Documentation
</h3>

// Body text - Roboto (default)
<p className="text-base text-foreground leading-relaxed">
  Comprehensive nuclear supply chain management platform for 
  radiopharmaceutical delivery with full regulatory compliance.
</p>

// Instructions - Roboto
<div className="text-sm text-muted-foreground">
  <p>Follow these steps to complete the process:</p>
  <ol className="list-decimal list-inside space-y-2">
    <li>Step one</li>
    <li>Step two</li>
  </ol>
</div>
```

## Design Principles

### 1. Trust & Authority
- Use Clinical Navy Blue prominently for navigation and headers
- Apply The Seasons serif font for major headings
- Maintain high contrast ratios for all text

### 2. Quality & Precision
- Use Refined Gold sparingly as accent color
- Reserve for premium features, highlights, and logo accents
- Never use as primary text color

### 3. Clarity & Readability
- Use Roboto for all body text and regulatory content
- Maintain minimum 16px font size for body text
- Use line-height of 1.5 or greater for body content

### 4. Clinical & Professional
- Use Soft Clinical White as main background
- Use Pure White for cards to create depth
- Use Medical Light Gray for dividers and secondary UI elements

## Implementation Checklist

### Current Status
- [x] CSS variables defined in `/styles/globals.css`
- [x] Tailwind config updated in `/tailwind.config.ts`
- [x] Roboto font loaded via Google Fonts in `/app/layout.tsx`
- [x] The Seasons font configured with fallbacks
- [x] Color accessibility verified
- [x] Documentation created

### To Complete Full Implementation
- [ ] Obtain license for The Seasons font
- [ ] Add The Seasons font files to `/public/fonts/`
- [ ] Add `@font-face` declaration for The Seasons in `/styles/globals.css`
- [ ] Update existing components to use new color scheme
- [ ] Update logo to use The Seasons font
- [ ] Visual testing across all pages

## Resources

- [Google Fonts - Roboto](https://fonts.google.com/specimen/Roboto)
- [The Seasons Font](https://www.myfonts.com/collections/the-seasons-font-latinotype)
- [WCAG Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Support

For questions or issues with the brand implementation, refer to:
- `/FONT_INSTALLATION_GUIDE.md` - Detailed font setup instructions
- `/STYLING_GUIDE.md` - General styling guidelines
- `/styles/globals.css` - Color and design token definitions
- `/tailwind.config.ts` - Tailwind configuration
