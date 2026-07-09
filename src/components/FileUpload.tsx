import { useCallback, useState } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import { getSettings } from '../store/adminStore';

interface FileUploadProps {
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  label?: string;
  description?: string;
  files?: File[];
  onRemoveFile?: (index: number) => void;
}

export default function FileUpload({
  onFiles,
  accept = '.pdf',
  multiple = false,
  label = 'Upload PDF',
  description = 'Drag & drop your PDF files here or click to browse',
  files = [],
  onRemoveFile,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const settings = getSettings();

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFiles = Array.from(e.dataTransfer.files);
      const maxSize = settings.maxFileSizeMB * 1024 * 1024;
      const validFiles = droppedFiles.filter((f) => f.size <= maxSize);
      if (validFiles.length < droppedFiles.length) {
        alert(`Some files exceeded the ${settings.maxFileSizeMB}MB limit and were skipped.`);
      }
      onFiles(validFiles);
    },
    [onFiles, settings.maxFileSizeMB]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const selectedFiles = Array.from(e.target.files);
        const maxSize = settings.maxFileSizeMB * 1024 * 1024;
        const validFiles = selectedFiles.filter((f) => f.size <= maxSize);
        if (validFiles.length < selectedFiles.length) {
          alert(`Some files exceeded the ${settings.maxFileSizeMB}MB limit and were skipped.`);
        }
        onFiles(validFiles);
      }
    },
    [onFiles, settings.maxFileSizeMB]
  );

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="w-full">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        className={`relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center transition-all cursor-pointer
          ${isDragging
            ? 'border-green-400 bg-green-50 scale-[1.02]'
            : 'border-gray-200 hover:border-green-300 hover:bg-green-50/30'
          }`}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${
            isDragging ? 'bg-green-100' : 'bg-gray-100'
          }`}>
            <Upload className={`w-8 h-8 ${isDragging ? 'text-green-500' : 'text-gray-400'}`} />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-700">{label}</p>
            <p className="text-sm text-gray-400 mt-1">{description}</p>
            <p className="text-xs text-gray-300 mt-2">Max file size: {settings.maxFileSizeMB}MB</p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, i) => (
            <div
              key={`${file.name}-${i}`}
              className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3"
            >
              <FileText className="w-5 h-5 text-red-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
                <p className="text-xs text-gray-400">{formatSize(file.size)}</p>
              </div>
              {onRemoveFile && (
                <button
                  onClick={() => onRemoveFile(i)}
                  className="p-1 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-red-400" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
