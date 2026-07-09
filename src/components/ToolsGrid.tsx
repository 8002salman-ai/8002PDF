import {
  Minimize2, Trash2, Merge, Scissors, RotateCw, ImagePlus, FileDown, ArrowRight,
  Droplets, Lock, Tags, Image, QrCode, ScanLine, Barcode, Calculator, Key, Palette,
  FileText, Type, AlignLeft, Binary, Calendar, Ruler, Wallet, Heart, Percent,
  Braces, Hash, Globe, Wand2,
} from 'lucide-react';
import { getSettings } from '../store/adminStore';
import AdBanner from './AdBanner';

interface ToolsGridProps {
  onNavigate: (page: string) => void;
}

const allTools = [
  // ===== PDF Tools =====
  { id: 'merge', settingKey: 'enableMerge', icon: Merge, name: 'Merge PDF', desc: 'Combine multiple PDFs', category: 'PDF', color: 'purple' },
  { id: 'split', settingKey: 'enableSplit', icon: Scissors, name: 'Split PDF', desc: 'Split by page ranges', category: 'PDF', color: 'orange' },
  { id: 'compress', settingKey: 'enableCompress', icon: Minimize2, name: 'Compress PDF', desc: 'Reduce file size', category: 'PDF', color: 'emerald' },
  { id: 'extract', settingKey: 'enableExtract', icon: FileDown, name: 'Extract Pages', desc: 'Extract specific pages', category: 'PDF', color: 'amber' },
  { id: 'delete-pages', settingKey: 'enableDeletePages', icon: Trash2, name: 'Delete Pages', desc: 'Remove pages', category: 'PDF', color: 'red' },
  { id: 'rotate', settingKey: 'enableRotate', icon: RotateCw, name: 'Rotate PDF', desc: 'Rotate pages', category: 'PDF', color: 'cyan' },
  { id: 'watermark', settingKey: 'enableWatermark', icon: Droplets, name: 'Watermark', desc: 'Add text watermark', category: 'PDF', color: 'blue' },
  { id: 'protect', settingKey: 'enableProtect', icon: Lock, name: 'Protect PDF', desc: 'Password protect', category: 'PDF', color: 'rose' },
  { id: 'image-to-pdf', settingKey: 'enableImageToPdf', icon: ImagePlus, name: 'Image to PDF', desc: 'Convert images', category: 'PDF', color: 'green' },
  { id: 'pdf-to-image', settingKey: 'enablePdfToImage', icon: Image, name: 'PDF to Image', desc: 'Convert to JPG/PNG', category: 'PDF', color: 'pink' },
  { id: 'metadata', settingKey: 'enableMetadata', icon: Tags, name: 'Edit Metadata', desc: 'Edit PDF info', category: 'PDF', color: 'violet' },
  
  // ===== AI Tools =====
  { id: 'ai-image-generator', settingKey: 'enableAiImageGenerator', icon: Wand2, name: 'AI Image Generator', desc: 'Create images from text', category: 'AI', color: 'purple' },
  
  // ===== QR & Barcode =====
  { id: 'qr-generator', settingKey: 'enableQrGenerator', icon: QrCode, name: 'QR Generator', desc: 'Create QR codes', category: 'QR', color: 'indigo' },
  { id: 'qr-scanner', settingKey: 'enableQrScanner', icon: ScanLine, name: 'QR Scanner', desc: 'Scan QR codes', category: 'QR', color: 'green' },
  { id: 'barcode-generator', settingKey: 'enableBarcodeGenerator', icon: Barcode, name: 'Barcode Generator', desc: 'Create barcodes', category: 'QR', color: 'orange' },
  
  // ===== Calculators =====
  { id: 'ebay-calculator', settingKey: 'enableEbayCalculator', icon: Calculator, name: 'eBay Calculator', desc: 'Calculate fees & profit', category: 'Calc', color: 'yellow' },
  { id: 'loan-calculator', settingKey: 'enableLoanCalculator', icon: Wallet, name: 'Loan Calculator', desc: 'Calculate payments', category: 'Calc', color: 'emerald' },
  { id: 'bmi-calculator', settingKey: 'enableBmiCalculator', icon: Heart, name: 'BMI Calculator', desc: 'Calculate body mass', category: 'Calc', color: 'rose' },
  { id: 'percentage-calculator', settingKey: 'enablePercentageCalculator', icon: Percent, name: 'Percentage Calculator', desc: 'Calculate percentages', category: 'Calc', color: 'violet' },
  { id: 'age-calculator', settingKey: 'enableAgeCalculator', icon: Calendar, name: 'Age Calculator', desc: 'Calculate exact age', category: 'Calc', color: 'pink' },
  { id: 'unit-converter', settingKey: 'enableUnitConverter', icon: Ruler, name: 'Unit Converter', desc: 'Convert units', category: 'Calc', color: 'cyan' },
  
  // ===== Text Tools =====
  { id: 'word-counter', settingKey: 'enableWordCounter', icon: FileText, name: 'Word Counter', desc: 'Count words', category: 'Text', color: 'blue' },
  { id: 'case-converter', settingKey: 'enableCaseConverter', icon: Type, name: 'Case Converter', desc: 'Convert text case', category: 'Text', color: 'teal' },
  { id: 'lorem-generator', settingKey: 'enableLoremGenerator', icon: AlignLeft, name: 'Lorem Generator', desc: 'Placeholder text', category: 'Text', color: 'amber' },
  { id: 'base64', settingKey: 'enableBase64', icon: Binary, name: 'Base64 Encoder', desc: 'Encode/decode', category: 'Text', color: 'slate' },
  
  // ===== Developer Tools =====
  { id: 'json-formatter', settingKey: 'enableJsonFormatter', icon: Braces, name: 'JSON Formatter', desc: 'Format & validate JSON', category: 'Dev', color: 'yellow' },
  { id: 'hash-generator', settingKey: 'enableHashGenerator', icon: Hash, name: 'Hash Generator', desc: 'Generate SHA/MD5', category: 'Dev', color: 'cyan' },
  
  // ===== Utilities =====
  { id: 'password-generator', settingKey: 'enablePasswordGenerator', icon: Key, name: 'Password Generator', desc: 'Secure passwords', category: 'Util', color: 'purple' },
  { id: 'color-picker', settingKey: 'enableColorPicker', icon: Palette, name: 'Color Picker', desc: 'Pick colors', category: 'Util', color: 'pink' },
  { id: 'timezone-converter', settingKey: 'enableTimezoneConverter', icon: Globe, name: 'Timezone Converter', desc: 'Convert timezones', category: 'Util', color: 'blue' },
  
  // ===== Image Tools =====
  { id: 'image-compressor', settingKey: 'enableImageCompressor', icon: Image, name: 'Image Compressor', desc: 'Compress images', category: 'Image', color: 'orange' },
  
  // ===== Business Tools =====
  { id: 'invoice-generator', settingKey: 'enableInvoiceGenerator', icon: FileText, name: 'Invoice Generator', desc: 'Create invoices', category: 'Business', color: 'blue' },
];

const colorClasses: Record<string, { bg: string; text: string; light: string }> = {
  purple: { bg: 'bg-purple-500', text: 'text-purple-500', light: 'bg-purple-50' },
  orange: { bg: 'bg-orange-500', text: 'text-orange-500', light: 'bg-orange-50' },
  emerald: { bg: 'bg-emerald-500', text: 'text-emerald-500', light: 'bg-emerald-50' },
  amber: { bg: 'bg-amber-500', text: 'text-amber-500', light: 'bg-amber-50' },
  red: { bg: 'bg-red-500', text: 'text-red-500', light: 'bg-red-50' },
  cyan: { bg: 'bg-cyan-500', text: 'text-cyan-500', light: 'bg-cyan-50' },
  blue: { bg: 'bg-blue-500', text: 'text-blue-500', light: 'bg-blue-50' },
  rose: { bg: 'bg-rose-500', text: 'text-rose-500', light: 'bg-rose-50' },
  green: { bg: 'bg-green-500', text: 'text-green-500', light: 'bg-green-50' },
  pink: { bg: 'bg-pink-500', text: 'text-pink-500', light: 'bg-pink-50' },
  violet: { bg: 'bg-violet-500', text: 'text-violet-500', light: 'bg-violet-50' },
  indigo: { bg: 'bg-indigo-500', text: 'text-indigo-500', light: 'bg-indigo-50' },
  yellow: { bg: 'bg-yellow-500', text: 'text-yellow-600', light: 'bg-yellow-50' },
  teal: { bg: 'bg-teal-500', text: 'text-teal-500', light: 'bg-teal-50' },
  slate: { bg: 'bg-slate-500', text: 'text-slate-500', light: 'bg-slate-50' },
};

export default function ToolsGrid({ onNavigate }: ToolsGridProps) {
  const settings = getSettings();

  const enabledTools = allTools.filter(
    (tool) => settings[tool.settingKey as keyof typeof settings] !== false
  );

  const pdfTools = enabledTools.filter(t => t.category === 'PDF');
  const aiTools = enabledTools.filter(t => t.category === 'AI');
  const qrTools = enabledTools.filter(t => t.category === 'QR');
  const calcTools = enabledTools.filter(t => t.category === 'Calc');
  const textTools = enabledTools.filter(t => t.category === 'Text');
  const devTools = enabledTools.filter(t => t.category === 'Dev');
  const utilTools = enabledTools.filter(t => t.category === 'Util');
  const imageTools = enabledTools.filter(t => t.category === 'Image');
  const businessTools = enabledTools.filter(t => t.category === 'Business');

  const renderToolCard = (tool: typeof allTools[0]) => {
    const Icon = tool.icon;
    const colors = colorClasses[tool.color] || colorClasses.purple;
    return (
      <button
        key={tool.id}
        onClick={() => onNavigate(tool.id)}
        className="group relative flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-gray-200 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-left"
      >
        <div className={`flex-shrink-0 w-12 h-12 ${colors.light} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon className={`w-6 h-6 ${colors.text}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
            {tool.name}
            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </h3>
          <p className="text-sm text-gray-500 mt-1">{tool.desc}</p>
        </div>
      </button>
    );
  };

  const renderSection = (title: string, badge: string, badgeColor: string, tools: typeof allTools, showAd?: boolean) => {
    if (tools.length === 0) return null;
    return (
      <>
        <div className="text-center mb-10 mt-16 first:mt-0">
          <span className={`inline-block ${badgeColor} text-xs font-semibold px-3 py-1 rounded-full mb-3`}>{badge}</span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tools.map(renderToolCard)}
        </div>
        {showAd && <div className="mt-8"><AdBanner slot="inContent" /></div>}
      </>
    );
  };

  return (
    <section id="tools" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Total Count */}
        <div className="text-center mb-12">
          <p className="text-sm text-gray-400 mb-2">{enabledTools.length} Free Tools Available</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">All Tools in One Place</h2>
        </div>

        {renderSection('PDF Tools', 'PDF Lover ❤️', 'bg-red-100 text-red-600', pdfTools, true)}
        {renderSection('AI Tools', '🤖 FREE AI', 'bg-purple-100 text-purple-600', aiTools)}
        {renderSection('QR & Barcode', '📱 Scan & Generate', 'bg-indigo-100 text-indigo-600', qrTools)}
        {renderSection('Calculators', '🧮 Calculate', 'bg-emerald-100 text-emerald-600', calcTools, true)}
        {renderSection('Text Tools', '📝 Text', 'bg-blue-100 text-blue-600', textTools)}
        {renderSection('Developer Tools', '👨‍💻 Dev', 'bg-yellow-100 text-yellow-700', devTools)}
        {renderSection('Utilities', '🔧 Utilities', 'bg-pink-100 text-pink-600', utilTools)}
        {renderSection('Image Tools', '🖼️ Image', 'bg-orange-100 text-orange-600', imageTools)}
        {renderSection('Business Tools', '💼 Business', 'bg-cyan-100 text-cyan-600', businessTools)}
      </div>
    </section>
  );
}
