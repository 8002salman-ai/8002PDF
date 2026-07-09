import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import { protectPDF, downloadBlob } from '../utils/pdfTools';
import { Lock, Download, Loader2 } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function ProtectPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [ownerPassword, setOwnerPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleFiles = (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFile(newFiles[0]);
      setDone(false);
    }
  };

  const handleProtect = async () => {
    if (!file || !password) return;
    setLoading(true);
    try {
      const result = await protectPDF(file, password, ownerPassword || password);
      downloadBlob(result, `protected_${file.name}`);
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
          <Lock className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Protect PDF</h1>
        <p className="text-gray-500">Add password protection to your PDF</p>
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
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3">
            <p className="text-xs text-yellow-700">
              ⚠️ Note: pdf-lib has limited encryption support. The metadata will be updated to indicate protection. For full encryption, a server-side solution is recommended.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setDone(false); }}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
              placeholder="Enter password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Owner Password (optional)</label>
            <input
              type="password"
              value={ownerPassword}
              onChange={(e) => setOwnerPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
              placeholder="Enter owner password"
            />
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleProtect}
          disabled={!file || !password || loading}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : done ? <Download className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
          {loading ? 'Protecting...' : done ? 'Download Again' : 'Protect PDF'}
        </button>
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
