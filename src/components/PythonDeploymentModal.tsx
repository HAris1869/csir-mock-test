import React, { useState } from 'react';
import {
  FileCode,
  Download,
  Copy,
  Check,
  Terminal,
  ExternalLink,
  Server,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { PYTHON_STREAMLIT_PACKAGE, PythonFileItem } from '../data/pythonPackage';

export const PythonDeploymentModal: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<PythonFileItem>(PYTHON_STREAMLIT_PACKAGE[0]);
  const [copied, setCopied] = useState(false);

  // Copy code to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download individual file
  const handleDownloadFile = (file: PythonFileItem) => {
    const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Download all files sequentially
  const handleDownloadAll = () => {
    PYTHON_STREAMLIT_PACKAGE.forEach((f) => {
      handleDownloadFile(f);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
            <span>MODULAR PYTHON STREAMLIT DEPLOYMENT PACKAGE</span>
            <span>·</span>
            <span className="text-slate-500 font-normal">PythonAnywhere & Streamlit Ready</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Python & Streamlit Source Code Bundle
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Pre-configured modular Python codebase including SQLite database schema, CBT quiz engine, Plotly analytics, and deployment instructions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadAll}
            className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Download All Python Files
          </button>
        </div>
      </div>

      {/* Deployment Walkthrough Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 mb-2">
            <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">1</span>
            <span>Install Dependencies</span>
          </div>
          <div className="bg-slate-900 text-slate-200 font-mono text-xs p-3 rounded-lg overflow-x-auto">
            pip install -r requirements.txt
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Installs Streamlit, Plotly, Pandas, and SQLite bindings.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 mb-2">
            <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">2</span>
            <span>Local Execution</span>
          </div>
          <div className="bg-slate-900 text-slate-200 font-mono text-xs p-3 rounded-lg overflow-x-auto">
            streamlit run app.py
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Launches local browser dashboard on port 8501.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 mb-2">
            <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">3</span>
            <span>PythonAnywhere Hosting</span>
          </div>
          <div className="text-xs text-slate-600 leading-relaxed">
            Create a Bash console on PythonAnywhere, upload these 6 files, and run background service or WSGI wrapper.
          </div>
          <a
            href="https://help.pythonanywhere.com"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 mt-2"
          >
            PythonAnywhere Docs <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Code Viewer: File Sidebar + Code Editor Box */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
        {/* Left: Files Navigation (4 cols) */}
        <div className="md:col-span-4 border-r border-slate-200 p-4 bg-slate-50/50 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 px-2">
              Package Files
            </div>
            <div className="space-y-1">
              {PYTHON_STREAMLIT_PACKAGE.map((file) => {
                const isSelected = selectedFile.filename === file.filename;

                return (
                  <button
                    key={file.filename}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-blue-600 text-white font-semibold shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileCode className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                      <span className="truncate">{file.filename}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 px-2">
            Selected: <strong className="text-slate-800">{selectedFile.filename}</strong>
            <p className="text-[11px] text-slate-400 mt-0.5">{selectedFile.description}</p>
          </div>
        </div>

        {/* Right: Code Inspector (8 cols) */}
        <div className="md:col-span-8 flex flex-col bg-slate-900 text-slate-100">
          <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300 font-semibold">{selectedFile.path}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={() => handleDownloadFile(selectedFile)}
                className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          <div className="p-4 flex-1 overflow-auto max-h-[580px] font-mono text-xs leading-relaxed text-slate-200">
            <pre className="whitespace-pre">{selectedFile.content}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
