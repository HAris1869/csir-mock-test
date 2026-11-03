import React, { useState } from 'react';
import {
  Award,
  TrendingUp,
  AlertCircle,
  Download,
  Printer,
  ChevronRight,
  Brain,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Gauge,
  Zap,
  RotateCcw,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { PsychometricReport, Question, QuestionResponse } from '../types/exam';

interface AnalyticsDashboardProps {
  report: PsychometricReport;
  questions: Question[];
  responses: Record<string, QuestionResponse>;
  onOpenAICoach: () => void;
  onRetakeTest: () => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  report,
  questions,
  responses,
  onOpenAICoach,
  onRetakeTest,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'review' | 'behavior'>('overview');
  const [filterReview, setFilterReview] = useState<'all' | 'correct' | 'wrong' | 'unattempted'>('all');

  // CSV Export Handler
  const exportToCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Question ID,Part,Topic,Subtopic,Difficulty,Your Answer,Correct Answer,Status,Marks\\n';

    questions.forEach((q) => {
      const res = responses[q.id];
      const ans = res?.selected_option || 'None';
      const isCorrect = ans === q.correct_answer;
      const status = ans === 'None' ? 'Unattempted' : isCorrect ? 'Correct' : 'Wrong';
      const mark =
        ans === 'None'
          ? 0
          : isCorrect
          ? q.part === 'C'
            ? 4
            : 2
          : q.part === 'C'
          ? -1.0
          : -0.5;

      csvContent += `"${q.id}","${q.part}","${q.topic}","${q.subtopic}","${q.difficulty}","${ans}","${q.correct_answer}","${status}",${mark}\\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CSIR_NET_Report_${report.test_id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Printable View
  const handlePrint = () => {
    window.print();
  };

  // Filtered review questions
  const filteredQuestions = questions.filter((q) => {
    const res = responses[q.id];
    if (filterReview === 'all') return true;
    if (filterReview === 'unattempted') return !res || res.selected_option === null;
    if (filterReview === 'correct') return res?.selected_option === q.correct_answer;
    if (filterReview === 'wrong') return res?.selected_option !== null && res?.selected_option !== q.correct_answer;
    return true;
  });

  // Calculate Radar Polygon Points for SVG
  const topicsList = Object.keys(report.topic_breakdown);
  const totalTopics = Math.max(topicsList.length, 3);
  const radarRadius = 110;
  const radarCenter = 140;

  const getCoordinates = (index: number, valueRatio: number) => {
    const angle = (Math.PI * 2 / totalTopics) * index - Math.PI / 2;
    const r = radarRadius * valueRatio;
    return {
      x: radarCenter + r * Math.cos(angle),
      y: radarCenter + r * Math.sin(angle),
    };
  };

  const radarPolygonPoints = topicsList
    .map((topic, i) => {
      const stat = report.topic_breakdown[topic];
      const ratio = Math.max(0.1, Math.min(1.0, (stat.accuracy || 0) / 100));
      const pt = getCoordinates(i, ratio);
      return `${pt.x},${pt.y}`;
    })
    .join(' ');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 print:p-0">
      {/* Top Banner & Export Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
            <span>OFFICIAL PSYCHOMETRIC EVALUATION</span>
            <span>·</span>
            <span className="text-slate-500 font-normal">CSIR-UGC-DBT JRF-NET Life Sciences</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{report.test_title}</h1>
          <p className="text-xs text-slate-500 mt-1">
            Completed on {new Date(report.timestamp).toLocaleString()} · Duration:{' '}
            {Math.floor(report.duration_used_seconds / 60)}m {report.duration_used_seconds % 60}s
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 print:hidden">
          <button
            onClick={onOpenAICoach}
            className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Performance Coach
          </button>
          <button
            onClick={exportToCSV}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / PDF
          </button>
          <button
            onClick={onRetakeTest}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            New Mock
          </button>
        </div>
      </div>

      {/* KPI Metric Summary Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Metric 1: Total Score */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs font-medium text-slate-500">Net CSIR Score</div>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
            {report.total_score}
            <span className="text-xs text-slate-400 font-normal ml-1">/ {report.max_possible_score}</span>
          </div>
          <div className="text-[11px] text-emerald-600 mt-1">
            +{report.total_correct * 2} pos / -{report.total_negative_marks} neg
          </div>
        </div>

        {/* Metric 2: Estimated Percentile */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs font-medium text-slate-500">Est. Percentile</div>
          <div className="text-2xl font-bold font-mono text-blue-600 mt-1">
            {report.estimated_percentile}%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Calibrated normal model</div>
        </div>

        {/* Metric 3: Overall Accuracy */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs font-medium text-slate-500">Attempt Accuracy</div>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
            {report.overall_accuracy}%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {report.total_correct} correct / {report.total_attempted} attempted
          </div>
        </div>

        {/* Metric 4: Negative Marks */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs font-medium text-slate-500">Negative Penalty</div>
          <div className="text-2xl font-bold font-mono text-rose-600 mt-1">
            -{report.total_negative_marks}
          </div>
          <div className="text-[11px] text-rose-500 mt-1">{report.total_wrong} incorrect choices</div>
        </div>

        {/* Metric 5: Predicted AIR Rank */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs font-medium text-slate-500">Predicted Rank</div>
          <div className="text-sm font-bold text-slate-900 mt-2 truncate">
            {report.predicted_rank_range}
          </div>
          <div className="text-[11px] text-blue-600 mt-1">All India Category</div>
        </div>

        {/* Metric 6: JRF Qualification Status */}
        <div
          className={`border rounded-xl p-4 shadow-xs ${
            report.cutoff_status.jrf_qualified
              ? 'bg-emerald-50/60 border-emerald-200'
              : 'bg-amber-50/60 border-amber-200'
          }`}
        >
          <div className="text-xs font-medium text-slate-600">Cutoff Status</div>
          <div
            className={`text-sm font-bold mt-1.5 flex items-center gap-1.5 ${
              report.cutoff_status.jrf_qualified ? 'text-emerald-800' : 'text-amber-800'
            }`}
          >
            {report.cutoff_status.jrf_qualified ? (
              <>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                JRF Qualified
              </>
            ) : report.cutoff_status.ls_qualified ? (
              <>
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Lectureship Qualified
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                Below Cutoff
              </>
            )}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-mono">
            JRF Cutoff ~{report.cutoff_status.jrf_cutoff_estimate} marks
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 print:hidden">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'overview'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Section & Subject Diagnostics
        </button>
        <button
          onClick={() => setActiveTab('behavior')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'behavior'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Behavioral & Speed Analytics
        </button>
        <button
          onClick={() => setActiveTab('review')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'review'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Detailed Solutions Review ({questions.length})
        </button>
      </div>

      {/* VIEW 1: OVERVIEW & SUBJECT DIAGNOSTICS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Sectional Breakdown (Part A, Part B, Part C) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 mb-4">CSIR Sectional Performance Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(['A', 'B', 'C'] as const).map((part) => {
                const stat = report.part_scores[part];
                const accuracy = stat.attempted > 0 ? Math.round((stat.correct / stat.attempted) * 100) : 0;
                const weight = part === 'C' ? '4 Marks (+4 / -1.0)' : '2 Marks (+2 / -0.5)';

                return (
                  <div key={part} className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-slate-900">Part {part}</span>
                      <span className="text-xs text-slate-500 font-mono">{weight}</span>
                    </div>

                    <div className="text-2xl font-bold font-mono text-slate-900 my-2">
                      {stat.marks.toFixed(1)} <span className="text-xs font-normal text-slate-500">marks</span>
                    </div>

                    <div className="space-y-2 text-xs text-slate-600 mt-4 border-t border-slate-200 pt-3">
                      <div className="flex justify-between">
                        <span>Questions Attempted:</span>
                        <span className="font-mono font-semibold text-slate-800">
                          {stat.attempted} / {stat.max_allowed} allowed
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Correct / Incorrect:</span>
                        <span className="font-mono text-slate-800">
                          <span className="text-emerald-700 font-semibold">{stat.correct}</span> /{' '}
                          <span className="text-rose-600 font-semibold">{stat.wrong}</span>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Accuracy:</span>
                        <span className="font-mono font-bold text-blue-600">{accuracy}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visual Diagnostics: Radar Spider Chart + Weakness Classification */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Unit Radar Chart (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Syllabus Unit Mastery Spider Chart</h3>
                  <p className="text-xs text-slate-500">Accuracy % across Life Sciences domains</p>
                </div>
              </div>

              {/* Responsive SVG Radar Chart */}
              <div className="w-full flex items-center justify-center py-4">
                <svg width="280" height="280" className="overflow-visible font-mono text-[10px]">
                  {/* Grid Rings */}
                  {[0.25, 0.5, 0.75, 1.0].map((ring, idx) => (
                    <circle
                      key={idx}
                      cx={radarCenter}
                      cy={radarCenter}
                      r={radarRadius * ring}
                      fill="none"
                      stroke="#E2E8F0"
                      strokeDasharray={idx < 3 ? '2,2' : undefined}
                    />
                  ))}

                  {/* Radial Axis Lines */}
                  {topicsList.map((_, i) => {
                    const coord = getCoordinates(i, 1.0);
                    return (
                      <line
                        key={i}
                        x1={radarCenter}
                        y1={radarCenter}
                        x2={coord.x}
                        y2={coord.y}
                        stroke="#E2E8F0"
                      />
                    );
                  })}

                  {/* Data Polygon */}
                  <polygon
                    points={radarPolygonPoints}
                    fill="rgba(37, 99, 235, 0.2)"
                    stroke="#2563EB"
                    strokeWidth="2"
                  />

                  {/* Points and Labels */}
                  {topicsList.map((topic, i) => {
                    const stat = report.topic_breakdown[topic];
                    const ratio = Math.max(0.1, Math.min(1.0, (stat.accuracy || 0) / 100));
                    const pt = getCoordinates(i, ratio);
                    const labelPt = getCoordinates(i, 1.25);

                    return (
                      <g key={i}>
                        <circle cx={pt.x} cy={pt.y} r="3.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.5" />
                        <text
                          x={labelPt.x}
                          y={labelPt.y}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill="#475569"
                          className="text-[9px] font-sans font-medium"
                        >
                          {topic.length > 14 ? topic.substring(0, 12) + '..' : topic}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="w-full mt-4 flex items-center justify-center gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
                  <span>Your Tested Score</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 border-t border-dashed border-slate-400 inline-block"></span>
                  <span>75% Mastery Target</span>
                </div>
              </div>
            </div>

            {/* Right: Weakness & Strength Matrix (5 cols) */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Psychometric Classification</h3>
                <p className="text-xs text-slate-500 mb-4">Categorized by accuracy and negative penalty frequency</p>

                <div className="space-y-4">
                  {/* Strong Topics */}
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5 mb-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Strong Areas (&ge;75% Accuracy)
                    </div>
                    {report.weakness_summary.strong_topics.length > 0 ? (
                      <ul className="text-xs text-emerald-800 space-y-1 list-disc list-inside">
                        {report.weakness_summary.strong_topics.map((t, idx) => (
                          <li key={idx}>{t}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-emerald-700 italic">No topic met the 75% threshold.</p>
                    )}
                  </div>

                  {/* Moderate Topics */}
                  <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
                    <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5 mb-1.5">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      Moderate Areas (50% - 74%)
                    </div>
                    {report.weakness_summary.moderate_topics.length > 0 ? (
                      <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
                        {report.weakness_summary.moderate_topics.map((t, idx) => (
                          <li key={idx}>{t}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-blue-700 italic">None in moderate zone.</p>
                    )}
                  </div>

                  {/* Critical Weak Areas */}
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200">
                    <div className="text-xs font-bold text-rose-900 flex items-center gap-1.5 mb-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      Critical Weak Areas (&lt;50% or High Negatives)
                    </div>
                    {report.weakness_summary.critical_weak_areas.length > 0 ? (
                      <ul className="text-xs text-rose-800 space-y-1 list-disc list-inside">
                        {report.weakness_summary.critical_weak_areas.map((t, idx) => (
                          <li key={idx}>{t}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-rose-700 italic">Zero critical weakness detected.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <button
                  onClick={onOpenAICoach}
                  className="w-full py-2.5 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Brain className="w-4 h-4" />
                  Generate AI Revision Schedule
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Topic Breakdown Table */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs overflow-hidden">
            <h3 className="text-base font-bold text-slate-900 mb-4">Topic-Wise Performance Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Syllabus Topic</th>
                    <th className="py-3 px-4 font-semibold">Attempted</th>
                    <th className="py-3 px-4 font-semibold">Correct</th>
                    <th className="py-3 px-4 font-semibold">Wrong</th>
                    <th className="py-3 px-4 font-semibold">Accuracy</th>
                    <th className="py-3 px-4 font-semibold">Net Contribution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {Object.values(report.topic_breakdown).map((t) => (
                    <tr key={t.topic} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-medium text-slate-900">{t.topic}</td>
                      <td className="py-3 px-4 font-mono">{t.attempted}</td>
                      <td className="py-3 px-4 font-mono text-emerald-700 font-semibold">{t.correct}</td>
                      <td className="py-3 px-4 font-mono text-rose-600 font-semibold">{t.wrong}</td>
                      <td className="py-3 px-4 font-mono font-bold">
                        <span
                          className={
                            t.accuracy >= 75
                              ? 'text-emerald-700'
                              : t.accuracy >= 50
                              ? 'text-blue-600'
                              : 'text-rose-600'
                          }
                        >
                          {t.accuracy}%
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">
                        {t.net_marks > 0 ? `+${t.net_marks}` : t.net_marks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: BEHAVIORAL & SPEED ANALYTICS */}
      {activeTab === 'behavior' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                <Clock className="w-4 h-4 text-blue-600" />
                Average Speed per Question
              </div>
              <div className="text-3xl font-bold font-mono text-slate-900 my-2">
                {report.behavioral_metrics.average_speed_sec}
                <span className="text-sm font-normal text-slate-500 ml-1">seconds</span>
              </div>
              <p className="text-xs text-slate-600 mt-2">
                Speed Rating:{' '}
                <strong className="text-blue-700">{report.behavioral_metrics.speed_rating}</strong>
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                <RotateCcw className="w-4 h-4 text-amber-600" />
                Response Alterations
              </div>
              <div className="text-3xl font-bold font-mono text-slate-900 my-2">
                {report.behavioral_metrics.change_count}
                <span className="text-sm font-normal text-slate-500 ml-1">changes</span>
              </div>
              <p className="text-xs text-slate-600 mt-2">
                Number of times you switched an option after first selecting it.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                <Zap className="w-4 h-4 text-purple-600" />
                Pressure Accuracy Stability
              </div>
              <div className="text-xl font-bold text-slate-900 my-2">
                {report.behavioral_metrics.panic_accuracy}
              </div>
              <p className="text-xs text-slate-600 mt-2">
                Evaluation of accuracy in the final 20% of test duration.
              </p>
            </div>
          </div>

          {/* Difficulty Tier Analysis */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4">Performance across Question Difficulties</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(['Easy', 'Medium', 'Hard'] as const).map((diff) => {
                const stat = report.difficulty_breakdown[diff];

                return (
                  <div key={diff} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">{diff} Tier</div>
                    <div className="text-2xl font-bold font-mono text-slate-900 my-2">
                      {stat.accuracy}% <span className="text-xs font-normal text-slate-500">accuracy</span>
                    </div>
                    <div className="text-xs text-slate-600 space-y-1 mt-3 pt-3 border-t border-slate-200">
                      <div className="flex justify-between">
                        <span>Attempted:</span>
                        <span className="font-mono font-semibold">{stat.attempted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Correct / Wrong:</span>
                        <span className="font-mono">
                          <span className="text-emerald-700">{stat.correct}</span> /{' '}
                          <span className="text-rose-600">{stat.wrong}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: DETAILED SOLUTIONS REVIEW */}
      {activeTab === 'review' && (
        <div className="space-y-6">
          {/* Review Filter Tabs */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg w-fit print:hidden">
            <button
              onClick={() => setFilterReview('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                filterReview === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              All ({questions.length})
            </button>
            <button
              onClick={() => setFilterReview('correct')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                filterReview === 'correct' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              Correct ({report.total_correct})
            </button>
            <button
              onClick={() => setFilterReview('wrong')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                filterReview === 'wrong' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              Wrong ({report.total_wrong})
            </button>
            <button
              onClick={() => setFilterReview('unattempted')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                filterReview === 'unattempted' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              Unattempted ({questions.length - report.total_attempted})
            </button>
          </div>

          {/* Questions List */}
          <div className="space-y-6">
            {filteredQuestions.map((q, idx) => {
              const res = responses[q.id];
              const userAns = res?.selected_option;
              const isCorrect = userAns === q.correct_answer;
              const isUnattempted = userAns === null;

              return (
                <div
                  key={q.id}
                  className={`bg-white border rounded-2xl p-6 shadow-xs space-y-4 ${
                    isUnattempted
                      ? 'border-slate-200'
                      : isCorrect
                      ? 'border-emerald-200 bg-emerald-50/10'
                      : 'border-rose-200 bg-rose-50/10'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">Question {idx + 1}</span>
                      <span>·</span>
                      <span className="font-semibold text-blue-700">Part {q.part}</span>
                      <span>·</span>
                      <span>{q.topic}</span>
                      <span>·</span>
                      <span className="text-slate-500">{q.difficulty}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isUnattempted ? (
                        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          Unattempted (0 marks)
                        </span>
                      ) : isCorrect ? (
                        <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Correct (+{q.part === 'C' ? 4 : 2} marks)
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-rose-800 bg-rose-100 px-2 py-0.5 rounded flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" />
                          Incorrect (-{q.part === 'C' ? 1.0 : 0.5} penalty)
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-slate-900 font-normal leading-relaxed whitespace-pre-line">
                    {q.question_text}
                  </p>

                  {/* Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2">
                    {q.options.map((opt) => {
                      const isUserChoice = userAns === opt.id;
                      const isRealCorrect = q.correct_answer === opt.id;

                      let style = 'bg-slate-50 border-slate-200 text-slate-700';
                      if (isRealCorrect) {
                        style = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold';
                      } else if (isUserChoice && !isRealCorrect) {
                        style = 'bg-rose-50 border-rose-300 text-rose-950';
                      }

                      return (
                        <div key={opt.id} className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${style}`}>
                          <span className="font-bold shrink-0">{opt.id}.</span>
                          <span className="flex-1">{opt.text}</span>
                          {isRealCorrect && (
                            <span className="text-[10px] font-bold text-emerald-700 uppercase shrink-0">
                              Correct Ans
                            </span>
                          )}
                          {isUserChoice && !isRealCorrect && (
                            <span className="text-[10px] font-bold text-rose-600 uppercase shrink-0">
                              Your Choice
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Scientific Explanation Box */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 mt-3">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5 text-blue-700">
                      <HelpCircle className="w-4 h-4" />
                      Detailed Scientific Justification
                    </div>
                    <p className="text-slate-700 leading-relaxed whitespace-pre-line">{q.explanation}</p>
                    <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200 flex items-center justify-between">
                      <span>Source: {q.reference_source}</span>
                      {q.year_tag && <span>Tag: {q.year_tag}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
