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

// ========================================
// Add-On Types: ICF Coaching Sessions
// ========================================

export type CoachingMode = 'ai' | 'human';
export type CommitmentStatus = 'active' | 'done' | 'dropped';

export interface CoachingSession {
  id: string;
  user_id: string;
  mode: CoachingMode;
  focus_area: string | null;
  summary: string | null;
  commitment: string | null;
  created_at: string;
  ended_at: string | null;
}

export interface CoachingCommitment {
  id: string;
  user_id: string;
  session_id: string | null;
  text: string;
  confidence: number | null; // 1-10 scale
  due_date: string | null;
  status: CommitmentStatus;
  created_at: string;
  updated_at: string;
}

export interface OrgTrend {
  id: string;
  org_id: string | null;
  period_start: string;
  period_end: string;
  metric: string;
  value: number | null;
  sample_size: number | null;
  created_at: string;
}

export interface SessionContext {
  session_id: string;
  coach_role: string;
  coaching_mode: CoachingMode;
  open_commitments: CoachingCommitment[];
  recent_sessions: CoachingSession[];
  suggested_opening_prompt: string;
  icf_principles: string[];
}

export interface DashboardStats {
  total_sessions: number;
  completed_sessions: number;
  ai_sessions: number;
  human_sessions: number;
  total_commitments: number;
  active_commitments: number;
  done_commitments: number;
  average_confidence: number | null;
}

export interface RecentActivity {
  type: 'session' | 'commitment';
  id: string;
  timestamp: string;
  description: string;
  status?: CommitmentStatus;
}

export interface DashboardData {
  sessions: CoachingSession[];
  commitments: CoachingCommitment[];
  stats: DashboardStats;
  recent_activity: RecentActivity[];
}

