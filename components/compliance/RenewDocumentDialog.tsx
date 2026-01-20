'use client';

import { AlertTriangle, CheckCircle, Shield } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface RenewDocumentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    name: string;
    shipmentId: string;
  } | null;
}

interface ComplianceQuestion {
  id: string;
  question: string;
  required: boolean;
}

const complianceQuestions: ComplianceQuestion[] = [
  { id: 'isotope_purity', question: 'Has the isotope purity been verified (>99%)?', required: true },
  { id: 'sterility', question: 'Has the product passed sterility testing?', required: true },
  { id: 'endotoxin', question: 'Is the endotoxin level within acceptable limits (<0.25 EU/mL)?', required: true },
  { id: 'packaging', question: 'Is the packaging compliant with transport regulations?', required: true },
  { id: 'documentation', question: 'Are all supporting documents available and up to date?', required: true },
  { id: 'training', question: 'Has staff handling completed required radiation safety training?', required: true },
];

export function RenewDocumentDialog({ isOpen, onClose, document }: RenewDocumentDialogProps) {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const allRequirementsMet = complianceQuestions.every(q => answers[q.id] === true);

  const handleAnswerChange = (questionId: string, value: boolean) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    if (!allRequirementsMet) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowCertificate(true);
  };

  const handleClose = () => {
    setAnswers({});
    setShowCertificate(false);
    onClose();
  };

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

  if (showCertificate) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              Certificate Generated Successfully
            </DialogTitle>
            <DialogDescription>Your compliance certificate has been issued</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-green-900">
                <p className="font-medium mb-1">Renewal Complete</p>
                <p className="text-green-700">
                  All compliance requirements have been verified. Your certificate is now active.
                </p>
              </div>
            </div>

            {/* Certificate Preview */}
            <div className="border-2 border-primary/20 rounded-lg p-6 bg-gradient-to-br from-purple-50 to-white">
              <div className="text-center border-b border-primary/20 pb-4 mb-4">
                <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="text-xl font-bold text-primary">CERTIFICATE OF ANALYSIS</h3>
                <p className="text-sm text-muted-foreground">Nuclear Medicine Transport Compliance</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <span className="text-muted-foreground">Certificate No:</span>
                  <p className="font-mono font-medium">COA-{document.shipmentId}-2026</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Shipment ID:</span>
                  <p className="font-mono font-medium">{document.shipmentId}</p>
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

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-xs text-green-800 text-center">
                  ✓ All compliance requirements verified and approved
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleClose}>
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Compliance Renewal Survey</DialogTitle>
          <DialogDescription>
            Complete all requirements to renew {document.name} for shipment {document.shipmentId}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900">
              <p className="font-medium mb-1">Compliance Verification Required</p>
              <p className="text-amber-700">
                Please confirm all requirements are met to generate your certificate.
              </p>
            </div>
          </div>

          {/* Compliance Questions */}
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {complianceQuestions.map((q, index) => (
              <div 
                key={q.id} 
                className={`border rounded-lg p-4 transition-colors ${
                  answers[q.id] === true 
                    ? 'border-green-200 bg-green-50' 
                    : answers[q.id] === false 
                    ? 'border-red-200 bg-red-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Label className="text-sm font-medium">
                      {index + 1}. {q.question}
                    </Label>
                    {q.required && (
                      <span className="text-xs text-red-500 ml-1">*Required</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleAnswerChange(q.id, true)}
                      className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                        answers[q.id] === true
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAnswerChange(q.id, false)}
                      className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                        answers[q.id] === false
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Status Message */}
          {Object.keys(answers).length === complianceQuestions.length && (
            <div className={`rounded-lg p-3 text-sm ${
              allRequirementsMet 
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {allRequirementsMet ? (
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  All requirements met. You can now generate your certificate.
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Some requirements are not met. Please review and address before proceeding.
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!allRequirementsMet || isSubmitting}
            className="bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? 'Generating Certificate...' : 'Generate Certificate'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
