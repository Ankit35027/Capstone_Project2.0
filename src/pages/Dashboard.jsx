import React, { useState, useEffect } from 'react';
import { ExerciseCard } from '../components/ExerciseCard';
import { fetchExercises, generateRandomWorkout } from '../utils/exerciseApi';
import { RefreshCw, Filter, Save } from 'lucide-react';

export function Dashboard(){
    const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    muscle: '',
    type: '',
    difficulty: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadWorkout();
  }, []);

  const loadWorkout = async () => {
    setLoading(true);
    try {
      const workout = await generateRandomWorkout(5);
      setExercises(workout);
    } catch (error) {
      console.error('Error loading workout:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async () => {
    setLoading(true);
    try {
      const filteredExercises = await fetchExercises(filters);
      setExercises(filteredExercises.slice(0, 5));
    } catch (error) {
      console.error('Error applying filters:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveWorkout = () => {
    const savedWorkouts = JSON.parse(localStorage.getItem('savedWorkouts') || '[]');
    const newWorkout = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      exercises: exercises
    };
    savedWorkouts.push(newWorkout);
    localStorage.setItem('savedWorkouts', JSON.stringify(savedWorkouts));
    alert('Workout saved successfully!');
  };

  const saveExercise = (exercise) => {
    const savedWorkouts = JSON.parse(localStorage.getItem('savedWorkouts') || '[]');
    const today = new Date().toISOString().split('T')[0];
    let todayWorkout = savedWorkouts.find((w) => w.date.startsWith(today));
    
    if (!todayWorkout) {
      todayWorkout = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        exercises: []
      };
      savedWorkouts.push(todayWorkout);
    }
    
    todayWorkout.exercises.push(exercise);
    localStorage.setItem('savedWorkouts', JSON.stringify(savedWorkouts));
    alert('Exercise saved to your workouts!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Today's Fitness Plan</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
          <button
            onClick={loadWorkout}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Generate New Plan
          </button>
          {exercises.length > 0 && (
            <button
              onClick={saveWorkout}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Workout
            </button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Filter Exercises</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Muscle Group
              </label>
              <select
                value={filters.muscle}
                onChange={(e) => setFilters({ ...filters, muscle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Muscles</option>
                <option value="biceps">Biceps</option>
                <option value="chest">Chest</option>
                <option value="quadriceps">Quadriceps</option>
                <option value="shoulders">Shoulders</option>
                <option value="triceps">Triceps</option>
                <option value="abs">Abs</option>
                <option value="glutes">Glutes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Exercise Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Types</option>
                <option value="strength">Strength</option>
                <option value="cardio">Cardio</option>
                <option value="stretching">Stretching</option>
                <option value="powerlifting">Powerlifting</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty
              </label>
              <select
                value={filters.difficulty}
                onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          </div>
          <button
            onClick={applyFilters}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
          >
            Apply Filters
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading exercises...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise, index) => (
            <ExerciseCard
              key={index}
              exercise={exercise}
              onSave={() => saveExercise(exercise)}
              showSaveButton={true}
            />
          ))}
        </div>
      )}

      {!loading && exercises.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No exercises found. Try generating a new plan or adjusting your filters.</p>
        </div>
      )}
    </div>
  );
    
}