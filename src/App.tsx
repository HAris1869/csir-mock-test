import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { TestModeSelector } from './components/TestModeSelector';
import { ExamView } from './components/ExamView';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { AICoachView } from './components/AICoachView';
import { AdminPanel } from './components/AdminPanel';
import { PythonDeploymentModal } from './components/PythonDeploymentModal';
import { Question, TestSession, PsychometricReport, TestMode, CustomTestConfig } from './types/exam';
import { INITIAL_QUESTION_BANK } from './data/questionBank';
import { createTestSession, calculatePsychometricReport } from './services/examEngine';

export default function App() {
  const [activeTab, setActiveTab] = useState<'arena' | 'analytics' | 'coach' | 'admin' | 'python'>('arena');
  const [questionBank, setQuestionBank] = useState<Question[]>(() => {
    const saved = localStorage.getItem('csir_question_bank');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved question bank:', e);
      }
    }
    return INITIAL_QUESTION_BANK;
  });

  const [currentSession, setCurrentSession] = useState<TestSession | null>(() => {
    const saved = localStorage.getItem('csir_current_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse current test session:', e);
      }
    }
    return null;
  });

  const [latestReport, setLatestReport] = useState<PsychometricReport | null>(() => {
    const saved = localStorage.getItem('csir_latest_report');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse latest report:', e);
      }
    }
    return null;
  });

  const [latestQuestions, setLatestQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem('csir_latest_questions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_QUESTION_BANK;
  });

  const [latestResponses, setLatestResponses] = useState<Record<string, any>>(() => {
    const saved = localStorage.getItem('csir_latest_responses');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {};
  });

  // Persist bank to localStorage
  useEffect(() => {
    localStorage.setItem('csir_question_bank', JSON.stringify(questionBank));
  }, [questionBank]);

  // Persist session to localStorage
  useEffect(() => {
    if (currentSession) {
      localStorage.setItem('csir_current_session', JSON.stringify(currentSession));
    } else {
      localStorage.removeItem('csir_current_session');
    }
  }, [currentSession]);

  // Persist report to localStorage
  useEffect(() => {
    if (latestReport) {
      localStorage.setItem('csir_latest_report', JSON.stringify(latestReport));
    }
  }, [latestReport]);

  // Start a new test
  const handleStartTest = (mode: TestMode, customConfig?: CustomTestConfig) => {
    const newSession = createTestSession(mode, customConfig, questionBank);
    setCurrentSession(newSession);
    setActiveTab('arena');
  };

  // Update response during active exam
  const handleUpdateResponse = (
    questionId: string,
    option: 'A' | 'B' | 'C' | 'D' | null,
    markForReview: boolean
  ) => {
    if (!currentSession) return;

    setCurrentSession((prev) => {
      if (!prev) return null;
      const prevResponse = prev.responses[questionId] || {
        selected_option: null,
        is_marked_for_review: false,
        time_spent_seconds: 0,
        change_count: 0,
        visited: true,
      };

      const hasChangedChoice = prevResponse.selected_option !== null && prevResponse.selected_option !== option;

      const updated = {
        ...prev,
        responses: {
          ...prev.responses,
          [questionId]: {
            ...prevResponse,
            selected_option: option,
            is_marked_for_review: markForReview,
            visited: true,
            change_count: prevResponse.change_count + (hasChangedChoice ? 1 : 0),
          },
        },
      };
      return updated;
    });
  };

  // Submit active exam
  const handleSubmitExam = () => {
    if (!currentSession) return;

    const submittedSession: TestSession = {
      ...currentSession,
      is_submitted: true,
      submitted_at: Date.now(),
    };

    const report = calculatePsychometricReport(submittedSession);
    setLatestReport(report);
    setLatestQuestions(submittedSession.questions);
    setLatestResponses(submittedSession.responses);

    localStorage.setItem('csir_latest_questions', JSON.stringify(submittedSession.questions));
    localStorage.setItem('csir_latest_responses', JSON.stringify(submittedSession.responses));

    setCurrentSession(null);
    setActiveTab('analytics');
  };

  // Question Bank operations
  const handleAddQuestion = (newQuestion: Question) => {
    setQuestionBank((prev) => [newQuestion, ...prev]);
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestionBank((prev) => prev.filter((q) => q.id !== id));
  };

  const handleImportQuestions = (imported: Question[]) => {
    setQuestionBank((prev) => [...imported, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isTestActive={!!currentSession && !currentSession.is_submitted}
        onStartNewTest={() => {
          setCurrentSession(null);
          setActiveTab('arena');
        }}
      />

      <main className="flex-1">
        {/* TAB 1: ARENA */}
        {activeTab === 'arena' && (
          <>
            {currentSession && !currentSession.is_submitted ? (
              <ExamView
                session={currentSession}
                onUpdateResponse={handleUpdateResponse}
                onSubmitExam={handleSubmitExam}
              />
            ) : (
              <TestModeSelector
                onStartTest={handleStartTest}
                totalQuestionsInBank={questionBank.length}
              />
            )}
          </>
        )}

        {/* TAB 2: PSYCHOMETRICS ANALYTICS */}
        {activeTab === 'analytics' && (
          <>
            {latestReport ? (
              <AnalyticsDashboard
                report={latestReport}
                questions={latestQuestions}
                responses={latestResponses}
                onOpenAICoach={() => setActiveTab('coach')}
                onRetakeTest={() => {
                  setCurrentSession(null);
                  setActiveTab('arena');
                }}
              />
            ) : (
              <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-2xl font-bold">
                  📊
                </div>
                <h2 className="text-xl font-bold text-slate-900">No Assessment Data Yet</h2>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Take a full-length, unit-wise, or daily sprint test in the Mock Arena to generate in-depth psychometric
                  diagnostics.
                </p>
                <button
                  onClick={() => setActiveTab('arena')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Go to Mock Arena
                </button>
              </div>
            )}
          </>
        )}

        {/* TAB 3: AI PERFORMANCE COACH */}
        {activeTab === 'coach' && (
          <AICoachView
            report={latestReport}
            onRetakeTest={() => {
              setCurrentSession(null);
              setActiveTab('arena');
            }}
          />
        )}

        {/* TAB 4: QUESTION BANK & ADMIN */}
        {activeTab === 'admin' && (
          <AdminPanel
            questionBank={questionBank}
            onAddQuestion={handleAddQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onImportQuestions={handleImportQuestions}
          />
        )}

        {/* TAB 5: PYTHON DEPLOYMENT PACKAGE */}
        {activeTab === 'python' && <PythonDeploymentModal />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 text-center print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 CSIR-UGC-DBT JRF-NET Life Sciences & Biotechnology Preparation Suite</p>
          <div className="flex items-center gap-4 text-slate-600">
            <span>Parts A, B & C Authentic Model</span>
            <span>·</span>
            <span>NTA Negative Scoring Discipline</span>
            <span>·</span>
            <span>Gemini 3.8 Flash AI Coach</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
