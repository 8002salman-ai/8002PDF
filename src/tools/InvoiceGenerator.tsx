import { useState } from 'react';
import { FileText, Plus, Trash2, Printer } from 'lucide-react';
import AdBanner from '../components/AdBanner';

interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export default function InvoiceGenerator() {
  const [company, setCompany] = useState({ name: '', address: '', email: '', phone: '' });
  const [client, setClient] = useState({ name: '', address: '', email: '' });
  const [invoiceNumber, setInvoiceNumber] = useState('INV-001');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');
  const [items, setItems] = useState<InvoiceItem[]>([{ description: '', quantity: 1, price: 0 }]);
  const [taxRate, setTaxRate] = useState(0);
  const [notes, setNotes] = useState('');
  const [currency, setCurrency] = useState('$');

  const addItem = () => setItems([...items, { description: '', quantity: 1, price: 0 }]);
  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));
  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  const printInvoice = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice ${invoiceNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
          .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
          .company { font-size: 24px; font-weight: bold; }
          .invoice-title { font-size: 32px; color: #333; }
          .info-row { display: flex; justify-content: space-between; margin-bottom: 30px; }
          .info-box { width: 45%; }
          .info-box h3 { margin: 0 0 10px; font-size: 14px; color: #666; }
          table { width: 100%; border-collapse: collapse; margin: 30px 0; }
          th { background: #f5f5f5; padding: 12px; text-align: left; border-bottom: 2px solid #ddd; }
          td { padding: 12px; border-bottom: 1px solid #eee; }
          .totals { text-align: right; margin-top: 20px; }
          .totals div { margin: 8px 0; }
          .total { font-size: 24px; font-weight: bold; color: #333; }
          .notes { margin-top: 40px; padding: 20px; background: #f9f9f9; border-radius: 8px; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company">${company.name || 'Your Company'}</div>
          <div class="invoice-title">INVOICE</div>
        </div>
        <div class="info-row">
          <div class="info-box">
            <h3>FROM</h3>
            <div>${company.name}</div>
            <div>${company.address}</div>
            <div>${company.email}</div>
            <div>${company.phone}</div>
          </div>
          <div class="info-box">
            <h3>BILL TO</h3>
            <div>${client.name}</div>
            <div>${client.address}</div>
            <div>${client.email}</div>
          </div>
        </div>
        <div class="info-row">
          <div><strong>Invoice #:</strong> ${invoiceNumber}</div>
          <div><strong>Date:</strong> ${invoiceDate}</div>
          <div><strong>Due:</strong> ${dueDate || 'On Receipt'}</div>
        </div>
        <table>
          <thead>
            <tr><th>Description</th><th>Qty</th><th>Price</th><th>Amount</th></tr>
          </thead>
          <tbody>
            ${items.map(item => `
              <tr>
                <td>${item.description}</td>
                <td>${item.quantity}</td>
                <td>${currency}${item.price.toFixed(2)}</td>
                <td>${currency}${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="totals">
          <div><strong>Subtotal:</strong> ${currency}${subtotal.toFixed(2)}</div>
          ${taxRate > 0 ? `<div><strong>Tax (${taxRate}%):</strong> ${currency}${tax.toFixed(2)}</div>` : ''}
          <div class="total"><strong>Total:</strong> ${currency}${total.toFixed(2)}</div>
        </div>
        ${notes ? `<div class="notes"><strong>Notes:</strong><br/>${notes}</div>` : ''}
        <script>window.print();</script>
      </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-blue-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Invoice Generator</h1>
        <p className="text-gray-500">Create professional invoices for free</p>
      </div>

      <AdBanner slot="header" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left - Form */}
        <div className="space-y-6">
          {/* Your Company */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-3">
            <h3 className="font-semibold text-gray-800">Your Company</h3>
            <input placeholder="Company Name" value={company.name} onChange={(e) => setCompany({ ...company, name: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            <input placeholder="Address" value={company.address} onChange={(e) => setCompany({ ...company, address: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            <div className="grid grid-cols-2 gap-2">
              <input placeholder="Email" value={company.email} onChange={(e) => setCompany({ ...company, email: e.target.value })} className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <input placeholder="Phone" value={company.phone} onChange={(e) => setCompany({ ...company, phone: e.target.value })} className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>

          {/* Client */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-3">
            <h3 className="font-semibold text-gray-800">Bill To</h3>
            <input placeholder="Client Name" value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            <input placeholder="Address" value={client.address} onChange={(e) => setClient({ ...client, address: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            <input placeholder="Email" value={client.email} onChange={(e) => setClient({ ...client, email: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
          </div>

          {/* Invoice Details */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-3">
            <h3 className="font-semibold text-gray-800">Invoice Details</h3>
            <div className="grid grid-cols-3 gap-2">
              <input placeholder="Invoice #" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <input type="date" placeholder="Due Date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
                <option value="$">$ USD</option>
                <option value="€">€ EUR</option>
                <option value="£">£ GBP</option>
                <option value="₹">₹ INR</option>
                <option value="Rs">Rs PKR</option>
              </select>
              <input type="number" placeholder="Tax %" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>

          {/* Items */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-3">
            <h3 className="font-semibold text-gray-800">Items</h3>
            {items.map((item, i) => (
              <div key={i} className="flex gap-2">
                <input placeholder="Description" value={item.description} onChange={(e) => updateItem(i, 'description', e.target.value)} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                <input type="number" placeholder="Qty" value={item.quantity} onChange={(e) => updateItem(i, 'quantity', Number(e.target.value))} className="w-16 border border-gray-200 rounded-lg px-3 py-2 text-sm text-center" />
                <input type="number" placeholder="Price" value={item.price} onChange={(e) => updateItem(i, 'price', Number(e.target.value))} className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                {items.length > 1 && (
                  <button onClick={() => removeItem(i)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                )}
              </div>
            ))}
            <button onClick={addItem} className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-700">
              <Plus className="w-4 h-4" /> Add Item
            </button>
          </div>

          {/* Notes */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h3 className="font-semibold text-gray-800 mb-2">Notes</h3>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Payment terms, thank you message..." rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none" />
          </div>
        </div>

        {/* Right - Preview */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 sticky top-24 h-fit">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">{company.name || 'Your Company'}</h3>
            <span className="text-2xl font-bold text-gray-400">INVOICE</span>
          </div>

          <div className="text-sm text-gray-500 space-y-1 mb-6">
            <p><strong>Invoice #:</strong> {invoiceNumber}</p>
            <p><strong>Date:</strong> {invoiceDate}</p>
            {dueDate && <p><strong>Due:</strong> {dueDate}</p>}
          </div>

          <div className="border-t pt-4 mb-6">
            <p className="text-xs text-gray-400 mb-1">BILL TO</p>
            <p className="font-medium">{client.name || 'Client Name'}</p>
            <p className="text-sm text-gray-500">{client.address}</p>
          </div>

          <table className="w-full text-sm mb-6">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Item</th>
                <th className="text-center py-2">Qty</th>
                <th className="text-right py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-2">{item.description || '-'}</td>
                  <td className="text-center py-2">{item.quantity}</td>
                  <td className="text-right py-2">{currency}{(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right space-y-1 mb-6">
            <p className="text-sm"><span className="text-gray-500">Subtotal:</span> {currency}{subtotal.toFixed(2)}</p>
            {taxRate > 0 && <p className="text-sm"><span className="text-gray-500">Tax ({taxRate}%):</span> {currency}{tax.toFixed(2)}</p>}
            <p className="text-xl font-bold"><span className="text-gray-500">Total:</span> {currency}{total.toFixed(2)}</p>
          </div>

          <button
            onClick={printInvoice}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            <Printer className="w-5 h-5" />
            Print / Download PDF
          </button>
        </div>
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
