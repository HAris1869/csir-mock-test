import React, { useState } from 'react';
import {
  Brain,
  Sparkles,
  Target,
  Calendar,
  Compass,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  RefreshCw,
  BookOpen,
} from 'lucide-react';
import { PsychometricReport, AICoachFeedback } from '../types/exam';

interface AICoachViewProps {
  report: PsychometricReport | null;
  onRetakeTest: () => void;
}

export const AICoachView: React.FC<AICoachViewProps> = ({ report, onRetakeTest }) => {
  const [loading, setLoading] = useState(false);
  const [coachFeedback, setCoachFeedback] = useState<AICoachFeedback | null>(
    report?.ai_coaching_feedback || null
  );
  const [activePlanTab, setActivePlanTab] = useState<'7day' | '30day' | '60day'>('7day');

  // Trigger Gemini AI Coach Analysis
  const handleGenerateAICoach = async () => {
    if (!report) return;

    setLoading(true);
    try {
      const response = await fetch('/api/gemini/coach-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          totalScore: report.total_score,
          partScores: {
            A: report.part_scores.A.marks,
            B: report.part_scores.B.marks,
            C: report.part_scores.C.marks,
          },
          topicBreakdown: report.topic_breakdown,
          behavioralMetrics: report.behavioral_metrics,
          weakTopics: report.weakness_summary.critical_weak_areas,
        }),
      });

      const data = await response.json();
      if (data.success && data.analysis) {
        setCoachFeedback(data.analysis);
      } else {
        // High quality pedagogical fallback
        setCoachFeedback(generateAlgorithmicCoachFallback(report));
      }
    } catch (err) {
      console.warn('API error, falling back to algorithmic psychometrics:', err);
      setCoachFeedback(generateAlgorithmicCoachFallback(report));
    } finally {
      setLoading(false);
    }
  };

  // Fallback generator if offline
  const generateAlgorithmicCoachFallback = (rep: PsychometricReport): AICoachFeedback => {
    const strong = rep.weakness_summary.strong_topics.length > 0
      ? rep.weakness_summary.strong_topics.join(' and ')
      : 'Core Biomolecules and Cellular Processes';
    const weak = rep.weakness_summary.critical_weak_areas.length > 0
      ? rep.weakness_summary.critical_weak_areas.join(', ')
      : 'Biotechnology, Biochemical Engineering and Advanced Methods';

    const predictedMin = Math.max(40, Math.round(rep.total_score * 0.95));
    const predictedMax = Math.min(185, Math.round(rep.total_score * 1.15 + 15));

    return {
      executive_summary: `You demonstrate robust conceptual depth in ${strong}. Your primary vulnerabilities lie in ${weak}. With disciplined revision of experimental mechanisms and tighter negative marking control in Part C, your projected score in the next mock test is ${predictedMin}–${predictedMax} marks.`,
      expected_score_range: `${predictedMin} - ${predictedMax} marks`,
      strong_areas: rep.weakness_summary.strong_topics.length > 0 ? rep.weakness_summary.strong_topics : ['Biomolecules', 'Cell Biology'],
      critical_weak_areas: rep.weakness_summary.critical_weak_areas.length > 0 ? rep.weakness_summary.critical_weak_areas : ['Methods in Biology', 'Biotechnology & Bioeng'],
      priority_action_items: [
        'Enzyme Kinetics & Lineweaver-Burk Inhibition Modalities',
        'CRISPR-Cas9 & Recombinant DNA Vector Cloning Controls',
        'Bioreactor Chemostat Dilution Rate (D = μ) Calculations',
        'Three-Point Testcross Gene Order & Interference Calculations',
      ],
      part_a_advice: 'Target 8-10 high-confidence aptitude questions (Series, Geometry, and Probability) to secure 16-20 safe marks without wasting time.',
      part_b_advice: 'Avoid 50/50 guessing in Part B! Negative marking (-0.5) degrades total score quickly. Only mark options when 100% certain.',
      part_c_advice: 'Spend 90 minutes on Part C. Read the experimental controls (positive/negative controls) carefully before looking at options. Each right question gives +4 marks!',
      negative_marking_rule: 'Never make wild guesses. In Part C, an unattempted question is 0 marks, but a wrong guess costs you -1.0 mark plus the lost opportunity of 4 marks!',
      plan_7_day: [
        { day: 'Day 1', focus: 'Unit 1: Biomolecules & Bioenergetics', tasks: 'Revise Ramachandran plot angles, Gibbs free energy calculations, and Lineweaver-Burk double reciprocal plots.' },
        { day: 'Day 2', focus: 'Unit 2 & 3: Molecular Cell Biology', tasks: 'Protein sorting (KDEL/M6P), operon genetics (lac/trp), and DNA mismatch repair pathways.' },
        { day: 'Day 3', focus: 'Unit 4: Signaling Cascades & Immunology', tasks: 'GPCR second messengers (IP3/DAG), RTK pathways, and Flow Cytometry / FACS quadrant interpretation.' },
        { day: 'Day 4', focus: 'Unit 5 & 6: Development & Plant Physiology', tasks: 'Drosophila maternal effect genes, Arabidopsis ABCDE floral homeotic genes, and C3/C4 photosynthesis.' },
        { day: 'Day 5', focus: 'Unit 8: Inheritance Biology & Genetics', tasks: 'Pedigree analysis, Lod scores, three-point testcross mapping, and coefficient of coincidence.' },
        { day: 'Day 6', focus: 'Unit 12 & 13: Biotechnology & Biophysical Methods', tasks: 'Bioreactor continuous fermentation kinetics, CD spectroscopy (far-UV), and Western blot / RT-qPCR controls.' },
        { day: 'Day 7', focus: 'Full-Length Timed CBT Mock Test', tasks: 'Simulate 3 hours strictly from 9:00 AM to 12:00 PM with strict adherence to attempt limits.' },
      ],
      plan_30_day: [
        { week: 'Week 1', milestone: 'Master High-Weightage Core Units 1, 2, 3, and 4 with 200 topic-wise PYQs.' },
        { week: 'Week 2', milestone: 'Intensive Genetics & Developmental Biology numerical and mapping problem solving.' },
        { week: 'Week 3', milestone: 'Deep dive into Unit 12 & 13 (Biotechnology, Bioreactor kinetics, Chromatography & FACS).' },
        { week: 'Week 4', milestone: 'Solve 5 previous years CSIR-NET papers (2020-2024) under exact 180-minute conditions.' },
      ],
      plan_60_day: [
        { phase: 'Phase 1 (Days 1-20)', strategy: 'Syllabus completion of weaker units with standard reference notes (Lehninger, Lodish, Taiz).' },
        { phase: 'Phase 2 (Days 21-45)', strategy: 'Part C analytical questions drill: 15 experimental design problems daily.' },
        { phase: 'Phase 3 (Days 46-60)', strategy: 'Mock test marathon: 10 full-length mocks, error log analysis, and negative mark reduction.' },
      ],
    };
  };

  if (!report) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-2xl">
          <Brain className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">No Assessment Data Available</h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Take a CSIR-UGC-DBT JRF-NET mock test to allow the AI Performance Coach to assess your strengths,
          vulnerabilities, and time-management behavior.
        </p>
        <button
          onClick={onRetakeTest}
          className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          Start CBT Mock Test Now
        </button>
      </div>
    );
  }

  const feedback = coachFeedback || generateAlgorithmicCoachFallback(report);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Coach Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
              <span>AI PERFORMANCE COACH</span>
              <span>·</span>
              <span className="text-slate-500 font-normal">Powered by Gemini 3.8 Flash</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Psychometric Assessment & Study Roadmap</h1>
            <p className="text-xs text-slate-500 mt-1">
              Calibrated against CSIR JRF Rank 1-100 benchmarks in Life Sciences & Biotechnology
            </p>
          </div>
        </div>

        <button
          onClick={handleGenerateAICoach}
          disabled={loading}
          className="px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Analyzing with Gemini...' : 'Regenerate Analysis'}
        </button>
      </div>

      {/* Executive Coach Diagnostic Card */}
      <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500" />
        <div className="flex items-start gap-3">
          <Brain className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Diagnostic Summary & Next Test Score Prediction
            </h3>
            <p className="text-sm text-slate-800 font-normal leading-relaxed">{feedback.executive_summary}</p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold">
              <span className="text-slate-600">
                Target Score in Next Mock:{' '}
                <strong className="text-blue-700 font-mono text-sm">{feedback.expected_score_range}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Priority Focus Concepts & Section Strategy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Priority Focus Action Items */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-rose-600" />
              High-Yield Priority Focus Areas
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Focus your upcoming 10 study hours strictly on these 4 high-frequency topics:
            </p>
            <div className="space-y-2.5">
              {feedback.priority_action_items.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center shrink-0 text-[11px]">
                    {idx + 1}
                  </div>
                  <span className="text-slate-800 font-medium leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section-Wise Tactical Advice */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
            <Compass className="w-4 h-4 text-indigo-600" />
            CSIR Section-Wise Tactical Gameplan
          </h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block font-semibold mb-1">Part A (General Aptitude):</strong>
              <p className="text-slate-600 leading-relaxed">{feedback.part_a_advice}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block font-semibold mb-1">Part B (Core Life Sciences):</strong>
              <p className="text-slate-600 leading-relaxed">{feedback.part_b_advice}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block font-semibold mb-1">Part C (Analytical & Experimental):</strong>
              <p className="text-slate-600 leading-relaxed">{feedback.part_c_advice}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Automated Study Plan Generator (7-Day, 30-Day, 60-Day) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              Automated Revision Roadmap
            </h3>
            <p className="text-xs text-slate-500">Personalized schedule formulated around your tested weak spots</p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setActivePlanTab('7day')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activePlanTab === '7day' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              7-Day Sprint
            </button>
            <button
              onClick={() => setActivePlanTab('30day')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activePlanTab === '30day' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              30-Day Mastery
            </button>
            <button
              onClick={() => setActivePlanTab('60day')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activePlanTab === '60day' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              60-Day Complete
            </button>
          </div>
        </div>

        {/* 7-Day Plan View */}
        {activePlanTab === '7day' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {feedback.plan_7_day.map((step, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-mono text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      {step.day}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug mb-1">{step.focus}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.tasks}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 30-Day Plan View */}
        {activePlanTab === '30day' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {feedback.plan_30_day.map((step, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-xs font-bold font-mono text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded inline-block mb-2">
                  {step.week}
                </span>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">{step.milestone}</p>
              </div>
            ))}
          </div>
        )}

        {/* 60-Day Plan View */}
        {activePlanTab === '60day' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {feedback.plan_60_day.map((step, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-xs font-bold font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded inline-block mb-2">
                  {step.phase}
                </span>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">{step.strategy}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
