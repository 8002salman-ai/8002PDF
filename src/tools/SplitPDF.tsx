import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import { splitPDF, downloadAsZip, getPDFInfo } from '../utils/pdfTools';
import { Scissors, Download, Loader2 } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function SplitPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [rangeText, setRangeText] = useState('');
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
        setRangeText(`1-${Math.ceil(info.pageCount / 2)}, ${Math.ceil(info.pageCount / 2) + 1}-${info.pageCount}`);
      } catch {
        setPageCount(0);
      }
    }
  };

  const parseRanges = (text: string): { start: number; end: number }[] => {
    return text.split(',').map((r) => r.trim()).filter(Boolean).map((r) => {
      const parts = r.split('-').map((p) => parseInt(p.trim()));
      if (parts.length === 1) return { start: parts[0], end: parts[0] };
      return { start: parts[0], end: parts[1] };
    });
  };

  const handleSplit = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const ranges = parseRanges(rangeText);
      const results = await splitPDF(file, ranges);
      if (results.length === 1) {
        const { saveAs } = await import('file-saver');
        saveAs(new Blob([results[0].data as unknown as BlobPart], { type: 'application/pdf' }), results[0].name);
      } else {
        await downloadAsZip(
          results.map((r) => ({ name: r.name, data: r.data as unknown as Blob })),
          'split_pdfs.zip'
        );
      }
      setDone(true);
    } catch (err) {
      alert('Error splitting PDF: ' + (err as Error).message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Scissors className="w-8 h-8 text-orange-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Split PDF</h1>
        <p className="text-gray-500">Split PDF into multiple documents by page ranges</p>
      </div>

      <AdBanner slot="header" />

      <FileUpload
        onFiles={handleFiles}
        label="Upload PDF to split"
        files={file ? [file] : []}
        onRemoveFile={() => { setFile(null); setPageCount(0); }}
      />

      {file && pageCount > 0 && (
        <div className="mt-6 bg-white border border-gray-100 rounded-xl p-6">
          <p className="text-sm text-gray-500 mb-2">
            This PDF has <span className="font-bold text-gray-700">{pageCount} pages</span>
          </p>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Page Ranges (comma-separated, e.g. "1-3, 4-6, 7-10")
          </label>
          <input
            type="text"
            value={rangeText}
            onChange={(e) => { setRangeText(e.target.value); setDone(false); }}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
            placeholder="1-3, 4-6"
          />
          <p className="text-xs text-gray-400 mt-2">Each range creates a separate PDF file</p>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSplit}
          disabled={!file || !rangeText || loading}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : done ? <Download className="w-5 h-5" /> : <Scissors className="w-5 h-5" />}
          {loading ? 'Splitting...' : done ? 'Download Again' : 'Split PDF'}
        </button>
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
