import os
import json
from google import genai
from google.genai import types
from pydantic import BaseModel, Field

# Ensure GEMINI_API_KEY is available (loaded in app.py)
api_key = os.environ.get("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)
MODEL = "gemini-2.0-flash"

class SectionAnalysis(BaseModel):
    experience: str = Field(description="Analysis of the experience section")
    education: str = Field(description="Analysis of the education section")
    skills: str = Field(description="Analysis of the skills section")
    projects: str = Field(description="Analysis of the projects section")

class ResumeAnalysisResponse(BaseModel):
    ats_score: int = Field(description="ATS compatibility score (0-100)")
    extracted_skills: list[str] = Field(description="List of all skills found in the resume")
    missing_skills: list[str] = Field(description="Critical skills missing for the target role")
    suggestions: list[str] = Field(description="Specific actionable improvement suggestions")
    section_analysis: SectionAnalysis = Field(description="Detailed analysis by section")

class RoadmapStep(BaseModel):
    title: str = Field(description="Title of the learning step")
    description: str = Field(description="Description of what to learn")
    estimated_duration: str = Field(description="Estimated time to complete")

class SkillGapResponse(BaseModel):
    matching_skills: list[str] = Field(description="Skills the user already has that match the role")
    missing_skills: list[str] = Field(description="Skills required for the role that the user is missing")
    roadmap: list[RoadmapStep] = Field(description="Step-by-step learning roadmap")
    priority_ranking: list[str] = Field(description="Missing skills ranked by priority to learn")

class ChatResponse(BaseModel):
    response: str = Field(description="The AI's response to the user's message")
    suggested_followups: list[str] = Field(description="3 suggested follow-up questions")

class Project(BaseModel):
    title: str = Field(description="Project title")
    description: str = Field(description="Project description")
    tech_stack: list[str] = Field(description="Technologies used in the project")
    difficulty: str = Field(description="Beginner, Intermediate, or Advanced")
    duration: str = Field(description="Estimated time to build")

class ProjectResponse(BaseModel):
    projects: list[Project] = Field(description="List of recommended projects")

class Question(BaseModel):
    question: str = Field(description="The interview question")
    category: str = Field(description="Category of the question (e.g., Technical, Behavioral)")
    difficulty: str = Field(description="Difficulty level")

class InterviewGenerateResponse(BaseModel):
    questions: list[Question] = Field(description="List of generated interview questions")

class InterviewEvalResponse(BaseModel):
    score: int = Field(description="Score out of 100")
    feedback: str = Field(description="Detailed feedback on the answer")
    improvements: list[str] = Field(description="Actionable ways to improve the answer")

def analyze_resume(resume_text: str, target_role: str) -> dict:
    prompt = f"Analyze this resume for a {target_role} role.\n\nResume:\n{resume_text}"
    response = client.models.generate_content(
        model=MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(
            system_instruction="You are an expert ATS system and technical recruiter. Be highly critical but constructive.",
            temperature=0.2,
            response_mime_type='application/json',
            response_schema=ResumeAnalysisResponse,
        )
    )
    return json.loads(response.text)

def analyze_skill_gap(current_skills: list[str], target_role: str, role_requirements: dict) -> dict:
    prompt = (
        f"Target Role: {target_role}\n"
        f"Role Requirements: {json.dumps(role_requirements)}\n"
        f"User's Current Skills: {json.dumps(current_skills)}\n\n"
        "Analyze the skill gap and create a personalized learning roadmap."
    )
    response = client.models.generate_content(
        model=MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(
            system_instruction="You are an expert career counselor and tech educator. Provide actionable roadmaps.",
            temperature=0.3,
            response_mime_type='application/json',
            response_schema=SkillGapResponse,
        )
    )
    return json.loads(response.text)

def chat_with_ai(message: str, history: list, context: dict) -> dict:
    prompt = f"User Context: {json.dumps(context)}\n\nUser Message: {message}"
    # In a real app we'd pass history, but for simplicity we'll just handle the current prompt with context.
    response = client.models.generate_content(
        model=MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(
            system_instruction="You are SkillBridge AI, a helpful, encouraging career mentor. Provide concise, actionable advice in Markdown.",
            temperature=0.7,
            response_mime_type='application/json',
            response_schema=ChatResponse,
        )
    )
    return json.loads(response.text)

def recommend_projects(skills: list[str], target_role: str, difficulty: str) -> dict:
    prompt = (
        f"User Skills: {json.dumps(skills)}\n"
        f"Target Role: {target_role}\n"
        f"Requested Difficulty: {difficulty}\n\n"
        "Recommend 3 specific, portfolio-worthy projects that fit this profile."
    )
    response = client.models.generate_content(
        model=MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(
            system_instruction="You are a senior developer mentoring a junior. Suggest practical, real-world projects that stand out on resumes.",
            temperature=0.5,
            response_mime_type='application/json',
            response_schema=ProjectResponse,
        )
    )
    return json.loads(response.text)

def generate_interview_questions(role: str, interview_type: str, count: int) -> dict:
    prompt = f"Generate {count} {interview_type} interview questions for a {role} position."
    response = client.models.generate_content(
        model=MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(
            system_instruction="You are a tough but fair technical interviewer at a top tech company.",
            temperature=0.4,
            response_mime_type='application/json',
            response_schema=InterviewGenerateResponse,
        )
    )
    return json.loads(response.text)

def evaluate_interview_answer(question: str, answer: str) -> dict:
    prompt = f"Question: {question}\nUser's Answer: {answer}\n\nEvaluate the answer and provide feedback."
    response = client.models.generate_content(
        model=MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(
            system_instruction="You are an expert interviewer. Score the answer objectively and provide specific ways to improve it.",
            temperature=0.3,
            response_mime_type='application/json',
            response_schema=InterviewEvalResponse,
        )
    )
    return json.loads(response.text)
