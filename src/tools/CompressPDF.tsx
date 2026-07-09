import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import { compressPDF, downloadBlob } from '../utils/pdfTools';
import { Minimize2, Download, Loader2 } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function CompressPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ original: number; compressed: number } | null>(null);

  const handleFiles = (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFile(newFiles[0]);
      setResult(null);
    }
  };

  const handleCompress = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const data = await compressPDF(file);
      setResult({ original: file.size, compressed: data.length });
      downloadBlob(data, `compressed_${file.name}`);
    } catch (err) {
      alert('Error compressing PDF: ' + (err as Error).message);
    }
    setLoading(false);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Minimize2 className="w-8 h-8 text-emerald-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Compress PDF</h1>
        <p className="text-gray-500">Reduce PDF file size by re-optimizing the document</p>
      </div>

      <AdBanner slot="header" />

      <FileUpload
        onFiles={handleFiles}
        label="Upload PDF to compress"
        files={file ? [file] : []}
        onRemoveFile={() => { setFile(null); setResult(null); }}
      />

      {result && (
        <div className="mt-6 bg-emerald-50 border border-emerald-100 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-600">
            Original: <span className="font-bold">{formatSize(result.original)}</span>
            {' → '}
            Compressed: <span className="font-bold text-emerald-600">{formatSize(result.compressed)}</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Saved: {((1 - result.compressed / result.original) * 100).toFixed(1)}%
          </p>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleCompress}
          disabled={!file || loading}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : result ? <Download className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
          {loading ? 'Compressing...' : result ? 'Compress Again' : 'Compress PDF'}
        </button>
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
