import { useState, useRef } from 'react';
import { useAlert } from '../context/AlertContext';
import { validateFileType, validateFileSize } from '../utils/validation';
import { MAX_FILE_SIZE } from '../utils/constants';

export const useFileUpload = (allowedTypes?: string[]) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showAlert } = useAlert();

  const handleFileSelect = (selectedFile: File) => {
    if (allowedTypes && !validateFileType(selectedFile, allowedTypes)) {
      showAlert('error', 'Unsupported file type');
      return false;
    }

    if (!validateFileSize(selectedFile, MAX_FILE_SIZE)) {
      showAlert('error', `File size must be less than ${MAX_FILE_SIZE}MB`);
      return false;
    }

    setFile(selectedFile);
    
    if (selectedFile.type.startsWith('image/') || 
        selectedFile.type.startsWith('video/') || 
        selectedFile.type.startsWith('audio/')) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }

    return true;
  };

  const clearFile = () => {
    setFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return {
    file,
    previewUrl,
    fileInputRef,
    handleFileSelect,
    clearFile
  };
};
