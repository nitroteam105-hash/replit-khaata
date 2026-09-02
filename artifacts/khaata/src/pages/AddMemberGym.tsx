import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Video, MapPin } from 'lucide-react';
import { TopBar } from '@/components/TopBar';
import { StepProgress } from '@/components/StepProgress';
import { useAppContext } from '@/context/AppContext';
import { MOCK_DATA } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function AddMemberGym() {
  const [, setLocation] = useLocation();
  const { activeBusiness, businessSetups } = useAppContext();
  const business = MOCK_DATA.businesses.find(b => b.id === activeBusiness);
  const setup = businessSetups[activeBusiness] || businessSetups.gym;
  const label = 'Member';

  const batches: any[] = setup.batches || [];
  const feePlans: any[] = setup.feePlans || [];
  const addOns: any[] = setup.addOns || [];

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    gender: 'M',
    batchId: '',
    planId: '',
    cycleLabel: '',
    startDate: '',
    admissionFee: '500',
    mode: 'UPI',
    discount: '0',
    trial: false,
    addOnIds: [] as string[],
  });

  const selectedBatch = batches.find(b => b.id === formData.batchId);
  const availablePlans = feePlans.filter(p => p.batchIds.length === 0 || p.batchIds.includes(formData.batchId));
  const selectedPlan = feePlans.find(p => p.id === formData.planId);
  const selectedCycle = selectedPlan?.cycles.find((c: any) => c.label === formData.cycleLabel);
  const cyclePrice = formData.trial ? (setup.trialSession?.price || 0) : (selectedCycle ? selectedCycle.price : 0);
  const addOnsTotal = formData.addOnIds.reduce((sum, id) => {
    const a = addOns.find(x => x.id === id);
    return sum + (a ? a.price : 0);
  }, 0);
  const discount = Number(formData.discount) || 0;
  const total = Math.max(0, Number(formData.admissionFee) + cyclePrice + addOnsTotal - discount);

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
    else setLocation('/people');
  };

  const toggleAddOn = (id: string) => {
    setFormData(prev => ({
      ...prev,
      addOnIds: prev.addOnIds.includes(id) ? prev.addOnIds.filter(a => a !== id) : [...prev.addOnIds, id]
    }));
  };

  const isStep1Valid = formData.name.length > 0 && formData.phone.length >= 10;
  const isStep2Valid = (batches.length === 0 || formData.batchId !== '') && (formData.trial || formData.planId !== '') && (formData.trial || formData.cycleLabel !== '');

  return (
    <div className="min-h-screen bg-background pb-44 flex flex-col">
      <TopBar title={`Add ${business?.type || 'Gym'} ${label}`} showBack onBack={prevStep} />
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
              <h2 className="text-xl font-display font-bold">Member Details</h2>
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name <span className="text-destructive">*</span></label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl border bg-white focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Vikas Kumar"
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
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Gender</label>
                <div className="flex bg-muted p-1 rounded-xl">
                  {['M', 'F', 'Other'].map(g => (
                    <button
                      key={g}
                      onClick={() => setFormData({ ...formData, gender: g })}
                      className={`flex-1 py-2 text-sm font-medium rounded-lg ${formData.gender === g ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground'}`}
                    >
                      {g}
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
              className="space-y-5"
            >
              <h2 className="text-xl font-display font-bold">Batch & Fee Plan</h2>

              {setup.trialSession?.enabled && (
                <button
                  onClick={() => setFormData({ ...formData, trial: !formData.trial })}
                  className={cn(
                    "w-full p-3 rounded-xl border text-left flex items-center justify-between",
                    formData.trial ? "bg-accent border-primary ring-1 ring-primary" : "bg-white"
                  )}
                >
                  <div>
                    <p className="font-semibold text-sm">Start with a Trial Session</p>
                    <p className="text-xs text-muted-foreground">{setup.trialSession.price ? `₹${setup.trialSession.price}` : 'Free'}</p>
                  </div>
                  <div className={cn("w-5 h-5 rounded-full border-2 shrink-0", formData.trial ? "bg-primary border-primary" : "border-muted-foreground")} />
                </button>
              )}

              {batches.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Batch</label>
                  <div className="space-y-2">
                    {batches.map(b => (
                      <button
                        key={b.id}
                        onClick={() => setFormData({ ...formData, batchId: b.id, planId: '', cycleLabel: '' })}
                        className={cn(
                          "w-full p-3 rounded-xl border text-left active:scale-[0.99] transition-all",
                          formData.batchId === b.id ? "bg-accent border-primary ring-1 ring-primary" : "bg-white hover:bg-muted"
                        )}
                      >
                        <p className={cn("font-semibold", formData.batchId === b.id ? "text-primary" : "text-foreground")}>{b.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{b.days.join(', ')} · {b.time}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="text-[11px] bg-secondary px-2 py-0.5 rounded-md flex items-center gap-1"><Users size={11} /> {b.capacity} cap</span>
                          <span className="text-[11px] bg-secondary px-2 py-0.5 rounded-md flex items-center gap-1">
                            {b.mode === 'Online' ? <Video size={11} /> : <MapPin size={11} />} {b.mode}{b.room ? ` · ${b.room}` : ''}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!formData.trial && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fee Plan</label>
                  <div className="grid grid-cols-1 gap-2">
                    {availablePlans.length === 0 && (
                      <p className="text-sm text-muted-foreground p-3 bg-muted rounded-xl">No fee plan configured for this batch yet. Add one in Schedule & Fees settings.</p>
                    )}
                    {availablePlans.map(p => (
                      <button
                        key={p.id}
                        onClick={() => setFormData({ ...formData, planId: p.id, cycleLabel: '' })}
                        className={cn(
                          "p-3 rounded-xl border text-left active:scale-[0.99] transition-all",
                          formData.planId === p.id ? "bg-accent border-primary ring-1 ring-primary" : "bg-white hover:bg-muted"
                        )}
                      >
                        <p className={cn("font-semibold", formData.planId === p.id ? "text-primary" : "text-foreground")}>{p.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!formData.trial && selectedPlan && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Billing Cycle</label>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedPlan.cycles.map((c: any) => (
                      <button
                        key={c.label}
                        onClick={() => setFormData({ ...formData, cycleLabel: c.label })}
                        className={cn(
                          "p-3 rounded-xl border text-left active:scale-95 transition-all",
                          formData.cycleLabel === c.label ? "bg-accent border-primary ring-1 ring-primary" : "bg-white hover:bg-muted"
                        )}
                      >
                        <p className={cn("font-semibold", formData.cycleLabel === c.label ? "text-primary" : "text-foreground")}>{c.label}</p>
                        <p className="text-lg font-bold tabular-nums">₹{c.price}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={e => setFormData({ ...formData, startDate: e.target.value })}
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
              <h2 className="text-xl font-display font-bold">Fees & Payment</h2>
              <div className="space-y-2">
                <label className="text-sm font-medium">Admission Fee (₹)</label>
                <input
                  type="number"
                  value={formData.admissionFee}
                  onChange={e => setFormData({ ...formData, admissionFee: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl border bg-white focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {formData.trial ? 'Trial Fee' : `Plan Fee: ${selectedPlan?.name || ''} ${formData.cycleLabel ? `(${formData.cycleLabel})` : ''}`}
                </label>
                <input
                  type="number"
                  value={cyclePrice}
                  disabled
                  className="w-full h-12 px-4 rounded-xl border bg-muted text-muted-foreground outline-none"
                />
              </div>

              {addOns.length > 0 && !formData.trial && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Add-ons</label>
                  <div className="flex flex-wrap gap-2">
                    {addOns.map(a => (
                      <button
                        key={a.id}
                        onClick={() => toggleAddOn(a.id)}
                        className={cn(
                          "px-3 py-2 rounded-xl border text-sm font-medium",
                          formData.addOnIds.includes(a.id) ? "bg-primary text-primary-foreground border-primary" : "bg-white text-foreground"
                        )}
                      >
                        {a.name} · ₹{a.price}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Discount (₹)</label>
                <input
                  type="number"
                  value={formData.discount}
                  onChange={e => setFormData({ ...formData, discount: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl border bg-white focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Payment Mode</label>
                <div className="flex gap-2">
                  {['Cash', 'UPI', 'Card'].map(mode => (
                    <button
                      key={mode}
                      onClick={() => setFormData({ ...formData, mode })}
                      className={`flex-1 py-2 rounded-lg border text-sm font-medium ${formData.mode === mode ? 'bg-primary text-primary-foreground border-primary' : 'bg-white text-foreground'}`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 bg-foreground text-background p-4 rounded-xl flex items-center justify-between">
                <span className="font-medium">Total Due</span>
                <span className="text-2xl font-bold font-display tabular-nums">₹{total}</span>
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
                  <p className="text-sm text-muted-foreground mb-1">Member</p>
                  <p className="font-semibold text-lg">{formData.name}</p>
                  <p className="text-sm">{formData.phone} · {formData.gender}</p>
                </div>
                <div className="p-4 border-b">
                  <p className="text-sm text-muted-foreground mb-1">Plan Details</p>
                  <p className="font-semibold">
                    {formData.trial ? 'Trial Session' : `${selectedBatch?.name || ''} ${selectedPlan ? `· ${selectedPlan.name}` : ''} ${formData.cycleLabel ? `(${formData.cycleLabel})` : ''}`}
                  </p>
                  <p className="text-sm">Starts {formData.startDate || 'Today'}</p>
                </div>
                <div className="p-4 bg-muted/50">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Admission</span>
                    <span className="text-sm font-medium">₹{formData.admissionFee}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{formData.trial ? 'Trial Fee' : 'Plan Fee'}</span>
                    <span className="text-sm font-medium">₹{cyclePrice}</span>
                  </div>
                  {addOnsTotal > 0 && (
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Add-ons</span>
                      <span className="text-sm font-medium">₹{addOnsTotal}</span>
                    </div>
                  )}
                  {discount > 0 && (
                    <div className="flex justify-between mb-3 pb-3 border-b">
                      <span className="text-sm text-muted-foreground">Discount</span>
                      <span className="text-sm font-medium text-destructive">-₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Paid via {formData.mode}</span>
                    <span className="text-lg font-bold text-primary tabular-nums">₹{total}</span>
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
          disabled={(step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid)}
          className="flex-[2] h-14 rounded-xl font-bold text-lg bg-primary text-primary-foreground disabled:opacity-50 active:scale-[0.98] transition-all"
        >
          {step === 4 ? 'Add Member' : 'Next'}
        </button>
      </div>
    </div>
  );
}
