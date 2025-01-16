import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useUserStore } from '../store/userStore';

interface ScalpImage {
  id: string;
  imageUrl: string;
  densityValue: number;
  date: string;
}

export const Gallery = () => {
  const navigate = useNavigate();
  const username = useUserStore((state) => state.username);
  const [images, setImages] = useState<ScalpImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      // TODO: Replace with actual API endpoint
      setIsLoading(false);
    };

    fetchImages();
  }, [username]);

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
          <h1 className="ml-4 text-2xl font-bold text-white">Your Images</h1>
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-gray-300">Loading...</div>
        ) : images.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No images uploaded yet
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="bg-gray-800 p-3 rounded-xl shadow-md border border-gray-700"
              >
                <img
                  src={image.imageUrl}
                  alt="Scalp measurement"
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <div className="text-sm text-gray-300">
                  <div>Density: {image.densityValue}</div>
                  <div>{new Date(image.date).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};