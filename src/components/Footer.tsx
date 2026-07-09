import { Wrench } from 'lucide-react';
import { getSettings } from '../store/adminStore';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const settings = getSettings();

  const pdfLinks = [
    { id: 'merge', name: 'Merge PDF' },
    { id: 'split', name: 'Split PDF' },
    { id: 'compress', name: 'Compress PDF' },
    { id: 'rotate', name: 'Rotate PDF' },
    { id: 'watermark', name: 'Watermark' },
  ];

  const otherLinks = [
    { id: 'qr-generator', name: 'QR Generator' },
    { id: 'barcode-generator', name: 'Barcode Generator' },
    { id: 'ebay-calculator', name: 'eBay Calculator' },
    { id: 'password-generator', name: 'Password Generator' },
    { id: 'color-picker', name: 'Color Picker' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white">{settings.siteName}</span>
                <span className="text-xs text-pink-400">PDF Lover ❤️</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Free online tools for PDFs, QR codes, calculators & more. All client-side, privacy-first.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">PDF Tools</h4>
            <ul className="space-y-2.5">
              {pdfLinks.map((link) => (
                <li key={link.id}>
                  <button onClick={() => onNavigate(link.id)} className="text-sm hover:text-indigo-400 transition-colors">
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Other Tools</h4>
            <ul className="space-y-2.5">
              {otherLinks.map((link) => (
                <li key={link.id}>
                  <button onClick={() => onNavigate(link.id)} className="text-sm hover:text-indigo-400 transition-colors">
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Info</h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => onNavigate('home')} className="text-sm hover:text-indigo-400 transition-colors">Home</button></li>
              <li><a href="#" className="text-sm hover:text-indigo-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="text-sm hover:text-indigo-400 transition-colors">Terms</a></li>
              <li><button onClick={() => onNavigate('admin')} className="text-sm hover:text-indigo-400 transition-colors">Admin</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700/50 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">© 2024 {settings.siteName}. All rights reserved.</p>
          <p className="text-sm">Made with ❤️ — Powered by pdf-lib</p>
        </div>
      </div>
    </footer>
  );
}
