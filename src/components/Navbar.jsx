import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Dumbbell, Users, Trophy, User, LogOut } from 'lucide-react';

export const Navbar = () => {
  const { isAuthenticated, logout, user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  
  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Dumbbell },
    { path: '/friends', label: 'Friends', icon: Users },
    { path: '/challenges', label: 'Challenges', icon: Trophy },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Dumbbell className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">FitBuddy</span>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                    location.pathname === path
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            
            <span className="text-sm text-gray-700">Welcome, {user?.name}</span>
            
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};