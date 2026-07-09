import { useState, useRef, useEffect } from 'react';
import JsBarcode from 'jsbarcode';
import { Barcode, Download } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const BARCODE_FORMATS = [
  { value: 'CODE128', label: 'CODE 128 (General)' },
  { value: 'EAN13', label: 'EAN-13 (Products)' },
  { value: 'EAN8', label: 'EAN-8 (Small Products)' },
  { value: 'UPC', label: 'UPC-A (US Products)' },
  { value: 'CODE39', label: 'CODE 39 (Industrial)' },
  { value: 'ITF14', label: 'ITF-14 (Shipping)' },
  { value: 'MSI', label: 'MSI (Inventory)' },
  { value: 'pharmacode', label: 'Pharmacode (Pharma)' },
];

export default function BarcodeGenerator() {
  const [text, setText] = useState('1234567890128');
  const [format, setFormat] = useState('CODE128');
  const [width, setWidth] = useState(2);
  const [height, setHeight] = useState(100);
  const [showText, setShowText] = useState(true);
  const [error, setError] = useState('');
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    generateBarcode();
  }, [text, format, width, height, showText]);

  const generateBarcode = () => {
    if (!text.trim() || !svgRef.current) return;
    setError('');
    
    try {
      JsBarcode(svgRef.current, text, {
        format,
        width,
        height,
        displayValue: showText,
        fontSize: 16,
        margin: 10,
        background: '#ffffff',
        lineColor: '#000000',
      });
    } catch (err) {
      setError(`Invalid input for ${format} format. Check the data.`);
    }
  };

  const downloadBarcode = (type: 'svg' | 'png') => {
    if (!svgRef.current) return;

    if (type === 'svg') {
      const svgData = new XMLSerializer().serializeToString(svgRef.current);
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'barcode.svg';
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const svgData = new XMLSerializer().serializeToString(svgRef.current);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png');
        a.download = 'barcode.png';
        a.click();
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Barcode className="w-8 h-8 text-orange-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Barcode Generator</h1>
        <p className="text-gray-500">Create barcodes for products, inventory & shipping</p>
      </div>

      <AdBanner slot="header" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Side */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Barcode Data</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              placeholder="Enter numbers or text..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Barcode Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              {BARCODE_FORMATS.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Line Width: {width}</label>
              <input
                type="range"
                min="1"
                max="5"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Height: {height}px</label>
              <input
                type="range"
                min="50"
                max="200"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showText"
              checked={showText}
              onChange={(e) => setShowText(e.target.checked)}
              className="w-4 h-4 accent-orange-500"
            />
            <label htmlFor="showText" className="text-sm text-gray-700">Show text below barcode</label>
          </div>
        </div>

        {/* Output Side */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center">
          {error ? (
            <div className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          ) : null}
          
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <svg ref={svgRef} />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => downloadBarcode('png')}
              disabled={!text.trim() || !!error}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-medium px-5 py-2.5 rounded-xl transition-colors"
            >
              <Download className="w-4 h-4" />
              PNG
            </button>
            <button
              onClick={() => downloadBarcode('svg')}
              disabled={!text.trim() || !!error}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-100 text-gray-700 font-medium px-5 py-2.5 rounded-xl transition-colors"
            >
              <Download className="w-4 h-4" />
              SVG
            </button>
          </div>
        </div>
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
