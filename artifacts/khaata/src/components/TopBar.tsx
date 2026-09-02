import { ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';

interface TopBarProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export function TopBar({ title, showBack = false, onBack, rightAction }: TopBarProps) {
  const [, setLocation] = useLocation();

  const handleBack = () => {
    if (onBack) onBack();
    else setLocation(-1 as any);
  };

  return (
    <header className="sticky top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-md border-b z-40 px-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {showBack && (
          <button 
            onClick={handleBack}
            className="p-2 -ml-2 rounded-full hover:bg-muted active:scale-95 transition-all"
            data-testid="button-back"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <h1 className="font-display font-semibold text-lg">{title}</h1>
      </div>
      {rightAction && <div>{rightAction}</div>}
    </header>
  );
}