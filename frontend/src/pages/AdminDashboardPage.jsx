
import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { Plus, Trash, Edit } from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('roles');
    const [roles, setRoles] = useState([]);
    const [skills, setSkills] = useState([]);

    // Forms
    const [newRole, setNewRole] = useState({ role_name: '', description: '', demand_score: 50, demand_level: 'Medium' });

    useEffect(() => {
        fetchRoles();
        fetchSkills();
    }, []);

    const fetchRoles = async () => {
        const res = await api.get('/roles');
        setRoles(res.data);
    };

    const fetchSkills = async () => {
        // In a real app we'd have a public or protected get skills endpoint. 
        // Using the protected one from admin routes or just re-using role skills if needed.
        // For now, assuming we implemented GET /api/admin/skills
        try {
            const res = await api.get('/admin/skills');
            setSkills(res.data);
        } catch (e) { }
    }

    const handleCreateRole = async (e) => {
        e.preventDefault();
        try {
            await api.post('/admin/roles', newRole);
            fetchRoles();
            setNewRole({ role_name: '', description: '', demand_score: 50, demand_level: 'Medium' });
        } catch (error) {
            alert('Error creating role');
        }
    };

    const handleDeleteRole = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await api.delete(`/admin/roles/${id}`);
            fetchRoles();
        } catch (error) {
            alert('Error deleting role');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <div className="flex gap-4 mb-8 border-b">
                <button
                    className={`pb-4 px-4 font-medium ${activeTab === 'roles' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('roles')}
                >
                    Manage Roles
                </button>
                <button
                    className={`pb-4 px-4 font-medium ${activeTab === 'skills' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('skills')}
                >
                    Manage Skills
                </button>
            </div>

            {activeTab === 'roles' && (
                <div>
                    <form onSubmit={handleCreateRole} className="bg-white p-6 rounded-lg shadow-md mb-8">
                        <h2 className="text-xl font-bold mb-4">Add New Role</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text" placeholder="Role Name" className="border p-2 rounded"
                                value={newRole.role_name} onChange={e => setNewRole({ ...newRole, role_name: e.target.value })} required
                            />
                            <input
                                type="text" placeholder="Description" className="border p-2 rounded"
                                value={newRole.description} onChange={e => setNewRole({ ...newRole, description: e.target.value })}
                            />
                            <input
                                type="number" placeholder="Demand Score (0-100)" className="border p-2 rounded"
                                value={newRole.demand_score} onChange={e => setNewRole({ ...newRole, demand_score: parseInt(e.target.value) })}
                            />
                            <select
                                className="border p-2 rounded"
                                value={newRole.demand_level} onChange={e => setNewRole({ ...newRole, demand_level: e.target.value })}
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700">
                            <Plus size={18} /> Create Role
                        </button>
                    </form>

                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 uppercase text-xs text-gray-500">
                                <tr>
                                    <th className="p-4">Role Name</th>
                                    <th className="p-4">Level</th>
                                    <th className="p-4">Score</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {roles.map(role => (
                                    <tr key={role.id}>
                                        <td className="p-4">{role.role_name}</td>
                                        <td className="p-4">{role.demand_level}</td>
                                        <td className="p-4">{role.demand_score}</td>
                                        <td className="p-4">
                                            <button onClick={() => handleDeleteRole(role.id)} className="text-red-600 hover:text-red-800">
                                                <Trash size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'skills' && (
                <div className="bg-white p-12 rounded-lg shadow text-center text-gray-500">
                    Skills management UI would go here with similar structure to Roles.
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
