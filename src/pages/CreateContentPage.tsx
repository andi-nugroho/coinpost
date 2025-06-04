import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, Image, Video, Music, FileText, AlertCircle, X, ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { useAlert } from '../context/AlertContext';
import RichTextEditor from '../components/create/RichTextEditor';
import TokenizationForm from '../components/create/TokenizationForm';
import { CONTENT_TYPES, MAX_FILE_SIZE } from '../utils/constants';

const contentSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title cannot exceed 100 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description cannot exceed 1000 characters'),
  tags: z.array(z.string()).min(1, 'Add at least one tag'),
  isSubscriberOnly: z.boolean(),
});

type ContentFormData = z.infer<typeof contentSchema>;

const CreateContentPage: React.FC = () => {
  const { isConnected, connect } = useWallet();
  const { showAlert } = useAlert();
  const [step, setStep] = useState(1);
  const [contentType, setContentType] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [richTextContent, setRichTextContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ContentFormData>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      tags: [],
      isSubscriberOnly: false,
    },
  });

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE * 1024 * 1024) {
        showAlert('error', `File size must be less than ${MAX_FILE_SIZE}MB`);
        return;
      }

      setFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: contentType ? {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
      'video/*': ['.mp4', '.webm'],
      'audio/*': ['.mp3', '.wav'],
    } : undefined,
    maxFiles: 1,
  });

  const handleCreateContent = async (formData: ContentFormData) => {
    if (!isConnected) {
      showAlert('error', 'Please connect your wallet first');
      connect();
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate content creation and tokenization
      await new Promise(resolve => setTimeout(resolve, 2000));
      showAlert('success', 'Content created and tokenized successfully!');
      
      // Reset form
      setStep(1);
      setContentType(null);
      setFile(null);
      setPreviewUrl(null);
      setRichTextContent('');
    } catch (error) {
      showAlert('error', 'Failed to create content');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTokenization = async (tokenData: any) => {
    setIsProcessing(true);
    try {
      // Simulate token creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      showAlert('success', 'Content tokenized successfully! Your content is now live.');
      // Reset and redirect
    } catch (error) {
      showAlert('error', 'Failed to tokenize content. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-24 h-24 rounded-full bg-primary flex items-center justify-center border-2 border-text shadow-[4px_4px_0px_0px_rgba(16,48,69,1)]"
        >
          <Upload size={32} className="text-text" />
        </motion.div>
        <h1 className="text-3xl font-bold text-center">Connect Wallet to Create</h1>
        <p className="text-center max-w-md">
          Connect your wallet to start creating and tokenizing your content.
        </p>
        <motion.button
          onClick={connect}
          className="btn btn-primary text-text"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Connect Wallet
        </motion.button>
      </div>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="card">
            <h2 className="text-xl font-bold mb-6">Choose Content Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {CONTENT_TYPES.map((type) => {
                const Icon = type.id === 'image' ? Image :
                           type.id === 'video' ? Video :
                           type.id === 'audio' ? Music :
                           FileText;
                           
                return (
                  <motion.button
                    key={type.id}
                    type="button"
                    onClick={() => {
                      setContentType(type.id);
                      setStep(2);
                    }}
                    className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-text bg-white hover:bg-primary-light transition-colors"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-3 border-2 border-text">
                      <Icon size={24} />
                    </div>
                    <span className="font-bold">{type.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setStep(1)}
                className="p-2 rounded-full border-2 border-text hover:bg-primary-light"
              >
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-xl font-bold">Upload Content</h2>
            </div>

            <div className="card">
              {contentType === 'text' ? (
                <div className="space-y-4">
                  <h3 className="font-bold">Write Article</h3>
                  <RichTextEditor
                    content={richTextContent}
                    onChange={setRichTextContent}
                  />
                </div>
              ) : (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed border-text rounded-xl p-8 text-center cursor-pointer
                    ${isDragActive ? 'bg-primary-light' : 'bg-white'}`}
                >
                  <input {...getInputProps()} />
                  {previewUrl ? (
                    <div className="relative">
                      {contentType === 'image' && (
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="max-h-64 mx-auto rounded-xl"
                        />
                      )}
                      {contentType === 'video' && (
                        <video
                          src={previewUrl}
                          controls
                          className="max-h-64 w-full rounded-xl"
                        />
                      )}
                      {contentType === 'audio' && (
                        <audio
                          src={previewUrl}
                          controls
                          className="w-full mt-4"
                        />
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                          setPreviewUrl(null);
                        }}
                        className="absolute top-2 right-2 p-2 rounded-full bg-error text-white"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto border-2 border-text">
                        <Upload size={24} className="text-text" />
                      </div>
                      <p>Drag and drop your file here, or click to browse</p>
                      <p className="text-sm opacity-70">Max file size: {MAX_FILE_SIZE}MB</p>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6 space-y-4">
                <div>
                  <label className="block font-bold mb-2">Title</label>
                  <input
                    type="text"
                    {...register('title')}
                    className={`input ${errors.title ? 'border-error' : ''}`}
                    placeholder="Give your content a title"
                  />
                  {errors.title && (
                    <p className="text-sm text-error mt-1">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block font-bold mb-2">Description</label>
                  <textarea
                    {...register('description')}
                    className={`input min-h-[100px] ${errors.description ? 'border-error' : ''}`}
                    placeholder="Describe your content"
                  />
                  {errors.description && (
                    <p className="text-sm text-error mt-1">{errors.description.message}</p>
                  )}
                </div>

                <div>
                  <label className="block font-bold mb-2">Tags</label>
                  <input
                    type="text"
                    placeholder="Add tags (comma separated)"
                    className="input"
                    onChange={(e) => {
                      const tags = e.target.value.split(',').map(tag => tag.trim());
                      setValue('tags', tags);
                    }}
                  />
                  {errors.tags && (
                    <p className="text-sm text-error mt-1">{errors.tags.message}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      {...register('isSubscriberOnly')}
                      className="w-5 h-5 rounded border-2 border-text"
                    />
                    <span>Make this content subscriber-only</span>
                  </label>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (!file && contentType !== 'text') {
                      showAlert('error', 'Please upload a file');
                      return;
                    }
                    setStep(3);
                  }}
                  className="btn btn-primary text-text"
                >
                  Continue to Tokenization
                  <ChevronRight size={20} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setStep(2)}
                className="p-2 rounded-full border-2 border-text hover:bg-primary-light"
              >
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-xl font-bold">Tokenize Your Content</h2>
            </div>

            <div className="card">
              <TokenizationForm 
                onSubmit={handleTokenization} 
                isProcessing={isProcessing}
              />
              
              {isProcessing && (
                <div className="fixed inset-0 bg-text/20 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="bg-white rounded-xl p-6 border-2 border-text shadow-lg flex items-center gap-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader size={24} />
                    </motion.div>
                    <p className="font-bold">Launching your content...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create & Tokenize Content</h1>

      {/* Progress Steps */}
      <div className="mb-8 flex items-center justify-between relative">
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-text/20 -z-10" />
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-primary" style={{ width: `${((step - 1) / 2) * 100}%` }} />
        
        {[1, 2, 3].map((stepNumber) => (
          <div
            key={stepNumber}
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step >= stepNumber ? 'bg-primary border-text' : 'bg-white border-text/20'
            }`}
          >
            {stepNumber}
          </div>
        ))}
      </div>

      {renderStep()}
    </div>
  );
};

export default CreateContentPage;
