import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { useUserStore } from '../store/userStore';

export const UploadImage = () => {
  const navigate = useNavigate();
  const username = useUserStore((state) => state.username);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;
    
    setIsLoading(true);
    // TODO: Replace with actual API endpoint
    setIsLoading(false);
  };

  const handleConfirm = () => {
    navigate('/gallery');
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/home')}
            className="p-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-indigo-400 border border-gray-700 transition-colors duration-200"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <h1 className="ml-4 text-2xl font-bold text-white">Upload Image</h1>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700">
          {!processedImageUrl ? (
            <div className="space-y-4">
              <label className="block text-center p-8 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors duration-200">
                <CloudArrowUpIcon className="mx-auto h-12 w-12 text-indigo-400" />
                <span className="mt-2 block text-sm font-medium text-gray-300">
                  Choose an image from your camera roll
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageSelect}
                />
              </label>
              
              {selectedImage && (
                <button
                  onClick={handleUpload}
                  disabled={isLoading}
                  className="w-full py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isLoading ? 'Processing...' : 'Upload and Process Image'}
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <img
                src={processedImageUrl}
                alt="Processed scalp"
                className="w-full rounded-lg"
              />
              <div className="flex space-x-4">
                <button
                  onClick={() => setProcessedImageUrl(null)}
                  className="flex-1 py-3 px-4 border border-gray-600 rounded-xl shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800 transition-colors duration-200"
                >
                  Retake
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800 transition-colors duration-200"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};