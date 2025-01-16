import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CameraIcon } from '@heroicons/react/24/outline';
import { useUserStore } from '../store/userStore';

interface ImageData {
  image: string;
  timestamp: string;
  name: string;
}

export const CaptureImage = () => {
  const navigate = useNavigate();
  const username = useUserStore((state) => state.username);
  const [processedImages, setProcessedImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCapture = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/images/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }

      const imageData = await response.json();
      setProcessedImages(imageData);
    } catch (error) {
      console.error('Error fetching image:', error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
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
          <h1 className="ml-4 text-2xl font-bold text-white">Capture Image</h1>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700">
          {processedImages.length === 0 ? (
            <div className="space-y-4">
              <button
                onClick={handleCapture}
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-2 py-4 px-4 border-2 border-dashed border-gray-600 rounded-lg hover:border-indigo-500 focus:outline-none transition-colors duration-200"
              >
                <CameraIcon className="h-8 w-8 text-indigo-400" />
                <span className="text-sm font-medium text-gray-300">
                  {isLoading ? 'Capturing...' : 'Tap to Capture Image'}
                </span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {processedImages.map((imageData, index) => (
                <div key={imageData.timestamp} className="space-y-2">
                  <p className="text-sm text-gray-400">
                    {index === 0 ? 'Latest Image' : 'Previous Image'}
                  </p>
                  <img
                    src={`data:image/jpeg;base64,${imageData.image}`}
                    alt={`Captured scalp ${index + 1}`}
                    className="w-full rounded-lg"
                  />
                  <p className="text-xs text-gray-500">
                    Captured: {new Date(imageData.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
              <div className="flex space-x-4">
                <button
                  onClick={() => setProcessedImages([])}
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