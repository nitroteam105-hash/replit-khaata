import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Search, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TopBar } from '@/components/TopBar';

const BUSINESS_TYPES = [
  'PG', 'Gym', 'Yoga', 'Tiffin', 'Coaching', 'Flat', 'Hostel', 
  'Parking', 'Co-living', 'Saloon', 'Hardware', 'Tailoring', 'Bakery',
  'Clinic', 'Dairy', 'Stationery', 'Medical'
];

export default function BusinessSelect() {
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set(['PG', 'Gym', 'Tiffin']));

  const toggleSelect = (type: string) => {
    const next = new Set(selected);
    if (next.has(type)) next.delete(type);
    else next.add(type);
    setSelected(next);
  };

  const filtered = BUSINESS_TYPES.filter(t => t.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background flex flex-col pb-safe">
      <TopBar title="What do you run?" showBack />
      
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search business type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-10 pr-4 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            data-testid="input-search-business"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 pb-24">
          {filtered.map((type, i) => {
            const isSelected = selected.has(type);
            return (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                key={type}
                onClick={() => toggleSelect(type)}
                className={cn(
                  "p-4 rounded-xl border text-left flex items-start justify-between transition-all active:scale-95",
                  isSelected ? "bg-accent border-primary ring-1 ring-primary" : "bg-white hover:bg-muted"
                )}
                data-testid={`card-business-${type.toLowerCase()}`}
              >
                <span className={cn("font-medium", isSelected ? "text-primary font-semibold" : "text-foreground")}>
                  {type}
                </span>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-border/50 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-10">
        <button
          onClick={() => setLocation('/home')}
          disabled={selected.size === 0}
          className="w-full h-14 bg-primary text-primary-foreground rounded-xl font-bold text-lg disabled:opacity-50 transition-all active:scale-[0.98]"
          data-testid="button-continue"
        >
          Continue with {selected.size} business{selected.size !== 1 ? 'es' : ''}
        </button>
      </div>
    </div>
  );
}