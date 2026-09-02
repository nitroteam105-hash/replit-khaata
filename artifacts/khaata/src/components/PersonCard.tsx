import { motion } from 'framer-motion';
import { StatusPill } from './StatusPill';
import { MoneyAmount } from './MoneyAmount';

interface PersonCardProps {
  person: {
    id: string;
    name: string;
    role: string;
    status: string;
    due: number;
    date: string;
  };
  onClick?: () => void;
  index?: number;
}

export function PersonCard({ person, onClick, index = 0 }: PersonCardProps) {
  const initials = person.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full bg-white p-4 rounded-xl border shadow-sm flex items-center gap-3 text-left"
      data-testid={`card-person-${person.id}`}
    >
      <div className="w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center font-display font-bold">
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground truncate">{person.name}</h3>
        <p className="text-sm text-muted-foreground truncate">{person.role}</p>
      </div>
      <div className="text-right flex flex-col items-end gap-1">
        <StatusPill status={person.status} />
        {person.due > 0 ? (
          <MoneyAmount amount={person.due} className="text-destructive font-semibold text-sm" />
        ) : (
          <span className="text-xs text-muted-foreground">{person.date}</span>
        )}
      </div>
    </motion.button>
  );
}