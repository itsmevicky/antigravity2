from flask import Blueprint, request, jsonify
from services.gemini_service import generate_interview_questions, evaluate_interview_answer

interview_bp = Blueprint('interview', __name__)

@interview_bp.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON payload provided"}), 400
        
    role = data.get('role', '')
    interview_type = data.get('type', 'Technical')
    count = int(data.get('count', 3))
    
    if not role:
        return jsonify({"error": "role is required"}), 400
        
    try:
        result = generate_interview_questions(role, interview_type, count)
        return jsonify(result), 200
    except Exception as e:
        print(f"Error generating interview questions: {e}")
        return jsonify({"error": "Failed to generate questions", "details": str(e)}), 500

@interview_bp.route('/evaluate', methods=['POST'])
def evaluate():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON payload provided"}), 400
        
    question = data.get('question', '')
    answer = data.get('user_answer', '')
    
    if not question or not answer:
        return jsonify({"error": "question and user_answer are required"}), 400
        
    try:
        result = evaluate_interview_answer(question, answer)
        return jsonify(result), 200
    except Exception as e:
        print(f"Error evaluating interview answer: {e}")
        return jsonify({"error": "Failed to evaluate answer", "details": str(e)}), 500
