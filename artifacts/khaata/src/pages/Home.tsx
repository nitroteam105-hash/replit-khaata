import { Link } from 'wouter';
import { IndianRupee, UserPlus, Receipt, CalendarCheck, Bell, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { MOCK_DATA } from '@/data/mockData';
import { BusinessSwitcher } from '@/components/BusinessSwitcher';
import { TopBar } from '@/components/TopBar';
import { MoneyAmount } from '@/components/MoneyAmount';
import { StatusPill } from '@/components/StatusPill';
import { cn } from '@/lib/utils';

export default function Home() {
  const { activeBusiness } = useAppContext();
  const data = MOCK_DATA.dashboard[activeBusiness];
  const recentTx = MOCK_DATA.transactions.filter(t => t.business === activeBusiness).slice(0, 5);

  const today = new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'short' }).format(new Date());

  const attentionItems = {
    pg: [
      { text: "Amit Singh — Rent overdue 5 days", status: "Overdue" },
      { text: "Neha Gupta moves in tomorrow", status: "New" }
    ],
    gym: [
      { text: "3 memberships expiring this week", status: "Expiring" }
    ],
    tiffin: [
      { text: "2 deliveries pending today", status: "Pending" }
    ],
    yoga: [
      { text: "Arjun Nair — Fee overdue 2 days", status: "Overdue" },
      { text: "Meera Iyer joins Kids Yoga tomorrow", status: "New" }
    ]
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="Khaata" rightAction={<Bell size={20} className="text-foreground" />} />
      
      <div className="pt-2">
        <BusinessSwitcher />
      </div>

      <div className="px-4 py-4">
        <div className="mb-6">
          <p className="text-muted-foreground text-sm font-medium">{today}</p>
          <h2 className="text-2xl font-display font-bold">Good morning, Ramesh</h2>
        </div>

        {/* Money Snapshot */}
        <div className="bg-white rounded-2xl p-5 border shadow-sm mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">THIS MONTH</h3>
          <div className="flex divide-x">
            <div className="flex-1 pr-4">
              <p className="text-sm text-muted-foreground mb-1">Money In</p>
              <MoneyAmount amount={data.moneyIn} className="text-2xl font-bold text-green-700" />
            </div>
            <div className="flex-1 pl-4">
              <p className="text-sm text-muted-foreground mb-1">Money Out</p>
              <MoneyAmount amount={data.moneyOut} className="text-2xl font-bold text-red-700" />
            </div>
          </div>
          {data.pending > 0 && (
            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Pending to collect</span>
              <MoneyAmount amount={data.pending} className="font-semibold text-amber-700" />
            </div>
          )}
        </div>

        {/* Attention Strip */}
        <div className="mb-6 space-y-3">
          <h3 className="font-semibold text-foreground">Needs Attention</h3>
          {attentionItems[activeBusiness].map((item, i) => (
            <div key={i} className="bg-white p-3 rounded-xl border flex items-center justify-between shadow-xs">
              <span className="text-sm font-medium">{item.text}</span>
              <StatusPill status={item.status} />
            </div>
          ))}
          {attentionItems[activeBusiness].length === 0 && (
            <div className="bg-white p-4 rounded-xl border flex items-center gap-3 text-muted-foreground">
              <CheckCircle2 className="text-green-600" />
              <span className="text-sm">All caught up!</span>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {[
            { icon: IndianRupee, label: "Payment", path: "/money", color: "bg-emerald-100 text-emerald-700" },
            { icon: UserPlus, label: "Add Person", path: `/people/add/${activeBusiness}`, color: "bg-blue-100 text-blue-700" },
            { icon: Receipt, label: "Bill", path: "/money/bill", color: "bg-purple-100 text-purple-700" },
            { icon: CalendarCheck, label: "Attendance", path: "/staff/attendance", color: "bg-orange-100 text-orange-700" },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.path}
              data-testid={`action-${action.label.toLowerCase()}`}
              className="flex flex-col items-center gap-2"
            >
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center active:scale-95 transition-transform", action.color)}>
                <action.icon size={24} />
              </div>
              <span className="text-[11px] font-semibold text-center leading-tight">{action.label}</span>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Recent Activity</h3>
            <Link href="/money" className="text-sm text-primary font-medium flex items-center">
              View all <ChevronRight size={16} />
            </Link>
          </div>
          <div className="bg-white rounded-2xl border overflow-hidden">
            {recentTx.length > 0 ? (
              <div className="divide-y">
                {recentTx.map(tx => (
                  <div key={tx.id} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{tx.person}</p>
                      <p className="text-xs text-muted-foreground">{tx.desc} · {tx.date}</p>
                    </div>
                    <MoneyAmount 
                      amount={tx.amount} 
                      className={cn("font-semibold", tx.type === 'in' ? 'text-green-700' : 'text-foreground')} 
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <p>No recent activity</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}