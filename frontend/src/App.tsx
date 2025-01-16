import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { UploadImage } from './components/UploadImage';
import { Gallery } from './components/Gallery';
import { CaptureImage } from './components/CaptureImage';
import { useUserStore } from './store/userStore';
import { NavigationButtons } from './components/NavigationButtons';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const username = useUserStore((state) => state.username);
  if (!username) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <div className="h-screen bg-gray-900">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <NavigationButtons />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <UploadImage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gallery"
            element={
              <ProtectedRoute>
                <Gallery />
              </ProtectedRoute>
            }
          />
          <Route
            path="/capture"
            element={
              <ProtectedRoute>
                <CaptureImage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;