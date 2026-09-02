import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { MOCK_DATA } from '@/data/mockData';
import { TopBar } from '@/components/TopBar';
import { MoneyAmount } from '@/components/MoneyAmount';
import { BottomSheet } from '@/components/BottomSheet';

export default function Staff() {
  const [search, setSearch] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  
  const staff = MOCK_DATA.staff;
  const filtered = staff.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.role.toLowerCase().includes(search.toLowerCase()));

  const totalStaff = staff.length;
  const totalWage = staff.reduce((acc, s) => acc + (s.payType.includes('Month') ? s.payAmount : s.payAmount * 26), 0);

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopBar title="My Staff" />

      {/* Summary Cards */}
      <div className="p-4 grid grid-cols-2 gap-3">
        <div className="bg-secondary rounded-xl p-4 border border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Total Staff</p>
          <p className="text-2xl font-bold font-display">{totalStaff}</p>
        </div>
        <div className="bg-secondary rounded-xl p-4 border border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Est. Wage Bill</p>
          <MoneyAmount amount={totalWage} className="text-2xl font-bold font-display text-foreground" />
        </div>
      </div>

      <div className="px-4 pb-4">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search staff..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-10 pr-4 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Staff List */}
        <div className="space-y-3">
          {filtered.map(s => (
            <button 
              key={s.id} 
              onClick={() => setSelectedStaff(s)}
              className="w-full bg-white p-4 rounded-xl border shadow-sm flex items-center justify-between text-left active:scale-[0.98] transition-transform"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
                  {s.name.substring(0,1)}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{s.name}</h4>
                  <p className="text-sm text-muted-foreground">{s.role}</p>
                </div>
              </div>
              <div className="text-right">
                <MoneyAmount amount={s.payAmount} className="font-semibold text-foreground block" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.payType}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* FAB */}
      <button className="fixed bottom-20 right-4 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all z-40">
        <Plus size={24} />
      </button>

      {/* Staff Profile */}
      <BottomSheet isOpen={!!selectedStaff} onClose={() => setSelectedStaff(null)} title="Staff Profile">
        {selectedStaff && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 pb-4 border-b">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-2xl">
                {selectedStaff.name.substring(0,1)}
              </div>
              <div>
                <h2 className="text-xl font-bold font-display">{selectedStaff.name}</h2>
                <p className="text-muted-foreground">{selectedStaff.role} · +91 98765 00000</p>
              </div>
            </div>

            <div className="flex bg-muted p-1 rounded-xl">
              {['Payments', 'Attendance', 'Docs'].map((t, i) => (
                <button key={t} className={`flex-1 py-2 text-sm font-medium rounded-lg ${i === 0 ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground'}`}>
                  {t}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="bg-secondary p-4 rounded-xl border flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Current Pay</p>
                  <MoneyAmount amount={selectedStaff.payAmount} className="text-xl font-bold" />
                  <span className="text-xs text-muted-foreground ml-1">/ {selectedStaff.payType.includes('Month') ? 'month' : 'day'}</span>
                </div>
                <button className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg text-sm">
                  Pay Now
                </button>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Recent Payments</h4>
                {[1, 2].map(i => (
                  <div key={i} className="flex justify-between items-center p-3 border rounded-xl">
                    <div>
                      <p className="font-medium text-sm">Salary Oct</p>
                      <p className="text-xs text-muted-foreground">1 Nov, UPI</p>
                    </div>
                    <MoneyAmount amount={selectedStaff.payAmount} className="font-semibold" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </BottomSheet>
    </div>
  );
}