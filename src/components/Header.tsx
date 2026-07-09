import { useState } from 'react';
import { Menu, X, ChevronDown, Wrench } from 'lucide-react';
import { getSettings } from '../store/adminStore';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const settings = getSettings();

  const navItems = [
    {
      label: 'PDF Tools',
      tools: [
        { id: 'merge', name: 'Merge PDF', enabled: settings.enableMerge },
        { id: 'split', name: 'Split PDF', enabled: settings.enableSplit },
        { id: 'compress', name: 'Compress PDF', enabled: settings.enableCompress },
        { id: 'extract', name: 'Extract Pages', enabled: settings.enableExtract },
        { id: 'delete-pages', name: 'Delete Pages', enabled: settings.enableDeletePages },
        { id: 'rotate', name: 'Rotate PDF', enabled: settings.enableRotate },
        { id: 'watermark', name: 'Watermark', enabled: settings.enableWatermark },
        { id: 'protect', name: 'Protect PDF', enabled: settings.enableProtect },
        { id: 'image-to-pdf', name: 'Image to PDF', enabled: settings.enableImageToPdf },
        { id: 'pdf-to-image', name: 'PDF to Image', enabled: settings.enablePdfToImage },
        { id: 'metadata', name: 'Edit Metadata', enabled: settings.enableMetadata },
      ].filter(t => t.enabled),
    },
    {
      label: 'QR & Barcode',
      tools: [
        { id: 'qr-generator', name: 'QR Generator', enabled: settings.enableQrGenerator },
        { id: 'qr-scanner', name: 'QR Scanner', enabled: settings.enableQrScanner },
        { id: 'barcode-generator', name: 'Barcode Generator', enabled: settings.enableBarcodeGenerator },
      ].filter(t => t.enabled),
    },
    {
      label: 'Calculators',
      tools: [
        { id: 'ebay-calculator', name: 'eBay Calculator', enabled: settings.enableEbayCalculator },
        { id: 'age-calculator', name: 'Age Calculator', enabled: settings.enableAgeCalculator },
        { id: 'unit-converter', name: 'Unit Converter', enabled: settings.enableUnitConverter },
      ].filter(t => t.enabled),
    },
    {
      label: 'Text Tools',
      tools: [
        { id: 'word-counter', name: 'Word Counter', enabled: settings.enableWordCounter },
        { id: 'case-converter', name: 'Case Converter', enabled: settings.enableCaseConverter },
        { id: 'lorem-generator', name: 'Lorem Generator', enabled: settings.enableLoremGenerator },
        { id: 'base64', name: 'Base64 Encoder', enabled: settings.enableBase64 },
      ].filter(t => t.enabled),
    },
    {
      label: 'Utilities',
      tools: [
        { id: 'password-generator', name: 'Password Generator', enabled: settings.enablePasswordGenerator },
        { id: 'color-picker', name: 'Color Picker', enabled: settings.enableColorPicker },
      ].filter(t => t.enabled),
    },
  ].filter(cat => cat.tools.length > 0);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-800 leading-tight">{settings.siteName}</span>
              <span className="text-[10px] text-pink-500 font-medium -mt-0.5">PDF Lover ❤️</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors rounded-lg hover:bg-gray-50">
                  {item.label}
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    {item.tools.map((tool) => (
                      <button
                        key={tool.id}
                        onClick={() => { onNavigate(tool.id); setOpenDropdown(null); }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      >
                        {tool.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => onNavigate('admin')}
              className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded transition-colors"
            >
              Admin
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="text-sm font-medium px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 transition-opacity"
            >
              All Tools
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.label}>
                <button
                  className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                >
                  {item.label}
                  <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === item.label && (
                  <div className="ml-3 mt-1 space-y-1">
                    {item.tools.map((tool) => (
                      <button
                        key={tool.id}
                        onClick={() => { onNavigate(tool.id); setMobileMenuOpen(false); }}
                        className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                      >
                        {tool.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-gray-100">
              <button onClick={() => { onNavigate('admin'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 text-sm text-gray-500 hover:text-gray-700 rounded-lg">
                Admin Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
