import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import { mergePDFs, downloadBlob } from '../utils/pdfTools';
import { Merge, Download, Loader2, ArrowUpDown } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function MergePDF() {
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

  const moveFile = (from: number, to: number) => {
    setFiles((prev) => {
      const arr = [...prev];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return arr;
    });
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setLoading(true);
    try {
      const result = await mergePDFs(files);
      downloadBlob(result, 'merged.pdf');
      setDone(true);
    } catch (err) {
      alert('Error merging PDFs: ' + (err as Error).message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Merge className="w-8 h-8 text-purple-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Merge PDF</h1>
        <p className="text-gray-500">Combine multiple PDF files into one document</p>
      </div>

      <AdBanner slot="header" />

      <FileUpload
        onFiles={handleFiles}
        multiple={true}
        label="Upload PDF files to merge"
        description="Drop multiple PDF files here"
        files={files}
        onRemoveFile={removeFile}
      />

      {files.length > 1 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4" /> Reorder files (click arrows):
          </p>
          {files.map((file, i) => (
            <div key={`order-${i}`} className="flex items-center gap-2">
              <span className="text-xs text-gray-400 w-6">{i + 1}.</span>
              <span className="text-sm text-gray-600 flex-1 truncate">{file.name}</span>
              <button
                disabled={i === 0}
                onClick={() => moveFile(i, i - 1)}
                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
              >
                ↑
              </button>
              <button
                disabled={i === files.length - 1}
                onClick={() => moveFile(i, i + 1)}
                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
              >
                ↓
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleMerge}
          disabled={files.length < 2 || loading}
          className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : done ? (
            <Download className="w-5 h-5" />
          ) : (
            <Merge className="w-5 h-5" />
          )}
          {loading ? 'Merging...' : done ? 'Download Again' : 'Merge PDFs'}
        </button>
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
