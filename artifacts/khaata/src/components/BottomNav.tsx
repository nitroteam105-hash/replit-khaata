import { Link, useLocation } from 'wouter';
import { Home, Users, IndianRupee, Briefcase, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const [location] = useLocation();
  
  if (location === '/' || location === '/select') return null;

  const tabs = [
    { name: 'Home', path: '/home', icon: Home },
    { name: 'People', path: '/people', icon: Users },
    { name: 'Money', path: '/money', icon: IndianRupee },
    { name: 'Staff', path: '/staff', icon: Briefcase },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex justify-around items-center px-2 z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = location.startsWith(tab.path);
        return (
          <Link
            key={tab.name}
            href={tab.path}
            data-testid={`tab-${tab.name.toLowerCase()}`}
            className={cn(
              "flex flex-col items-center justify-center w-16 h-full space-y-1",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon size={20} className={isActive ? "fill-primary/20" : ""} />
            <span className="text-[10px] font-medium">{tab.name}</span>
          </Link>
        );
      })}
    </div>
  );
}