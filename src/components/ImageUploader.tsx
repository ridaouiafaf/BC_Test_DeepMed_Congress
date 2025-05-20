import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploaderProps {
  onUpload: (file: File) => void;
  isLoading: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload, isLoading }) => {
  const [dragOver, setDragOver] = useState(false);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    
    setPreviewFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearPreview = () => {
    setPreviewFile(null);
    setPreviewUrl(null);
  };

  const submitImage = () => {
    if (previewFile) {
      onUpload(previewFile);
      clearPreview();
    }
  };

  return (
    <div className="p-4 border-t border-slate-200 dark:border-slate-700">
      {!previewUrl ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            dragOver 
              ? 'border-cyan-500 bg-cyan-50 dark:border-cyan-400 dark:bg-cyan-900/20' 
              : 'border-slate-300 dark:border-slate-600 hover:border-cyan-400 dark:hover:border-cyan-500'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <Upload className="h-8 w-8 mx-auto text-slate-400 dark:text-slate-500 mb-2" />
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">
            Drag and drop a medical image, or click to browse
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Supported formats: JPEG, PNG
          </p>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileInputChange}
          />
        </div>
      ) : (
        <div className="space-y-3">
          <div className="relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-48 object-contain rounded-lg border border-slate-200 dark:border-slate-700"
            />
            <button
              onClick={clearPreview}
              className="absolute top-2 right-2 p-1 rounded-full bg-slate-800 bg-opacity-70 text-white hover:bg-opacity-90"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={clearPreview}
              className="px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              onClick={submitImage}
              disabled={isLoading}
              className={`px-4 py-2 text-sm bg-cyan-600 dark:bg-cyan-500 text-white rounded-md hover:bg-cyan-700 dark:hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 flex items-center ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Analyze Image'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;