import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock, Users, Plus, Trash2, LayoutGrid, List, DoorOpen,
  Video, MapPin, Sparkles, Check
} from 'lucide-react';
import { TopBar } from '@/components/TopBar';
import { BottomSheet } from '@/components/BottomSheet';
import { useAppContext, Batch, FeePlan } from '@/context/AppContext';
import { MOCK_DATA } from '@/data/mockData';
import { cn } from '@/lib/utils';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const CYCLE_PRESETS = ['Monthly', 'Quarterly', 'Half-Yearly', 'Yearly', 'Custom'];

export default function BusinessSetup() {
  const { activeBusiness, businessSetups, updateBusinessSetup } = useAppContext();
  const business = MOCK_DATA.businesses.find(b => b.id === activeBusiness);
  const setup = businessSetups[activeBusiness];

  const {
    accessType, operatingHours, roomsEnabled, rooms, batches, feePlans, trialSession, addOns
  } = setup;

  const setAccessType = (v: 'open' | 'batch' | 'hybrid') => updateBusinessSetup(activeBusiness, { accessType: v });
  const setOperatingHours = (v: typeof operatingHours) => updateBusinessSetup(activeBusiness, { operatingHours: v });
  const setRoomsEnabled = (v: boolean) => updateBusinessSetup(activeBusiness, { roomsEnabled: v });
  const setRooms = (v: string[]) => updateBusinessSetup(activeBusiness, { rooms: v });
  const setBatches = (v: Batch[]) => updateBusinessSetup(activeBusiness, { batches: v });
  const setFeePlans = (v: FeePlan[]) => updateBusinessSetup(activeBusiness, { feePlans: v });
  const setTrialSession = (v: typeof trialSession) => updateBusinessSetup(activeBusiness, { trialSession: v });
  const setAddOns = (v: typeof addOns) => updateBusinessSetup(activeBusiness, { addOns: v });

  const [batchView, setBatchView] = useState<'list' | 'calendar'>('list');
  const [isBatchSheetOpen, setIsBatchSheetOpen] = useState(false);
  const [isPlanSheetOpen, setIsPlanSheetOpen] = useState(false);
  const [isHoursSheetOpen, setIsHoursSheetOpen] = useState(false);
  const [isRoomSheetOpen, setIsRoomSheetOpen] = useState(false);
  const [isAddOnSheetOpen, setIsAddOnSheetOpen] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  const emptyBatch: Batch = { id: '', name: '', days: [], time: '', capacity: 10, instructor: '', mode: 'Offline', meetingLink: '', room: '' };
  const [batchDraft, setBatchDraft] = useState<Batch>(emptyBatch);

  const emptyPlan: FeePlan = { id: '', name: '', batchIds: [], cycles: [{ label: 'Monthly', price: 0 }] };
  const [planDraft, setPlanDraft] = useState<FeePlan>(emptyPlan);

  const [hoursDraft, setHoursDraft] = useState({ days: '', from: '', to: '' });
  const [roomDraft, setRoomDraft] = useState('');
  const [addOnDraft, setAddOnDraft] = useState({ name: '', price: '' });

  const showHours = accessType === 'open' || accessType === 'hybrid';
  const showBatches = accessType === 'batch' || accessType === 'hybrid';

  const openNewBatch = () => { setBatchDraft({ ...emptyBatch, id: `b${Date.now()}` }); setIsBatchSheetOpen(true); };
  const saveBatch = () => {
    if (!batchDraft.name || batchDraft.days.length === 0) return;
    const exists = batches.some(b => b.id === batchDraft.id);
    setBatches(exists ? batches.map(b => b.id === batchDraft.id ? batchDraft : b) : [...batches, batchDraft]);
    setIsBatchSheetOpen(false);
  };
  const removeBatch = (id: string) => setBatches(batches.filter(b => b.id !== id));
  const toggleDraftDay = (day: string) => {
    setBatchDraft(prev => ({
      ...prev,
      days: prev.days.includes(day) ? prev.days.filter(d => d !== day) : [...prev.days, day]
    }));
  };

  const openNewPlan = () => { setPlanDraft({ ...emptyPlan, id: `fp${Date.now()}` }); setIsPlanSheetOpen(true); };
  const savePlan = () => {
    if (!planDraft.name || planDraft.cycles.length === 0) return;
    const exists = feePlans.some(p => p.id === planDraft.id);
    setFeePlans(exists ? feePlans.map(p => p.id === planDraft.id ? planDraft : p) : [...feePlans, planDraft]);
    setIsPlanSheetOpen(false);
  };
  const removePlan = (id: string) => setFeePlans(feePlans.filter(p => p.id !== id));
  const toggleDraftBatch = (id: string) => {
    setPlanDraft(prev => ({
      ...prev,
      batchIds: prev.batchIds.includes(id) ? prev.batchIds.filter(b => b !== id) : [...prev.batchIds, id]
    }));
  };
  const addDraftCycle = () => setPlanDraft(prev => ({ ...prev, cycles: [...prev.cycles, { label: 'Custom', price: 0 }] }));
  const updateDraftCycle = (i: number, field: 'label' | 'price', value: any) => {
    setPlanDraft(prev => {
      const cycles = [...prev.cycles];
      cycles[i] = { ...cycles[i], [field]: value };
      return { ...prev, cycles };
    });
  };
  const removeDraftCycle = (i: number) => setPlanDraft(prev => ({ ...prev, cycles: prev.cycles.filter((_, idx) => idx !== i) }));

  const saveHours = () => {
    if (!hoursDraft.days || !hoursDraft.from || !hoursDraft.to) return;
    setOperatingHours([...operatingHours, hoursDraft]);
    setHoursDraft({ days: '', from: '', to: '' });
    setIsHoursSheetOpen(false);
  };
  const removeHours = (i: number) => setOperatingHours(operatingHours.filter((_: any, idx: number) => idx !== i));

  const saveRoom = () => {
    if (!roomDraft) return;
    setRooms([...rooms, roomDraft]);
    setRoomDraft('');
    setIsRoomSheetOpen(false);
  };
  const removeRoom = (name: string) => setRooms(rooms.filter(r => r !== name));

  const saveAddOn = () => {
    if (!addOnDraft.name || !addOnDraft.price) return;
    setAddOns([...addOns, { id: `a${Date.now()}`, name: addOnDraft.name, price: Number(addOnDraft.price) }]);
    setAddOnDraft({ name: '', price: '' });
    setIsAddOnSheetOpen(false);
  };
  const removeAddOn = (id: string) => setAddOns(addOns.filter((a: any) => a.id !== id));

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-44">
      <TopBar title="Schedule & Fees" showBack />

      <div className="p-4 space-y-6">
        <div className="bg-accent/40 border border-primary/20 rounded-xl px-4 py-3 flex items-center gap-3">
          <Sparkles size={18} className="text-primary shrink-0" />
          <p className="text-sm text-foreground">
            Set this up once for <span className="font-semibold">{business?.name}</span> — new members will pick from these batches and fee plans automatically.
          </p>
        </div>

        {/* Access Type */}
        <section className="space-y-3">
          <h3 className="font-semibold px-1">How do members access {business?.type === 'Yoga' ? 'classes' : 'the gym'}?</h3>
          <div className="grid grid-cols-1 gap-2">
            {[
              { id: 'open', label: 'Open-access', desc: 'Members can walk in any time within operating hours' },
              { id: 'batch', label: 'Batch-based', desc: 'Members join fixed-time batches/classes' },
              { id: 'hybrid', label: 'Hybrid', desc: 'Open hours plus some special batches/classes' },
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => setAccessType(opt.id as any)}
                className={cn(
                  "p-4 rounded-xl border text-left transition-all active:scale-[0.99]",
                  accessType === opt.id ? "bg-accent border-primary ring-1 ring-primary" : "bg-white hover:bg-muted"
                )}
              >
                <div className="flex items-center justify-between">
                  <p className={cn("font-semibold", accessType === opt.id ? "text-primary" : "text-foreground")}>{opt.label}</p>
                  {accessType === opt.id && <Check size={16} className="text-primary" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Operating Hours */}
        {showHours && (
          <section className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="font-semibold">Operating Hours</h3>
              <button onClick={() => setIsHoursSheetOpen(true)} className="text-sm text-primary font-medium flex items-center gap-1">
                <Plus size={16} /> Add Hours
              </button>
            </div>
            <div className="bg-white rounded-xl border divide-y">
              {operatingHours.length === 0 && (
                <p className="p-4 text-sm text-muted-foreground text-center">No hours added yet</p>
              )}
              {operatingHours.map((h: any, i: number) => (
                <div key={i} className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium">{h.days}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{h.from} – {h.to}</span>
                    <button onClick={() => removeHours(i)} className="text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Rooms */}
        {showBatches && (
          <section className="space-y-3">
            <div className="bg-white p-4 rounded-xl border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                  <DoorOpen size={16} className="text-blue-700" />
                </div>
                <div>
                  <p className="font-medium text-sm">Multiple rooms/halls</p>
                  <p className="text-xs text-muted-foreground">Enable if you run parallel batches in different spaces</p>
                </div>
              </div>
              <div
                onClick={() => setRoomsEnabled(!roomsEnabled)}
                className={cn("w-12 h-6 rounded-full p-1 cursor-pointer transition-colors shrink-0", roomsEnabled ? 'bg-primary' : 'bg-muted-foreground')}
              >
                <div className={cn("w-4 h-4 rounded-full bg-white transition-transform", roomsEnabled ? 'translate-x-6' : 'translate-x-0')} />
              </div>
            </div>
            {roomsEnabled && (
              <div className="bg-white rounded-xl border p-3 space-y-2">
                <div className="flex flex-wrap gap-2">
                  {rooms.map(r => (
                    <span key={r} className="px-3 py-1.5 rounded-full bg-secondary text-sm font-medium flex items-center gap-2">
                      {r}
                      <button onClick={() => removeRoom(r)} className="text-muted-foreground hover:text-destructive"><Trash2 size={12} /></button>
                    </span>
                  ))}
                  <button onClick={() => setIsRoomSheetOpen(true)} className="px-3 py-1.5 rounded-full border-2 border-dashed text-primary text-sm font-medium flex items-center gap-1">
                    <Plus size={14} /> Room
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Batches */}
        {showBatches && (
          <section className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="font-semibold">Batches</h3>
              <div className="flex items-center gap-2">
                <div className="flex bg-muted p-1 rounded-lg">
                  <button onClick={() => setBatchView('list')} className={cn("p-1.5 rounded-md", batchView === 'list' ? 'bg-white shadow-sm' : '')}>
                    <List size={14} />
                  </button>
                  <button onClick={() => setBatchView('calendar')} className={cn("p-1.5 rounded-md", batchView === 'calendar' ? 'bg-white shadow-sm' : '')}>
                    <LayoutGrid size={14} />
                  </button>
                </div>
                <button onClick={openNewBatch} className="text-sm text-primary font-medium flex items-center gap-1">
                  <Plus size={16} /> Add
                </button>
              </div>
            </div>

            {batchView === 'list' ? (
              <div className="space-y-2">
                {batches.length === 0 && (
                  <div className="bg-white rounded-xl border p-6 text-center text-sm text-muted-foreground">No batches added yet</div>
                )}
                {batches.map(b => (
                  <div key={b.id} className="bg-white rounded-xl border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold">{b.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{b.days.join(', ')} · {b.time}</p>
                      </div>
                      <button onClick={() => removeBatch(b.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-xs bg-secondary px-2 py-1 rounded-md flex items-center gap-1"><Users size={12} /> {b.capacity} cap · {b.instructor || 'No instructor'}</span>
                      <span className="text-xs bg-secondary px-2 py-1 rounded-md flex items-center gap-1">
                        {b.mode === 'Online' ? <Video size={12} /> : <MapPin size={12} />} {b.mode}{b.room ? ` · ${b.room}` : ''}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border overflow-x-auto">
                <div className="grid grid-cols-7 min-w-[560px] text-xs">
                  {DAYS.map(day => (
                    <div key={day} className="border-r last:border-r-0">
                      <div className="p-2 text-center font-semibold border-b bg-muted/50">{day}</div>
                      <div className="p-1.5 space-y-1.5 min-h-[120px]">
                        {batches.filter(b => b.days.includes(day)).map(b => (
                          <div key={b.id} className="bg-accent border border-primary/30 rounded-lg p-1.5">
                            <p className="font-semibold text-[10px] leading-tight text-primary">{b.name}</p>
                            <p className="text-[9px] text-muted-foreground leading-tight">{b.time}{b.room ? ` · ${b.room}` : ''}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Fee Plans */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-semibold">Fee Plans</h3>
            <button onClick={openNewPlan} className="text-sm text-primary font-medium flex items-center gap-1">
              <Plus size={16} /> Add Plan
            </button>
          </div>
          <div className="space-y-2">
            {feePlans.length === 0 && (
              <div className="bg-white rounded-xl border p-6 text-center text-sm text-muted-foreground">No fee plans added yet</div>
            )}
            {feePlans.map(p => (
              <div key={p.id} className="bg-white rounded-xl border p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold">{p.name}</p>
                    {p.batchIds.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {p.batchIds.map(id => batches.find(b => b.id === id)?.name).filter(Boolean).join(', ')}
                      </p>
                    )}
                  </div>
                  <button onClick={() => removePlan(p.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.cycles.map((c, i) => (
                    <span key={i} className="text-xs bg-secondary px-2 py-1 rounded-md font-medium">{c.label}: ₹{c.price}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trial Session */}
        <section className="bg-white p-4 rounded-xl border space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Trial Session</p>
              <p className="text-xs text-muted-foreground">Offer a session before commitment</p>
            </div>
            <div
              onClick={() => setTrialSession({ ...trialSession, enabled: !trialSession.enabled })}
              className={cn("w-12 h-6 rounded-full p-1 cursor-pointer transition-colors shrink-0", trialSession.enabled ? 'bg-primary' : 'bg-muted-foreground')}
            >
              <div className={cn("w-4 h-4 rounded-full bg-white transition-transform", trialSession.enabled ? 'translate-x-6' : 'translate-x-0')} />
            </div>
          </div>
          {trialSession.enabled && (
            <div className="pt-3 border-t flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Trial Price (₹0 = free)</span>
              <input
                type="number"
                value={trialSession.price}
                onChange={e => setTrialSession({ ...trialSession, price: Number(e.target.value) })}
                className="w-24 h-9 px-3 rounded-lg border text-right text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          )}
        </section>

        {/* Add-ons */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-semibold">Add-on Charges</h3>
            <button onClick={() => setIsAddOnSheetOpen(true)} className="text-sm text-primary font-medium flex items-center gap-1">
              <Plus size={16} /> Add
            </button>
          </div>
          <div className="bg-white rounded-xl border divide-y">
            {addOns.length === 0 && (
              <p className="p-4 text-sm text-muted-foreground text-center">No add-ons yet</p>
            )}
            {addOns.map((a: any) => (
              <div key={a.id} className="p-3 flex items-center justify-between">
                <span className="text-sm font-medium">{a.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm">₹{a.price}</span>
                  <button onClick={() => removeAddOn(a.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button
          onClick={handleSave}
          className="w-full h-14 rounded-xl font-bold text-lg bg-primary text-primary-foreground active:scale-[0.98] transition-all"
        >
          Save Setup
        </button>
      </div>

      {savedToast && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-32 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-2 rounded-full text-sm font-medium shadow-lg z-20"
        >
          Setup saved
        </motion.div>
      )}

      {/* Batch Sheet */}
      <BottomSheet isOpen={isBatchSheetOpen} onClose={() => setIsBatchSheetOpen(false)} title="Add Batch">
        <div className="space-y-4">
          <input type="text" placeholder="Batch name (e.g. Beginner Yoga)" value={batchDraft.name} onChange={e => setBatchDraft({ ...batchDraft, name: e.target.value })} className="w-full h-12 px-4 rounded-lg border outline-none focus:ring-2 focus:ring-primary/20" />

          <div>
            <label className="text-sm font-medium mb-2 block">Days</label>
            <div className="flex flex-wrap gap-2">
              {DAYS.map(day => (
                <button
                  key={day}
                  onClick={() => toggleDraftDay(day)}
                  className={cn("px-3 py-1.5 rounded-full text-sm font-medium border", batchDraft.days.includes(day) ? "bg-primary text-primary-foreground border-primary" : "bg-white text-foreground")}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input type="text" placeholder="Time (e.g. 06:00 AM)" value={batchDraft.time} onChange={e => setBatchDraft({ ...batchDraft, time: e.target.value })} className="h-12 px-4 rounded-lg border outline-none focus:ring-2 focus:ring-primary/20" />
            <input type="number" placeholder="Capacity" value={batchDraft.capacity || ''} onChange={e => setBatchDraft({ ...batchDraft, capacity: Number(e.target.value) })} className="h-12 px-4 rounded-lg border outline-none focus:ring-2 focus:ring-primary/20" />
          </div>

          <input type="text" placeholder="Instructor/Trainer" value={batchDraft.instructor} onChange={e => setBatchDraft({ ...batchDraft, instructor: e.target.value })} className="w-full h-12 px-4 rounded-lg border outline-none focus:ring-2 focus:ring-primary/20" />

          <div>
            <label className="text-sm font-medium mb-2 block">Batch Mode</label>
            <div className="flex bg-muted p-1 rounded-xl">
              {(['Offline', 'Online', 'Hybrid'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setBatchDraft({ ...batchDraft, mode: m })}
                  className={cn("flex-1 py-2 text-sm font-medium rounded-lg", batchDraft.mode === m ? "bg-white shadow-sm text-foreground" : "text-muted-foreground")}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {(batchDraft.mode === 'Online' || batchDraft.mode === 'Hybrid') && (
            <input type="text" placeholder="Meeting link (optional)" value={batchDraft.meetingLink} onChange={e => setBatchDraft({ ...batchDraft, meetingLink: e.target.value })} className="w-full h-12 px-4 rounded-lg border outline-none focus:ring-2 focus:ring-primary/20" />
          )}

          {roomsEnabled && (batchDraft.mode === 'Offline' || batchDraft.mode === 'Hybrid') && (
            <div>
              <label className="text-sm font-medium mb-2 block">Room</label>
              <div className="flex flex-wrap gap-2">
                {rooms.map(r => (
                  <button key={r} onClick={() => setBatchDraft({ ...batchDraft, room: r })} className={cn("px-3 py-1.5 rounded-full text-sm font-medium border", batchDraft.room === r ? "bg-primary text-primary-foreground border-primary" : "bg-white text-foreground")}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button onClick={saveBatch} className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-bold active:scale-[0.98] transition-all">
            Save Batch
          </button>
        </div>
      </BottomSheet>

      {/* Fee Plan Sheet */}
      <BottomSheet isOpen={isPlanSheetOpen} onClose={() => setIsPlanSheetOpen(false)} title="Add Fee Plan">
        <div className="space-y-4">
          <input type="text" placeholder="Plan name (e.g. Beginner Yoga)" value={planDraft.name} onChange={e => setPlanDraft({ ...planDraft, name: e.target.value })} className="w-full h-12 px-4 rounded-lg border outline-none focus:ring-2 focus:ring-primary/20" />

          {batches.length > 0 && (
            <div>
              <label className="text-sm font-medium mb-2 block">Linked Batches</label>
              <div className="flex flex-wrap gap-2">
                {batches.map(b => (
                  <button key={b.id} onClick={() => toggleDraftBatch(b.id)} className={cn("px-3 py-1.5 rounded-full text-sm font-medium border", planDraft.batchIds.includes(b.id) ? "bg-primary text-primary-foreground border-primary" : "bg-white text-foreground")}>
                    {b.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Billing Cycles</label>
              <button onClick={addDraftCycle} className="text-sm text-primary font-medium flex items-center gap-1"><Plus size={14} /> Cycle</button>
            </div>
            <div className="space-y-2">
              {planDraft.cycles.map((c, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <select value={c.label} onChange={e => updateDraftCycle(i, 'label', e.target.value)} className="h-11 px-2 rounded-lg border text-sm flex-1 outline-none">
                    {CYCLE_PRESETS.map(cp => <option key={cp} value={cp}>{cp}</option>)}
                  </select>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
                    <input type="number" value={c.price || ''} onChange={e => updateDraftCycle(i, 'price', Number(e.target.value))} className="w-full h-11 pl-7 pr-2 rounded-lg border text-sm outline-none" placeholder="Price" />
                  </div>
                  {planDraft.cycles.length > 1 && (
                    <button onClick={() => removeDraftCycle(i)} className="p-2 text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button onClick={savePlan} className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-bold active:scale-[0.98] transition-all">
            Save Plan
          </button>
        </div>
      </BottomSheet>

      {/* Operating Hours Sheet */}
      <BottomSheet isOpen={isHoursSheetOpen} onClose={() => setIsHoursSheetOpen(false)} title="Add Operating Hours">
        <div className="space-y-4">
          <input type="text" placeholder="Days (e.g. Mon–Sat)" value={hoursDraft.days} onChange={e => setHoursDraft({ ...hoursDraft, days: e.target.value })} className="w-full h-12 px-4 rounded-lg border outline-none focus:ring-2 focus:ring-primary/20" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">From</label>
              <input type="time" value={hoursDraft.from} onChange={e => setHoursDraft({ ...hoursDraft, from: e.target.value })} className="w-full h-12 px-4 rounded-lg border outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">To</label>
              <input type="time" value={hoursDraft.to} onChange={e => setHoursDraft({ ...hoursDraft, to: e.target.value })} className="w-full h-12 px-4 rounded-lg border outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>
          <button onClick={saveHours} className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-bold active:scale-[0.98] transition-all">
            Add
          </button>
        </div>
      </BottomSheet>

      {/* Room Sheet */}
      <BottomSheet isOpen={isRoomSheetOpen} onClose={() => setIsRoomSheetOpen(false)} title="Add Room / Hall">
        <div className="space-y-4">
          <input type="text" placeholder="Room name (e.g. Studio C)" value={roomDraft} onChange={e => setRoomDraft(e.target.value)} className="w-full h-12 px-4 rounded-lg border outline-none focus:ring-2 focus:ring-primary/20" />
          <button onClick={saveRoom} className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-bold active:scale-[0.98] transition-all">
            Add Room
          </button>
        </div>
      </BottomSheet>

      {/* Add-on Sheet */}
      <BottomSheet isOpen={isAddOnSheetOpen} onClose={() => setIsAddOnSheetOpen(false)} title="Add Charge">
        <div className="space-y-4">
          <input type="text" placeholder="Name (e.g. Locker)" value={addOnDraft.name} onChange={e => setAddOnDraft({ ...addOnDraft, name: e.target.value })} className="w-full h-12 px-4 rounded-lg border outline-none focus:ring-2 focus:ring-primary/20" />
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
            <input type="number" placeholder="Price" value={addOnDraft.price} onChange={e => setAddOnDraft({ ...addOnDraft, price: e.target.value })} className="w-full h-12 pl-7 pr-4 rounded-lg border outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <button onClick={saveAddOn} className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-bold active:scale-[0.98] transition-all">
            Add
          </button>
        </div>
      </BottomSheet>
    </div>
  );
}
