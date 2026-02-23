
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-gray-400 py-6 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Smart Job Market Analyzer. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
