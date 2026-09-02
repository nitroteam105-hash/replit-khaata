import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { TopBar } from '@/components/TopBar';
import { StepProgress } from '@/components/StepProgress';

export default function AddSubscriberTiffin() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    meals: [] as string[],
    pref: 'Veg',
    planType: 'Monthly',
    days: ['M','T','W','T','F','S'],
    mode: 'Delivery',
    startDate: '',
    notes: ''
  });

  const mealOptions = [
    { id: 'Breakfast', price: 40 },
    { id: 'Lunch', price: 70 },
    { id: 'Dinner', price: 70 }
  ];

  const planTypes = ['Daily', 'Weekly', 'Monthly', 'Trial'];
  const allDays = ['M','T','W','T','F','S','S'];

  const toggleMeal = (id: string) => {
    setFormData(prev => ({
      ...prev,
      meals: prev.meals.includes(id) 
        ? prev.meals.filter(m => m !== id)
        : [...prev.meals, id]
    }));
  };

  const toggleDay = (day: string, idx: number) => {
    // using index to distinguish the two 'S's if needed, or just keeping it simple
    setFormData(prev => {
      const isSelected = prev.days.includes(day);
      if (isSelected) return { ...prev, days: prev.days.filter(d => d !== day) };
      return { ...prev, days: [...prev.days, day] };
    });
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
    else setLocation('/people');
  };

  const isStep1Valid = formData.name.length > 0 && formData.phone.length >= 10;
  const isStep2Valid = formData.meals.length > 0;

  return (
    <div className="min-h-screen bg-background pb-44 flex flex-col">
      <TopBar title="Add Subscriber" showBack onBack={prevStep} />
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
              <h2 className="text-xl font-display font-bold">Subscriber Details</h2>
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name <span className="text-destructive">*</span></label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl border bg-white focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Rohan Mehra"
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
                <label className="text-sm font-medium">Delivery Address</label>
                <textarea
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className="w-full h-24 p-4 rounded-xl border bg-white focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                  placeholder="House/Flat No, Building, Street..."
                />
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
              <h2 className="text-xl font-display font-bold">Meal Plan</h2>
              
              <div className="flex bg-muted p-1 rounded-xl">
                {['Veg', 'Non-veg', 'Both'].map(p => (
                  <button
                    key={p}
                    onClick={() => setFormData({ ...formData, pref: p })}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg ${formData.pref === p ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Meals <span className="text-destructive">*</span></label>
                <div className="grid grid-cols-3 gap-2">
                  {mealOptions.map(m => {
                    const isSelected = formData.meals.includes(m.id);
                    return (
                      <button
                        key={m.id}
                        onClick={() => toggleMeal(m.id)}
                        className={`p-3 rounded-xl border text-center transition-all ${isSelected ? 'bg-accent border-primary ring-1 ring-primary' : 'bg-white'}`}
                      >
                        <p className={`font-semibold text-sm ${isSelected ? 'text-primary' : 'text-foreground'}`}>{m.id}</p>
                        <p className="text-xs text-muted-foreground">₹{m.price}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Plan Type</label>
                <div className="grid grid-cols-4 gap-2">
                  {planTypes.map(p => (
                    <button
                      key={p}
                      onClick={() => setFormData({ ...formData, planType: p })}
                      className={`py-2 rounded-lg border text-sm font-medium ${formData.planType === p ? 'bg-primary text-primary-foreground border-primary' : 'bg-white text-foreground'}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Days of Week</label>
                <div className="flex justify-between">
                  {allDays.map((d, i) => {
                    const isSelected = formData.days.includes(d); // simplistic check
                    return (
                      <button
                        key={i}
                        onClick={() => toggleDay(d, i)}
                        className={`w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center transition-colors ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
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
              <h2 className="text-xl font-display font-bold">Delivery & Notes</h2>
              <div className="space-y-2">
                <label className="text-sm font-medium">Mode</label>
                <div className="flex bg-muted p-1 rounded-xl">
                  {['Delivery', 'Pickup'].map(m => (
                    <button
                      key={m}
                      onClick={() => setFormData({ ...formData, mode: m })}
                      className={`flex-1 py-2 text-sm font-medium rounded-lg ${formData.mode === m ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground'}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl border bg-white focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Kitchen Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full h-24 p-4 rounded-xl border bg-white focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                  placeholder="Less spicy, no onions, etc."
                />
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
                  <p className="text-sm text-muted-foreground mb-1">Subscriber</p>
                  <p className="font-semibold text-lg">{formData.name}</p>
                  <p className="text-sm">{formData.phone}</p>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{formData.address || 'No address provided'}</p>
                </div>
                <div className="p-4 border-b">
                  <p className="text-sm text-muted-foreground mb-1">Plan</p>
                  <p className="font-semibold">{formData.planType} ({formData.pref})</p>
                  <p className="text-sm">{formData.meals.join(', ')}</p>
                  <div className="flex gap-1 mt-2">
                    {allDays.map((d,i) => formData.days.includes(d) && (
                      <span key={i} className="w-6 h-6 rounded-full bg-accent text-primary flex items-center justify-center text-[10px] font-bold">{d}</span>
                    ))}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">Logistics</p>
                  <p className="font-medium">{formData.mode}</p>
                  {formData.notes && <p className="text-sm text-muted-foreground mt-1">Note: {formData.notes}</p>}
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
          {step === 4 ? 'Add Subscriber' : 'Next'}
        </button>
      </div>
    </div>
  );
}