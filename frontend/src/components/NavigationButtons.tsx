import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { HomeButton } from './HomeButton';

export const NavigationButtons = () => {
    const navigate = useNavigate();
    const username = useUserStore((state) => state.username);

    return (
        <div className="flex flex-col space-y-8">
            <div className="bg-gray-800 p-6 rounded-xl">
                <h1 className="text-2xl font-bold text-white">Welcome, {username}</h1>
                <HomeButton />
            </div>

            <div className="flex flex-col space-y-6">
                <button
                    className="bg-gray-800 p-8 rounded-xl text-white hover:bg-gray-700 transition-colors"
                    onClick={() => navigate('/upload')}
                >
                    <div className="flex items-center gap-8">
                        <span className="text-8xl">☁️</span>
                        <span className="text-4xl">Upload Image</span>
                    </div>
                </button>
                <button
                    className="bg-gray-800 p-8 rounded-xl text-white hover:bg-gray-700 transition-colors"
                    onClick={() => navigate('/gallery')}
                >
                    <div className="flex items-center gap-8">
                        <span className="text-8xl">🖼️</span>
                        <span className="text-4xl">View Images</span>
                    </div>
                </button>
                <button
                    className="bg-gray-800 p-8 rounded-xl text-white hover:bg-gray-700 transition-colors"
                    onClick={() => navigate('/capture')}
                >
                    <div className="flex items-center gap-8">
                        <span className="text-8xl">📸</span>
                        <span className="text-4xl">Capture Image</span>
                    </div>
                </button>
            </div>
        </div>
    );
}; 