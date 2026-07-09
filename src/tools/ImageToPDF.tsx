import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import { imagesToPdf, downloadBlob } from '../utils/pdfTools';
import { ImagePlus, Download, Loader2 } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function ImageToPDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleFiles = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
    setDone(false);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleConvert = async () => {
    if (files.length === 0) return;
    setLoading(true);
    try {
      const result = await imagesToPdf(files);
      downloadBlob(result, 'images_to_pdf.pdf');
      setDone(true);
    } catch (err) {
      alert('Error: ' + (err as Error).message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ImagePlus className="w-8 h-8 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Images to PDF</h1>
        <p className="text-gray-500">Convert JPG, PNG images to a single PDF document</p>
      </div>

      <AdBanner slot="header" />

      <FileUpload
        onFiles={handleFiles}
        accept="image/*"
        multiple={true}
        label="Upload Images"
        description="Drop JPG, PNG images here"
        files={files}
        onRemoveFile={removeFile}
      />

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleConvert}
          disabled={files.length === 0 || loading}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : done ? <Download className="w-5 h-5" /> : <ImagePlus className="w-5 h-5" />}
          {loading ? 'Converting...' : done ? 'Download Again' : 'Convert to PDF'}
        </button>
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
