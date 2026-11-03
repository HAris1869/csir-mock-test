import React, { useState } from 'react';
import {
  Database,
  Plus,
  Sparkles,
  Download,
  Upload,
  Trash2,
  Edit3,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookOpen,
} from 'lucide-react';
import { Question, ExamPart, DifficultyLevel, BloomLevel } from '../types/exam';
import { CSIR_SYLLABUS_UNITS } from '../data/syllabus';

interface AdminPanelProps {
  questionBank: Question[];
  onAddQuestion: (newQuestion: Question) => void;
  onDeleteQuestion: (id: string) => void;
  onImportQuestions: (imported: Question[]) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  questionBank,
  onAddQuestion,
  onDeleteQuestion,
  onImportQuestions,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPartFilter, setSelectedPartFilter] = useState<'ALL' | ExamPart>('ALL');
  const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState<'ALL' | DifficultyLevel>('ALL');
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Form State for Dynamic Generation
  const [genPart, setGenPart] = useState<ExamPart>('C');
  const [genTopic, setGenTopic] = useState('Molecular Biology');
  const [genSubtopic, setGenSubtopic] = useState('Gene Regulation & Operons');
  const [genDifficulty, setGenDifficulty] = useState<DifficultyLevel>('Hard');
  const [genBloom, setGenBloom] = useState<BloomLevel>('Analyze');

  // Filtered Questions
  const filteredQuestions = questionBank.filter((q) => {
    const matchesSearch =
      q.question_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.subtopic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPart = selectedPartFilter === 'ALL' || q.part === selectedPartFilter;
    const matchesDiff = selectedDifficultyFilter === 'ALL' || q.difficulty === selectedDifficultyFilter;
    return matchesSearch && matchesPart && matchesDiff;
  });

  // Call Gemini to generate a novel CSIR question
  const handleGenerateQuestion = async () => {
    setIsGenerating(true);
    setGenerationError(null);

    try {
      const response = await fetch('/api/gemini/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          part: genPart,
          topic: genTopic,
          subtopic: genSubtopic,
          difficulty: genDifficulty,
          bloomLevel: genBloom,
        }),
      });

      const data = await response.json();
      if (data.success && data.question) {
        onAddQuestion(data.question);
        setShowGenerateModal(false);
      } else {
        setGenerationError(data.error || 'Failed to generate question with Gemini API.');
      }
    } catch (err: any) {
      setGenerationError(err?.message || 'Network error calling question generator.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Export full bank to JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(questionBank, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'csir_life_sciences_question_bank.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import from JSON file
  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (Array.isArray(parsed)) {
          onImportQuestions(parsed);
          alert(`Successfully imported ${parsed.length} questions into the bank!`);
        } else {
          alert('Invalid format: Expected a JSON array of questions.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
            <span>QUESTION BANK SYSTEM</span>
            <span>·</span>
            <span className="text-slate-500 font-normal">CSIR-UGC-DBT JRF-NET Lifecycle</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Question Bank & AI Generator</h1>
          <p className="text-xs text-slate-500 mt-1">
            Total Available Questions in Pool: <strong className="text-slate-900 font-mono">{questionBank.length}</strong> ·
            Covers Parts A, B, and C across 13 syllabus units
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowGenerateModal(true)}
            className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Question Generator
          </button>
          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Export Bank (JSON)
          </button>
          <label className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5" />
            Bulk Import
            <input type="file" accept=".json" onChange={handleFileImport} className="hidden" />
          </label>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search questions, topics, concepts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-slate-900 w-full placeholder:text-slate-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Part:</span>
            <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg">
              {(['ALL', 'A', 'B', 'C'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPartFilter(p)}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    selectedPartFilter === p ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Difficulty:</span>
            <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg">
              {(['ALL', 'Easy', 'Medium', 'Hard'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDifficultyFilter(d)}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    selectedDifficultyFilter === d ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Question Table List */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Part</th>
                <th className="py-3 px-4">Topic / Subtopic</th>
                <th className="py-3 px-4">Question Preview</th>
                <th className="py-3 px-4">Difficulty</th>
                <th className="py-3 px-4">Bloom</th>
                <th className="py-3 px-4">Ans</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredQuestions.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-mono text-slate-500">{q.id}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded font-mono font-bold bg-blue-50 text-blue-700">
                      Part {q.part}
                    </span>
                  </td>
                  <td className="py-3 px-4 max-w-[160px] truncate">
                    <strong className="text-slate-900 block truncate">{q.topic}</strong>
                    <span className="text-slate-500 text-[11px] block truncate">{q.subtopic}</span>
                  </td>
                  <td className="py-3 px-4 max-w-[280px]">
                    <p className="line-clamp-2 text-slate-800 font-normal">{q.question_text}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        q.difficulty === 'Easy'
                          ? 'bg-emerald-50 text-emerald-700'
                          : q.difficulty === 'Medium'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {q.difficulty}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600">{q.bloom_level}</td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-700">{q.correct_answer}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onDeleteQuestion(q.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 transition-colors"
                      title="Delete question"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Dynamic Question Generator Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-600 mb-1">
                <Sparkles className="w-4 h-4" />
                <span>DYNAMIC GEMINI GENERATOR</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Generate CSIR-NET Exam Question</h3>
              <p className="text-xs text-slate-500 mb-5">
                Utilize server-side Gemini 3.8 Flash to synthesize authentic Part A, B, or C questions matching official
                NTA Life Sciences & Biotechnology standards.
              </p>

              {generationError && (
                <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{generationError}</span>
                </div>
              )}

              <div className="space-y-4 text-xs">
                {/* Part & Difficulty */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Exam Section:</label>
                    <select
                      value={genPart}
                      onChange={(e) => setGenPart(e.target.value as ExamPart)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 outline-none"
                    >
                      <option value="A">Part A (General Aptitude)</option>
                      <option value="B">Part B (Core Life Sciences)</option>
                      <option value="C">Part C (Analytical / Experimental)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Difficulty Tier:</label>
                    <select
                      value={genDifficulty}
                      onChange={(e) => setGenDifficulty(e.target.value as DifficultyLevel)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 outline-none"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                {/* Topic & Bloom's */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Syllabus Topic:</label>
                    <select
                      value={genTopic}
                      onChange={(e) => setGenTopic(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 outline-none"
                    >
                      {CSIR_SYLLABUS_UNITS.map((u) => (
                        <option key={u.id} value={u.shortName}>
                          {u.code}: {u.shortName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Bloom's Taxonomy Level:</label>
                    <select
                      value={genBloom}
                      onChange={(e) => setGenBloom(e.target.value as BloomLevel)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 outline-none"
                    >
                      <option value="Remember">Remember</option>
                      <option value="Understand">Understand</option>
                      <option value="Apply">Apply</option>
                      <option value="Analyze">Analyze</option>
                      <option value="Evaluate">Evaluate</option>
                    </select>
                  </div>
                </div>

                {/* Specific Concept / Subtopic */}
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Target Concept / Subtopic:</label>
                  <input
                    type="text"
                    value={genSubtopic}
                    onChange={(e) => setGenSubtopic(e.target.value)}
                    placeholder="e.g. CRISPR Cas9 cleavage, Bioreactor kinetics, Ramachandran angles"
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-200">
                <button
                  onClick={() => setShowGenerateModal(false)}
                  disabled={isGenerating}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGenerateQuestion}
                  disabled={isGenerating}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                  {isGenerating ? 'Synthesizing with Gemini...' : 'Generate & Add to Bank'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
