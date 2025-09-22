// Subject data based on CHSE syllabus
import { Subject } from '@/types';

export const subjects: Subject[] = [
  {
    id: 'physics',
    name: 'Physics',
    color: 'from-blue-500 to-blue-600',
    icon: '⚛️',
    description: 'Explore the fundamental laws of nature',
    totalLessons: 42,
    completedLessons: 0,
    units: [
      {
        id: 'unit-1',
        name: 'Physical World and Measurement',
        description: 'Physics scope, measurement, units, errors, dimensions',
        isUnlocked: true,
        lessons: [
          {
            id: 'physics-1-1',
            title: 'Physics and its Scope',
            description: 'Introduction to physics and its applications',
            type: 'theory',
            xpReward: 50,
            questions: [],
            isCompleted: false,
            isUnlocked: true,
            order: 1
          },
          {
            id: 'physics-1-2',
            title: 'Measurement and Units',
            description: 'Fundamental and derived units, SI system',
            type: 'mcq',
            xpReward: 75,
            questions: [],
            isCompleted: false,
            isUnlocked: false,
            order: 2
          }
        ]
      },
      {
        id: 'unit-2',
        name: 'Kinematics',
        description: 'Motion in straight line and plane',
        isUnlocked: false,
        lessons: [
          {
            id: 'physics-2-1',
            title: 'Motion in a Straight Line',
            description: 'Position, velocity, acceleration concepts',
            type: 'theory',
            xpReward: 60,
            questions: [],
            isCompleted: false,
            isUnlocked: false,
            order: 3
          }
        ]
      }
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    color: 'from-green-500 to-green-600',
    icon: '🧪',
    description: 'Discover the world of atoms and molecules',
    totalLessons: 38,
    completedLessons: 0,
    units: [
      {
        id: 'chem-unit-1',
        name: 'Basic Concepts of Chemistry',
        description: 'Matter, atomic theory, mole concept',
        isUnlocked: true,
        lessons: [
          {
            id: 'chem-1-1',
            title: 'Importance and Scope of Chemistry',
            description: 'Role of chemistry in our daily life',
            type: 'theory',
            xpReward: 50,
            questions: [],
            isCompleted: false,
            isUnlocked: true,
            order: 1
          }
        ]
      }
    ]
  },
  {
    id: 'biology',
    name: 'Biology',
    color: 'from-emerald-500 to-emerald-600',
    icon: '🧬',
    description: 'Study life and living organisms',
    totalLessons: 35,
    completedLessons: 0,
    units: [
      {
        id: 'bio-unit-1',
        name: 'Diversity in Living World',
        description: 'Classification and biodiversity',
        isUnlocked: true,
        lessons: [
          {
            id: 'bio-1-1',
            title: 'What is Living?',
            description: 'Characteristics of living organisms',
            type: 'theory',
            xpReward: 50,
            questions: [],
            isCompleted: false,
            isUnlocked: true,
            order: 1
          }
        ]
      }
    ]
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    color: 'from-purple-500 to-purple-600',
    icon: '📐',
    description: 'Master numbers, equations, and logic',
    totalLessons: 45,
    completedLessons: 0,
    units: [
      {
        id: 'math-unit-1',
        name: 'Relations and Functions',
        description: 'Types of relations and functions',
        isUnlocked: true,
        lessons: [
          {
            id: 'math-1-1',
            title: 'Types of Relations',
            description: 'Reflexive, symmetric, transitive relations',
            type: 'theory',
            xpReward: 60,
            questions: [],
            isCompleted: false,
            isUnlocked: true,
            order: 1
          }
        ]
      }
    ]
  },
  {
    id: 'english',
    name: 'English',
    color: 'from-red-500 to-red-600',
    icon: '📚',
    description: 'Enhance language and literature skills',
    totalLessons: 25,
    completedLessons: 0,
    units: [
      {
        id: 'eng-unit-1',
        name: 'Prose',
        description: 'Literary prose pieces and comprehension',
        isUnlocked: true,
        lessons: [
          {
            id: 'eng-1-1',
            title: 'Standing Up for Yourself',
            description: 'By Yevgeny Yevtushenko',
            type: 'theory',
            xpReward: 50,
            questions: [],
            isCompleted: false,
            isUnlocked: true,
            order: 1
          }
        ]
      }
    ]
  }
];