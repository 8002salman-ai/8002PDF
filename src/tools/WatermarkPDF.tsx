import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import { addWatermark, downloadBlob } from '../utils/pdfTools';
import { Droplets, Download, Loader2 } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function WatermarkPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('CONFIDENTIAL');
  const [fontSize, setFontSize] = useState(50);
  const [opacity, setOpacity] = useState(0.3);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleFiles = (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFile(newFiles[0]);
      setDone(false);
    }
  };

  const handleWatermark = async () => {
    if (!file || !text) return;
    setLoading(true);
    try {
      const result = await addWatermark(file, text, fontSize, opacity);
      downloadBlob(result, `watermarked_${file.name}`);
      setDone(true);
    } catch (err) {
      alert('Error: ' + (err as Error).message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Droplets className="w-8 h-8 text-blue-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Watermark PDF</h1>
        <p className="text-gray-500">Add text watermark to all pages</p>
      </div>

      <AdBanner slot="header" />

      <FileUpload
        onFiles={handleFiles}
        label="Upload PDF"
        files={file ? [file] : []}
        onRemoveFile={() => { setFile(null); setDone(false); }}
      />

      {file && (
        <div className="mt-6 bg-white border border-gray-100 rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Watermark Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => { setText(e.target.value); setDone(false); }}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="e.g. CONFIDENTIAL"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Font Size: {fontSize}</label>
              <input
                type="range"
                min="10"
                max="120"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Opacity: {(opacity * 100).toFixed(0)}%</label>
              <input
                type="range"
                min="5"
                max="100"
                value={opacity * 100}
                onChange={(e) => setOpacity(Number(e.target.value) / 100)}
                className="w-full accent-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleWatermark}
          disabled={!file || !text || loading}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : done ? <Download className="w-5 h-5" /> : <Droplets className="w-5 h-5" />}
          {loading ? 'Adding watermark...' : done ? 'Download Again' : 'Add Watermark'}
        </button>
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
