import React, { useState, useEffect } from 'react';
import { Trophy, Target, Clock, CheckCircle } from 'lucide-react';

const predefinedChallenges = [
  {
    id: '1',
    title: '30-Day Push-up Challenge',
    description: 'Complete 100 push-ups every day for 30 days',
    difficulty: 'Medium',
    duration: '30 days',
    reward: '500 points'
  },
  {
    id: '2',
    title: 'Weekly Cardio Blast',
    description: 'Complete 150 minutes of cardio exercise this week',
    difficulty: 'Easy',
    duration: '7 days',
    reward: '200 points'
  },
  {
    id: '3',
    title: 'Strength Master',
    description: 'Complete 5 different strength exercises for 14 days',
    difficulty: 'Hard',
    duration: '14 days',
    reward: '750 points'
  },
  {
    id: '4',
    title: 'Core Power Week',
    description: 'Focus on abs and core exercises for 7 consecutive days',
    difficulty: 'Medium',
    duration: '7 days',
    reward: '300 points'
  },
  {
    id: '5',
    title: 'Morning Warrior',
    description: 'Complete a workout before 8 AM for 10 days',
    difficulty: 'Hard',
    duration: '10 days',
    reward: '600 points'
  }
];
export const Challenges = () => {
    const [acceptedChallenges, setAcceptedChallenges] = useState([]);
  
    useEffect(() => {
      const saved = JSON.parse(localStorage.getItem('acceptedChallenges') || '[]');
      setAcceptedChallenges(saved);
    }, []);
  
    const getDifficultyColor = (difficulty) => {
      switch (difficulty) {
        case 'Easy': return 'bg-green-100 text-green-800';
        case 'Medium': return 'bg-yellow-100 text-yellow-800';
        case 'Hard': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };
  
    const acceptChallenge = (challenge) => {
      const acceptedChallenge = {
        ...challenge,
        acceptedDate: new Date().toISOString(),
        completed: false
      };
  
      const updated = [...acceptedChallenges, acceptedChallenge];
      setAcceptedChallenges(updated);
      localStorage.setItem('acceptedChallenges', JSON.stringify(updated));
    };
  
    const completeChallenge = (challengeId) => {
      const updated = acceptedChallenges.map(challenge =>
        challenge.id === challengeId
          ? { ...challenge, completed: true }
          : challenge
      );
      setAcceptedChallenges(updated);
      localStorage.setItem('acceptedChallenges', JSON.stringify(updated));
    };
  
    const isAccepted = (challengeId) => {
      return acceptedChallenges.some(challenge => challenge.id === challengeId);
    };
  
    const availableChallenges = predefinedChallenges.filter(
      challenge => !isAccepted(challenge.id)
    );
  
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center mb-4">
            <Trophy className="h-8 w-8 mr-3 text-yellow-500" />
            Fitness Challenges
          </h1>
          <p className="text-gray-600">
            Challenge yourself and earn rewards! Complete challenges to unlock achievements and build consistency.
          </p>
        </div>
  
        {/* Accepted Challenges */}
        {acceptedChallenges.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">My Active Challenges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {acceptedChallenges.map((challenge) => (
                <div key={challenge.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{challenge.title}</h3>
                    {challenge.completed ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                        {challenge.difficulty}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-4">{challenge.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      Duration: {challenge.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Target className="h-4 w-4 mr-2" />
                      Reward: {challenge.reward}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Started: {new Date(challenge.acceptedDate).toLocaleDateString()}
                    </div>
                  </div>
                  
                  {!challenge.completed ? (
                    <button
                      onClick={() => completeChallenge(challenge.id)}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 font-medium"
                    >
                      Mark as Completed
                    </button>
                  ) : (
                    <div className="w-full bg-green-100 text-green-800 py-2 px-4 rounded-md text-center font-medium">
                      Completed! 🎉
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
  
        {/* Available Challenges */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Available Challenges</h2>
          {availableChallenges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableChallenges.map((challenge) => (
                <div key={challenge.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{challenge.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{challenge.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      Duration: {challenge.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Target className="h-4 w-4 mr-2" />
                      Reward: {challenge.reward}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => acceptChallenge(challenge)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                  >
                    Accept Challenge
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">All challenges accepted!</p>
              <p className="text-gray-400">Check back later for new challenges.</p>
            </div>
          )}
        </div>
      </div>
    );
  };