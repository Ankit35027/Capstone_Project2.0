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
