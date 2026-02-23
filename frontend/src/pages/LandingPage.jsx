
import React, { useEffect, useState } from 'react';
import api from '../api/api';
import RoleCard from '../components/RoleCard';
import { Loader2 } from 'lucide-react';

const LandingPage = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await api.get('/roles');
                setRoles(response.data);
            } catch (err) {
                console.error("Failed to fetch roles", err);
                setError("Failed to load job roles. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchRoles();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Master the Job Market</h1>
                <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto mb-8">
                    Discover high-demand career paths, analyze top skills, and get a personalized roadmap to success.
                </p>
                <a href="#roles" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
                    Explore Careers
                </a>
            </header>

            <main id="roles" className="flex-grow container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">Popular Career Roles</h2>
                    <p className="text-gray-600 mt-2">Select a role to view market insights and required skills.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="animate-spin text-blue-600" size={48} />
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 py-12">{error}</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {roles.map((role) => (
                            <RoleCard key={role.id} role={role} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default LandingPage;
