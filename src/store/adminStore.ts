// Admin store using localStorage for persistence

export interface AdminSettings {
  siteName: string;
  siteTagline: string;
  primaryColor: string;
  // Ad settings
  adsenseEnabled: boolean;
  adsensePublisherId: string;
  adsenseSlotHeader: string;
  adsenseSlotSidebar: string;
  adsenseSlotFooter: string;
  adsenseSlotInContent: string;
  adsterraEnabled: boolean;
  adsterraScriptHeader: string;
  adsterraScriptSidebar: string;
  adsterraScriptFooter: string;
  adsterraScriptInContent: string;
  adsTxtContent: string;
  // Tool settings - PDF
  maxFileSizeMB: number;
  enableMerge: boolean;
  enableSplit: boolean;
  enableCompress: boolean;
  enableExtract: boolean;
  enableRotate: boolean;
  enableDeletePages: boolean;
  enablePdfToImage: boolean;
  enableImageToPdf: boolean;
  enableWatermark: boolean;
  enableProtect: boolean;
  enableUnlock: boolean;
  enableMetadata: boolean;
  // Tool settings - QR & Barcode
  enableQrGenerator: boolean;
  enableQrScanner: boolean;
  enableBarcodeGenerator: boolean;
  // Tool settings - Calculators
  enableEbayCalculator: boolean;
  enableLoanCalculator: boolean;
  enableBmiCalculator: boolean;
  enablePercentageCalculator: boolean;
  enableAgeCalculator: boolean;
  enableUnitConverter: boolean;
  // Tool settings - Text
  enableWordCounter: boolean;
  enableCaseConverter: boolean;
  enableLoremGenerator: boolean;
  enableBase64: boolean;
  // Tool settings - Developer
  enableJsonFormatter: boolean;
  enableHashGenerator: boolean;
  // Tool settings - Utilities
  enableColorPicker: boolean;
  enablePasswordGenerator: boolean;
  enableTimezoneConverter: boolean;
  // Tool settings - Image
  enableImageCompressor: boolean;
  // Tool settings - AI
  enableAiImageGenerator: boolean;
  // Tool settings - Business
  enableInvoiceGenerator: boolean;
  // Desktop App
  desktopAppEnabled: boolean;
  desktopAppWindowsUrl: string;
  desktopAppMacUrl: string;
  desktopAppLinuxUrl: string;
  // Admin auth
  adminPassword: string;
}

const DEFAULT_SETTINGS: AdminSettings = {
  siteName: '8002 Tools',
  siteTagline: 'PDF Lover + 50+ Free Online Tools — AI Image Generator, QR Codes, Calculators & More!',
  primaryColor: '#6366f1',
  adsenseEnabled: false,
  adsensePublisherId: '',
  adsenseSlotHeader: '',
  adsenseSlotSidebar: '',
  adsenseSlotFooter: '',
  adsenseSlotInContent: '',
  adsterraEnabled: false,
  adsterraScriptHeader: '',
  adsterraScriptSidebar: '',
  adsterraScriptFooter: '',
  adsterraScriptInContent: '',
  adsTxtContent: '',
  maxFileSizeMB: 50,
  // PDF Tools
  enableMerge: true,
  enableSplit: true,
  enableCompress: true,
  enableExtract: true,
  enableRotate: true,
  enableDeletePages: true,
  enablePdfToImage: true,
  enableImageToPdf: true,
  enableWatermark: true,
  enableProtect: true,
  enableUnlock: true,
  enableMetadata: true,
  // QR & Barcode
  enableQrGenerator: true,
  enableQrScanner: true,
  enableBarcodeGenerator: true,
  // Calculators
  enableEbayCalculator: true,
  enableLoanCalculator: true,
  enableBmiCalculator: true,
  enablePercentageCalculator: true,
  enableAgeCalculator: true,
  enableUnitConverter: true,
  // Text
  enableWordCounter: true,
  enableCaseConverter: true,
  enableLoremGenerator: true,
  enableBase64: true,
  // Developer
  enableJsonFormatter: true,
  enableHashGenerator: true,
  // Utilities
  enableColorPicker: true,
  enablePasswordGenerator: true,
  enableTimezoneConverter: true,
  // Image
  enableImageCompressor: true,
  // AI
  enableAiImageGenerator: true,
  // Business
  enableInvoiceGenerator: true,
  // Desktop
  desktopAppEnabled: true,
  desktopAppWindowsUrl: '',
  desktopAppMacUrl: '',
  desktopAppLinuxUrl: '',
  adminPassword: 'admin123',
};

const STORAGE_KEY = 'tools8002_admin_settings';

export function getSettings(): AdminSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error('Failed to load settings', e);
  }
  return { ...DEFAULT_SETTINGS };
}

export function saveSettings(settings: AdminSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings', e);
  }
}

export function isLoggedIn(): boolean {
  return sessionStorage.getItem('tools8002_admin_logged') === 'true';
}

export function loginAdmin(password: string): boolean {
  const settings = getSettings();
  if (password === settings.adminPassword) {
    sessionStorage.setItem('tools8002_admin_logged', 'true');
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  sessionStorage.removeItem('tools8002_admin_logged');
}
