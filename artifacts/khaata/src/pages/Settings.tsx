import { useLocation } from 'wouter';
import { Calendar } from 'lucide-react';
import { TopBar } from '@/components/TopBar';
import { useAppContext } from '@/context/AppContext';

export default function Settings() {
  const [, setLocation] = useLocation();
  const { activeBusiness } = useAppContext();
  const showBusinessSetup = activeBusiness === 'gym' || activeBusiness === 'yoga';

  return (
    <div className="min-h-screen bg-background">
      <TopBar title="Settings" />
      <div className="p-4 space-y-6">
        <div className="bg-white rounded-2xl border p-4 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold font-display">
            R
          </div>
          <div>
            <h2 className="font-bold text-lg font-display">Ramesh Kumar</h2>
            <p className="text-muted-foreground text-sm">+91 98765 43210</p>
          </div>
        </div>

        {showBusinessSetup && (
          <div className="bg-white rounded-2xl border overflow-hidden">
            <button
              onClick={() => setLocation('/business-setup')}
              className="w-full p-4 text-left font-medium hover:bg-muted transition-colors flex items-center gap-3"
              data-testid="button-business-setup"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Calendar size={16} />
              </div>
              <div>
                <p>Schedule & Fees</p>
                <p className="text-xs text-muted-foreground font-normal">Batches, timings, fee plans</p>
              </div>
            </button>
          </div>
        )}

        <div className="bg-white rounded-2xl border overflow-hidden">
          {['Business Profile', 'Bank Accounts', 'UPI Settings', 'Staff Access'].map((item, i) => (
            <button key={item} className={`w-full p-4 text-left font-medium hover:bg-muted transition-colors ${i !== 0 ? 'border-t' : ''}`}>
              {item}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border overflow-hidden">
          {['Help & Support', 'Terms of Service', 'Privacy Policy'].map((item, i) => (
            <button key={item} className={`w-full p-4 text-left font-medium hover:bg-muted transition-colors ${i !== 0 ? 'border-t' : ''}`}>
              {item}
            </button>
          ))}
        </div>
        
        <button className="w-full p-4 text-center font-bold text-destructive bg-red-50 rounded-2xl">
          Log Out
        </button>
      </div>
    </div>
  );
}