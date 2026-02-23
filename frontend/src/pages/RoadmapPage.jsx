
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/api';
import { CheckCircle2, ChevronDown, ChevronRight, BookOpen, ExternalLink, Loader2 } from 'lucide-react';

const RoadmapPage = () => {
    const { id } = useParams();
    const [roadmap, setRoadmap] = useState([]);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expandedPhase, setExpandedPhase] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [roleRes, roadmapRes] = await Promise.all([
                    api.get(`/roles/${id}`),
                    api.get(`/roles/${id}/roadmap`)
                ]);
                setRole(roleRes.data);

                // Group by phase
                const grouped = roadmapRes.data.reduce((acc, step) => {
                    if (!acc[step.phase_name]) acc[step.phase_name] = [];
                    acc[step.phase_name].push(step);
                    return acc;
                }, {});

                setRoadmap(grouped);

                // Auto expand first phase
                const phases = Object.keys(grouped);
                if (phases.length > 0) setExpandedPhase(phases[0]);

            } catch (error) {
                console.error("Error fetching roadmap", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const togglePhase = (phase) => {
        setExpandedPhase(expandedPhase === phase ? null : phase);
    };

    if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin text-blue-600" size={48} /></div>;

    const phaseOrder = ['Beginner', 'Intermediate', 'Advanced', 'Projects', 'Interview'];

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link to={`/role/${id}`} className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Dashboard</Link>
            <h1 className="text-3xl font-bold mb-2">Learning Roadmap: {role?.role_name}</h1>
            <p className="text-gray-600 mb-8">Follow this step-by-step guide to master the necessary skills.</p>

            <div className="space-y-4">
                {phaseOrder.map((phase) => {
                    const steps = roadmap[phase];
                    if (!steps || steps.length === 0) return null;

                    const isExpanded = expandedPhase === phase;

                    return (
                        <div key={phase} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <button
                                onClick={() => togglePhase(phase)}
                                className={`w-full flex justify-between items-center p-6 text-left transition ${isExpanded ? 'bg-blue-50 text-blue-800' : 'hover:bg-gray-50'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-full ${isExpanded ? 'bg-blue-200 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                                        <BookOpen size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold">{phase} Phase</h3>
                                </div>
                                {isExpanded ? <ChevronDown /> : <ChevronRight />}
                            </button>

                            {isExpanded && (
                                <div className="p-6 border-t border-gray-100 bg-white">
                                    <div className="relative border-l-2 border-gray-200 ml-3 space-y-8 pl-8 py-2">
                                        {steps.map((step) => (
                                            <div key={step.id} className="relative">
                                                <div className="absolute -left-[41px] bg-white border-2 border-blue-500 rounded-full w-5 h-5"></div>
                                                <h4 className="text-lg font-bold text-gray-900">{step.step_title}</h4>
                                                <p className="text-gray-600 mt-1">{step.step_description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RoadmapPage;
