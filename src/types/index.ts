// Types for Shiksha Bandhu Learning App

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  completedLessons: string[];
  currentSubject?: Subject;
  dailyGoal: number;
  joinedDate: string;
}

export interface Subject {
  id: string;
  name: string;
  color: string;
  icon: string;
  description: string;
  totalLessons: number;
  completedLessons: number;
  units: Unit[];
}

export interface Unit {
  id: string;
  name: string;
  description: string;
  lessons: Lesson[];
  isUnlocked: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'mcq' | 'theory' | 'practice';
  xpReward: number;
  questions: Question[];
  isCompleted: boolean;
  isUnlocked: boolean;
  order: number;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  requirement: {
    type: 'streak' | 'xp' | 'lessons' | 'subject';
    value: number;
    subject?: string;
  };
}

export interface Quest {
  id: string;
  name: string;
  description: string;
  type: 'daily' | 'weekly' | 'special';
  xpReward: number;
  isCompleted: boolean;
  progress: number;
  maxProgress: number;
  deadline?: string;
  requirement: {
    type: 'complete-lessons' | 'earn-xp' | 'maintain-streak';
    value: number;
    subject?: string;
  };
}

export interface LeaderboardEntry {
  rank: number;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  xp: number;
  streak: number;
}

export interface UserProgress {
  userId: string;
  subjectId: string;
  completedLessons: string[];
  currentLessonId?: string;
  xpEarned: number;
  timeSpent: number; // in minutes
  lastAccessedAt: string;
}