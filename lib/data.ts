import { CoachingPackage, Questionnaire, ReadingMaterial } from './types';

export const COACHING_PACKAGES: CoachingPackage[] = [
  {
    id: 'basic',
    name: 'Basic',
    duration: '4 weeks',
    sessions: 4,
    frequency: 'Weekly',
    price: '$400',
    features: [
      '4 coaching sessions (30 min each)',
      'Weekly mobile check-ins',
      'Intake questionnaire',
      'Basic reading materials',
      'Action tracking',
    ],
    readingMaterials: [
      {
        id: 'basic-1',
        title: 'Getting Started with Coaching',
        description: 'Introduction to the coaching process and setting intentions',
        pages: '1-15',
        prompt: 'Read pages 1-15 and note one insight that resonates with you',
      },
      {
        id: 'basic-2',
        title: 'Setting Powerful Goals',
        description: 'Learn how to create goals that inspire action',
        pages: '16-30',
        prompt: 'Read pages 16-30 and identify one goal you want to explore',
      },
    ],
    questionnaires: ['intake'],
  },
  {
    id: 'standard',
    name: 'Standard',
    duration: '8 weeks',
    sessions: 8,
    frequency: 'Weekly',
    price: '$750',
    features: [
      '8 coaching sessions (45 min each)',
      'Bi-weekly mobile check-ins',
      'Intake & mid-point questionnaires',
      'Curated reading materials',
      'Action tracking & accountability',
      'Progress report',
    ],
    readingMaterials: [
      {
        id: 'standard-1',
        title: 'Deep Dive: Self-Awareness',
        description: 'Exploring your values, strengths, and patterns',
        pages: '1-40',
        prompt: 'Read pages 1-40 and write down three values that guide your decisions',
      },
      {
        id: 'standard-2',
        title: 'Creating Sustainable Change',
        description: 'Understanding behavior change and habit formation',
        pages: '41-75',
        prompt: 'Read pages 41-75 and identify one habit you want to build',
      },
      {
        id: 'standard-3',
        title: 'Overcoming Obstacles',
        description: 'Working through resistance and building resilience',
        pages: '76-110',
        prompt: "Read pages 76-110 and note one obstacle you're ready to address",
      },
    ],
    questionnaires: ['intake', 'midpoint'],
  },
  {
    id: 'premium',
    name: 'Premium',
    duration: '12 weeks',
    sessions: 12,
    frequency: 'Weekly',
    price: '$1,200',
    features: [
      '12 coaching sessions (60 min each)',
      'Weekly mobile check-ins',
      'Intake, mid-point & exit questionnaires',
      'Comprehensive reading library',
      'Priority support',
      'Action tracking & accountability',
      'Detailed progress reports',
      'Optional voice journaling',
    ],
    readingMaterials: [
      {
        id: 'premium-1',
        title: 'Foundations of Transformation',
        description: 'Building a strong foundation for lasting change',
        pages: '1-50',
        prompt: 'Read pages 1-50 and reflect on what transformation means to you',
      },
      {
        id: 'premium-2',
        title: 'Leading from Within',
        description: 'Developing authentic leadership and influence',
        pages: '51-100',
        prompt: 'Read pages 51-100 and identify your core leadership strengths',
      },
      {
        id: 'premium-3',
        title: 'Mastering Communication',
        description: 'Enhancing your communication and relationship skills',
        pages: '101-150',
        prompt: 'Read pages 101-150 and note one communication pattern to shift',
      },
      {
        id: 'premium-4',
        title: 'Sustaining Your Growth',
        description: 'Creating systems for ongoing development',
        pages: '151-200',
        prompt: 'Read pages 151-200 and design your personal growth practice',
      },
    ],
    questionnaires: ['intake', 'midpoint', 'exit'],
  },
];

export const QUESTIONNAIRES: Record<string, Questionnaire> = {
  intake: {
    id: 'intake',
    type: 'intake',
    title: 'Welcome Questionnaire',
    questions: [
      {
        id: 'q1',
        text: 'What brings you to coaching at this time?',
        type: 'text',
      },
      {
        id: 'q2',
        text: 'What would you like to be different in your life?',
        type: 'text',
      },
      {
        id: 'q3',
        text: 'On a scale of 1-10, how ready are you to take action?',
        type: 'scale',
        scaleRange: [1, 10],
      },
      {
        id: 'q4',
        text: 'What support do you need most right now?',
        type: 'multiple',
        options: [
          'Clarity on goals',
          'Accountability',
          'Overcoming obstacles',
          'Building confidence',
          'Creating balance',
        ],
      },
      {
        id: 'q5',
        text: 'What does success look like for you in this coaching journey?',
        type: 'text',
      },
    ],
  },
  midpoint: {
    id: 'midpoint',
    type: 'midpoint',
    title: 'Mid-Point Check-In',
    questions: [
      {
        id: 'm1',
        text: 'What has shifted for you since we started?',
        type: 'text',
      },
      {
        id: 'm2',
        text: 'What insights have been most valuable?',
        type: 'text',
      },
      {
        id: 'm3',
        text: 'On a scale of 1-10, how satisfied are you with your progress?',
        type: 'scale',
        scaleRange: [1, 10],
      },
      {
        id: 'm4',
        text: 'What do you want to focus on in the remaining sessions?',
        type: 'text',
      },
      {
        id: 'm5',
        text: 'What has been challenging?',
        type: 'text',
      },
    ],
  },
  exit: {
    id: 'exit',
    type: 'exit',
    title: 'Completion & Reflection',
    questions: [
      {
        id: 'e1',
        text: 'What are you most proud of from this coaching journey?',
        type: 'text',
      },
      {
        id: 'e2',
        text: 'What key insights will you carry forward?',
        type: 'text',
      },
      {
        id: 'e3',
        text: 'On a scale of 1-10, how confident are you in sustaining your growth?',
        type: 'scale',
        scaleRange: [1, 10],
      },
      {
        id: 'e4',
        text: 'What systems or practices will support you going forward?',
        type: 'text',
      },
      {
        id: 'e5',
        text: 'What would you say to someone considering coaching?',
        type: 'text',
      },
    ],
  },
};

export const POWERFUL_QUESTIONS = [
  'What matters most to you about this?',
  'What would become possible if you moved forward?',
  "What's holding you back?",
  "What would you do if you knew you couldn't fail?",
  'What does your intuition tell you?',
  "What's the smallest step you could take?",
  'What would support look like?',
  'What are you not saying?',
  'What do you need to let go of?',
  'What will you do? By when?',
];

export const SESSION_FLOW_TEMPLATE = [
  {
    step: 'welcome',
    prompt: 'Thanks for being here. How have you been since our last session?',
  },
  {
    step: 'action-reflection',
    prompt: 'You committed to [action]. What happened? What did you notice?',
  },
  {
    step: 'focus',
    prompt: 'What would you like to focus on today?',
  },
  {
    step: 'explore',
    prompt: "Let's explore this together...",
  },
  {
    step: 'awareness',
    prompt: 'What might this mean for you?',
  },
  {
    step: 'action',
    prompt: 'What step feels most alive for you now? When will you do it?',
  },
  {
    step: 'outro',
    prompt:
      "Wonderful. I'll check in mid-week with a short prompt on your phone.",
  },
];

