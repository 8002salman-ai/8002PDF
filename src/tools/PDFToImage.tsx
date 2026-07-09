import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import { pdfToImages, downloadAsZip } from '../utils/pdfTools';
import { Image, Download, Loader2 } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function PDFToImage() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<'png' | 'jpeg'>('png');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleFiles = (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFile(newFiles[0]);
      setDone(false);
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const images = await pdfToImages(file, format);
      if (images.length === 1) {
        const url = URL.createObjectURL(images[0].blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = images[0].name;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        await downloadAsZip(
          images.map((img) => ({ name: img.name, data: img.blob })),
          `pdf_images.zip`
        );
      }
      setDone(true);
    } catch (err) {
      alert('Error: ' + (err as Error).message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Image className="w-8 h-8 text-pink-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">PDF to Image</h1>
        <p className="text-gray-500">Convert PDF pages to JPG or PNG images</p>
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
          <p className="text-sm font-medium text-gray-700 mb-3">Output format:</p>
          <div className="flex gap-3">
            {(['png', 'jpeg'] as const).map((f) => (
              <button
                key={f}
                onClick={() => { setFormat(f); setDone(false); }}
                className={`flex-1 py-3 rounded-lg text-sm font-medium uppercase transition-all ${
                  format === f
                    ? 'bg-pink-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-pink-100'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleConvert}
          disabled={!file || loading}
          className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : done ? <Download className="w-5 h-5" /> : <Image className="w-5 h-5" />}
          {loading ? 'Converting...' : done ? 'Download Again' : 'Convert to Images'}
        </button>
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
