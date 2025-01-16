import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { HomeButton } from './HomeButton';

export const Home = () => {
  const navigate = useNavigate();
  const username = useUserStore((state) => state.username);

  const buttons = [
    {
      title: 'Upload Image',
      path: '/upload',
      emoji: '☁️'
    },
    {
      title: 'View Images',
      path: '/gallery',
      emoji: '🖼️'
    },
    {
      title: 'Capture Image',
      path: '/capture',
      emoji: '📸'
    }
  ];

  return (
    <div className="h-screen bg-gray-900 p-6">
      <div className="mb-10 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Welcome, {username}</h1>
        <HomeButton />
      </div>

      <div className="h-[calc(100%-6rem)] flex flex-col gap-6">
        {buttons.map((button) => (
          <button
            key={button.title}
            onClick={() => navigate(button.path)}
            className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-lg hover:bg-gray-700"
          >
            <div className="h-full flex items-center gap-6 px-8">
              <span className="text-6xl">{button.emoji}</span>
              <span className="text-2xl">{button.title}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};