import { useState, useRef, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { ScanLine, Camera, Upload, Copy, Check, ExternalLink } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function QRScanner() {
  const [result, setResult] = useState('');
  const [scanning, setScanning] = useState(false);
  const [copied, setCopied] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop();
      }
    };
  }, []);

  const startScanning = async () => {
    try {
      const scanner = new Html5Qrcode('qr-reader');
      scannerRef.current = scanner;
      setScanning(true);

      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          setResult(decodedText);
          stopScanning();
        },
        () => {}
      );
    } catch (err) {
      alert('Camera access denied or not available');
      setScanning(false);
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current?.isScanning) {
      await scannerRef.current.stop();
    }
    setScanning(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const scanner = new Html5Qrcode('qr-reader-file');
      const decodedText = await scanner.scanFile(file, true);
      setResult(decodedText);
      scanner.clear();
    } catch {
      alert('No QR code found in the image');
    }
  };

  const copyResult = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isUrl = result.startsWith('http://') || result.startsWith('https://');

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ScanLine className="w-8 h-8 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">QR Code Scanner</h1>
        <p className="text-gray-500">Scan QR codes from camera or uploaded images</p>
      </div>

      <AdBanner slot="header" />

      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        {/* Scanner Area */}
        <div className="mb-6">
          <div 
            id="qr-reader" 
            className={`mx-auto rounded-xl overflow-hidden ${scanning ? 'block' : 'hidden'}`}
            style={{ maxWidth: '400px' }}
          />
          <div id="qr-reader-file" className="hidden" />
          
          {!scanning && !result && (
            <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              <ScanLine className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500 text-center mb-4">
                Use camera or upload an image to scan QR code
              </p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {!scanning ? (
            <button
              onClick={startScanning}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-xl transition-colors"
            >
              <Camera className="w-5 h-5" />
              Start Camera
            </button>
          ) : (
            <button
              onClick={stopScanning}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-3 rounded-xl transition-colors"
            >
              Stop Camera
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-3 rounded-xl transition-colors"
          >
            <Upload className="w-5 h-5" />
            Upload Image
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="bg-green-50 border border-green-100 rounded-xl p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Scanned Result:</p>
            <div className="bg-white rounded-lg p-3 border border-green-200 mb-3 break-all">
              <p className="text-sm text-gray-800">{result}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={copyResult}
                className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors text-sm"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              {isUrl && (
                <a
                  href={result}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Link
                </a>
              )}
              <button
                onClick={() => setResult('')}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Scan Another
              </button>
            </div>
          </div>
        )}
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
