import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/api';
import {
    Loader2, Map, BookOpen, Award, Target,
    TrendingUp, Briefcase, Activity, Code, Star, CheckCircle, Clock
} from 'lucide-react';

const RoleDetails = () => {
    const { id } = useParams();
    const [role, setRole] = useState(null);
    const [skills, setSkills] = useState([]);
    const [roadmap, setRoadmap] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoleDetails = async () => {
            try {
                // Fetch dynamic data if backend is available
                const [roleRes, skillsRes, roadmapRes, projectsRes] = await Promise.all([
                    api.get(`/roles/${id}`).catch(() => ({ data: null })),
                    api.get(`/roles/${id}/skills`).catch(() => ({ data: [] })),
                    api.get(`/roles/${id}/roadmap`).catch(() => ({ data: [] })),
                    api.get(`/roles/${id}/projects`).catch(() => ({ data: [] }))
                ]);

                // Merge Real API data with our professional mock layout requirements
                const roleData = roleRes.data || {
                    role_name: "Frontend Developer",
                    description: "Build user-facing web applications using modern web technologies like React, Vue, or Angular.",
                    demand_level: "High",
                    demand_score: 92,
                    salary_range: "$80k - $120k",
                    growth: "+14% YoY",
                };

                const skillsData = skillsRes.data.length > 0 ? skillsRes.data : [
                    { skill: { skill_name: "JavaScript", category: "Technical" }, frequency_weight: 98 },
                    { skill: { skill_name: "React.js", category: "Technical" }, frequency_weight: 95 },
                    { skill: { skill_name: "CSS", category: "Technical" }, frequency_weight: 90 },
                    { skill: { skill_name: "Communication", category: "Soft" }, frequency_weight: 85 },
                    { skill: { skill_name: "Problem Solving", category: "Soft" }, frequency_weight: 92 },
                ];

                const roadmapData = roadmapRes.data.length > 0 ? roadmapRes.data : [
                    { step_order: 1, title: "Step 1: Fundamentals to Learn", description: "HTML, CSS basics, responsive design, and core Vanilla JavaScript." },
                    { step_order: 2, title: "Step 2: Tools & Technologies", description: "Learn Git, NPM, and React.js along with TailwindCSS." },
                    { step_order: 3, title: "Step 3: Projects to Build", description: "Build an API-driven application, a dashboard, and a personal portfolio." },
                    { step_order: 4, title: "Step 4: Portfolio Preparation", description: "Host projects on Vercel/Netlify, write clean READMEs, and optimize code." },
                    { step_order: 5, title: "Step 5: Interview Prep Strategy", description: "Practice LeetCode (Easy/Medium arrays) and common React interview questions." },
                ];

                const projectsData = projectsRes.data.length > 0 ? projectsRes.data : [
                    { id: 1, title: "Admin Dashboard", description: "A responsive React dashboard with charts.", difficulty: "Medium" },
                    { id: 2, title: "E-commerce Store", description: "A full shopping cart with state management.", difficulty: "Hard" },
                    { id: 3, title: "Weather App", description: "Fetch live data from external APIs.", difficulty: "Easy" }
                ];

                setRole(roleData);
                setSkills(skillsData);
                setRoadmap(roadmapData);
                setProjects(projectsData);
            } catch (err) {
                setError("Failed to load role details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchRoleDetails();
    }, [id]);

    if (loading) return (
        <div className="flex flex-col justify-center items-center h-[80vh] bg-slate-50">
            <Loader2 className="animate-spin text-blue-600 mb-4" size={56} />
            <p className="text-xl font-medium text-slate-600">Analyzing Job Market Data...</p>
        </div>
    );

    if (error) return (
        <div className="flex justify-center flex-col items-center h-[80vh] text-red-600">
            <Activity size={64} className="mb-4 text-red-400" />
            <span className="text-2xl font-bold">{error}</span>
            <Link to="/" className="mt-6 text-blue-600 hover:text-blue-800 underline">Return to Dashboard</Link>
        </div>
    );

    const techSkills = skills.filter(s => s.skill.category !== 'Soft');
    const softSkills = skills.filter(s => s.skill.category === 'Soft');

    return (
        <div className="min-h-screen bg-slate-50 pb-16">
            {/* Hero Header Section */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white pt-16 pb-20 px-4 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
                <div className="container mx-auto max-w-6xl relative z-10">
                    <Link to="/" className="text-blue-200 hover:text-white flex items-center gap-2 mb-8 transition-colors w-max">
                        &larr; Back to Dashboard
                    </Link>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        <div className="md:col-span-2">
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{role.role_name}</h1>
                                <span className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-sm flex items-center gap-1.5 ${
                                    role.demand_level === 'High' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                                    role.demand_level === 'Medium' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                                    'bg-red-500/20 text-red-300 border border-red-500/30'
                                }`}>
                                    <Target size={16} /> {role.demand_level} Demand
                                </span>
                            </div>
                            <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mb-8">
                                {role.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-4">
                                <a href="#roadmap" className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 shadow-lg shadow-blue-500/30">
                                    <Map size={20} /> View Roadmap
                                </a>
                                <a href="#projects" className="bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2">
                                    <Briefcase size={20} /> Build Projects
                                </a>
                            </div>
                        </div>

                        {/* Quick Stats Cards */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10 shadow-xl">
                                <TrendingUp className="text-blue-400 mb-2" size={28} />
                                <p className="text-sm text-blue-200 mb-1">Market Score</p>
                                <p className="text-3xl font-bold">{role.demand_score}<span className="text-base font-normal text-blue-300">/100</span></p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10 shadow-xl">
                                <Activity className="text-green-400 mb-2" size={28} />
                                <p className="text-sm text-blue-200 mb-1">YoY Growth</p>
                                <p className="text-3xl font-bold">{role.growth || "+12%"}</p>
                            </div>
                            <div className="col-span-2 bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10 shadow-xl">
                                <Award className="text-yellow-400 mb-2" size={28} />
                                <p className="text-sm text-blue-200 mb-1">Avg. Salary Range</p>
                                <p className="text-2xl font-bold">{role.salary_range || "$80k - $120k"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 -mt-10 relative z-20">
                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {/* Tech Skills */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 transition-all hover:shadow-2xl">
                        <div className="flex items-center gap-3 mb-6 border-b pb-4">
                            <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                                <Code size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800">Technical Skills</h3>
                        </div>
                        <div className="space-y-4">
                            {(techSkills.length > 0 ? techSkills : skills).slice(0, 6).map((s, idx) => (
                                <div key={idx} className="group">
                                    <div className="flex justify-between items-center mb-1.5">
                                        <span className="font-semibold text-slate-700">{s.skill.skill_name}</span>
                                        <span className="text-sm font-bold text-blue-600">{s.frequency_weight}% weight</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                        <div 
                                            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2.5 rounded-full transition-all duration-1000 ease-out group-hover:from-blue-400 group-hover:to-indigo-400" 
                                            style={{ width: `${s.frequency_weight}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Soft Skills */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 transition-all hover:shadow-2xl">
                        <div className="flex items-center gap-3 mb-6 border-b pb-4">
                            <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
                                <Star size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800">Soft Skills</h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {(softSkills.length > 0 ? softSkills : [{skill:{skill_name:"Communication"}}, {skill:{skill_name:"Problem Solving"}}, {skill:{skill_name:"Teamwork"}}, {skill:{skill_name:"Adaptability"}} ]).map((s, idx) => (
                                <div key={idx} className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl">
                                    <CheckCircle size={18} className="text-green-500" />
                                    <span className="font-medium text-slate-700">{s.skill.skill_name}</span>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-8">
                            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Award className="text-orange-500" size={20} /> Suggested Certifications
                            </h4>
                            <ul className="space-y-3">
                                {['AWS Certified Developer', 'Meta Front-End Professional', 'Google Data Analytics'].slice(0,3).map((cert,i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-600 bg-orange-50/50 p-3 rounded-lg border border-orange-100">
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2"></span>
                                        <span className="font-medium">{cert}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Step-by-Step Roadmap */}
                <div id="roadmap" className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 border border-slate-100 scroll-mt-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Step-by-Step Preparation Roadmap</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg">Follow this verified trajectory to master the required skills and land the role.</p>
                    </div>

                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-[27px] md:left-1/2 top-4 bottom-4 w-1 bg-slate-100 md:-translate-x-1/2 rounded-full hidden md:block"></div>
                        
                        <div className="space-y-8 relative">
                            {roadmap.map((step, idx) => (
                                <div key={idx} className={`relative flex flex-col md:flex-row items-center justify-between gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    
                                    {/* Timeline dot */}
                                    <div className="absolute left-0 md:left-1/2 -ml-2.5 md:-translate-x-1/2 w-6 h-6 rounded-full bg-blue-500 border-4 border-white shadow-md z-10 hidden md:flex items-center justify-center">
                                    </div>

                                    {/* Content Card */}
                                    <div className={`w-full md:w-[45%] bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-shadow hover:border-blue-100 group`}>
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="bg-blue-100 text-blue-700 font-black px-3 py-1 rounded-lg text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                Step {step.step_order || idx + 1}
                                            </span>
                                            <h4 className="font-bold text-xl text-slate-800">{step.title}</h4>
                                        </div>
                                        <p className="text-slate-600 leading-relaxed font-medium">
                                            {step.description}
                                        </p>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Real World Projects Grid */}
                <div id="projects" className="mb-12 scroll-mt-24">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Real-world Project Ideas</h2>
                            <p className="text-slate-500 text-lg">Build these to make your portfolio stand out to recruiters.</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {projects.map((proj, idx) => (
                            <div key={idx} className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`px-3 py-1 rounded-lg text-xs font-bold ${
                                        proj.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                        proj.difficulty === 'Hard' ? 'bg-red-100 text-red-700' :
                                        'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {proj.difficulty || "Medium"} Difficulty
                                    </div>
                                    <Code className="text-slate-300" size={24} />
                                </div>
                                <h4 className="text-xl font-bold text-slate-800 mb-3">{proj.title}</h4>
                                <p className="text-slate-600 mb-6 flex-grow">{proj.description}</p>
                                <button className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl font-bold transition-colors border border-slate-200">
                                    View Project Details
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Learning Resources */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl overflow-hidden text-white">
                    <div className="p-10 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="max-w-xl">
                            <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                                <BookOpen size={32} className="text-blue-200" /> Curated Learning Resources
                            </h3>
                            <p className="text-blue-100 text-lg mb-6">
                                We've handpicked the best free and paid resources to help you master this role faster. Includes video courses, official docs, and practice platforms.
                            </p>
                            <button className="bg-white text-blue-700 px-8 py-4 rounded-xl font-extrabold hover:bg-blue-50 transition-colors shadow-lg shadow-black/10">
                                Access Resource Library
                            </button>
                        </div>
                        <div className="hidden md:flex flex-col gap-4">
                            <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl border border-white/20 flex items-center gap-4">
                                <div className="bg-green-400 p-2 rounded-lg text-white"><CheckCircle size={20} /></div>
                                <div><p className="font-bold">15+ Free Courses</p><p className="text-sm text-blue-200">YouTube, FreeCodeCamp</p></div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl border border-white/20 flex items-center gap-4">
                                <div className="bg-yellow-400 p-2 rounded-lg text-yellow-900"><Star size={20} /></div>
                                <div><p className="font-bold">Premium Books</p><p className="text-sm text-blue-200">O'Reilly, Highly Rated Docs</p></div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default RoleDetails;
