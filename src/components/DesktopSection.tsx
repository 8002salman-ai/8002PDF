import { Monitor, Apple, Download } from 'lucide-react';
import { getSettings } from '../store/adminStore';

export default function DesktopSection() {
  const settings = getSettings();

  const hasDownloads = settings.desktopAppWindowsUrl || settings.desktopAppMacUrl || settings.desktopAppLinuxUrl;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Download Desktop App
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Get {settings.siteName} on your desktop. Work offline with your PDFs. 
            No internet required, maximum privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Windows */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors">
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Windows</h3>
            <p className="text-sm text-gray-400 mb-4">Windows 10/11</p>
            {settings.desktopAppWindowsUrl ? (
              <a
                href={settings.desktopAppWindowsUrl}
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2.5 rounded-xl transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 bg-gray-600 text-gray-300 font-medium px-5 py-2.5 rounded-xl cursor-not-allowed">
                Coming Soon
              </span>
            )}
          </div>

          {/* Mac */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors">
            <div className="w-16 h-16 bg-gray-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Apple className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">macOS</h3>
            <p className="text-sm text-gray-400 mb-4">macOS 11+</p>
            {settings.desktopAppMacUrl ? (
              <a
                href={settings.desktopAppMacUrl}
                className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-500 text-white font-medium px-5 py-2.5 rounded-xl transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 bg-gray-600 text-gray-300 font-medium px-5 py-2.5 rounded-xl cursor-not-allowed">
                Coming Soon
              </span>
            )}
          </div>

          {/* Linux */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors">
            <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Monitor className="w-8 h-8 text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Linux</h3>
            <p className="text-sm text-gray-400 mb-4">Ubuntu, Fedora, etc.</p>
            {settings.desktopAppLinuxUrl ? (
              <a
                href={settings.desktopAppLinuxUrl}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2.5 rounded-xl transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 bg-gray-600 text-gray-300 font-medium px-5 py-2.5 rounded-xl cursor-not-allowed">
                Coming Soon
              </span>
            )}
          </div>
        </div>

        {!hasDownloads && (
          <div className="text-center mt-8 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 max-w-xl mx-auto">
            <p className="text-sm text-yellow-300">
              💡 Add download links in Admin Panel → Desktop App settings
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
