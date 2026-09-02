import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { TopBar } from '@/components/TopBar';
import { StepProgress } from '@/components/StepProgress';

export default function AddTenantPG() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    idType: 'Aadhaar',
    room: '',
    rent: '',
    deposit: '',
    moveIn: '',
    hasAadhaar: false,
    hasAgreement: false
  });

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
    else setLocation('/people');
  };

  const isStep1Valid = formData.name.length > 0 && formData.phone.length >= 10;

  return (
    <div className="min-h-screen bg-background pb-44 flex flex-col">
      <TopBar title="Add PG Tenant" showBack onBack={prevStep} />
      <StepProgress currentStep={step} totalSteps={4} />

      <div className="p-4 flex-1">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-display font-bold">Tenant Details</h2>
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name <span className="text-destructive">*</span></label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl border bg-white focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Rahul Sharma"
                  data-testid="input-name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number <span className="text-destructive">*</span></label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl border bg-white focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="98765 43210"
                  data-testid="input-phone"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">ID Type</label>
                <div className="flex gap-2">
                  {['Aadhaar', 'PAN', 'Passport'].map(type => (
                    <button
                      key={type}
                      onClick={() => setFormData({ ...formData, idType: type })}
                      className={`flex-1 py-2 rounded-lg border text-sm font-medium ${formData.idType === type ? 'bg-primary text-primary-foreground border-primary' : 'bg-white text-foreground'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-display font-bold">Room & Rent</h2>
              <div className="space-y-2">
                <label className="text-sm font-medium">Room Number</label>
                <input
                  type="text"
                  value={formData.room}
                  onChange={e => setFormData({ ...formData, room: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl border bg-white focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="101"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Monthly Rent (₹)</label>
                <input
                  type="number"
                  value={formData.rent}
                  onChange={e => setFormData({ ...formData, rent: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl border bg-white focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="8000"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Security Deposit (₹)</label>
                <input
                  type="number"
                  value={formData.deposit}
                  onChange={e => setFormData({ ...formData, deposit: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl border bg-white focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="8000"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Move-in Date</label>
                <input
                  type="date"
                  value={formData.moveIn}
                  onChange={e => setFormData({ ...formData, moveIn: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl border bg-white focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-display font-bold">Documents</h2>
              <div className="p-4 bg-white rounded-xl border flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">Aadhaar Card</p>
                  <p className="text-xs text-muted-foreground">Front & Back</p>
                </div>
                <div 
                  onClick={() => setFormData({ ...formData, hasAadhaar: !formData.hasAadhaar })}
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${formData.hasAadhaar ? 'bg-primary' : 'bg-muted-foreground'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${formData.hasAadhaar ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground px-1">Note: We securely store ID copies and never share them.</p>

              <div className="p-4 bg-white rounded-xl border flex items-center justify-between mt-4">
                <div>
                  <p className="font-semibold text-foreground">Rent Agreement</p>
                  <p className="text-xs text-muted-foreground">Signed copy</p>
                </div>
                <div 
                  onClick={() => setFormData({ ...formData, hasAgreement: !formData.hasAgreement })}
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${formData.hasAgreement ? 'bg-primary' : 'bg-muted-foreground'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${formData.hasAgreement ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-display font-bold">Review & Add</h2>
              
              <div className="bg-white rounded-xl border overflow-hidden">
                <div className="p-4 border-b">
                  <p className="text-sm text-muted-foreground mb-1">Tenant</p>
                  <p className="font-semibold text-lg">{formData.name || 'N/A'}</p>
                  <p className="text-sm">{formData.phone || 'N/A'}</p>
                </div>
                <div className="p-4 border-b grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Room</p>
                    <p className="font-semibold">{formData.room || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Move In</p>
                    <p className="font-semibold">{formData.moveIn || 'N/A'}</p>
                  </div>
                </div>
                <div className="p-4 border-b grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Rent</p>
                    <p className="font-semibold tabular-nums">₹{formData.rent || '0'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Deposit</p>
                    <p className="font-semibold tabular-nums">₹{formData.deposit || '0'}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-2">Documents</p>
                  <div className="flex gap-2">
                    {formData.hasAadhaar && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md">Aadhaar</span>}
                    {formData.hasAgreement && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md">Agreement</span>}
                    {!formData.hasAadhaar && !formData.hasAgreement && <span className="text-xs text-muted-foreground">None</span>}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t flex gap-3 z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="flex-1 h-14 rounded-xl font-bold text-lg bg-secondary text-foreground active:scale-95 transition-all"
          >
            Back
          </button>
        )}
        <button
          onClick={() => {
            if (step === 4) setLocation('/people');
            else nextStep();
          }}
          disabled={step === 1 && !isStep1Valid}
          className="flex-[2] h-14 rounded-xl font-bold text-lg bg-primary text-primary-foreground disabled:opacity-50 active:scale-[0.98] transition-all"
          data-testid="button-next"
        >
          {step === 4 ? 'Add Tenant' : 'Next'}
        </button>
      </div>
    </div>
  );
}