import React from 'react';
import { useNavigate } from 'react-router-dom';

export const HomeButton = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate('/')}
            className="p-6 rounded-xl bg-gray-800 hover:bg-gray-700 text-indigo-400 border border-gray-700 transition-colors duration-200 text-4xl ml-4"
        >
            🏠
        </button>
    );
}; 