
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/admin/login');
    };

    return (
        <nav className="bg-slate-900 text-white p-4 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold tracking-tight text-blue-400">
                    SmartJob<span className="text-white">Analyzer</span>
                </Link>
                <div className="flex items-center gap-4">
                    <Link to="/" className="hover:text-blue-300 transition">Home</Link>
                    {token ? (
                        <>
                            <Link to="/admin/dashboard" className="flex items-center gap-2 hover:text-blue-300 transition">
                                <LayoutDashboard size={18} /> Dashboard
                            </Link>
                            <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600 px-3 py-1.5 rounded hover:bg-red-700 transition text-sm">
                                <LogOut size={16} /> Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/admin/login" className="text-sm bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">
                            Admin Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
