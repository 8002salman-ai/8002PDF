import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ToolsGrid from './components/ToolsGrid';
import Stats from './components/Stats';
import Features from './components/Features';
import CTA from './components/CTA';
import Footer from './components/Footer';
import AdBanner from './components/AdBanner';
import DesktopSection from './components/DesktopSection';
import { updateSEOMeta } from './utils/seoUtils';
import { getLazyTool } from './utils/lazyLoad';

// Admin
import AdminLogin from './admin/AdminLogin';
import AdminPanel from './admin/AdminPanel';
import { isLoggedIn, getSettings } from './store/adminStore';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [adminLoggedIn, setAdminLoggedIn] = useState(isLoggedIn());
  const settings = getSettings();

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setAdminLoggedIn(isLoggedIn());
    updateSEOMeta(currentPage);
  }, [currentPage]);

  // Admin page
  if (currentPage === 'admin') {
    if (!adminLoggedIn) {
      return <AdminLogin onLogin={() => setAdminLoggedIn(true)} />;
    }
    return <AdminPanel onLogout={() => setAdminLoggedIn(false)} onGoHome={() => navigate('home')} />;
  }

  // Tool enablement mapping
  const toolSettings: Record<string, boolean> = {
    merge: settings.enableMerge,
    split: settings.enableSplit,
    compress: settings.enableCompress,
    extract: settings.enableExtract,
    'delete-pages': settings.enableDeletePages,
    rotate: settings.enableRotate,
    watermark: settings.enableWatermark,
    'image-to-pdf': settings.enableImageToPdf,
    'pdf-to-image': settings.enablePdfToImage,
    metadata: settings.enableMetadata,
    protect: settings.enableProtect,
    'qr-generator': settings.enableQrGenerator,
    'qr-scanner': settings.enableQrScanner,
    'barcode-generator': settings.enableBarcodeGenerator,
    'ebay-calculator': settings.enableEbayCalculator,
    'loan-calculator': settings.enableLoanCalculator,
    'bmi-calculator': settings.enableBmiCalculator,
    'percentage-calculator': settings.enablePercentageCalculator,
    'age-calculator': settings.enableAgeCalculator,
    'unit-converter': settings.enableUnitConverter,
    'word-counter': settings.enableWordCounter,
    'case-converter': settings.enableCaseConverter,
    'lorem-generator': settings.enableLoremGenerator,
    'base64': settings.enableBase64,
    'json-formatter': settings.enableJsonFormatter,
    'hash-generator': settings.enableHashGenerator,
    'password-generator': settings.enablePasswordGenerator,
    'color-picker': settings.enableColorPicker,
    'timezone-converter': settings.enableTimezoneConverter,
    'image-compressor': settings.enableImageCompressor,
    'ai-image-generator': settings.enableAiImageGenerator,
    'invoice-generator': settings.enableInvoiceGenerator,
  };

  // Lazy-load tools on demand (code splitting)
  const getToolComponent = (toolName: string) => {
    if (!toolSettings[toolName]) return null;
    return getLazyTool(toolName);
  };

  const toolComponent = getToolComponent(currentPage);
  const isToolPage = currentPage !== 'home' && toolComponent;

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={navigate} currentPage={currentPage} />

      {currentPage === 'home' ? (
        <>
          <Hero onNavigate={navigate} />
          <ToolsGrid onNavigate={navigate} />
          <Stats />
          {settings.desktopAppEnabled && <DesktopSection />}
          <Features />
          <CTA onNavigate={navigate} />
        </>
      ) : isToolPage ? (
        <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-[80vh]">
          <AdBanner slot="header" />
          {toolComponent}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-gray-500">Tool not found or disabled</p>
          <button onClick={() => navigate('home')} className="mt-4 text-indigo-500 hover:underline">Go Home</button>
        </div>
      )}

      <Footer onNavigate={navigate} />
    </div>
  );
}
