import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import { deletePages, downloadBlob, getPDFInfo } from '../utils/pdfTools';
import { Trash2, Download, Loader2 } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function DeletePagesTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleFiles = async (newFiles: File[]) => {
    if (newFiles.length > 0) {
      const f = newFiles[0];
      setFile(f);
      setDone(false);
      try {
        const info = await getPDFInfo(f);
        setPageCount(info.pageCount);
        setSelectedPages([]);
      } catch {
        setPageCount(0);
      }
    }
  };

  const togglePage = (p: number) => {
    setSelectedPages((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p].sort((a, b) => a - b)
    );
    setDone(false);
  };

  const handleDelete = async () => {
    if (!file || selectedPages.length === 0) return;
    if (selectedPages.length >= pageCount) {
      alert('Cannot delete all pages!');
      return;
    }
    setLoading(true);
    try {
      const result = await deletePages(file, selectedPages);
      downloadBlob(result, `trimmed_${file.name}`);
      setDone(true);
    } catch (err) {
      alert('Error: ' + (err as Error).message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Trash2 className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Delete Pages</h1>
        <p className="text-gray-500">Remove unwanted pages from your PDF</p>
      </div>

      <AdBanner slot="header" />

      <FileUpload
        onFiles={handleFiles}
        label="Upload PDF"
        files={file ? [file] : []}
        onRemoveFile={() => { setFile(null); setPageCount(0); setSelectedPages([]); }}
      />

      {file && pageCount > 0 && (
        <div className="mt-6 bg-white border border-gray-100 rounded-xl p-6">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Click pages to mark for deletion ({pageCount} pages total):
          </p>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => togglePage(p)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                  selectedPages.includes(p)
                    ? 'bg-red-500 text-white shadow-md line-through'
                    : 'bg-gray-100 text-gray-600 hover:bg-red-100'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          {selectedPages.length > 0 && (
            <p className="text-xs text-red-400 mt-3">
              Will delete pages: {selectedPages.join(', ')}
            </p>
          )}
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleDelete}
          disabled={!file || selectedPages.length === 0 || loading}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : done ? <Download className="w-5 h-5" /> : <Trash2 className="w-5 h-5" />}
          {loading ? 'Processing...' : done ? 'Download Again' : 'Delete Pages'}
        </button>
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
