import {
  Question,
  QuestionOption,
  TestMode,
  TestSession,
  QuestionResponse,
  PsychometricReport,
  CustomTestConfig,
  TopicMetric,
} from '../types/exam';
import { INITIAL_QUESTION_BANK } from '../data/questionBank';
import { CSIR_EXAM_RULES } from '../data/syllabus';

// Seeded Linear Congruential Generator for reproducible yet completely randomized test papers
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed % 2147483647;
    if (this.seed <= 0) this.seed += 2147483646;
  }

  next(): number {
    this.seed = (this.seed * 16807) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }
}

// Shuffles an array with a seeded RNG
export function shuffleArray<T>(array: T[], rng: SeededRandom): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng.next() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Shuffles the options of a question and safely remaps the correct_answer key
export function shuffleQuestionOptions(question: Question, rng: SeededRandom): Question {
  const originalOptions = question.options;
  const correctText = originalOptions.find((o) => o.id === question.correct_answer)?.text || '';

  const shuffledOptionsRaw = shuffleArray(originalOptions, rng);
  const keys: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];

  const newOptions: QuestionOption[] = shuffledOptionsRaw.map((opt, idx) => ({
    id: keys[idx],
    text: opt.text,
  }));

  const newCorrectKey = newOptions.find((o) => o.text === correctText)?.id || 'A';

  return {
    ...question,
    options: newOptions,
    correct_answer: newCorrectKey,
  };
}

// Generates a mock test session
export function createTestSession(
  mode: TestMode,
  customConfig?: CustomTestConfig,
  customQuestionBank: Question[] = INITIAL_QUESTION_BANK
): TestSession {
  const seed = Date.now() ^ (Math.random() * 0x7fffffff);
  const rng = new SeededRandom(seed);

  let selectedQuestions: Question[] = [];
  let testTitle = '';
  let durationSeconds = 180 * 60; // default 3 hours

  if (mode === 'full_length') {
    testTitle = 'CSIR-UGC-DBT JRF-NET Full-Length Simulation (Parts A, B, C)';
    durationSeconds = 180 * 60;

    // Filter by Part
    const partAQuestions = customQuestionBank.filter((q) => q.part === 'A');
    const partBQuestions = customQuestionBank.filter((q) => q.part === 'B');
    const partCQuestions = customQuestionBank.filter((q) => q.part === 'C');

    // Shuffle and pick
    const shuffledA = shuffleArray(partAQuestions, rng).map((q) => shuffleQuestionOptions(q, rng));
    const shuffledB = shuffleArray(partBQuestions, rng).map((q) => shuffleQuestionOptions(q, rng));
    const shuffledC = shuffleArray(partCQuestions, rng).map((q) => shuffleQuestionOptions(q, rng));

    selectedQuestions = [...shuffledA, ...shuffledB, ...shuffledC];
  } else if (mode === 'unit_wise') {
    const targetUnit = customConfig?.selectedUnits?.[0] || 'Molecular Biology';
    testTitle = `Unit-Wise Mastery Test: ${targetUnit}`;
    durationSeconds = (customConfig?.timeLimitMinutes || 45) * 60;

    const unitQuestions = customQuestionBank.filter(
      (q) => q.topic.toLowerCase() === targetUnit.toLowerCase() || targetUnit === 'ALL'
    );
    const pool = unitQuestions.length >= 5 ? unitQuestions : customQuestionBank;
    selectedQuestions = shuffleArray(pool, rng)
      .slice(0, customConfig?.questionCount || 15)
      .map((q) => shuffleQuestionOptions(q, rng));
  } else if (mode === 'daily_sprint') {
    testTitle = 'Daily High-Yield Practice Sprint (15 Questions)';
    durationSeconds = 20 * 60;

    selectedQuestions = shuffleArray(customQuestionBank, rng)
      .slice(0, 15)
      .map((q) => shuffleQuestionOptions(q, rng));
  } else if (mode === 'pyq') {
    testTitle = 'Previous Year Pattern Benchmark Test';
    durationSeconds = 60 * 60;

    const pyqs = customQuestionBank.filter((q) => !!q.year_tag);
    selectedQuestions = shuffleArray(pyqs.length > 0 ? pyqs : customQuestionBank, rng)
      .slice(0, 25)
      .map((q) => shuffleQuestionOptions(q, rng));
  } else {
    // Custom test
    testTitle = `Custom Practice Session (${customConfig?.questionCount || 20} Questions)`;
    durationSeconds = (customConfig?.timeLimitMinutes || 30) * 60;

    let pool = customQuestionBank;
    if (customConfig?.selectedUnits && customConfig.selectedUnits.length > 0 && !customConfig.selectedUnits.includes('ALL')) {
      pool = pool.filter((q) => customConfig.selectedUnits.includes(q.topic));
    }
    if (customConfig?.difficulty && customConfig.difficulty !== 'All') {
      pool = pool.filter((q) => q.difficulty === customConfig.difficulty);
    }
    if (customConfig?.part && customConfig.part !== 'ALL') {
      pool = pool.filter((q) => q.part === customConfig.part);
    }

    if (pool.length === 0) pool = customQuestionBank;

    selectedQuestions = shuffleArray(pool, rng)
      .slice(0, customConfig?.questionCount || 20)
      .map((q) => shuffleQuestionOptions(q, rng));
  }

  // Initial empty responses
  const responses: Record<string, QuestionResponse> = {};
  selectedQuestions.forEach((q) => {
    responses[q.id] = {
      selected_option: null,
      is_marked_for_review: false,
      time_spent_seconds: 0,
      change_count: 0,
      visited: false,
    };
  });

  return {
    test_id: `test_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    test_title: testTitle,
    mode,
    seed,
    started_at: Date.now(),
    duration_seconds: durationSeconds,
    questions: selectedQuestions,
    responses,
    is_submitted: false,
  };
}

// Calculates authentic CSIR psychometrics report
export function calculatePsychometricReport(session: TestSession): PsychometricReport {
  const durationUsed = Math.min(
    session.duration_seconds,
    Math.round(((session.submitted_at || Date.now()) - session.started_at) / 1000)
  );

  const partLimits = {
    A: CSIR_EXAM_RULES.sections.A.maxAttemptAllowed,
    B: CSIR_EXAM_RULES.sections.B.maxAttemptAllowed,
    C: CSIR_EXAM_RULES.sections.C.maxAttemptAllowed,
  };

  const partMarks = {
    A: { correct: CSIR_EXAM_RULES.sections.A.marksPerQuestion, penalty: CSIR_EXAM_RULES.sections.A.negativeMarkPenalty },
    B: { correct: CSIR_EXAM_RULES.sections.B.marksPerQuestion, penalty: CSIR_EXAM_RULES.sections.B.negativeMarkPenalty },
    C: { correct: CSIR_EXAM_RULES.sections.C.marksPerQuestion, penalty: CSIR_EXAM_RULES.sections.C.negativeMarkPenalty },
  };

  // Group responses by part
  const partAttempts: Record<'A' | 'B' | 'C', Question[]> = { A: [], B: [], C: [] };
  session.questions.forEach((q) => {
    const res = session.responses[q.id];
    if (res && res.selected_option !== null) {
      partAttempts[q.part].push(q);
    }
  });

  // Authentic CSIR NTA Rule: If a candidate attempts more than maximum allowed,
  // only the first N questions attempted in order of appearance are evaluated!
  const partStats = {
    A: { attempted: 0, correct: 0, wrong: 0, marks: 0, max_allowed: partLimits.A },
    B: { attempted: 0, correct: 0, wrong: 0, marks: 0, max_allowed: partLimits.B },
    C: { attempted: 0, correct: 0, wrong: 0, marks: 0, max_allowed: partLimits.C },
  };

  const topicMap: Record<string, TopicMetric> = {};
  const diffMap = {
    Easy: { attempted: 0, correct: 0, wrong: 0, accuracy: 0 },
    Medium: { attempted: 0, correct: 0, wrong: 0, accuracy: 0 },
    Hard: { attempted: 0, correct: 0, wrong: 0, accuracy: 0 },
  };

  let totalNegativeMarks = 0;
  let totalTime = 0;
  let totalChanges = 0;
  let skippedCount = 0;

  session.questions.forEach((q) => {
    const res = session.responses[q.id];
    totalTime += res?.time_spent_seconds || 0;
    totalChanges += res?.change_count || 0;

    // Track topic map
    if (!topicMap[q.topic]) {
      topicMap[q.topic] = {
        topic: q.topic,
        attempted: 0,
        correct: 0,
        wrong: 0,
        accuracy: 0,
        net_marks: 0,
      };
    }

    if (!res || res.selected_option === null) {
      skippedCount++;
      return;
    }

    // Check if within attempt limits for its part
    const partQuestionsAttempted = partAttempts[q.part];
    const indexInAttempted = partQuestionsAttempted.findIndex((item) => item.id === q.id);

    const isCounted = indexInAttempted < partLimits[q.part];

    const isCorrect = res.selected_option === q.correct_answer;
    const rule = partMarks[q.part];

    if (isCounted) {
      partStats[q.part].attempted++;
      topicMap[q.topic].attempted++;
      diffMap[q.difficulty].attempted++;

      if (isCorrect) {
        partStats[q.part].correct++;
        partStats[q.part].marks += rule.correct;
        topicMap[q.topic].correct++;
        topicMap[q.topic].net_marks += rule.correct;
        diffMap[q.difficulty].correct++;
      } else {
        partStats[q.part].wrong++;
        partStats[q.part].marks -= rule.penalty;
        totalNegativeMarks += rule.penalty;
        topicMap[q.topic].wrong++;
        topicMap[q.topic].net_marks -= rule.penalty;
        diffMap[q.difficulty].wrong++;
      }
    }
  });

  // Calculate accuracies
  Object.values(topicMap).forEach((t) => {
    t.accuracy = t.attempted > 0 ? Math.round((t.correct / t.attempted) * 100) : 0;
  });

  (['Easy', 'Medium', 'Hard'] as const).forEach((d) => {
    diffMap[d].accuracy = diffMap[d].attempted > 0 ? Math.round((diffMap[d].correct / diffMap[d].attempted) * 100) : 0;
  });

  const totalScore = Math.max(0, Number((partStats.A.marks + partStats.B.marks + partStats.C.marks).toFixed(2)));
  const totalAttempted = partStats.A.attempted + partStats.B.attempted + partStats.C.attempted;
  const totalCorrect = partStats.A.correct + partStats.B.correct + partStats.C.correct;
  const totalWrong = partStats.A.wrong + partStats.B.wrong + partStats.C.wrong;
  const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

  // Percentile Estimation based on CSIR Life Sciences score normal distribution
  let estimatedPercentile = 50.0;
  if (totalScore >= 140) estimatedPercentile = 99.8;
  else if (totalScore >= 125) estimatedPercentile = 99.2;
  else if (totalScore >= 115) estimatedPercentile = 98.4;
  else if (totalScore >= 105) estimatedPercentile = 97.0;
  else if (totalScore >= 95) estimatedPercentile = 94.5;
  else if (totalScore >= 85) estimatedPercentile = 89.0;
  else if (totalScore >= 70) estimatedPercentile = 78.0;
  else if (totalScore >= 55) estimatedPercentile = 62.0;
  else estimatedPercentile = Math.max(10, Math.round((totalScore / 55) * 60));

  // Predicted Rank Range
  let rankRange = 'Rank 1500+';
  if (totalScore >= 135) rankRange = 'Top 1 - 50 (All India Rank)';
  else if (totalScore >= 120) rankRange = 'Rank 51 - 200 (JRF Confirmed)';
  else if (totalScore >= 110) rankRange = 'Rank 201 - 500 (JRF High Probability)';
  else if (totalScore >= 98) rankRange = 'Rank 501 - 1200 (Lectureship / Assistant Prof)';
  else rankRange = 'Rank 1500+ (Revision Required)';

  // Weakness detection
  const strongTopics: string[] = [];
  const moderateTopics: string[] = [];
  const weakTopics: string[] = [];
  const criticalWeakAreas: string[] = [];

  Object.values(topicMap).forEach((t) => {
    if (t.attempted >= 1) {
      if (t.accuracy >= 75) {
        strongTopics.push(t.topic);
      } else if (t.accuracy >= 50) {
        moderateTopics.push(t.topic);
      } else if (t.accuracy >= 30) {
        weakTopics.push(t.topic);
      } else {
        criticalWeakAreas.push(t.topic);
      }
    }
  });

  const avgSpeedSec = totalAttempted > 0 ? Math.round(durationUsed / totalAttempted) : 0;
  let speedRating: 'Optimal' | 'Fast / Risk of Errors' | 'Slow / Time Starved' = 'Optimal';
  if (avgSpeedSec < 40) speedRating = 'Fast / Risk of Errors';
  else if (avgSpeedSec > 130) speedRating = 'Slow / Time Starved';

  return {
    test_id: session.test_id,
    test_title: session.test_title,
    timestamp: Date.now(),
    duration_used_seconds: durationUsed,
    total_score: totalScore,
    max_possible_score: session.mode === 'full_length' ? 200 : session.questions.length * 2,
    part_scores: partStats,
    total_attempted: totalAttempted,
    total_correct: totalCorrect,
    total_wrong: totalWrong,
    total_negative_marks: Number(totalNegativeMarks.toFixed(2)),
    overall_accuracy: overallAccuracy,
    estimated_percentile: estimatedPercentile,
    predicted_rank_range: rankRange,
    cutoff_status: {
      jrf_qualified: totalScore >= CSIR_EXAM_RULES.cutoffs.jrf_general,
      ls_qualified: totalScore >= CSIR_EXAM_RULES.cutoffs.ls_general,
      jrf_cutoff_estimate: CSIR_EXAM_RULES.cutoffs.jrf_general,
      ls_cutoff_estimate: CSIR_EXAM_RULES.cutoffs.ls_general,
    },
    topic_breakdown: topicMap,
    difficulty_breakdown: diffMap,
    behavioral_metrics: {
      average_speed_sec: avgSpeedSec,
      skipped_count: skippedCount,
      change_count: totalChanges,
      speed_rating: speedRating,
      panic_accuracy: avgSpeedSec < 45 && overallAccuracy < 50 ? 'Severe Degradation' : 'Stable',
    },
    weakness_summary: {
      strong_topics: strongTopics,
      moderate_topics: moderateTopics,
      weak_topics: weakTopics,
      critical_weak_areas: criticalWeakAreas,
    },
  };
}
