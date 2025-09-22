// Sample MCQ questions for different subjects
import { Question } from '@/types';

export const physicsQuestions: Question[] = [
  {
    id: 'phy-q1',
    text: 'What is the SI unit of force?',
    type: 'multiple-choice',
    options: ['Joule', 'Newton', 'Watt', 'Pascal'],
    correctAnswer: 1,
    explanation: 'Newton (N) is the SI unit of force, named after Sir Isaac Newton.',
    difficulty: 'easy'
  },
  {
    id: 'phy-q2',
    text: 'Which of the following is a scalar quantity?',
    type: 'multiple-choice',
    options: ['Velocity', 'Acceleration', 'Speed', 'Force'],
    correctAnswer: 2,
    explanation: 'Speed is a scalar quantity as it has only magnitude, while velocity, acceleration, and force are vector quantities.',
    difficulty: 'easy'
  },
  {
    id: 'phy-q3',
    text: 'The dimensional formula for acceleration is:',
    type: 'multiple-choice',
    options: ['[M L T⁻²]', '[L T⁻²]', '[M L T⁻¹]', '[L T⁻¹]'],
    correctAnswer: 1,
    explanation: 'Acceleration = velocity/time = (LT⁻¹)/T = LT⁻²',
    difficulty: 'medium'
  }
];

export const chemistryQuestions: Question[] = [
  {
    id: 'chem-q1',
    text: 'What is the atomic number of carbon?',
    type: 'multiple-choice',
    options: ['4', '6', '8', '12'],
    correctAnswer: 1,
    explanation: 'Carbon has 6 protons in its nucleus, so its atomic number is 6.',
    difficulty: 'easy'
  },
  {
    id: 'chem-q2',
    text: 'Which of the following is a noble gas?',
    type: 'multiple-choice',
    options: ['Oxygen', 'Nitrogen', 'Argon', 'Chlorine'],
    correctAnswer: 2,
    explanation: 'Argon is a noble gas with a complete outer electron shell.',
    difficulty: 'easy'
  }
];

export const biologyQuestions: Question[] = [
  {
    id: 'bio-q1',
    text: 'What is the basic unit of life?',
    type: 'multiple-choice',
    options: ['Tissue', 'Cell', 'Organ', 'Organism'],
    correctAnswer: 1,
    explanation: 'Cell is the basic structural and functional unit of all living organisms.',
    difficulty: 'easy'
  },
  {
    id: 'bio-q2',
    text: 'Which organelle is known as the powerhouse of the cell?',
    type: 'multiple-choice',
    options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi apparatus'],
    correctAnswer: 2,
    explanation: 'Mitochondria produce ATP through cellular respiration, providing energy for cellular processes.',
    difficulty: 'easy'
  }
];

export const mathQuestions: Question[] = [
  {
    id: 'math-q1',
    text: 'What is the derivative of x²?',
    type: 'multiple-choice',
    options: ['x', '2x', 'x²', '2x²'],
    correctAnswer: 1,
    explanation: 'Using the power rule: d/dx(xⁿ) = n·x^(n-1), so d/dx(x²) = 2x',
    difficulty: 'medium'
  },
  {
    id: 'math-q2',
    text: 'What is the value of sin(90°)?',
    type: 'multiple-choice',
    options: ['0', '1', '√2/2', '√3/2'],
    correctAnswer: 1,
    explanation: 'sin(90°) = 1, which is a fundamental trigonometric value.',
    difficulty: 'easy'
  }
];

export const englishQuestions: Question[] = [
  {
    id: 'eng-q1',
    text: 'What is a metaphor?',
    type: 'multiple-choice',
    options: [
      'A direct comparison using "like" or "as"',
      'An indirect comparison without using "like" or "as"',
      'A sound imitation',
      'A reference to another work'
    ],
    correctAnswer: 1,
    explanation: 'A metaphor is a figure of speech that makes an indirect comparison between two unlike things without using "like" or "as".',
    difficulty: 'easy'
  },
  {
    id: 'eng-q2',
    text: 'Which of the following is a synonym for "brave"?',
    type: 'multiple-choice',
    options: ['Cowardly', 'Courageous', 'Fearful', 'Timid'],
    correctAnswer: 1,
    explanation: 'Courageous is a synonym for brave, both meaning showing courage or determination.',
    difficulty: 'easy'
  }
];