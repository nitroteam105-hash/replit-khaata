import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { 
  Building2, Dumbbell, Utensils, BookOpen, 
  Home, BedDouble, Car, Users, 
  Scissors, Wrench, Shirt, Croissant,
  ChevronRight, IndianRupee, UsersRound, FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';

const BUSINESS_TYPES = [
  { icon: Home, name: 'PG', color: 'bg-blue-100 text-blue-700' },
  { icon: Dumbbell, name: 'Gym', color: 'bg-orange-100 text-orange-700' },
  { icon: Utensils, name: 'Tiffin', color: 'bg-red-100 text-red-700' },
  { icon: BookOpen, name: 'Coaching', color: 'bg-indigo-100 text-indigo-700' },
  { icon: Building2, name: 'Flat', color: 'bg-emerald-100 text-emerald-700' },
  { icon: BedDouble, name: 'Hostel', color: 'bg-cyan-100 text-cyan-700' },
  { icon: Car, name: 'Parking', color: 'bg-slate-100 text-slate-700' },
  { icon: Users, name: 'Co-living', color: 'bg-violet-100 text-violet-700' },
  { icon: Scissors, name: 'Saloon', color: 'bg-pink-100 text-pink-700' },
  { icon: Wrench, name: 'Hardware', color: 'bg-amber-100 text-amber-700' },
  { icon: Shirt, name: 'Tailoring', color: 'bg-fuchsia-100 text-fuchsia-700' },
  { icon: Croissant, name: 'Bakery', color: 'bg-yellow-100 text-yellow-700' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="px-5 pt-12 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-display font-bold leading-[1.1] tracking-tight text-foreground mb-4">
            Ek app.<br />Saare khaate.
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-[280px]">
            The trusted digital ledger for Indian small businesses. Manage people, payments, and bills without the chaos.
          </p>
          <Link
            href="/select"
            data-testid="button-get-started"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover-elevate active:scale-95 transition-all shadow-sm"
          >
            Shuru karein
            <ChevronRight size={20} />
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 rounded-2xl overflow-hidden shadow-lg border relative aspect-[4/3] bg-muted"
        >
          <img 
            src="/hero-image.png" 
            alt="Indian small business owner at a wooden desk reviewing accounts" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-5 py-10 bg-white">
        <div className="space-y-4">
          {[
            { icon: IndianRupee, title: "Money Tracking", desc: "Know exactly who paid and who's pending." },
            { icon: UsersRound, title: "People Management", desc: "Tenant, member, or subscriber records in one place." },
            { icon: FileText, title: "Instant Bills", desc: "Generate and share GST-ready bills on WhatsApp." }
          ].map((feature, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={feature.title}
              className="flex gap-4 p-5 rounded-2xl bg-secondary border border-border/50"
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                <feature.icon className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground font-display text-lg">{feature.title}</h3>
                <p className="text-muted-foreground leading-snug mt-1">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Business Types */}
      <section className="px-5 py-12">
        <h2 className="text-2xl font-display font-bold mb-6 text-foreground">Built for 62+ business types</h2>
        <div className="grid grid-cols-3 gap-3">
          {BUSINESS_TYPES.map((type, i) => {
            const Icon = type.icon;
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 6) * 0.05 }}
                key={type.name}
                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border shadow-xs gap-2 text-center"
              >
                <div className={cn("p-2.5 rounded-full", type.color)}>
                  <Icon size={24} />
                </div>
                <span className="text-xs font-semibold">{type.name}</span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-5 py-12 bg-primary text-primary-foreground">
        <h2 className="text-2xl font-display font-bold mb-8">Trusted by owners</h2>
        <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 -mx-5 px-5">
          {[
            { text: "Earlier I used 3 registers for my PG. Now it's all in Khaata. Very peaceful.", author: "Rajesh S.", biz: "Sunshine PG" },
            { text: "Sending reminders on WhatsApp directly from the app saves me 2 hours daily.", author: "Priya M.", biz: "FlexFit Gym" },
          ].map((t, i) => (
            <div key={i} className="w-[280px] shrink-0 bg-white/10 p-5 rounded-2xl backdrop-blur-sm">
              <p className="text-lg font-medium leading-snug mb-4">"{t.text}"</p>
              <div>
                <p className="font-semibold">{t.author}</p>
                <p className="text-primary-foreground/70 text-sm">{t.biz}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="px-5 py-8 text-center border-t border-border bg-white">
        <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-display font-bold text-xl mx-auto mb-3">K</div>
        <p className="font-semibold text-foreground">Khaata</p>
        <p className="text-sm text-muted-foreground mt-1">Made with care for Indian business.</p>
      </footer>
    </div>
  );
}