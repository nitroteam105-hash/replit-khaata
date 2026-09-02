import { useState } from 'react';
import { Search, UserPlus, MapPin, Calendar, Phone } from 'lucide-react';
import { Link } from 'wouter';
import { useAppContext } from '@/context/AppContext';
import { MOCK_DATA } from '@/data/mockData';
import { TopBar } from '@/components/TopBar';
import { BusinessSwitcher } from '@/components/BusinessSwitcher';
import { PersonCard } from '@/components/PersonCard';
import { BottomSheet } from '@/components/BottomSheet';
import { MoneyAmount } from '@/components/MoneyAmount';
import { StatusPill } from '@/components/StatusPill';

export default function People() {
  const { activeBusiness } = useAppContext();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedPerson, setSelectedPerson] = useState<any>(null);

  const people = MOCK_DATA.people[activeBusiness] || [];
  
  const filtered = people.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.role.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  const filterTabs = ['All', 'Active', 'Overdue', 'New', 'Expiring', 'Pending'].filter(f => 
    f === 'All' || people.some(p => p.status === f)
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopBar title="People" />
      <BusinessSwitcher />

      <div className="px-4 py-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search by name or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-10 pr-4 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Filters */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 -mx-4 px-4 pb-1">
          {filterTabs.map(f => (
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

        {/* List */}
        <div className="space-y-3 pt-2">
          {filtered.length > 0 ? (
            filtered.map((person, i) => (
              <PersonCard 
                key={person.id} 
                person={person} 
                index={i}
                onClick={() => setSelectedPerson(person)}
              />
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No people found matching "{search}"</p>
            </div>
          )}
        </div>
      </div>

      {/* FAB */}
      <Link
        href={`/people/add/${activeBusiness}`}
        className="fixed bottom-20 right-4 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all z-40"
      >
        <UserPlus size={24} />
      </Link>

      {/* Profile Bottom Sheet */}
      <BottomSheet 
        isOpen={!!selectedPerson} 
        onClose={() => setSelectedPerson(null)}
        title="Profile"
      >
        {selectedPerson && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-accent text-primary flex items-center justify-center font-display font-bold text-2xl">
                {selectedPerson.name.split(' ').map((n:string) => n[0]).join('').substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold font-display">{selectedPerson.name}</h2>
                <p className="text-muted-foreground">{selectedPerson.role}</p>
                <div className="mt-1">
                  <StatusPill status={selectedPerson.status} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-secondary rounded-xl border">
                <p className="text-xs text-muted-foreground mb-1">Due Amount</p>
                <MoneyAmount amount={selectedPerson.due} className="text-lg font-semibold text-destructive" />
              </div>
              <div className="p-3 bg-secondary rounded-xl border">
                <p className="text-xs text-muted-foreground mb-1">Last Payment</p>
                <p className="text-lg font-semibold">{selectedPerson.date}</p>
              </div>
            </div>

            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 p-4 bg-white rounded-xl border hover:bg-muted transition-colors">
                <Phone className="text-primary" size={20} />
                <span className="font-medium">Call +91 98765 43210</span>
              </button>
              <button className="w-full flex items-center gap-3 p-4 bg-white rounded-xl border hover:bg-muted transition-colors">
                <Calendar className="text-primary" size={20} />
                <span className="font-medium">View Transaction History</span>
              </button>
              {activeBusiness === 'tiffin' && (
                <button className="w-full flex items-center gap-3 p-4 bg-white rounded-xl border hover:bg-muted transition-colors">
                  <MapPin className="text-primary" size={20} />
                  <span className="font-medium">View Delivery Address</span>
                </button>
              )}
            </div>
            
            <div className="pt-4 flex gap-3">
              <button className="flex-1 py-3 bg-primary text-primary-foreground font-semibold rounded-xl active:scale-95 transition-transform">
                Record Payment
              </button>
            </div>
          </div>
        )}
      </BottomSheet>
    </div>
  );
}