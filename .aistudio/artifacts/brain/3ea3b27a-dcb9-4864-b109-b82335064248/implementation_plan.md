# CSIR-UGC-DBT JRF-NET Life Sciences & Biotech Examination Suite

A high-stakes, production-ready psychometric assessment and mock test preparation platform for CSIR-UGC-DBT JRF-NET Life Sciences candidates. Combines authentic NTA/CSIR computer-based test (CBT) examination mechanics, real-time analytics, Gemini-powered dynamic question generation, an AI performance coach, and an exportable Python/Streamlit deployment bundle.

## User Review & Critical Decisions

> [!IMPORTANT]
> Based on your responses, the platform will be structured around:
> 1. **Live Interactive Web App**: Focused on instant browser testing in AI Studio with real-time CBT interface, question palette, full timer system, and psychometric dashboards.
> 2. **Full AI Generation with Dynamic Syllabus Prompt Templates**: Server-side Gemini 3.8 Flash SDK integration for generating authentic Part A, B, and C questions (with Bloom's taxonomy levels, experimental datasets, and detailed justifications), backed by a curated offline bank of authentic CSIR questions across all 13 units.
> 3. **Primary Experience**: Full CSIR-NET 200-mark simulation with genuine Part A (Aptitude), Part B (Core Knowledge), and Part C (Higher-order Analytical & Experimental) selection rules, negative marking (-0.5 / -1.0), and maximum question attempt caps (15 / 35 / 25).
> 4. **Python Anywhere / Streamlit Export**: A dedicated module providing full Python Streamlit source files (`app.py`, `database.py`, `analytics.py`, `requirements.txt`) ready for one-click download and instant deployment.

- **Confirmed Decision 1**: Interactive browser testing with immediate feedback and authentic CBT exam palette.
- **Confirmed Decision 2**: Gemini API powered dynamic question generation and AI coaching reports.
- **Confirmed Decision 3**: Complete coverage of all 13 Life Sciences syllabus units plus Part A General Aptitude.

---

## 1. Overview & Core Concept

- **What It Does**: Provides CSIR-UGC-DBT JRF-NET Life Sciences aspirants with a realistic, high-fidelity test environment mimicking the National Testing Agency (NTA) computer-based testing interface, coupled with an advanced psychometric diagnostic engine that detects topic weaknesses, calculates behavioral speed-vs-accuracy indices, predicts percentiles and ranks, and drafts personalized 7/30/60-day study schedules.
- **Target Audience**: Aspirants targeting CSIR JRF (Junior Research Fellowship), Lectureship/Assistant Professor, and DBT JRF Category-I & II in Life Sciences and Biotechnology.
- **Key Value**: Closes the gap between rote preparation and actual exam performance by training candidates on Part C experimental design questions, negative-mark discipline, time allocation across sections, and targeted AI revision.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Dashboard & Test Selection**:
   - Candidates arrive at a clean, scientific command center displaying previous mock test trends, average scores, and percentile indicators.
   - 5 Test Modes available via clear segmented cards: *Full-Length 3-Hour Simulation (200 marks)*, *Unit-Wise Mastery Drills (13 Units)*, *Custom Speed Test*, *Previous Year Pattern Test*, and *Daily High-Yield Sprint*.
2. **NTA-Style CBT Mock Test Interface**:
   - Top Telemetry Bar: Candidate info, active section switcher (Part A, Part B, Part C), running synchronized countdown timer with automated warnings at 30, 10, 5, and 1 min.
   - Main Stage: Clear question stem with support for chemical structures, genetic pedigrees, gel electrophoresis diagrams, and data tables.
   - Question Palette: Real-time CSIR color-coded statuses (Green: Answered, Red: Not Answered, Purple: Marked for Review, Purple with Green Dot: Answered & Marked for Review, Gray: Not Visited).
   - Strict Selection Rules: Displays real-time attempted counters (e.g., Part A: 12/15 attempted, Part B: 28/35 attempted, Part C: 21/25 attempted) with warning if attempting beyond the CSIR cap.
3. **Comprehensive Psychometric Analytics Report**:
   - Immediate post-test scorecard with positive marks, negative penalty deductions, net score out of 200, estimated percentile, and JRF/LS cutoff comparisons.
   - Sectional breakdown (Part A, B, C) with accuracy % and attempt rate %.
   - Radar/Spider Chart displaying mastery across all 13 syllabus units.
   - Weakness Diagnostic: Classified into Strong, Moderate, Weak, and Critical Weak Areas (e.g., CRISPR Cas9, Fermentation Engineering, Protein Translocation).
   - Behavioral Analytics: Average solving speed per question, skipped question count, answer change frequency, and panic/time-pressure accuracy degradation.
4. **AI Performance Coach & Study Planner**:
   - Candidate receives an actionable AI-generated diagnosis with predicted score trajectory for the next test.
   - Automated 7-Day, 30-Day, and 60-Day customized revision roadmaps prioritizing identified high-yield weak topics.
5. **Admin Panel & Dynamic AI Question Generator**:
   - Interactive question generator prompting Gemini to craft novel CSIR Part B or Part C questions with Bloom's taxonomy tags, experimental controls, and distractor rationales.
   - Excel/CSV bulk import and export tools, question bank browser, and manual question editor.
6. **Python Anywhere / Streamlit Deployment Hub**:
   - In-app code viewer and one-click zip/file download containing the modular Python Streamlit app (`app.py`, `database.py`, `quiz_engine.py`, `analytics.py`, `requirements.txt`, `README.md`) ready for deployment on PythonAnywhere or Streamlit Cloud.

### Visual Identity & Theme

- **Aesthetic Direction**: Clinical, high-contrast scientific workbench adhering to the Universal Frontend Design Constitution and Science & Biotech Design Reference. Flat slate panels, hairline dividers (`1px solid #E2E8F0`), and zero decorative gradients or fake AI slop.
- **Color Palette**:
  - Dominant Canvas (60%): Crisp clinical white (`#FFFFFF`) / lab slate (`#F8FAFC`).
  - Structural Surfaces (30%): Subdued card slate (`#F1F5F9`), hairline borders (`#E2E8F0`), dark slate typography (`#0F172A`).
  - Calibrated Accents (10%): Deep scientific cobalt (`#1E40AF` / `#2563EB`) and precision teal (`#0D9488`).
  - NTA Standard Status Hues: Answered Green (`#16A34A`), Not Answered Red (`#DC2626`), Marked Purple (`#7C3AED`).
- **Typography**:
  - Primary UI & Titles: `Plus Jakarta Sans` / `Inter` (crisp, readable at high density).
  - Data, Timers, Scores & Formulas: `JetBrains Mono` / `tabular-nums` for rock-solid vertical alignment without layout jitter.
- **Component Styling**: Clean segmented tabs, unboxed metadata with subtle dot separators (`·`), single-elevation cards with crisp borders, and zero pill-sandwich badges.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Full-Stack Express + React Architecture for AI Studio**:
  - *Chosen Approach*: Implement the active web app in React + TypeScript + Express backend. Server-side proxy (`/api/gemini/*`) securely calls `@google/genai` with `gemini-3.8-flash` to generate questions and coach reports without exposing `GEMINI_API_KEY` to the browser.
  - *Why*: Satisfies AI Studio's strict runtime constraints while providing instant, lag-free browser execution.
- **Decision 2: Python / Streamlit Modular Codebase Bundling**:
  - *Chosen Approach*: Generate clean, modular Python source files in the project (`/streamlit_app/`) alongside an in-app Export/Download tab with step-by-step PythonAnywhere deployment instructions.
  - *Why*: Fulfills the user's specific request for a ready-to-deploy Python/Streamlit codebase while maintaining the live interactive web app in AI Studio.
- **Decision 3: Seeded Dynamic Question Randomization**:
  - *Chosen Approach*: Implement a cryptographic/pseudorandom shuffling engine (Knuth-Fisher-Yates) using a per-session seed. Every click on "Start Mock Test" generates a unique test paper with shuffled question orders, shuffled option keys (A-D), balanced difficulty tiers (Easy/Medium/Hard), and Part A/B/C proportions.
  - *Why*: Guarantees zero duplicate questions in a session and virtually unlimited unique test combinations.
- **Decision 4: Client-Side Interactive Data Visualizations**:
  - *Chosen Approach*: Clean, responsive SVG/Canvas interactive charts (Radar Spider Chart for 13 units, Speed vs Accuracy scatter/metric, Difficulty bar, Score distribution, and Heatmap) designed with WCAG AA contrast.
  - *Why*: Ultra-fast rendering without heavy external CDN script dependencies, responsive on all screen sizes.

---

## 4. Technical Architecture & Data Strategy

### System Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Candidate Browser View                          │
│                                                                        │
│  ┌────────────────────┐  ┌───────────────────┐  ┌───────────────────┐  │
│  │    CBT Test Engine │  │ Psychometric Dash │  │  AI Coach Studio  │  │
│  │  - NTA Exam Pal    │  │  - Unit Radar     │  │  - Gemini Prompt  │  │
│  │  - Timer & Warning │  │  - Weakness Tree  │  │  - 7/30/60d Plan  │  │
│  │  - Choice Limit Cap│  │  - Speed Analytics│  │  - Score Predict  │  │
│  └─────────┬──────────┘  └─────────▲─────────┘  └─────────▲─────────┘  │
│            │                       │                      │            │
│            ▼                       │                      │            │
│  ┌─────────────────────────────────┴──────────────────────┴─────────┐  │
│  │           State Store (Zustand-style React Context)              │  │
│  │  - Session Seed & Shuffler      - Response & Behavioral Log     │  │
│  │  - Active Question Bank         - Historical Test Archive        │  │
│  └─────────────────────────────────┬────────────────────────────────┘  │
└────────────────────────────────────┼───────────────────────────────────┘
                                     │
           ┌─────────────────────────┴────────────────────────┐
           ▼                                                  ▼
┌──────────────────────────────────────┐  ┌──────────────────────────────┐
│       Express API Backend            │  │  Streamlit / Python Bundle   │
│  - POST /api/gemini/generate-question│  │  - streamlit_app/app.py      │
│  - POST /api/gemini/coach-analysis   │  │  - streamlit_app/database.py │
│  - @google/genai SDK (gemini-3.8)    │  │  - streamlit_app/quiz.py     │
│  - User-Agent: 'aistudio-build'      │  │  - requirements.txt         │
└──────────────────────────────────────┘  └──────────────────────────────┘
```

### Data Model Schema (Aligned for SQLite / Client Store)

- **`Question`**:
  - `id`: string (UUID)
  - `part`: `'A' | 'B' | 'C'`
  - `topic`: string (e.g., `'Biomolecules'`, `'Cell Biology'`, `'Methods in Biology'`)
  - `subtopic`: string (e.g., `'Enzyme Kinetics'`, `'CRISPR-Cas9'`, `'Gel Filtration'`)
  - `difficulty`: `'Easy' | 'Medium' | 'Hard'`
  - `bloom_level`: `'Remember' | 'Understand' | 'Apply' | 'Analyze' | 'Evaluate'`
  - `question_text`: string (Markdown & table support)
  - `options`: `{ id: 'A'|'B'|'C'|'D', text: string }[]`
  - `correct_answer`: `'A' | 'B' | 'C' | 'D'`
  - `explanation`: string (step-by-step scientific rationale)
  - `year_tag`: string (e.g., `'CSIR-NET June 2023'`, `'DBT-JRF 2024'`)
  - `reference_source`: string (e.g., `'Lehninger Biochemistry'`, `'Lodish Molecular Cell Biology'`)
- **`TestSession`**:
  - `test_id`: string
  - `mode`: `'full_length' | 'unit_wise' | 'custom' | 'pyq' | 'daily_sprint'`
  - `seed`: number
  - `started_at`: number
  - `duration_seconds`: number
  - `questions`: Question[]
  - `user_responses`: Record<questionId, { selected_option: string | null, is_marked_for_review: boolean, time_spent_seconds: number, change_count: number }>
- **`PsychometricReport`**:
  - `total_score`: number (out of 200)
  - `part_a_score`: number, `part_b_score`: number, `part_c_score`: number
  - `percentile_estimated`: number
  - `topic_breakdown`: Record<topic, { correct: number, wrong: number, skipped: number, accuracy: number }>
  - `behavioral_metrics`: { average_speed_sec: number, panic_accuracy_drop: number, skipped_count: number }
  - `weak_areas`: { topic: string, subtopics: string[], severity: 'Critical' | 'Moderate' }[]
  - `ai_coaching_feedback`: string
  - `study_plan`: { day_7: string[], day_30: string[], day_60: string[] }

---

## 5. Implementation Sequence

1. **Backend & Server Setup**: Set up `server.ts` with Express and `@google/genai` proxy routes for question generation and coaching feedback.
2. **Authentic Question Bank**: Construct a comprehensive seed database covering Part A (General Aptitude), Part B (Core Concepts across all 13 Units), and Part C (Experimental / Multi-statement Analytical Questions).
3. **Randomization & Exam Engine**: Implement Fisher-Yates seedable shuffling, question timer with warnings (30m, 10m, 5m, 1m), CSIR attempt caps, and color-coded status palette.
4. **Psychometric Analytics Engine**: Calculate negative deductions, percentile curves, topic-wise accuracy, speed metrics, and render interactive Radar, Heatmap, and Bar charts.
5. **AI Coach & Study Plan Generator**: Integrate Gemini 3.8 Flash for dynamic question synthesis and personalized multi-tier study plans.
6. **Export & Admin Panel**: Include printable PDF report formatting, CSV export, question editor, and the exportable Python/Streamlit deployment files.
7. **Testing & Build Verification**: Run `compile_applet` and verify clean execution.
