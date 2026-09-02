import { useState } from 'react';
import { Plus, Trash2, FileText, ChevronDown, Check, Building2 } from 'lucide-react';
import { TopBar } from '@/components/TopBar';
import { BottomSheet } from '@/components/BottomSheet';
import { useAppContext } from '@/context/AppContext';
import { MOCK_DATA } from '@/data/mockData';

export default function BillGenerator() {
  const { activeBusiness } = useAppContext();

  const defaultBusiness = MOCK_DATA.businesses.find(b => b.id === activeBusiness) || MOCK_DATA.businesses[0];
  const [selectedBusiness, setSelectedBusiness] = useState(defaultBusiness);
  const [isBusinessPickerOpen, setIsBusinessPickerOpen] = useState(false);

  const [docType, setDocType] = useState('Invoice');
  const [customerType, setCustomerType] = useState('Individual');
  const [customer, setCustomer] = useState({ name: '', phone: '', company: '', gstin: '' });
  const [items, setItems] = useState([{ desc: '', qty: 1, rate: 0 }]);
  const [note, setNote] = useState('');
  const [gstEnabled, setGstEnabled] = useState(false);
  const [gstRate, setGstRate] = useState(18);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const addItem = () => setItems([...items, { desc: '', qty: 1, rate: 0 }]);
  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));
  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const subtotal = items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
  const gstAmount = gstEnabled ? (subtotal * gstRate) / 100 : 0;
  const grandTotal = subtotal + gstAmount;

  return (
    <div className="min-h-screen bg-background pb-44">
      <TopBar title="Bill Generator" showBack />

      <div className="p-4 space-y-5">
        {/* Issuing From chip */}
        <button
          onClick={() => setIsBusinessPickerOpen(true)}
          className="w-full flex items-center justify-between bg-white border rounded-xl px-4 py-3 shadow-sm hover:bg-muted/40 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 size={16} className="text-primary" />
            </div>
            <div className="text-left">
              <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider leading-none mb-0.5">Issuing from</p>
              <p className="font-semibold text-foreground text-sm">{selectedBusiness.name}</p>
            </div>
          </div>
          <ChevronDown size={16} className="text-muted-foreground" />
        </button>

        {/* Doc Type */}
        <div className="flex bg-muted p-1 rounded-xl">
          {['Quotation', 'Invoice'].map(t => (
            <button
              key={t}
              onClick={() => setDocType(t)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg ${docType === t ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Customer */}
        <div className="bg-white p-4 rounded-xl border space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Billed To</h3>
            <div className="flex gap-2">
              {['Individual', 'Company'].map(t => (
                <button
                  key={t}
                  onClick={() => setCustomerType(t)}
                  className={`px-3 py-1 rounded-md text-xs font-medium ${customerType === t ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {customerType === 'Individual' ? (
            <div className="space-y-3">
              <input type="text" placeholder="Full Name" className="w-full h-12 px-4 rounded-lg border focus:ring-2 focus:ring-primary/20 outline-none" value={customer.name} onChange={e => setCustomer({ ...customer, name: e.target.value })} />
              <input type="tel" placeholder="Phone Number" className="w-full h-12 px-4 rounded-lg border focus:ring-2 focus:ring-primary/20 outline-none" value={customer.phone} onChange={e => setCustomer({ ...customer, phone: e.target.value })} />
            </div>
          ) : (
            <div className="space-y-3">
              <input type="text" placeholder="Company Name" className="w-full h-12 px-4 rounded-lg border focus:ring-2 focus:ring-primary/20 outline-none" value={customer.company} onChange={e => setCustomer({ ...customer, company: e.target.value })} />
              <input type="text" placeholder="GSTIN (Optional)" className="w-full h-12 px-4 rounded-lg border focus:ring-2 focus:ring-primary/20 outline-none" value={customer.gstin} onChange={e => setCustomer({ ...customer, gstin: e.target.value })} />
            </div>
          )}
        </div>

        {/* Items */}
        <div className="space-y-3">
          <h3 className="font-semibold px-1">Items</h3>
          {items.map((item, i) => (
            <div key={i} className="bg-white p-3 rounded-xl border flex gap-3">
              <div className="flex-1 space-y-3">
                <input type="text" placeholder="Item description" className="w-full h-10 px-3 rounded-lg border focus:ring-2 focus:ring-primary/20 outline-none text-sm" value={item.desc} onChange={e => updateItem(i, 'desc', e.target.value)} />
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input type="number" placeholder="Qty" className="w-full h-10 px-3 rounded-lg border focus:ring-2 focus:ring-primary/20 outline-none text-sm" value={item.qty || ''} onChange={e => updateItem(i, 'qty', Number(e.target.value))} />
                  </div>
                  <div className="flex-[2]">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
                      <input type="number" placeholder="Rate" className="w-full h-10 pl-7 pr-3 rounded-lg border focus:ring-2 focus:ring-primary/20 outline-none text-sm" value={item.rate || ''} onChange={e => updateItem(i, 'rate', Number(e.target.value))} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between items-end w-16">
                {items.length > 1 ? (
                  <button onClick={() => removeItem(i)} className="p-1 text-muted-foreground hover:text-destructive"><Trash2 size={18} /></button>
                ) : <div />}
                <span className="font-semibold text-sm">₹{item.qty * item.rate}</span>
              </div>
            </div>
          ))}
          <button onClick={addItem} className="w-full py-3 rounded-xl border-2 border-dashed text-primary font-medium flex items-center justify-center gap-2 hover:bg-primary/5">
            <Plus size={18} /> Add Item
          </button>
        </div>

        {/* Extras */}
        <div className="bg-white p-4 rounded-xl border space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm">Enable GST</span>
            <div
              onClick={() => setGstEnabled(!gstEnabled)}
              className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${gstEnabled ? 'bg-primary' : 'bg-muted-foreground'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${gstEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
          </div>
          {gstEnabled && (
            <div className="pt-2 border-t flex items-center justify-between">
              <span className="text-sm text-muted-foreground">GST Rate</span>
              <select className="bg-secondary rounded-md px-2 py-1 text-sm border-none outline-none" value={gstRate} onChange={e => setGstRate(Number(e.target.value))}>
                <option value={5}>5%</option>
                <option value={12}>12%</option>
                <option value={18}>18%</option>
                <option value={28}>28%</option>
              </select>
            </div>
          )}
        </div>

        <input type="text" placeholder="Note (e.g. Terms & conditions)" className="w-full h-12 px-4 rounded-xl border bg-white focus:ring-2 focus:ring-primary/20 outline-none" value={note} onChange={e => setNote(e.target.value)} />

        {/* Summary */}
        <div className="bg-foreground text-background p-5 rounded-xl space-y-3">
          <div className="flex justify-between text-sm opacity-80">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          {gstEnabled && (
            <div className="flex justify-between text-sm opacity-80">
              <span>GST ({gstRate}%)</span>
              <span>₹{gstAmount}</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-3 border-t border-white/20">
            <span className="font-medium">Grand Total</span>
            <span className="text-2xl font-bold font-display tabular-nums">₹{grandTotal}</span>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t flex gap-3 z-10">
        <button onClick={() => setIsPreviewOpen(true)} className="flex-1 h-14 rounded-xl font-bold text-lg bg-secondary text-foreground active:scale-95 transition-all flex items-center justify-center gap-2">
          <FileText size={20} /> Preview
        </button>
        <button className="flex-1 h-14 rounded-xl font-bold text-lg bg-primary text-primary-foreground active:scale-[0.98] transition-all">
          Create
        </button>
      </div>

      {/* Business Picker */}
      <BottomSheet isOpen={isBusinessPickerOpen} onClose={() => setIsBusinessPickerOpen(false)} title="Select Business">
        <div className="space-y-2">
          {MOCK_DATA.businesses.map(biz => (
            <button
              key={biz.id}
              onClick={() => { setSelectedBusiness(biz); setIsBusinessPickerOpen(false); }}
              className="w-full flex items-center justify-between p-4 rounded-xl border bg-white hover:bg-muted/40 transition-colors"
            >
              <div className="text-left">
                <p className="font-semibold text-foreground">{biz.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{biz.type} · {biz.address}</p>
              </div>
              {selectedBusiness.id === biz.id && (
                <Check size={18} className="text-primary shrink-0 ml-3" />
              )}
            </button>
          ))}
        </div>
      </BottomSheet>

      {/* Document Preview */}
      <BottomSheet isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} title="Document Preview">
        <div className="bg-white border rounded-lg p-5 shadow-sm min-h-[400px]">
          <div className="flex justify-between border-b pb-4 mb-4">
            <div>
              <h2 className="font-bold text-lg font-display uppercase tracking-widest text-primary">{docType}</h2>
              <p className="text-xs text-muted-foreground mt-1">#INV-2024-001</p>
              <p className="text-xs text-muted-foreground">Date: {new Date().toLocaleDateString('en-IN')}</p>
            </div>
            <div className="text-right max-w-[160px]">
              <h3 className="font-bold font-display">{selectedBusiness.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{selectedBusiness.address}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{selectedBusiness.phone}</p>
              {selectedBusiness.gstin && (
                <p className="text-xs text-muted-foreground mt-0.5">GSTIN: {selectedBusiness.gstin}</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Billed To</p>
            <p className="font-semibold text-sm">{customerType === 'Company' ? customer.company : customer.name || 'Customer Name'}</p>
            {(customer.phone || customer.gstin) && (
              <p className="text-xs mt-1 text-muted-foreground">{customer.phone}{customer.gstin ? ` · GSTIN: ${customer.gstin}` : ''}</p>
            )}
          </div>

          <table className="w-full text-sm mb-6">
            <thead>
              <tr className="border-b border-t text-left">
                <th className="py-2 font-medium text-muted-foreground">Description</th>
                <th className="py-2 font-medium text-muted-foreground text-right w-12">Qty</th>
                <th className="py-2 font-medium text-muted-foreground text-right w-20">Rate</th>
                <th className="py-2 font-medium text-muted-foreground text-right w-20">Amt</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i} className="border-b border-dashed">
                  <td className="py-2">{item.desc || 'Item'}</td>
                  <td className="py-2 text-right">{item.qty}</td>
                  <td className="py-2 text-right">₹{item.rate}</td>
                  <td className="py-2 text-right font-medium">₹{item.qty * item.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mb-6">
            <div className="w-48 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              {gstEnabled && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST ({gstRate}%)</span>
                  <span>₹{gstAmount}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-base pt-2 border-t">
                <span>Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>
          </div>

          {note && (
            <div className="pt-4 border-t text-xs text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Note:</p>
              <p>{note}</p>
            </div>
          )}
        </div>

        <button className="w-full h-14 mt-4 bg-primary text-primary-foreground font-bold text-lg rounded-xl active:scale-[0.98] transition-transform">
          Share on WhatsApp
        </button>
      </BottomSheet>
    </div>
  );
}
