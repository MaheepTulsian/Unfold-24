import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from './Button';

const Navbar = () => {
    return (
        <nav className="bg-transparent">
            <div className="w-full mx-auto px-8 py-4 flex justify-between items-center">
                {/* Logo Section */}
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-semibold text-yellow-600 hover:text-blue-600 transition-colors duration-300">
                        SMS Protocol
                    </h1>
                </div>

                <div className="flex items-center">
                    <NavLink to='auth'><Button /></NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
