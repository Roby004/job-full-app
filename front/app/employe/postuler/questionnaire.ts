// questions.ts
export type QuestionType = 'qcm' | 'truefalse' | 'long';

export interface Question {
  id: number;
  question: string;
  type: QuestionType;
  options?: string[];
}

export const questions: Question[] = [
  {
    id: 1,
    question: 'What does HTTP stand for?',
    type: 'qcm',
    options: ['HyperText Transfer Protocol', 'Hyper Transfer Text Port', 'High Transfer Text Protocol'],
  },
  {
    id: 2,
    question: 'TypeScript is a superset of JavaScript.',
    type: 'truefalse',
  },
  {
    id: 3,
    question: 'Describe a challenging situation you solved with code.',
    type: 'long',
  },
  {
    id: 4,
    question: 'What is the time complexity of binary search?',
    type: 'qcm',
    options: ['O(n)', 'O(log n)', 'O(n log n)'],
  },
  {
    id: 5,
    question: 'React is maintained by Microsoft.',
    type: 'truefalse',
  },
  {
    id: 6,
    question: 'Explain the difference between state and props in React.',
    type: 'long',
  },
  {
    id: 7,
    question: 'CSS stands for...',
    type: 'qcm',
    options: ['Cascading Style Sheets', 'Computer Style Syntax', 'Code Styling System'],
  },
  {
    id: 8,
    question: 'You can use the "useEffect" hook in class components.',
    type: 'truefalse',
  },
  {
    id: 9,
    question: 'What is a RESTful API?',
    type: 'long',
  },
  {
    id: 10,
    question: 'Which of the following is not a JavaScript data type?',
    type: 'qcm',
    options: ['String', 'Boolean', 'Element'],
  },
];
