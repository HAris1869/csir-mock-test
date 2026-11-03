import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  CheckCircle2,
  RotateCcw,
  Send,
  HelpCircle,
  ShieldAlert,
} from 'lucide-react';
import { TestSession, Question, ExamPart } from '../types/exam';
import { CSIR_EXAM_RULES } from '../data/syllabus';

interface ExamViewProps {
  session: TestSession;
  onUpdateResponse: (questionId: string, option: 'A' | 'B' | 'C' | 'D' | null, markForReview: boolean) => void;
  onSubmitExam: () => void;
}

export const ExamView: React.FC<ExamViewProps> = ({ session, onUpdateResponse, onSubmitExam }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [activePartFilter, setActivePartFilter] = useState<ExamPart>('A');
  const [timeLeft, setTimeLeft] = useState(session.duration_seconds);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [timeWarning, setTimeWarning] = useState<string | null>(null);

  const timerRef = useRef<any>(null);
  const questionStartTimeRef = useRef<number>(Date.now());

  // Filter questions by selected part if applicable
  const currentQuestion = session.questions[currentIdx] || session.questions[0];

  // Auto sync activePartFilter when currentIdx changes
  useEffect(() => {
    if (currentQuestion && currentQuestion.part !== activePartFilter) {
      setActivePartFilter(currentQuestion.part);
    }
  }, [currentIdx, currentQuestion]);

  // Countdown Timer System
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          onSubmitExam();
          return 0;
        }

        // Warnings at 30 min, 10 min, 5 min, 1 min
        if (prev === 30 * 60) setTimeWarning('30 Minutes Remaining! Review your unattempted questions.');
        else if (prev === 10 * 60) setTimeWarning('10 Minutes Remaining! Check your marked questions.');
        else if (prev === 5 * 60) setTimeWarning('5 Minutes Remaining! Final review phase.');
        else if (prev === 60) setTimeWarning('1 Minute Remaining! Exam will auto-submit shortly.');

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [onSubmitExam]);

  // Format seconds to HH:MM:SS
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentResponse = session.responses[currentQuestion?.id] || {
    selected_option: null,
    is_marked_for_review: false,
    time_spent_seconds: 0,
    change_count: 0,
    visited: true,
  };

  // Mark visited
  useEffect(() => {
    if (currentQuestion && !session.responses[currentQuestion.id]?.visited) {
      onUpdateResponse(currentQuestion.id, currentResponse.selected_option, currentResponse.is_marked_for_review);
    }
    questionStartTimeRef.current = Date.now();
  }, [currentIdx, currentQuestion]);

  // Handle Option Select
  const handleSelectOption = (optionKey: 'A' | 'B' | 'C' | 'D') => {
    onUpdateResponse(currentQuestion.id, optionKey, currentResponse.is_marked_for_review);
  };

  // Clear Response
  const handleClearResponse = () => {
    onUpdateResponse(currentQuestion.id, null, currentResponse.is_marked_for_review);
  };

  // Mark for review & Next
  const handleMarkForReviewAndNext = () => {
    onUpdateResponse(currentQuestion.id, currentResponse.selected_option, !currentResponse.is_marked_for_review);
    if (currentIdx < session.questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  // Save & Next
  const handleSaveAndNext = () => {
    if (currentIdx < session.questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  // Previous
  const handlePrevious = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  // Calculate Part Statistics for the top bar
  const getPartAttemptCount = (part: ExamPart) => {
    return session.questions.filter((q) => q.part === part && session.responses[q.id]?.selected_option !== null).length;
  };

  const partAttemptCounts = {
    A: getPartAttemptCount('A'),
    B: getPartAttemptCount('B'),
    C: getPartAttemptCount('C'),
  };

  const partRules = CSIR_EXAM_RULES.sections;

  // Determine question palette status
  const getQuestionStatus = (q: Question) => {
    const res = session.responses[q.id];
    if (!res || !res.visited) return 'not_visited';
    if (res.selected_option !== null && res.is_marked_for_review) return 'answered_and_marked';
    if (res.is_marked_for_review) return 'marked';
    if (res.selected_option !== null) return 'answered';
    return 'not_answered';
  };

  // Jump to next question in selected part
  const handlePartTabClick = (part: ExamPart) => {
    setActivePartFilter(part);
    const targetIdx = session.questions.findIndex((q) => q.part === part);
    if (targetIdx !== -1) {
      setCurrentIdx(targetIdx);
    }
  };

  // Exceeding attempt warning check
  const isCurrentPartExceeded =
    partAttemptCounts[currentQuestion.part] > partRules[currentQuestion.part].maxAttemptAllowed;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-100 flex flex-col">
      {/* Time Warning Toast */}
      {timeWarning && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 font-medium text-xs flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>{timeWarning}</span>
          </div>
          <button onClick={() => setTimeWarning(null)} className="text-xs font-bold px-2 py-0.5 hover:bg-amber-600 rounded">
            Dismiss
          </button>
        </div>
      )}

      {/* Top Telemetry & Section Switcher */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-xs font-semibold text-slate-800">
              <span className="text-slate-400 font-normal">Candidate:</span> Roll 2026-CSIR-JRF
            </div>
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <div className="text-xs font-semibold text-slate-800 hidden sm:block">
              <span className="text-slate-400 font-normal">Paper:</span> Life Sciences & Biotech
            </div>
          </div>

          {/* Section Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
            {(['A', 'B', 'C'] as ExamPart[]).map((partKey) => {
              const rule = partRules[partKey];
              const attempts = partAttemptCounts[partKey];
              const isOver = attempts > rule.maxAttemptAllowed;

              return (
                <button
                  key={partKey}
                  onClick={() => handlePartTabClick(partKey)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-2 ${
                    activePartFilter === partKey
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  <span>Part {partKey}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                      activePartFilter === partKey
                        ? 'bg-blue-700 text-white'
                        : isOver
                        ? 'bg-rose-100 text-rose-700 font-bold'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {attempts}/{rule.maxAttemptAllowed}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Real-time Countdown Timer */}
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border font-mono text-sm font-bold tabular-nums ${
                timeLeft < 600
                  ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <Clock className="w-4 h-4 text-slate-500" />
              <span>{formatTime(timeLeft)}</span>
            </div>
            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm"
            >
              Submit Exam
            </button>
          </div>
        </div>
      </div>

      {/* Main Examination Layout: Question Stage (Left) + Palette (Right) */}
      <div className="max-w-7xl mx-auto w-full flex-1 p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Stage: Active Question Area (8 cols) */}
        <div className="lg:col-span-8 flex flex-col bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          {/* Question Metadata Header */}
          <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <span className="font-bold text-slate-900 text-sm">Question {currentIdx + 1}</span>
              <span>·</span>
              <span className="font-semibold text-blue-700">Part {currentQuestion.part}</span>
              <span>·</span>
              <span>{currentQuestion.topic}</span>
              <span>·</span>
              <span className="text-slate-500">{currentQuestion.difficulty}</span>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-emerald-700 font-medium">
                Correct: +{partRules[currentQuestion.part].marksPerQuestion}
              </span>
              <span className="text-rose-600 font-medium">
                Penalty: -{partRules[currentQuestion.part].negativeMarkPenalty}
              </span>
            </div>
          </div>

          {/* Attempt Over-Limit Warning */}
          {isCurrentPartExceeded && (
            <div className="bg-rose-50 border-b border-rose-200 px-6 py-2 text-xs text-rose-800 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              <span>
                <strong>Warning:</strong> You have attempted {partAttemptCounts[currentQuestion.part]} questions in Part{' '}
                {currentQuestion.part}. CSIR NTA rules evaluate only the first{' '}
                {partRules[currentQuestion.part].maxAttemptAllowed} questions in sequence!
              </span>
            </div>
          )}

          {/* Question Stem & Body */}
          <div className="p-6 flex-1 overflow-y-auto">
            <div className="text-base text-slate-900 leading-relaxed font-normal whitespace-pre-line mb-6">
              {currentQuestion.question_text}
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = currentResponse.selected_option === option.id;

                return (
                  <label
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    className={`flex items-start gap-3.5 p-4 rounded-xl border text-sm cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-50/70 border-blue-500 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-100 text-slate-700 border-slate-300'
                      }`}
                    >
                      {option.id}
                    </div>
                    <span className="text-slate-800 leading-relaxed font-normal flex-1">{option.text}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentIdx === 0}
                className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                onClick={handleClearResponse}
                disabled={currentResponse.selected_option === null}
                className="px-3.5 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Clear Response
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleMarkForReviewAndNext}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 ${
                  currentResponse.is_marked_for_review
                    ? 'bg-purple-100 border-purple-300 text-purple-800'
                    : 'bg-white border-slate-300 text-purple-700 hover:bg-purple-50'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                {currentResponse.is_marked_for_review ? 'Unmark Review' : 'Mark for Review & Next'}
              </button>
              <button
                onClick={handleSaveAndNext}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
              >
                Save & Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Stage: Question Palette & Candidate Profile (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Candidate Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center font-bold text-slate-700 text-sm">
                LS
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 leading-tight">Haris Bashir</h4>
                <p className="text-xs text-slate-500 font-mono">Applet ID: 3ea3b27a</p>
              </div>
            </div>
          </div>

          {/* Question Palette Widget */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex-1 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Question Palette</h3>
              <span className="text-xs text-slate-500 font-mono">
                Part {activePartFilter} ({session.questions.filter((q) => q.part === activePartFilter).length} Questions)
              </span>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-emerald-600 text-white flex items-center justify-center text-[9px] font-bold">
                  ✓
                </span>
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-rose-600 text-white flex items-center justify-center text-[9px] font-bold">
                  !
                </span>
                <span>Not Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-purple-600 text-white flex items-center justify-center text-[9px] font-bold">
                  ?
                </span>
                <span>Marked</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-slate-200 border border-slate-300"></span>
                <span>Not Visited</span>
              </div>
            </div>

            {/* Questions Grid */}
            <div className="flex-1 overflow-y-auto max-h-[360px] pr-1">
              <div className="grid grid-cols-5 gap-2">
                {session.questions.map((q, idx) => {
                  const status = getQuestionStatus(q);
                  const isCurrent = idx === currentIdx;

                  let bgClass = 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200';
                  if (status === 'answered') {
                    bgClass = 'bg-emerald-600 text-white hover:bg-emerald-700 border-emerald-700';
                  } else if (status === 'not_answered') {
                    bgClass = 'bg-rose-600 text-white hover:bg-rose-700 border-rose-700';
                  } else if (status === 'marked') {
                    bgClass = 'bg-purple-600 text-white hover:bg-purple-700 border-purple-700';
                  } else if (status === 'answered_and_marked') {
                    bgClass =
                      'bg-purple-600 text-white hover:bg-purple-700 border-purple-700 relative after:content-[""] after:absolute after:bottom-0.5 after:right-0.5 after:w-1.5 after:h-1.5 after:bg-emerald-400 after:rounded-full';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIdx(idx)}
                      className={`h-9 rounded-lg font-mono text-xs font-semibold flex items-center justify-center border transition-all ${bgClass} ${
                        isCurrent ? 'ring-2 ring-blue-600 ring-offset-1' : ''
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Summary Statistics */}
            <div className="pt-3 mt-3 border-t border-slate-200 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-emerald-50 rounded p-1.5 border border-emerald-100">
                <div className="font-bold text-emerald-800 text-sm">
                  {Object.values(session.responses).filter((r) => r.selected_option !== null).length}
                </div>
                <div className="text-[10px] text-emerald-600">Answered</div>
              </div>
              <div className="bg-purple-50 rounded p-1.5 border border-purple-100">
                <div className="font-bold text-purple-800 text-sm">
                  {Object.values(session.responses).filter((r) => r.is_marked_for_review).length}
                </div>
                <div className="text-[10px] text-purple-600">Marked</div>
              </div>
              <div className="bg-slate-50 rounded p-1.5 border border-slate-200">
                <div className="font-bold text-slate-700 text-sm">
                  {Object.values(session.responses).filter((r) => r.selected_option === null).length}
                </div>
                <div className="text-[10px] text-slate-500">Unanswered</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-1">Confirm Exam Submission</h3>
              <p className="text-xs text-slate-500 mb-5">
                Review your section-wise attempt counts before finalizing your CSIR-UGC-DBT JRF-NET score.
              </p>

              {/* Table of Attempts */}
              <div className="border border-slate-200 rounded-xl overflow-hidden mb-5">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3 font-semibold">Section</th>
                      <th className="py-2.5 px-3 font-semibold">Total Qs</th>
                      <th className="py-2.5 px-3 font-semibold">Attempted</th>
                      <th className="py-2.5 px-3 font-semibold">Allowed Cap</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {(['A', 'B', 'C'] as ExamPart[]).map((p) => {
                      const count = partAttemptCounts[p];
                      const cap = partRules[p].maxAttemptAllowed;
                      const total = session.questions.filter((q) => q.part === p).length;

                      return (
                        <tr key={p} className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-3 font-medium text-slate-900">Part {p}</td>
                          <td className="py-2.5 px-3 text-slate-600 font-mono">{total}</td>
                          <td className="py-2.5 px-3 font-mono font-bold">
                            <span className={count > cap ? 'text-rose-600' : 'text-emerald-700'}>{count}</span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-500 font-mono">Max {cap}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Return to Exam
                </button>
                <button
                  onClick={() => {
                    setShowSubmitModal(false);
                    onSubmitExam();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
                >
                  Confirm & Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
