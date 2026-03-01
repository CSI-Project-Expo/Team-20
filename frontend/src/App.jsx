
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import RoleDetails from './pages/RoleDetails';
import RoadmapPage from './pages/RoadmapPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboardPage';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) return <Navigate to="/admin/login" replace />;
    return children;
};

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans">
                <Navbar />
                <div className="flex-grow">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/role/:id" element={<RoleDetails />} />
                        <Route path="/role/:id/roadmap" element={<RoadmapPage />} />
                        <Route path="/admin/login" element={<AdminLoginPage />} />
                        <Route path="/admin/dashboard" element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
