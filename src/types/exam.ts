export type ExamPart = 'A' | 'B' | 'C';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export type BloomLevel = 'Remember' | 'Understand' | 'Apply' | 'Analyze' | 'Evaluate';

export interface QuestionOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface Question {
  id: string;
  part: ExamPart;
  topic: string;
  subtopic: string;
  difficulty: DifficultyLevel;
  bloom_level: BloomLevel;
  question_text: string;
  options: QuestionOption[];
  correct_answer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  year_tag?: string;
  reference_source: string;
  figure_type?: 'table' | 'pedigree' | 'gel' | 'diagram' | 'curve';
  figure_data?: any;
}

export type TestMode = 'full_length' | 'unit_wise' | 'custom' | 'pyq' | 'daily_sprint';

export interface QuestionResponse {
  selected_option: 'A' | 'B' | 'C' | 'D' | null;
  is_marked_for_review: boolean;
  time_spent_seconds: number;
  change_count: number;
  visited: boolean;
}

export interface TestSession {
  test_id: string;
  test_title: string;
  mode: TestMode;
  seed: number;
  started_at: number;
  duration_seconds: number;
  questions: Question[];
  responses: Record<string, QuestionResponse>;
  is_submitted: boolean;
  submitted_at?: number;
}

export interface TopicMetric {
  topic: string;
  attempted: number;
  correct: number;
  wrong: number;
  accuracy: number;
  net_marks: number;
}

export interface PsychometricReport {
  test_id: string;
  test_title: string;
  timestamp: number;
  duration_used_seconds: number;
  total_score: number; // out of 200 for full
  max_possible_score: number;
  part_scores: {
    A: { attempted: number; correct: number; wrong: number; marks: number; max_allowed: number };
    B: { attempted: number; correct: number; wrong: number; marks: number; max_allowed: number };
    C: { attempted: number; correct: number; wrong: number; marks: number; max_allowed: number };
  };
  total_attempted: number;
  total_correct: number;
  total_wrong: number;
  total_negative_marks: number;
  overall_accuracy: number;
  estimated_percentile: number;
  predicted_rank_range: string;
  cutoff_status: {
    jrf_qualified: boolean;
    ls_qualified: boolean;
    jrf_cutoff_estimate: number;
    ls_cutoff_estimate: number;
  };
  topic_breakdown: Record<string, TopicMetric>;
  difficulty_breakdown: {
    Easy: { attempted: number; correct: number; wrong: number; accuracy: number };
    Medium: { attempted: number; correct: number; wrong: number; accuracy: number };
    Hard: { attempted: number; correct: number; wrong: number; accuracy: number };
  };
  behavioral_metrics: {
    average_speed_sec: number;
    skipped_count: number;
    change_count: number;
    speed_rating: 'Optimal' | 'Fast / Risk of Errors' | 'Slow / Time Starved';
    panic_accuracy: string;
  };
  weakness_summary: {
    strong_topics: string[];
    moderate_topics: string[];
    weak_topics: string[];
    critical_weak_areas: string[];
  };
  ai_coaching_feedback?: AICoachFeedback;
}

export interface AICoachFeedback {
  executive_summary: string;
  expected_score_range: string;
  strong_areas: string[];
  critical_weak_areas: string[];
  priority_action_items: string[];
  part_a_advice: string;
  part_b_advice: string;
  part_c_advice: string;
  negative_marking_rule: string;
  plan_7_day: Array<{ day: string; focus: string; tasks: string }>;
  plan_30_day: Array<{ week: string; milestone: string }>;
  plan_60_day: Array<{ phase: string; strategy: string }>;
}

export interface CustomTestConfig {
  part?: ExamPart | 'ALL';
  selectedUnits: string[];
  questionCount: number;
  timeLimitMinutes: number;
  difficulty: 'All' | DifficultyLevel;
}
