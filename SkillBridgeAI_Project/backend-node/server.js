require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL = 'gemini-2.0-flash';

// Helpers
const callGemini = async (prompt, systemInstruction, schema) => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: schema,
        temperature: 0.3,
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

// 1. Resume Analysis
app.post('/api/resume/analyze', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const targetRole = req.body.target_role || 'Software Engineer';
  
  try {
    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text;

    const schema = {
      type: "object",
      properties: {
        ats_score: { type: "integer", description: "0-100" },
        extracted_skills: { type: "array", items: { type: "string" } },
        missing_skills: { type: "array", items: { type: "string" } },
        suggestions: { type: "array", items: { type: "string" } },
        section_analysis: {
          type: "object",
          properties: {
            experience: { type: "string" },
            education: { type: "string" },
            skills: { type: "string" },
            projects: { type: "string" }
          }
        }
      }
    };

    const prompt = `Analyze this resume for a ${targetRole} role.\n\nResume:\n${resumeText}`;
    const systemInstruction = "You are an expert ATS system and technical recruiter.";
    
    const result = await callGemini(prompt, systemInstruction, schema);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Skill Gap
app.post('/api/skills/analyze', async (req, res) => {
  const { current_skills, target_role } = req.body;
  
  const schema = {
    type: "object",
    properties: {
      matching_skills: { type: "array", items: { type: "string" } },
      missing_skills: { type: "array", items: { type: "string" } },
      priority_ranking: { type: "array", items: { type: "string" } },
      roadmap: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            estimated_duration: { type: "string" }
          }
        } 
      }
    }
  };

  const prompt = `Target Role: ${target_role}\nCurrent Skills: ${JSON.stringify(current_skills)}\nAnalyze the skill gap and create a roadmap.`;
  
  try {
    const result = await callGemini(prompt, "You are a career counselor.", schema);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Chatbot
app.post('/api/chat/message', async (req, res) => {
  const { message, history } = req.body;
  
  const schema = {
    type: "object",
    properties: {
      response: { type: "string" },
      suggested_followups: { type: "array", items: { type: "string" } }
    }
  };

  const prompt = `User says: ${message}`;
  
  try {
    const result = await callGemini(prompt, "You are SkillBridge AI, a helpful career mentor. Give concise Markdown answers.", schema);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Projects
app.post('/api/projects/recommend', async (req, res) => {
  const { skills, target_role, difficulty } = req.body;
  
  const schema = {
    type: "object",
    properties: {
      projects: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            tech_stack: { type: "array", items: { type: "string" } },
            difficulty: { type: "string" },
            duration: { type: "string" }
          }
        }
      }
    }
  };

  const prompt = `Target Role: ${target_role}\nDifficulty: ${difficulty}\nSkills: ${JSON.stringify(skills)}\nRecommend 3 projects.`;
  
  try {
    const result = await callGemini(prompt, "You are a senior mentor.", schema);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Interview Generate
app.post('/api/interview/generate', async (req, res) => {
  const { role, type, count } = req.body;
  
  const schema = {
    type: "object",
    properties: {
      questions: {
        type: "array",
        items: {
          type: "object",
          properties: {
            question: { type: "string" },
            category: { type: "string" },
            difficulty: { type: "string" }
          }
        }
      }
    }
  };

  const prompt = `Generate ${count} ${type} interview questions for a ${role} role.`;
  
  try {
    const result = await callGemini(prompt, "You are an interviewer.", schema);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Interview Evaluate
app.post('/api/interview/evaluate', async (req, res) => {
  const { question, user_answer } = req.body;
  
  const schema = {
    type: "object",
    properties: {
      score: { type: "integer" },
      feedback: { type: "string" },
      improvements: { type: "array", items: { type: "string" } }
    }
  };

  const prompt = `Question: ${question}\nUser Answer: ${user_answer}\nEvaluate the answer.`;
  
  try {
    const result = await callGemini(prompt, "You are an expert evaluator.", schema);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log('Node.js backend running on http://localhost:' + PORT);
});
