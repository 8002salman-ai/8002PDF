import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import { rotatePages, downloadBlob } from '../utils/pdfTools';
import { RotateCw, Download, Loader2 } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function RotatePDF() {
  const [file, setFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState(90);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleFiles = (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFile(newFiles[0]);
      setDone(false);
    }
  };

  const handleRotate = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const result = await rotatePages(file, rotation);
      downloadBlob(result, `rotated_${file.name}`);
      setDone(true);
    } catch (err) {
      alert('Error: ' + (err as Error).message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <RotateCw className="w-8 h-8 text-cyan-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Rotate PDF</h1>
        <p className="text-gray-500">Rotate all pages of your PDF</p>
      </div>

      <AdBanner slot="header" />

      <FileUpload
        onFiles={handleFiles}
        label="Upload PDF"
        files={file ? [file] : []}
        onRemoveFile={() => { setFile(null); setDone(false); }}
      />

      {file && (
        <div className="mt-6 bg-white border border-gray-100 rounded-xl p-6">
          <p className="text-sm font-medium text-gray-700 mb-3">Rotation angle:</p>
          <div className="flex gap-3">
            {[90, 180, 270].map((deg) => (
              <button
                key={deg}
                onClick={() => { setRotation(deg); setDone(false); }}
                className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                  rotation === deg
                    ? 'bg-cyan-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-cyan-100'
                }`}
              >
                {deg}°
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleRotate}
          disabled={!file || loading}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-300 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : done ? <Download className="w-5 h-5" /> : <RotateCw className="w-5 h-5" />}
          {loading ? 'Rotating...' : done ? 'Download Again' : 'Rotate PDF'}
        </button>
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
