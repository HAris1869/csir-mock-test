import React from 'react';
import { Award, BrainCircuit, Database, FileCode, Play, RotateCcw } from 'lucide-react';

interface NavbarProps {
  activeTab: 'arena' | 'analytics' | 'coach' | 'admin' | 'python';
  setActiveTab: (tab: 'arena' | 'analytics' | 'coach' | 'admin' | 'python') => void;
  isTestActive: boolean;
  onStartNewTest: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isTestActive,
  onStartNewTest,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single-Element Wordmark */}
          <button
            onClick={() => setActiveTab('arena')}
            className="flex items-center gap-2.5 text-left group transition-opacity hover:opacity-90 whitespace-nowrap shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              🧬
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-slate-900 block leading-tight">
                CSIR-UGC-DBT Prep Studio
              </span>
              <span className="text-[11px] font-medium text-slate-500 block leading-none">
                Life Sciences & Biotechnology
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('arena')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'arena'
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                  : 'hover:text-slate-900'
              }`}
            >
              CBT Mock Arena
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'analytics'
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                  : 'hover:text-slate-900'
              }`}
            >
              Psychometrics
            </button>
            <button
              onClick={() => setActiveTab('coach')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'coach'
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                  : 'hover:text-slate-900'
              }`}
            >
              AI Performance Coach
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'admin'
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                  : 'hover:text-slate-900'
              }`}
            >
              Question Bank
            </button>
            <button
              onClick={() => setActiveTab('python')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'python'
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                  : 'hover:text-slate-900'
              }`}
            >
              Python Anywhere Package
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            {isTestActive ? (
              <button
                onClick={() => setActiveTab('arena')}
                className="px-3.5 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Active CBT Exam
              </button>
            ) : (
              <button
                onClick={onStartNewTest}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap shrink-0 flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Start Mock Test
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
