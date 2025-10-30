// Core types for ICF Coach App

export type PackageType = 'basic' | 'standard' | 'premium';

export interface CoachingPackage {
  id: PackageType;
  name: string;
  duration: string;
  sessions: number;
  frequency: string;
  price: string;
  features: string[];
  readingMaterials: ReadingMaterial[];
  questionnaires: QuestionnaireType[];
}

export type QuestionnaireType = 'intake' | 'midpoint' | 'exit';

export interface ReadingMaterial {
  id: string;
  title: string;
  description: string;
  pages: string;
  prompt: string;
}

export interface Questionnaire {
  id: string;
  type: QuestionnaireType;
  title: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'scale' | 'multiple' | 'voice';
  options?: string[];
  scaleRange?: [number, number];
}

export interface Client {
  id: string;
  name: string;
  email: string;
  package: PackageType;
  startDate: Date;
  currentSession: number;
  sessions: Session[];
  checkIns: CheckIn[];
  questionnaires: QuestionnaireResponse[];
}

export interface Session {
  id: string;
  sessionNumber: number;
  date: Date;
  focus: string;
  previousAction?: string;
  previousActionReflection?: string;
  insights: string[];
  commitedAction?: string;
  actionDeadline?: Date;
  notes: string[];
  status: 'scheduled' | 'in-progress' | 'completed';
}

export interface CheckIn {
  id: string;
  date: Date;
  actionRating: number; // 1-5
  insight: string;
  sessionId: string;
}

export interface QuestionnaireResponse {
  id: string;
  questionnaireId: string;
  type: QuestionnaireType;
  date: Date;
  responses: Record<string, string | number>;
}

export const ICF_CORE_COMPETENCIES = [
  'Demonstrates Ethical Practice',
  'Embodies a Coaching Mindset',
  'Establishes and Maintains Agreements',
  'Cultivates Trust and Safety',
  'Maintains Presence',
  'Listens Actively',
  'Evokes Awareness',
  'Facilitates Client Growth',
] as const;

export type ICFCompetency = typeof ICF_CORE_COMPETENCIES[number];

