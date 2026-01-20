'use client';

import { FileText, Calendar, MapPin, CheckCircle, Shield } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ViewDocumentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    name: string;
    description?: string;
    shipmentId?: string;
    status?: string;
    required?: string[];
  } | null;
}

export function ViewDocumentDialog({ isOpen, onClose, document }: ViewDocumentDialogProps) {
  if (!document) return null;

  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const expiryDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Certificate of Analysis
          </DialogTitle>
          <DialogDescription>Official compliance certification document</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Certificate Preview */}
          <div className="border-2 border-primary/20 rounded-lg p-6 bg-gradient-to-br from-purple-50 to-white">
            {/* Certificate Header */}
            <div className="text-center border-b border-primary/20 pb-4 mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary">CERTIFICATE OF ANALYSIS</h3>
              <p className="text-sm text-muted-foreground">Nuclear Medicine Transport Compliance</p>
            </div>

            {/* Certificate Body */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Certificate No:</span>
                  <p className="font-mono font-medium">COA-{document.shipmentId || 'SH-2851'}-2026</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Shipment ID:</span>
                  <p className="font-mono font-medium">{document.shipmentId || 'SH-2851'}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Issue Date:</span>
                  <p className="font-medium">{currentDate}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Valid Until:</span>
                  <p className="font-medium">{expiryDate}</p>
                </div>
              </div>

              <div className="border-t border-primary/20 pt-4">
                <h4 className="text-sm font-medium mb-2">Analysis Results</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between py-1 border-b border-gray-100">
                    <span className="text-muted-foreground">Isotope Purity</span>
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-4 h-4" /> 99.9%
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-gray-100">
                    <span className="text-muted-foreground">Radiochemical Purity</span>
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-4 h-4" /> 98.5%
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-gray-100">
                    <span className="text-muted-foreground">Sterility Test</span>
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-4 h-4" /> Passed
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-muted-foreground">Endotoxin Level</span>
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-4 h-4" /> &lt;0.25 EU/mL
                    </span>
                  </div>
                </div>
              </div>

              {/* Certification Statement */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                <p className="text-xs text-green-800">
                  This certifies that the above-mentioned radiopharmaceutical product has been tested 
                  and meets all quality specifications required by regulatory authorities for nuclear 
                  medicine transport and administration.
                </p>
              </div>

              {/* Digital Signature */}
              <div className="flex items-center justify-between pt-4 border-t border-primary/20">
                <div className="text-xs text-muted-foreground">
                  <p>Digitally Signed</p>
                  <p className="font-mono">ID: DS-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                </div>
                <div className="text-right text-xs">
                  <p className="font-medium">NuclearFlow QA Department</p>
                  <p className="text-muted-foreground">Authorized Signatory</p>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Compliance Notes</h4>
            <p className="text-sm text-blue-700">
              This certificate is valid for the specified shipment only. Keep this document 
              available during transport for regulatory inspection purposes.
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
