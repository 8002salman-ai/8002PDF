import { Suspense, lazy } from 'react';

// Lazy load all tools with route-level code splitting
// Each tool loads only when navigated to
export const lazyTools = {
  // PDF Tools
  merge: lazy(() => import('../tools/MergePDF')),
  split: lazy(() => import('../tools/SplitPDF')),
  compress: lazy(() => import('../tools/CompressPDF')),
  extract: lazy(() => import('../tools/ExtractPages')),
  'delete-pages': lazy(() => import('../tools/DeletePages')),
  rotate: lazy(() => import('../tools/RotatePDF')),
  watermark: lazy(() => import('../tools/WatermarkPDF')),
  'image-to-pdf': lazy(() => import('../tools/ImageToPDF')),
  'pdf-to-image': lazy(() => import('../tools/PDFToImage')),
  metadata: lazy(() => import('../tools/MetadataPDF')),
  protect: lazy(() => import('../tools/ProtectPDF')),

  // QR & Barcode
  'qr-generator': lazy(() => import('../tools/QRGenerator')),
  'qr-scanner': lazy(() => import('../tools/QRScanner')),
  'barcode-generator': lazy(() => import('../tools/BarcodeGenerator')),

  // Calculators
  'ebay-calculator': lazy(() => import('../tools/EbayCalculator')),
  'loan-calculator': lazy(() => import('../tools/LoanCalculator')),
  'bmi-calculator': lazy(() => import('../tools/BMICalculator')),
  'percentage-calculator': lazy(() => import('../tools/PercentageCalculator')),
  'age-calculator': lazy(() => import('../tools/AgeCalculator')),
  'unit-converter': lazy(() => import('../tools/UnitConverter')),

  // Text Tools
  'word-counter': lazy(() => import('../tools/WordCounter')),
  'case-converter': lazy(() => import('../tools/CaseConverter')),
  'lorem-generator': lazy(() => import('../tools/LoremGenerator')),
  'base64': lazy(() => import('../tools/Base64Tool')),

  // Developer Tools
  'json-formatter': lazy(() => import('../tools/JsonFormatter')),
  'hash-generator': lazy(() => import('../tools/HashGenerator')),

  // Utilities
  'password-generator': lazy(() => import('../tools/PasswordGenerator')),
  'color-picker': lazy(() => import('../tools/ColorPicker')),
  'timezone-converter': lazy(() => import('../tools/TimezoneConverter')),

  // Image Tools
  'image-compressor': lazy(() => import('../tools/ImageCompressor')),

  // AI Tools
  'ai-image-generator': lazy(() => import('../tools/AIImageGenerator')),

  // Business Tools
  'invoice-generator': lazy(() => import('../tools/InvoiceGenerator')),
};

// Loading fallback component (minimal to reduce initial load)
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  );
}

// Wrapper to provide Suspense boundary for each lazy tool
export function getLazyTool(toolName: string) {
  const LazyComponent = lazyTools[toolName as keyof typeof lazyTools];
  if (!LazyComponent) return null;

  return (
    <Suspense fallback={<LoadingFallback />}>
      <LazyComponent />
    </Suspense>
  );
}
