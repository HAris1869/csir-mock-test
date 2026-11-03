import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI SDK server-side
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Endpoint: Dynamic AI Question Generation
app.post('/api/gemini/generate-question', async (req, res) => {
  try {
    const { topic, part = 'B', difficulty = 'Medium', bloomLevel = 'Analyze', subtopic } = req.body;

    if (!apiKey) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY is not configured in environment secrets.',
      });
    }

    const partDescription =
      part === 'A'
        ? 'Part A: General Aptitude (Logical reasoning, numerical ability, quantitative comparison, graphical analysis, puzzles)'
        : part === 'C'
        ? 'Part C: Higher-order analytical, scientific experimental design, data interpretation, molecular biology experiments, mutation phenotypes, biochemical kinetics with detailed multi-statement evaluation'
        : 'Part B: Core subject conceptual question in Life Sciences/Biotechnology testing factual accuracy, biochemical pathways, genetics, cell biology mechanisms';

    const prompt = `Create 1 authentic, rigorous CSIR-UGC-DBT JRF-NET exam question for:
Section: Part ${part} (${partDescription})
Topic / Syllabus Unit: ${topic || 'Molecular Biology'}
Subtopic: ${subtopic || 'Gene Regulation & Operons'}
Difficulty Level: ${difficulty}
Bloom's Taxonomy Level: ${bloomLevel}

Guidelines:
- Question Text must be clear, precise, and scientifically accurate. For Part C, provide experimental setup/findings or multi-statement combinations (e.g. "Which of the following combinations of statements is correct?").
- Options: Provide exactly 4 options with keys "A", "B", "C", "D".
- Correct Answer: Exactly one of "A", "B", "C", "D".
- Explanation: Detailed scientific explanation explaining why the correct option is right and why the distractors are wrong, citing standard reference principles (e.g. Lehninger, Lodish, Watson, Gilbert).
- Reference Source: Standard textbook or research concept reference.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction:
          'You are an expert professor and official paper setter for the CSIR-UGC NET Life Sciences and DBT-BET JRF examinations. You generate high-quality, scientifically sound, standard multiple-choice questions matching NTA CSIR exam specifications.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question_text: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING, description: 'A, B, C, or D' },
                  text: { type: Type.STRING },
                },
                required: ['id', 'text'],
              },
            },
            correct_answer: { type: Type.STRING, description: 'A, B, C, or D' },
            explanation: { type: Type.STRING },
            reference_source: { type: Type.STRING },
            topic: { type: Type.STRING },
            subtopic: { type: Type.STRING },
            difficulty: { type: Type.STRING },
            part: { type: Type.STRING },
            bloom_level: { type: Type.STRING },
          },
          required: [
            'question_text',
            'options',
            'correct_answer',
            'explanation',
            'reference_source',
            'topic',
            'subtopic',
            'difficulty',
            'part',
            'bloom_level',
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({
      success: true,
      question: {
        id: `gen_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        year_tag: 'AI Generated - 2026 CSIR Standard',
        ...parsed,
      },
    });
  } catch (error: any) {
    console.error('Error generating question via Gemini:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Failed to generate question',
    });
  }
});

// Endpoint: AI Performance Coach Diagnostic & Study Plan
app.post('/api/gemini/coach-analysis', async (req, res) => {
  try {
    const { totalScore, partScores, topicBreakdown, behavioralMetrics, weakTopics } = req.body;

    if (!apiKey) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY is not configured in environment secrets.',
      });
    }

    const prompt = `Act as an elite CSIR-UGC-DBT JRF-NET Life Sciences Educator and Psychometric Assessment Coach.
Analyze the following mock test results of an aspirant:

Total Marks: ${totalScore} / 200
Part A Score: ${partScores?.A ?? 0} (Aptitude)
Part B Score: ${partScores?.B ?? 0} (Core Subject)
Part C Score: ${partScores?.C ?? 0} (Analytical / Experimental)
Weak Topics Detected: ${JSON.stringify(weakTopics || [])}
Topic Breakdown: ${JSON.stringify(topicBreakdown || {})}
Behavioral Metrics:
- Avg Speed per Question: ${behavioralMetrics?.average_speed_sec ?? 60} seconds
- Total Skipped: ${behavioralMetrics?.skipped_count ?? 0}
- Answer Switches: ${behavioralMetrics?.change_count ?? 0}
- Accuracy Under Time Pressure: ${behavioralMetrics?.panic_accuracy ?? 'Normal'}

Provide a comprehensive, high-impact diagnostic assessment and realistic revision roadmap:
1. Executive Coach Summary: 2-3 encouraging yet brutally honest sentences identifying strengths, critical vulnerabilities, and projected score range in their next mock test.
2. 4 Specific Priority Focus Concepts (with actionable high-yield areas).
3. Section-Wise Strategy (Specific tactics for Part A, B, and C attempt management).
4. Concrete 7-Day Plan (Day 1 to 7 hourly/topic breakdown for immediate turnaround).
5. 30-Day Plan (Week 1 to 4 macro focus).
6. 60-Day Plan (Mastery and PYQ integration).
7. Negative Marking Control Advice (how to avoid penalty traps).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction:
          'You are a senior mentor for CSIR JRF Life Sciences candidates who have cracked top ranks. Be precise, pedagogical, cite key references (Lehninger, Lodish, Kuby, Gilbert, Taiz-Zeiger), and emphasize negative marking management.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            executive_summary: { type: Type.STRING },
            expected_score_range: { type: Type.STRING },
            strong_areas: { type: Type.ARRAY, items: { type: Type.STRING } },
            critical_weak_areas: { type: Type.ARRAY, items: { type: Type.STRING } },
            priority_action_items: { type: Type.ARRAY, items: { type: Type.STRING } },
            part_a_advice: { type: Type.STRING },
            part_b_advice: { type: Type.STRING },
            part_c_advice: { type: Type.STRING },
            negative_marking_rule: { type: Type.STRING },
            plan_7_day: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.STRING },
                  focus: { type: Type.STRING },
                  tasks: { type: Type.STRING },
                },
                required: ['day', 'focus', 'tasks'],
              },
            },
            plan_30_day: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  week: { type: Type.STRING },
                  milestone: { type: Type.STRING },
                },
                required: ['week', 'milestone'],
              },
            },
            plan_60_day: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phase: { type: Type.STRING },
                  strategy: { type: Type.STRING },
                },
                required: ['phase', 'strategy'],
              },
            },
          },
          required: [
            'executive_summary',
            'expected_score_range',
            'strong_areas',
            'critical_weak_areas',
            'priority_action_items',
            'part_a_advice',
            'part_b_advice',
            'part_c_advice',
            'plan_7_day',
            'plan_30_day',
            'plan_60_day',
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({
      success: true,
      analysis: parsed,
    });
  } catch (error: any) {
    console.error('Error generating coach analysis:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Failed to generate coach diagnostic',
    });
  }
});

// Vite middleware for development or static serving for production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`CSIR-UGC-DBT JRF-NET Suite listening on port ${port}`);
  });
}

startServer();
