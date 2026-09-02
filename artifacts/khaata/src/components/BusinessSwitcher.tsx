import { motion } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { MOCK_DATA } from '@/data/mockData';
import { cn } from '@/lib/utils';

export function BusinessSwitcher() {
  const { activeBusiness, setActiveBusiness } = useAppContext();

  return (
    <div className="flex overflow-x-auto hide-scrollbar gap-2 px-4 py-2">
      {MOCK_DATA.businesses.map((b) => {
        const isActive = activeBusiness === b.id;
        return (
          <button
            key={b.id}
            onClick={() => setActiveBusiness(b.id as any)}
            className={cn(
              "relative px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              isActive ? "text-primary-foreground" : "text-muted-foreground bg-muted hover:bg-muted/80"
            )}
            data-testid={`tab-business-${b.id}`}
          >
            {isActive && (
              <motion.div
                layoutId="business-pill-bg"
                className="absolute inset-0 bg-primary rounded-full z-0"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{b.name}</span>
          </button>
        );
      })}
    </div>
  );
}