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

// PDF Tool pages
import MergePDF from './tools/MergePDF';
import SplitPDF from './tools/SplitPDF';
import CompressPDF from './tools/CompressPDF';
import ExtractPages from './tools/ExtractPages';
import DeletePagesTool from './tools/DeletePages';
import RotatePDF from './tools/RotatePDF';
import WatermarkPDF from './tools/WatermarkPDF';
import ImageToPDF from './tools/ImageToPDF';
import PDFToImage from './tools/PDFToImage';
import MetadataPDF from './tools/MetadataPDF';
import ProtectPDF from './tools/ProtectPDF';

// QR & Barcode
import QRGenerator from './tools/QRGenerator';
import QRScanner from './tools/QRScanner';
import BarcodeGenerator from './tools/BarcodeGenerator';

// Calculators
import EbayCalculator from './tools/EbayCalculator';
import LoanCalculator from './tools/LoanCalculator';
import BMICalculator from './tools/BMICalculator';
import PercentageCalculator from './tools/PercentageCalculator';
import AgeCalculator from './tools/AgeCalculator';
import UnitConverter from './tools/UnitConverter';

// Text Tools
import WordCounter from './tools/WordCounter';
import CaseConverter from './tools/CaseConverter';
import LoremGenerator from './tools/LoremGenerator';
import Base64Tool from './tools/Base64Tool';

// Developer Tools
import JsonFormatter from './tools/JsonFormatter';
import HashGenerator from './tools/HashGenerator';

// Utilities
import PasswordGenerator from './tools/PasswordGenerator';
import ColorPicker from './tools/ColorPicker';
import TimezoneConverter from './tools/TimezoneConverter';

// Image Tools
import ImageCompressor from './tools/ImageCompressor';

// AI Tools
import AIImageGenerator from './tools/AIImageGenerator';

// Business Tools
import InvoiceGenerator from './tools/InvoiceGenerator';

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
  }, [currentPage]);

  // Admin page
  if (currentPage === 'admin') {
    if (!adminLoggedIn) {
      return <AdminLogin onLogin={() => setAdminLoggedIn(true)} />;
    }
    return <AdminPanel onLogout={() => setAdminLoggedIn(false)} onGoHome={() => navigate('home')} />;
  }

  // All tool pages mapping
  const toolPages: Record<string, React.ReactNode> = {
    // PDF Tools
    merge: settings.enableMerge && <MergePDF />,
    split: settings.enableSplit && <SplitPDF />,
    compress: settings.enableCompress && <CompressPDF />,
    extract: settings.enableExtract && <ExtractPages />,
    'delete-pages': settings.enableDeletePages && <DeletePagesTool />,
    rotate: settings.enableRotate && <RotatePDF />,
    watermark: settings.enableWatermark && <WatermarkPDF />,
    'image-to-pdf': settings.enableImageToPdf && <ImageToPDF />,
    'pdf-to-image': settings.enablePdfToImage && <PDFToImage />,
    metadata: settings.enableMetadata && <MetadataPDF />,
    protect: settings.enableProtect && <ProtectPDF />,
    // QR & Barcode
    'qr-generator': settings.enableQrGenerator && <QRGenerator />,
    'qr-scanner': settings.enableQrScanner && <QRScanner />,
    'barcode-generator': settings.enableBarcodeGenerator && <BarcodeGenerator />,
    // Calculators
    'ebay-calculator': settings.enableEbayCalculator && <EbayCalculator />,
    'loan-calculator': settings.enableLoanCalculator && <LoanCalculator />,
    'bmi-calculator': settings.enableBmiCalculator && <BMICalculator />,
    'percentage-calculator': settings.enablePercentageCalculator && <PercentageCalculator />,
    'age-calculator': settings.enableAgeCalculator && <AgeCalculator />,
    'unit-converter': settings.enableUnitConverter && <UnitConverter />,
    // Text Tools
    'word-counter': settings.enableWordCounter && <WordCounter />,
    'case-converter': settings.enableCaseConverter && <CaseConverter />,
    'lorem-generator': settings.enableLoremGenerator && <LoremGenerator />,
    'base64': settings.enableBase64 && <Base64Tool />,
    // Developer Tools
    'json-formatter': settings.enableJsonFormatter && <JsonFormatter />,
    'hash-generator': settings.enableHashGenerator && <HashGenerator />,
    // Utilities
    'password-generator': settings.enablePasswordGenerator && <PasswordGenerator />,
    'color-picker': settings.enableColorPicker && <ColorPicker />,
    'timezone-converter': settings.enableTimezoneConverter && <TimezoneConverter />,
    // Image
    'image-compressor': settings.enableImageCompressor && <ImageCompressor />,
    // AI
    'ai-image-generator': settings.enableAiImageGenerator && <AIImageGenerator />,
    // Business
    'invoice-generator': settings.enableInvoiceGenerator && <InvoiceGenerator />,
  };

  const isToolPage = currentPage !== 'home' && toolPages[currentPage];

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
          {toolPages[currentPage]}
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
