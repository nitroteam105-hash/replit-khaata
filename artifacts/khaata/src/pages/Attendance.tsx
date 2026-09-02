import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MOCK_DATA } from '@/data/mockData';
import { TopBar } from '@/components/TopBar';
import { BottomSheet } from '@/components/BottomSheet';

export default function Attendance() {
  const [tab, setTab] = useState<'today' | 'month'>('today');
  const [date, setDate] = useState(new Date());
  const [isLeaveSheetOpen, setIsLeaveSheetOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  
  const staff = MOCK_DATA.staff;
  const dailyStaff = staff.filter(s => s.payType.includes('Daily'));
  const monthlyStaff = staff.filter(s => s.payType.includes('Month'));

  const formatDate = (d: Date) => {
    return new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }).format(d);
  };

  const nextDay = () => {
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    setDate(d);
  };

  const prevDay = () => {
    const d = new Date(date);
    d.setDate(d.getDate() - 1);
    setDate(d);
  };

  const statuses = [
    { id: 'P', color: 'bg-green-100 text-green-700 hover:bg-green-200' },
    { id: 'A', color: 'bg-red-100 text-red-700 hover:bg-red-200' },
    { id: 'H', color: 'bg-amber-100 text-amber-700 hover:bg-amber-200' },
    { id: 'L', color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Attendance" showBack />

      {/* Tabs */}
      <div className="flex border-b bg-white">
        <button 
          onClick={() => setTab('today')}
          className={`flex-1 py-3 text-center font-medium font-display transition-colors ${tab === 'today' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
        >
          Daily Mark
        </button>
        <button 
          onClick={() => setTab('month')}
          className={`flex-1 py-3 text-center font-medium font-display transition-colors ${tab === 'month' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
        >
          This Month
        </button>
      </div>

      {tab === 'today' ? (
        <div className="p-4 space-y-6">
          <div className="flex items-center justify-between bg-white p-2 rounded-xl border">
            <button onClick={prevDay} className="p-2 hover:bg-muted rounded-lg"><ChevronLeft size={20} /></button>
            <span className="font-semibold font-display">{formatDate(date)}</span>
            <button onClick={nextDay} className="p-2 hover:bg-muted rounded-lg"><ChevronRight size={20} /></button>
          </div>

          <button className="w-full py-3 rounded-xl bg-primary/10 text-primary font-bold text-sm hover:bg-primary/20 transition-colors">
            Mark All Present
          </button>

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">Daily Wage Staff</h3>
            <div className="bg-white rounded-2xl border overflow-hidden divide-y">
              {dailyStaff.map(s => (
                <div key={s.id} className="p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                      {s.name.substring(0,1)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm leading-none">{s.name}</h4>
                      <span className="text-xs text-muted-foreground">{s.role} · ₹{s.payAmount}/day</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {statuses.map(st => (
                      <button key={st.id} className={`flex-1 py-2 rounded-lg font-bold text-sm ${st.id === 'P' ? 'bg-green-500 text-white shadow-sm' : 'bg-muted text-muted-foreground'}`}>
                        {st.id}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">Salaried Staff (Leave-only)</h3>
            <div className="bg-white rounded-2xl border overflow-hidden divide-y">
              {monthlyStaff.map(s => (
                <div key={s.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                      {s.name.substring(0,1)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm leading-none">{s.name}</h4>
                      <span className="text-xs text-muted-foreground">{s.role}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => { setSelectedStaff(s); setIsLeaveSheetOpen(true); }}
                    className="px-3 py-1.5 rounded-lg border text-sm font-medium hover:bg-muted text-muted-foreground"
                  >
                    + Log leave
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 space-y-3">
          {staff.map(s => (
            <div key={s.id} className="bg-white p-4 rounded-xl border shadow-sm space-y-3">
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <h4 className="font-semibold text-foreground">{s.name}</h4>
                  <span className="text-xs text-muted-foreground">{s.role}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold block text-primary">₹{s.payAmount * (s.payType.includes('Month') ? 1 : 22)}</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Est. Pay</span>
                </div>
              </div>
              <div className="flex justify-between text-center px-2">
                <div><p className="font-bold text-green-600">22</p><p className="text-[10px] text-muted-foreground uppercase">Present</p></div>
                <div><p className="font-bold text-red-600">2</p><p className="text-[10px] text-muted-foreground uppercase">Absent</p></div>
                <div><p className="font-bold text-amber-600">0</p><p className="text-[10px] text-muted-foreground uppercase">Half</p></div>
                <div><p className="font-bold text-blue-600">1</p><p className="text-[10px] text-muted-foreground uppercase">Leave</p></div>
              </div>
            </div>
          ))}
        </div>
      )}

      <BottomSheet isOpen={isLeaveSheetOpen} onClose={() => setIsLeaveSheetOpen(false)} title="Log Leave">
        {selectedStaff && (
          <div className="space-y-5 pb-4">
            <div className="bg-secondary p-4 rounded-xl flex gap-3 items-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-sm">
                {selectedStaff.name.substring(0,1)}
              </div>
              <div>
                <p className="font-bold text-foreground">{selectedStaff.name}</p>
                <p className="text-xs text-muted-foreground">{selectedStaff.role}</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Date</label>
              <input type="date" defaultValue={date.toISOString().split('T')[0]} className="w-full h-12 px-4 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Leave Type</label>
              <div className="flex bg-muted p-1 rounded-xl">
                <button className="flex-1 py-2 text-sm font-medium rounded-lg bg-white shadow-sm text-foreground">Paid Leave</button>
                <button className="flex-1 py-2 text-sm font-medium rounded-lg text-muted-foreground">Unpaid Leave</button>
              </div>
            </div>

            <button className="w-full h-14 mt-4 bg-primary text-primary-foreground font-bold text-lg rounded-xl active:scale-[0.98] transition-transform">
              Save Leave
            </button>
          </div>
        )}
      </BottomSheet>
    </div>
  );
}