import { useState } from 'react';
import { IndianRupee, ArrowUpRight, ArrowDownRight, Plus } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { MOCK_DATA } from '@/data/mockData';
import { TopBar } from '@/components/TopBar';
import { MoneyAmount } from '@/components/MoneyAmount';
import { BottomSheet } from '@/components/BottomSheet';

export default function Money() {
  const [tab, setTab] = useState<'in' | 'out'>('in');
  const [filter, setFilter] = useState('All');
  const [isRecordSheetOpen, setIsRecordSheetOpen] = useState(false);
  
  const transactions = MOCK_DATA.transactions;
  
  const filtered = transactions.filter(t => 
    t.type === tab && 
    (filter === 'All' || MOCK_DATA.businesses.find(b => b.id === t.business)?.name === filter)
  );

  const total = filtered.reduce((sum, t) => sum + t.amount, 0);

  const filters = ['All', ...MOCK_DATA.businesses.map(b => b.name)];

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopBar title="Money Ledger" />
      
      {/* Tabs */}
      <div className="flex border-b bg-white">
        <button 
          onClick={() => setTab('in')}
          className={`flex-1 py-3 text-center font-medium font-display transition-colors ${tab === 'in' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
        >
          Money In
        </button>
        <button 
          onClick={() => setTab('out')}
          className={`flex-1 py-3 text-center font-medium font-display transition-colors ${tab === 'out' ? 'text-destructive border-b-2 border-destructive' : 'text-muted-foreground'}`}
        >
          Money Out
        </button>
      </div>

      {/* Summary */}
      <div className="p-6 bg-white border-b text-center">
        <p className="text-muted-foreground text-sm font-medium mb-1">Total {tab === 'in' ? 'Collected' : 'Spent'} this month</p>
        <div className="flex items-center justify-center gap-2">
          {tab === 'in' ? <ArrowUpRight className="text-green-600" /> : <ArrowDownRight className="text-red-600" />}
          <MoneyAmount amount={total} className="text-4xl font-bold text-foreground" />
        </div>
      </div>

      {/* Filters */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 p-4">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border ${
              filter === f 
                ? 'bg-foreground text-background border-foreground' 
                : 'bg-white text-muted-foreground border-border hover:bg-muted'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Transactions */}
      <div className="px-4 space-y-3">
        {filtered.map(tx => {
          const business = MOCK_DATA.businesses.find(b => b.id === tx.business);
          return (
            <div key={tx.id} className="bg-white p-4 rounded-xl border shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${tab === 'in' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {tx.person.substring(0,2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground leading-tight">{tx.person}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded-md">{business?.type}</span>
                    <span className="text-xs text-muted-foreground">{tx.desc}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <MoneyAmount amount={tx.amount} className={`font-semibold ${tab === 'in' ? 'text-green-700' : 'text-foreground'}`} />
                <p className="text-xs text-muted-foreground">{tx.date}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAB */}
      <button 
        onClick={() => setIsRecordSheetOpen(true)}
        className="fixed bottom-20 right-4 h-14 px-6 bg-primary text-primary-foreground rounded-full flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all font-semibold z-40"
      >
        <Plus size={20} />
        Record
      </button>

      {/* Record Bottom Sheet */}
      <BottomSheet isOpen={isRecordSheetOpen} onClose={() => setIsRecordSheetOpen(false)} title={`Record Money ${tab === 'in' ? 'In' : 'Out'}`}>
        <div className="space-y-5 pb-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Amount (₹)</label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input type="number" placeholder="0" className="w-full h-14 pl-10 pr-4 text-2xl font-bold rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">{tab === 'in' ? 'From' : 'To'} (Person/Vendor)</label>
            <input type="text" placeholder="Enter name" className="w-full h-12 px-4 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Payment Mode</label>
            <div className="grid grid-cols-4 gap-2">
              {['Cash', 'UPI', 'Card', 'Bank'].map(mode => (
                <button key={mode} className="py-2 rounded-lg border text-sm font-medium hover:bg-muted active:scale-95 transition-all">
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Note (Optional)</label>
            <input type="text" placeholder="Rent, supplies, etc." className="w-full h-12 px-4 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>

          <button className="w-full h-14 mt-4 bg-primary text-primary-foreground font-bold text-lg rounded-xl active:scale-[0.98] transition-transform">
            Save Entry
          </button>
        </div>
      </BottomSheet>
    </div>
  );
}