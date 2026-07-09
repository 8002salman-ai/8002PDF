import { useState, useEffect } from 'react';
import {
  Settings,
  Megaphone,
  Wrench,
  LogOut,
  Save,
  Check,
  Home,
  Shield,
  FileText,
  Monitor,
} from 'lucide-react';
import { getSettings, saveSettings, logoutAdmin, type AdminSettings } from '../store/adminStore';

interface AdminPanelProps {
  onLogout: () => void;
  onGoHome: () => void;
}

type TabType = 'general' | 'pdf-tools' | 'other-tools' | 'ads' | 'desktop' | 'security';

export default function AdminPanel({ onLogout, onGoHome }: AdminPanelProps) {
  const [settings, setSettings] = useState<AdminSettings>(getSettings());
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  const handleSave = () => {
    saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateSetting = <K extends keyof AdminSettings>(key: K, value: AdminSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleLogout = () => {
    logoutAdmin();
    onLogout();
  };

  const tabs: { id: TabType; label: string; icon: typeof Settings }[] = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'pdf-tools', label: 'PDF Tools', icon: FileText },
    { id: 'other-tools', label: 'Other Tools', icon: Wrench },
    { id: 'ads', label: 'Ads & Monetization', icon: Megaphone },
    { id: 'desktop', label: 'Desktop App', icon: Monitor },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-gray-800">8002 Tools</span>
              <span className="text-xs text-indigo-600 ml-2 bg-indigo-50 px-2 py-0.5 rounded-full font-medium">Admin</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onGoHome} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">View Site</span>
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-2 lg:sticky lg:top-24">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeTab === tab.id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
              {activeTab === 'general' && <GeneralSettings settings={settings} updateSetting={updateSetting} />}
              {activeTab === 'pdf-tools' && <PDFToolSettings settings={settings} updateSetting={updateSetting} />}
              {activeTab === 'other-tools' && <OtherToolSettings settings={settings} updateSetting={updateSetting} />}
              {activeTab === 'ads' && <AdsSettings settings={settings} updateSetting={updateSetting} />}
              {activeTab === 'desktop' && <DesktopSettings settings={settings} updateSetting={updateSetting} />}
              {activeTab === 'security' && <SecuritySettings settings={settings} updateSetting={updateSetting} />}

              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-4">
                <button
                  onClick={handleSave}
                  className={`flex items-center gap-2 font-semibold px-6 py-3 rounded-xl transition-all ${
                    saved ? 'bg-green-500 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {saved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                  {saved ? 'Saved!' : 'Save Settings'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GeneralSettings({ settings, updateSetting }: { settings: AdminSettings; updateSetting: <K extends keyof AdminSettings>(key: K, value: AdminSettings[K]) => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">General Settings</h2>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
          <input type="text" value={settings.siteName} onChange={(e) => updateSetting('siteName', e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Site Tagline</label>
          <input type="text" value={settings.siteTagline} onChange={(e) => updateSetting('siteTagline', e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Max Upload File Size (MB)</label>
          <input type="number" value={settings.maxFileSizeMB} onChange={(e) => updateSetting('maxFileSizeMB', Number(e.target.value))}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" min="1" max="500" />
        </div>
      </div>
    </div>
  );
}

function PDFToolSettings({ settings, updateSetting }: { settings: AdminSettings; updateSetting: <K extends keyof AdminSettings>(key: K, value: AdminSettings[K]) => void }) {
  const tools: { key: keyof AdminSettings; label: string; desc: string }[] = [
    { key: 'enableMerge', label: 'Merge PDF', desc: 'Combine multiple PDFs into one' },
    { key: 'enableSplit', label: 'Split PDF', desc: 'Split PDF into multiple files' },
    { key: 'enableCompress', label: 'Compress PDF', desc: 'Reduce PDF file size' },
    { key: 'enableExtract', label: 'Extract Pages', desc: 'Extract specific pages' },
    { key: 'enableRotate', label: 'Rotate PDF', desc: 'Rotate PDF pages' },
    { key: 'enableDeletePages', label: 'Delete Pages', desc: 'Remove pages from PDF' },
    { key: 'enablePdfToImage', label: 'PDF to Image', desc: 'Convert PDF to JPG/PNG' },
    { key: 'enableImageToPdf', label: 'Image to PDF', desc: 'Convert images to PDF' },
    { key: 'enableWatermark', label: 'Watermark', desc: 'Add watermark to PDF' },
    { key: 'enableProtect', label: 'Protect PDF', desc: 'Add password protection' },
    { key: 'enableMetadata', label: 'Edit Metadata', desc: 'Edit PDF metadata fields' },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">PDF Tool Settings</h2>
      <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6">
        <p className="text-sm text-green-700">✅ All PDF tools use <strong>pdf-lib</strong> — Free, open-source, no API key needed!</p>
      </div>
      <div className="space-y-3">
        {tools.map((tool) => (
          <ToggleItem key={tool.key} label={tool.label} desc={tool.desc} enabled={settings[tool.key] as boolean}
            onChange={() => updateSetting(tool.key, !(settings[tool.key] as boolean))} />
        ))}
      </div>
    </div>
  );
}

function OtherToolSettings({ settings, updateSetting }: { settings: AdminSettings; updateSetting: <K extends keyof AdminSettings>(key: K, value: AdminSettings[K]) => void }) {
  const tools: { key: keyof AdminSettings; label: string; desc: string }[] = [
    { key: 'enableQrGenerator', label: 'QR Code Generator', desc: 'Create QR codes' },
    { key: 'enableQrScanner', label: 'QR Code Scanner', desc: 'Scan QR codes' },
    { key: 'enableBarcodeGenerator', label: 'Barcode Generator', desc: 'Create barcodes' },
    { key: 'enableEbayCalculator', label: 'eBay Calculator', desc: 'Calculate eBay fees & profit' },
    { key: 'enablePasswordGenerator', label: 'Password Generator', desc: 'Generate secure passwords' },
    { key: 'enableColorPicker', label: 'Color Picker', desc: 'Pick colors & get codes' },
    { key: 'enableWordCounter', label: 'Word Counter', desc: 'Count words & characters' },
    { key: 'enableCaseConverter', label: 'Case Converter', desc: 'Convert text case' },
    { key: 'enableLoremGenerator', label: 'Lorem Ipsum Generator', desc: 'Generate placeholder text' },
    { key: 'enableBase64', label: 'Base64 Encoder', desc: 'Encode/decode Base64' },
    { key: 'enableAgeCalculator', label: 'Age Calculator', desc: 'Calculate exact age' },
    { key: 'enableUnitConverter', label: 'Unit Converter', desc: 'Convert units' },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Other Tools Settings</h2>
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
        <p className="text-sm text-blue-700">🛠️ Utility tools — All FREE, all client-side, no API needed!</p>
      </div>
      <div className="space-y-3">
        {tools.map((tool) => (
          <ToggleItem key={tool.key} label={tool.label} desc={tool.desc} enabled={settings[tool.key] as boolean}
            onChange={() => updateSetting(tool.key, !(settings[tool.key] as boolean))} />
        ))}
      </div>
    </div>
  );
}

function AdsSettings({ settings, updateSetting }: { settings: AdminSettings; updateSetting: <K extends keyof AdminSettings>(key: K, value: AdminSettings[K]) => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Ads & Monetization 💰</h2>
      <p className="text-sm text-gray-400 mb-6">Configure ad networks to earn money from your tools site</p>

      {/* Ads.txt */}
      <div className="mb-8 bg-gray-50 border border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">📄 Ads.txt Content</h3>
        <p className="text-xs text-gray-400 mb-3">Paste your ads.txt content. Host at yourdomain.com/ads.txt</p>
        <textarea value={settings.adsTxtContent} onChange={(e) => updateSetting('adsTxtContent', e.target.value)} rows={6}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
          placeholder={`google.com, pub-XXXXX, DIRECT\nad.plus, XXXXX, DIRECT`} />
      </div>

      {/* AdSense */}
      <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Google AdSense</h3>
            <p className="text-xs text-gray-400">Display Google ads</p>
          </div>
          <Toggle enabled={settings.adsenseEnabled} onChange={() => updateSetting('adsenseEnabled', !settings.adsenseEnabled)} />
        </div>
        {settings.adsenseEnabled && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Publisher ID</label>
              <input type="text" value={settings.adsensePublisherId} onChange={(e) => updateSetting('adsensePublisherId', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white" placeholder="ca-pub-XXXXX" />
            </div>
            {(['adsenseSlotHeader', 'adsenseSlotSidebar', 'adsenseSlotInContent', 'adsenseSlotFooter'] as const).map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{key.replace('adsenseSlot', '')} Slot ID</label>
                <input type="text" value={settings[key]} onChange={(e) => updateSetting(key, e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white" placeholder="1234567890" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Adsterra */}
      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Adsterra</h3>
            <p className="text-xs text-gray-400">Display Adsterra ads</p>
          </div>
          <Toggle enabled={settings.adsterraEnabled} onChange={() => updateSetting('adsterraEnabled', !settings.adsterraEnabled)} />
        </div>
        {settings.adsterraEnabled && (
          <div className="space-y-4">
            <div className="bg-purple-100 border border-purple-200 rounded-lg p-3">
              <p className="text-xs text-purple-700">📋 Paste full ad script from Adsterra dashboard</p>
            </div>
            {(['adsterraScriptHeader', 'adsterraScriptSidebar', 'adsterraScriptInContent', 'adsterraScriptFooter'] as const).map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{key.replace('adsterraScript', '')} Banner</label>
                <textarea value={settings[key]} onChange={(e) => updateSetting(key, e.target.value)} rows={3}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-mono bg-white"
                  placeholder="<script>...</script>" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DesktopSettings({ settings, updateSetting }: { settings: AdminSettings; updateSetting: <K extends keyof AdminSettings>(key: K, value: AdminSettings[K]) => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Desktop App Settings</h2>
      <p className="text-sm text-gray-400 mb-6">Configure download links for desktop application</p>

      <div className="flex items-center justify-between mb-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
        <div>
          <p className="font-medium text-gray-700">Show Desktop App Section</p>
          <p className="text-xs text-gray-400">Display download section on homepage</p>
        </div>
        <Toggle enabled={settings.desktopAppEnabled} onChange={() => updateSetting('desktopAppEnabled', !settings.desktopAppEnabled)} />
      </div>

      {settings.desktopAppEnabled && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Windows Download URL</label>
            <input type="url" value={settings.desktopAppWindowsUrl} onChange={(e) => updateSetting('desktopAppWindowsUrl', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" placeholder="https://example.com/app-windows.exe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mac Download URL</label>
            <input type="url" value={settings.desktopAppMacUrl} onChange={(e) => updateSetting('desktopAppMacUrl', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" placeholder="https://example.com/app-mac.dmg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Linux Download URL</label>
            <input type="url" value={settings.desktopAppLinuxUrl} onChange={(e) => updateSetting('desktopAppLinuxUrl', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" placeholder="https://example.com/app-linux.AppImage" />
          </div>
        </div>
      )}
    </div>
  );
}

function SecuritySettings({ settings, updateSetting }: { settings: AdminSettings; updateSetting: <K extends keyof AdminSettings>(key: K, value: AdminSettings[K]) => void }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Security Settings</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Admin Password</label>
        <div className="relative">
          <input type={show ? 'text' : 'password'} value={settings.adminPassword} onChange={(e) => updateSetting('adminPassword', e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm pr-16" />
          <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-indigo-500 font-medium">
            {show ? 'Hide' : 'Show'}
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-1">Default: admin123</p>
      </div>
    </div>
  );
}

function ToggleItem({ label, desc, enabled, onChange }: { label: string; desc: string; enabled: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
      <div>
        <p className="text-sm font-medium text-gray-700">{label}</p>
        <p className="text-xs text-gray-400">{desc}</p>
      </div>
      <Toggle enabled={enabled} onChange={onChange} />
    </div>
  );
}

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className={`relative w-12 h-7 rounded-full transition-colors ${enabled ? 'bg-green-500' : 'bg-gray-300'}`}>
      <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${enabled ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
    </button>
  );
}
