import React from 'react';
import { Target, Zap, Wrench } from 'lucide-react';

export const ExerciseCard = ({ 
  exercise, 
  onSave, 
  showSaveButton = false 
}) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 capitalize">
          {exercise.name}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
          {exercise.difficulty}
        </span>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Target className="h-4 w-4 mr-2 text-blue-500" />
          <span className="font-medium">Muscle:</span>
          <span className="ml-1 capitalize">{exercise.muscle}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Zap className="h-4 w-4 mr-2 text-orange-500" />
          <span className="font-medium">Type:</span>
          <span className="ml-1 capitalize">{exercise.type}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Wrench className="h-4 w-4 mr-2 text-green-500" />
          <span className="font-medium">Equipment:</span>
          <span className="ml-1 capitalize">{exercise.equipment}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Instructions:</h4>
        <p className="text-sm text-gray-700 leading-relaxed">
          {exercise.instructions}
        </p>
      </div>
      
      {showSaveButton && onSave && (
        <button
          onClick={onSave}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Save to My Workouts
        </button>
      )}
    </div>
  );
};