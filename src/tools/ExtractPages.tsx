import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import { extractPages, downloadBlob, getPDFInfo } from '../utils/pdfTools';
import { FileDown, Download, Loader2 } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function ExtractPages() {
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

  const handleExtract = async () => {
    if (!file || selectedPages.length === 0) return;
    setLoading(true);
    try {
      const result = await extractPages(file, selectedPages);
      downloadBlob(result, `extracted_${file.name}`);
      setDone(true);
    } catch (err) {
      alert('Error: ' + (err as Error).message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FileDown className="w-8 h-8 text-amber-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Extract Pages</h1>
        <p className="text-gray-500">Select specific pages to extract into a new PDF</p>
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
            Select pages to extract ({pageCount} pages total):
          </p>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => togglePage(p)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                  selectedPages.includes(p)
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-amber-100'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          {selectedPages.length > 0 && (
            <p className="text-xs text-gray-400 mt-3">
              Selected: {selectedPages.join(', ')}
            </p>
          )}
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleExtract}
          disabled={!file || selectedPages.length === 0 || loading}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : done ? <Download className="w-5 h-5" /> : <FileDown className="w-5 h-5" />}
          {loading ? 'Extracting...' : done ? 'Download Again' : 'Extract Pages'}
        </button>
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
