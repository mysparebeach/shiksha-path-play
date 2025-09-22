// Achievement system for gamification
import { Achievement } from '@/types';

export const achievements: Achievement[] = [
  {
    id: 'first-lesson',
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    xpReward: 100,
    isUnlocked: false,
    requirement: {
      type: 'lessons',
      value: 1
    }
  },
  {
    id: 'streak-7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    xpReward: 200,
    isUnlocked: false,
    requirement: {
      type: 'streak',
      value: 7
    }
  },
  {
    id: 'streak-30',
    name: 'Monthly Master',
    description: 'Maintain a 30-day streak',
    icon: '🏆',
    xpReward: 500,
    isUnlocked: false,
    requirement: {
      type: 'streak',
      value: 30
    }
  },
  {
    id: 'xp-1000',
    name: 'Knowledge Seeker',
    description: 'Earn 1000 XP',
    icon: '💎',
    xpReward: 150,
    isUnlocked: false,
    requirement: {
      type: 'xp',
      value: 1000
    }
  },
  {
    id: 'xp-5000',
    name: 'Learning Legend',
    description: 'Earn 5000 XP',
    icon: '⭐',
    xpReward: 300,
    isUnlocked: false,
    requirement: {
      type: 'xp',
      value: 5000
    }
  },
  {
    id: 'physics-complete-unit',
    name: 'Physics Pioneer',
    description: 'Complete a full unit in Physics',
    icon: '⚛️',
    xpReward: 250,
    isUnlocked: false,
    requirement: {
      type: 'lessons',
      value: 10,
      subject: 'physics'
    }
  },
  {
    id: 'chemistry-complete-unit',
    name: 'Chemistry Champion',
    description: 'Complete a full unit in Chemistry',
    icon: '🧪',
    xpReward: 250,
    isUnlocked: false,
    requirement: {
      type: 'lessons',
      value: 10,
      subject: 'chemistry'
    }
  },
  {
    id: 'biology-complete-unit',
    name: 'Biology Expert',
    description: 'Complete a full unit in Biology',
    icon: '🧬',
    xpReward: 250,
    isUnlocked: false,
    requirement: {
      type: 'lessons',
      value: 10,
      subject: 'biology'
    }
  },
  {
    id: 'math-complete-unit',
    name: 'Math Wizard',
    description: 'Complete a full unit in Mathematics',
    icon: '📐',
    xpReward: 250,
    isUnlocked: false,
    requirement: {
      type: 'lessons',
      value: 10,
      subject: 'mathematics'
    }
  },
  {
    id: 'english-complete-unit',
    name: 'Literature Lover',
    description: 'Complete a full unit in English',
    icon: '📚',
    xpReward: 250,
    isUnlocked: false,
    requirement: {
      type: 'lessons',
      value: 10,
      subject: 'english'
    }
  }
];