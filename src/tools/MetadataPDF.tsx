import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import { editMetadata, getPDFInfo, downloadBlob } from '../utils/pdfTools';
import { Tags, Download, Loader2, Info } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function MetadataPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState<Awaited<ReturnType<typeof getPDFInfo>> | null>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [subject, setSubject] = useState('');
  const [keywords, setKeywords] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleFiles = async (newFiles: File[]) => {
    if (newFiles.length > 0) {
      const f = newFiles[0];
      setFile(f);
      setDone(false);
      try {
        const pdfInfo = await getPDFInfo(f);
        setInfo(pdfInfo);
        setTitle(pdfInfo.title);
        setAuthor(pdfInfo.author);
        setSubject(pdfInfo.subject);
      } catch {
        setInfo(null);
      }
    }
  };

  const handleSave = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const result = await editMetadata(file, {
        title: title || undefined,
        author: author || undefined,
        subject: subject || undefined,
        keywords: keywords ? keywords.split(',').map((k) => k.trim()) : undefined,
      });
      downloadBlob(result, file.name);
      setDone(true);
    } catch (err) {
      alert('Error: ' + (err as Error).message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Tags className="w-8 h-8 text-violet-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit PDF Metadata</h1>
        <p className="text-gray-500">View and edit PDF title, author, subject and keywords</p>
      </div>

      <AdBanner slot="header" />

      <FileUpload
        onFiles={handleFiles}
        label="Upload PDF"
        files={file ? [file] : []}
        onRemoveFile={() => { setFile(null); setInfo(null); setDone(false); }}
      />

      {info && (
        <div className="mt-6 bg-violet-50 border border-violet-100 rounded-xl p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-violet-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-600">
            <p>Pages: <span className="font-medium">{info.pageCount}</span></p>
            {info.producer && <p>Producer: {info.producer}</p>}
            {info.creator && <p>Creator: {info.creator}</p>}
          </div>
        </div>
      )}

      {file && (
        <div className="mt-6 bg-white border border-gray-100 rounded-xl p-6 space-y-4">
          {[
            { label: 'Title', value: title, set: setTitle },
            { label: 'Author', value: author, set: setAuthor },
            { label: 'Subject', value: subject, set: setSubject },
            { label: 'Keywords (comma-separated)', value: keywords, set: setKeywords },
          ].map((field) => (
            <div key={field.label}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              <input
                type="text"
                value={field.value}
                onChange={(e) => { field.set(e.target.value); setDone(false); }}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSave}
          disabled={!file || loading}
          className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600 disabled:bg-gray-300 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : done ? <Download className="w-5 h-5" /> : <Tags className="w-5 h-5" />}
          {loading ? 'Saving...' : done ? 'Download Again' : 'Save Metadata'}
        </button>
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
