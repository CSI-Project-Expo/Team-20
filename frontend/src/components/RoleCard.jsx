
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const RoleCard = ({ role }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border border-gray-100 hover:border-blue-200">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{role.role_name}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{role.description || "Explore this career path."}</p>
            <div className="flex justify-between items-center mt-auto">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${role.demand_level === 'High' ? 'bg-green-100 text-green-700' :
                        role.demand_level === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                    }`}>
                    {role.demand_level} Demand
                </span>
                <Link to={`/role/${role.id}`} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium">
                    View Insights <ArrowRight size={16} />
                </Link>
            </div>
        </div>
    );
};

export default RoleCard;
