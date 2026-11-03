import React, { useState } from 'react';
import {
  Play,
  Layers,
  Zap,
  History,
  Sliders,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { TestMode, CustomTestConfig, ExamPart, DifficultyLevel } from '../types/exam';
import { CSIR_SYLLABUS_UNITS } from '../data/syllabus';

interface TestModeSelectorProps {
  onStartTest: (mode: TestMode, customConfig?: CustomTestConfig) => void;
  totalQuestionsInBank: number;
}

export const TestModeSelector: React.FC<TestModeSelectorProps> = ({
  onStartTest,
  totalQuestionsInBank,
}) => {
  const [selectedMode, setSelectedMode] = useState<TestMode>('full_length');
  const [selectedUnit, setSelectedUnit] = useState<string>('Biomolecules');

  // Custom Test Settings
  const [customQuestionCount, setCustomQuestionCount] = useState<number>(20);
  const [customTimeLimit, setCustomTimeLimit] = useState<number>(30);
  const [customDifficulty, setCustomDifficulty] = useState<'All' | DifficultyLevel>('All');
  const [customPart, setCustomPart] = useState<ExamPart | 'ALL'>('ALL');
  const [customSelectedUnits, setCustomSelectedUnits] = useState<string[]>(['Biomolecules']);

  const handleStart = () => {
    if (selectedMode === 'full_length') {
      onStartTest('full_length');
    } else if (selectedMode === 'unit_wise') {
      onStartTest('unit_wise', {
        selectedUnits: [selectedUnit],
        questionCount: 15,
        timeLimitMinutes: 30,
        difficulty: 'All',
      });
    } else if (selectedMode === 'daily_sprint') {
      onStartTest('daily_sprint');
    } else if (selectedMode === 'pyq') {
      onStartTest('pyq');
    } else if (selectedMode === 'custom') {
      onStartTest('custom', {
        selectedUnits: customSelectedUnits,
        questionCount: customQuestionCount,
        timeLimitMinutes: customTimeLimit,
        difficulty: customDifficulty,
        part: customPart,
      });
    }
  };

  const toggleUnitSelection = (unitName: string) => {
    if (customSelectedUnits.includes(unitName)) {
      if (customSelectedUnits.length > 1) {
        setCustomSelectedUnits(customSelectedUnits.filter((u) => u !== unitName));
      }
    } else {
      setCustomSelectedUnits([...customSelectedUnits, unitName]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Hero Banner */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700">
          <span>🧬 NTA Examination Pattern Simulator</span>
          <span>·</span>
          <span>Seed-Randomized Questions</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
          CSIR-UGC-DBT JRF-NET Mock Arena
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Experience authentic Computer-Based Test (CBT) conditions with negative marking,
          section attempt limits, and real-time psychometric evaluation.
        </p>
      </div>

      {/* Mode Selection Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Mode 1: Full-Length Exam */}
        <div
          onClick={() => setSelectedMode('full_length')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
            selectedMode === 'full_length'
              ? 'bg-blue-50/60 border-blue-600 shadow-sm ring-1 ring-blue-600'
              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                200
              </span>
              <span className="text-xs font-mono font-semibold text-slate-500">180 Mins</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 leading-tight">Full-Length CSIR Simulation</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Complete exam encompassing Part A (Aptitude), Part B (Core Knowledge), and Part C (Experimental Design).
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-medium text-blue-700">
            <span>Authentic 200-Mark Model</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Mode 2: Unit-Wise Mastery */}
        <div
          onClick={() => setSelectedMode('unit_wise')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
            selectedMode === 'unit_wise'
              ? 'bg-blue-50/60 border-blue-600 shadow-sm ring-1 ring-blue-600'
              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                <Layers className="w-5 h-5" />
              </span>
              <span className="text-xs font-mono font-semibold text-slate-500">30 Mins</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 leading-tight">Unit-Wise Mastery Drill</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Drill down into any of the 13 CSIR Life Sciences syllabus units with targeted concept questions.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-medium text-indigo-700">
            <span>13 Units Available</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Mode 3: Daily Sprint */}
        <div
          onClick={() => setSelectedMode('daily_sprint')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
            selectedMode === 'daily_sprint'
              ? 'bg-blue-50/60 border-blue-600 shadow-sm ring-1 ring-blue-600'
              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                <Zap className="w-5 h-5" />
              </span>
              <span className="text-xs font-mono font-semibold text-slate-500">20 Mins</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 leading-tight">Daily High-Yield Sprint</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              15 high-frequency questions for rapid daily warm-up, calibration, and speed optimization.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-medium text-emerald-700">
            <span>Quick 15 Qs</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Mode 4: Previous Year Pattern */}
        <div
          onClick={() => setSelectedMode('pyq')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
            selectedMode === 'pyq'
              ? 'bg-blue-50/60 border-blue-600 shadow-sm ring-1 ring-blue-600'
              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                <History className="w-5 h-5" />
              </span>
              <span className="text-xs font-mono font-semibold text-slate-500">60 Mins</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 leading-tight">Previous Year Benchmark</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Curated authentic past CSIR-NET & DBT-JRF questions reflecting authentic phrasing.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-medium text-purple-700">
            <span>2020-2024 Trends</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Mode 5: Custom Test */}
        <div
          onClick={() => setSelectedMode('custom')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between md:col-span-2 lg:col-span-2 ${
            selectedMode === 'custom'
              ? 'bg-blue-50/60 border-blue-600 shadow-sm ring-1 ring-blue-600'
              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold text-sm">
                <Sliders className="w-5 h-5" />
              </span>
              <span className="text-xs font-mono font-semibold text-slate-500">Configurable</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 leading-tight">Custom Configurable Test</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Fine-tune the number of questions, target syllabus units, difficulty tiers, and timer constraints.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-medium text-slate-800">
            <span>Tailor Your Practice Session</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Mode Specific Customizers */}
      {selectedMode === 'unit_wise' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4 animate-in fade-in">
          <h3 className="text-sm font-bold text-slate-900">Select Target Syllabus Unit</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            {CSIR_SYLLABUS_UNITS.map((u) => (
              <button
                key={u.id}
                onClick={() => setSelectedUnit(u.shortName)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedUnit === u.shortName
                    ? 'bg-blue-600 text-white font-semibold border-blue-600 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-mono text-[10px] opacity-80">{u.code}</div>
                <div className="truncate">{u.shortName}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedMode === 'custom' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5 animate-in fade-in text-xs">
          <h3 className="text-sm font-bold text-slate-900">Configure Custom Examination</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="font-semibold text-slate-700 block mb-1.5">Number of Questions:</label>
              <select
                value={customQuestionCount}
                onChange={(e) => setCustomQuestionCount(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 outline-none"
              >
                <option value={10}>10 Questions</option>
                <option value={15}>15 Questions</option>
                <option value={20}>20 Questions</option>
                <option value={30}>30 Questions</option>
                <option value={50}>50 Questions</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1.5">Time Limit (Minutes):</label>
              <select
                value={customTimeLimit}
                onChange={(e) => setCustomTimeLimit(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 outline-none"
              >
                <option value={15}>15 Minutes</option>
                <option value={30}>30 Minutes</option>
                <option value={45}>45 Minutes</option>
                <option value={60}>60 Minutes</option>
                <option value={90}>90 Minutes</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1.5">Difficulty Tier:</label>
              <select
                value={customDifficulty}
                onChange={(e) => setCustomDifficulty(e.target.value as any)}
                className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 outline-none"
              >
                <option value="All">All Difficulties (Balanced Mix)</option>
                <option value="Easy">Easy Only</option>
                <option value="Medium">Medium Only</option>
                <option value="Hard">Hard Only</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-2">Include Syllabus Units:</label>
            <div className="flex flex-wrap gap-2">
              {CSIR_SYLLABUS_UNITS.map((u) => {
                const isChecked = customSelectedUnits.includes(u.shortName);
                return (
                  <button
                    key={u.id}
                    onClick={() => toggleUnitSelection(u.shortName)}
                    className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${
                      isChecked
                        ? 'bg-blue-600 text-white font-medium border-blue-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {u.shortName}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Launch Action Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-lg">
            ⚡
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              Ready to generate unique seed-randomized paper?
            </h4>
            <p className="text-xs text-slate-400">
              Zero duplicate questions · Shuffled option keys · CSIR standard negative deductions
            </p>
          </div>
        </div>

        <button
          onClick={handleStart}
          className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-slate-950 bg-white hover:bg-slate-100 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4 fill-current" />
          Start Mock Test Now
        </button>
      </div>
    </div>
  );
};
