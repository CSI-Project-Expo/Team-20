
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { ArrowRight, Loader2, Map } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const RoleDashboard = () => {
    const [role, setRole] = useState(null);
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSkills, setSelectedSkills] = useState(new Set());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [roleRes, skillsRes] = await Promise.all([
                    api.get(`/roles/${id}`),
                    api.get(`/roles/${id}/skills`)
                ]);
                setRole(roleRes.data);
                setSkills(skillsRes.data);
            } catch (error) {
                console.error("Error fetching role data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin text-blue-600" size={48} /></div>;
    if (!role) return <div className="text-center py-10">Role not found</div>;

    const skillData = skills.map(s => ({
        name: s.skill.skill_name,
        weight: s.frequency_weight,
        category: s.skill.category
    }));

    // Aggregate for Pie Chart
    const categoryData = Object.values(skillData.reduce((acc, curr) => {
        if (!acc[curr.category]) acc[curr.category] = { name: curr.category, value: 0 };
        acc[curr.category].value += 1;
        return acc;
    }, {}));

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <div className="flex justify-between items-start flex-wrap gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{role.role_name}</h1>
                        <p className="text-gray-600 mt-2 text-lg">{role.description}</p>
                    </div>
                    <div className="text-right">
                        <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-2 ${role.demand_level === 'High' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {role.demand_level} Demand
                        </div>
                        <div className="text-4xl font-bold text-blue-600">{role.demand_score}<span className="text-lg text-gray-400">/100</span></div>
                    </div>
                </div>

                <div className="mt-8 flex gap-4">
                    <Link to={`/role/${id}/roadmap`} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2">
                        <Map size={20} /> Generate Roadmap
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold mb-6">Top Skills Required</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={skillData.slice(0, 5)}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="weight" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold mb-6">Skill Categories</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-indigo-50">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-purple-900">
                        ⚡ Smart Skill Gap Analyzer
                    </h3>
                    <p className="text-sm text-purple-700 mt-1">Check the skills you already know to see what you are missing.</p>
                </div>
                <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {skillData.map((skill) => (
                            <button
                                key={skill.name}
                                onClick={() => {
                                    const newSet = new Set(selectedSkills);
                                    if (newSet.has(skill.name)) newSet.delete(skill.name);
                                    else newSet.add(skill.name);
                                    setSelectedSkills(newSet);
                                }}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition ${selectedSkills.has(skill.name)
                                    ? 'bg-purple-600 text-white border-purple-600'
                                    : 'bg-white text-gray-600 border-gray-300 hover:border-purple-400'
                                    }`}
                            >
                                {selectedSkills.has(skill.name) ? '✓ ' : '+ '} {skill.name}
                            </button>
                        ))}
                    </div>

                    {selectedSkills.size > 0 && (
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-gray-700">Role Readiness</span>
                                <span className="font-bold text-lg text-purple-600">
                                    {Math.round((selectedSkills.size / skillData.length) * 100)}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                <div
                                    className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
                                    style={{ width: `${Math.round((selectedSkills.size / skillData.length) * 100)}%` }}
                                ></div>
                            </div>

                            {skillData.length - selectedSkills.size > 0 ? (
                                <div>
                                    <p className="text-sm font-semibold text-red-500 mb-2">Missing Priority Skills:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {skillData
                                            .filter(s => !selectedSkills.has(s.name))
                                            .sort((a, b) => b.weight - a.weight)
                                            .slice(0, 5)
                                            .map(s => (
                                                <span key={s.name} className="bg-red-50 text-red-700 px-2 py-1 rounded text-xs border border-red-100">
                                                    {s.name}
                                                </span>
                                            ))
                                        }
                                    </div>
                                </div>
                            ) : (
                                <div className="text-green-600 font-bold flex items-center gap-2">
                                    🎉 You are ready for this role!
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold">All Required Skills</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                            <tr>
                                <th className="p-4">Skill Name</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Demand Frequency</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {skillData.map((skill, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="p-4 font-medium">{skill.name}</td>
                                    <td className="p-4 text-gray-500">{skill.category}</td>
                                    <td className="p-4">
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 max-w-xs">
                                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${skill.weight}%` }}></div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RoleDashboard;
