import { useState, useCallback } from 'react';
import { Image, Download, Trash2, Loader2 } from 'lucide-react';
import AdBanner from '../components/AdBanner';

interface CompressedImage {
  original: File;
  compressed: Blob;
  originalSize: number;
  compressedSize: number;
  preview: string;
}

export default function ImageCompressor() {
  const [images, setImages] = useState<CompressedImage[]>([]);
  const [quality, setQuality] = useState(0.7);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [processing, setProcessing] = useState(false);

  const compressImage = useCallback(async (file: File): Promise<CompressedImage> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Resize if needed
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d')!;
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              resolve({
                original: file,
                compressed: blob!,
                originalSize: file.size,
                compressedSize: blob!.size,
                preview: URL.createObjectURL(blob!),
              });
            },
            'image/jpeg',
            quality
          );
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  }, [quality, maxWidth]);

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setProcessing(true);
    const compressed: CompressedImage[] = [];

    try {
      for (const file of files) {
        if (file.type.startsWith('image/')) {
          const result = await compressImage(file);
          compressed.push(result);
        }
      }
      setImages((prev) => [...prev, ...compressed]);
    } catch (err) {
      // Silently continue on error, user sees partial results
    }
    setProcessing(false);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(images[index].preview);
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const downloadImage = (img: CompressedImage) => {
    const a = document.createElement('a');
    a.href = img.preview;
    a.download = `compressed_${img.original.name.replace(/\.[^/.]+$/, '')}.jpg`;
    a.click();
  };

  const downloadAll = () => {
    images.forEach((img, i) => {
      setTimeout(() => downloadImage(img), i * 100);
    });
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const totalOriginal = images.reduce((sum, img) => sum + img.originalSize, 0);
  const totalCompressed = images.reduce((sum, img) => sum + img.compressedSize, 0);
  const totalSaved = totalOriginal - totalCompressed;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Image className="w-8 h-8 text-orange-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Image Compressor</h1>
        <p className="text-gray-500">Reduce image file sizes while maintaining quality</p>
      </div>

      <AdBanner slot="header" />

      <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-6">
        {/* Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quality: {Math.round(quality * 100)}%
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Smaller file</span>
              <span>Higher quality</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Width: {maxWidth}px</label>
            <select
              value={maxWidth}
              onChange={(e) => setMaxWidth(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm"
            >
              <option value={640}>640px (Small)</option>
              <option value={1280}>1280px (Medium)</option>
              <option value={1920}>1920px (HD)</option>
              <option value={2560}>2560px (2K)</option>
              <option value={3840}>3840px (4K)</option>
              <option value={99999}>Original Size</option>
            </select>
          </div>
        </div>

        {/* Upload */}
        <label className="block border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-orange-300 hover:bg-orange-50/30 transition-colors">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFiles}
            className="hidden"
          />
          {processing ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
              <p className="text-gray-600">Compressing images...</p>
            </div>
          ) : (
            <>
              <Image className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">Drop images here or click to upload</p>
              <p className="text-sm text-gray-400 mt-1">Supports JPG, PNG, WebP</p>
            </>
          )}
        </label>

        {/* Results */}
        {images.length > 0 && (
          <>
            {/* Summary */}
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-green-600">Total saved</p>
                <p className="text-2xl font-bold text-green-700">{formatSize(totalSaved)}</p>
                <p className="text-xs text-green-500">
                  {totalOriginal > 0 ? ((totalSaved / totalOriginal) * 100).toFixed(0) : 0}% reduction
                </p>
              </div>
              <button
                onClick={downloadAll}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2.5 rounded-xl transition-colors"
              >
                <Download className="w-4 h-4" />
                Download All
              </button>
            </div>

            {/* Image List */}
            <div className="space-y-3">
              {images.map((img, i) => (
                <div key={i} className="flex items-center gap-4 bg-gray-50 rounded-xl p-3">
                  <img
                    src={img.preview}
                    alt=""
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">{img.original.name}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                      <span className="line-through">{formatSize(img.originalSize)}</span>
                      <span>→</span>
                      <span className="text-green-600 font-medium">{formatSize(img.compressedSize)}</span>
                      <span className="text-green-500">
                        ({((1 - img.compressedSize / img.originalSize) * 100).toFixed(0)}% smaller)
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => downloadImage(img)}
                    className="p-2 bg-white hover:bg-orange-50 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4 text-orange-500" />
                  </button>
                  <button
                    onClick={() => removeImage(i)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <AdBanner slot="footer" />
    </div>
  );
}
