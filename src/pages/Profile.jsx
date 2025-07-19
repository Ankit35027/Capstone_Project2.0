import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { User, Edit3, Save, Calendar, Dumbbell } from 'lucide-react';
import { ExerciseCard } from '../components/ExerciseCard';

export const Profile = () => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(() => {
    const workouts = JSON.parse(localStorage.getItem('savedWorkouts') || '[]');
    setSavedWorkouts(workouts);
  }, []);

  const handleSaveProfile = () => {
    if (user) {
      const updatedUser = { ...user, name: editedName };
      
     
      localStorage.setItem('workoutUser', JSON.stringify(updatedUser));
      
    
      const users = JSON.parse(localStorage.getItem('workoutUsers') || '[]');
      const updatedUsers = users.map((u) => 
        u.id === user.id ? { ...u, name: editedName } : u
      );
      localStorage.setItem('workoutUsers', JSON.stringify(updatedUsers));
      
      setIsEditing(false);
      window.location.reload(); 
    }
  };

  const getWorkoutStats = () => {
    const totalWorkouts = savedWorkouts.length;
    const totalExercises = savedWorkouts.reduce((total, workout) => total + workout.exercises.length, 0);
    const recentWorkouts = savedWorkouts.filter(workout => {
      const workoutDate = new Date(workout.date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return workoutDate >= thirtyDaysAgo;
    }).length;

    return { totalWorkouts, totalExercises, recentWorkouts };
  };

  const stats = getWorkoutStats();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <User className="h-8 w-8 mr-3 text-blue-600" />
            My Profile
          </h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSaveProfile}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditedName(user?.name || '');
                }}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{user?.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-gray-900">{user?.email}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Workout Statistics</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-blue-600" />
                  <div className="ml-3">
                    <p className="text-2xl font-bold text-blue-900">{stats.totalWorkouts}</p>
                    <p className="text-blue-700">Total Workouts</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <Dumbbell className="h-8 w-8 text-green-600" />
                  <div className="ml-3">
                    <p className="text-2xl font-bold text-green-900">{stats.totalExercises}</p>
                    <p className="text-green-700">Total Exercises</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-orange-600" />
                  <div className="ml-3">
                    <p className="text-2xl font-bold text-orange-900">{stats.recentWorkouts}</p>
                    <p className="text-orange-700">Last 30 Days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Workouts */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Saved Workouts</h2>
        
        {savedWorkouts.length === 0 ? (
          <div className="text-center py-8">
            <Dumbbell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No saved workouts yet</p>
            <p className="text-gray-400">Start building your workout history from the Dashboard!</p>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {savedWorkouts.map((workout) => (
                <button
                  key={workout.id}
                  onClick={() => setSelectedWorkout(workout)}
                  className={`text-left p-4 rounded-lg border-2 transition-colors duration-200 ${
                    selectedWorkout?.id === workout.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">
                      {new Date(workout.date).toLocaleDateString()}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {workout.exercises.length} exercises
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {workout.exercises.slice(0, 2).map(ex => ex.name).join(', ')}
                    {workout.exercises.length > 2 && '...'}
                  </p>
                </button>
              ))}
            </div>

            {selectedWorkout && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Workout from {new Date(selectedWorkout.date).toLocaleDateString()}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedWorkout.exercises.map((exercise, index) => (
                    <ExerciseCard key={index} exercise={exercise} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};