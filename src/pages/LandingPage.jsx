import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Users, Trophy, Zap } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="flex justify-center items-center mb-8">
            <Dumbbell className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            FitBuddy
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Your ultimate fitness companion. Connect with workout buddies, discover new exercises, 
            take on challenges, and achieve your fitness goals together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/signin"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors duration-200 shadow-lg"
            >
              Sign Up
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Connect with Friends</h3>
              <p className="text-gray-600">Add friends, share workouts, and motivate each other on your fitness journey.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Take Challenges</h3>
              <p className="text-gray-600">Complete fitness challenges and track your progress with friends.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Zap className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Discover Exercises</h3>
              <p className="text-gray-600">Access thousands of exercises with our integrated fitness database.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};