from flask import Blueprint, request, jsonify
from services.gemini_service import recommend_projects

projects_bp = Blueprint('projects', __name__)

@projects_bp.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON payload provided"}), 400
        
    skills = data.get('skills', [])
    target_role = data.get('target_role', '')
    difficulty = data.get('difficulty', 'Intermediate')
    
    if not target_role:
        return jsonify({"error": "target_role is required"}), 400
        
    try:
        result = recommend_projects(skills, target_role, difficulty)
        return jsonify(result), 200
    except Exception as e:
        print(f"Error in project recommendations: {e}")
        return jsonify({"error": "Failed to get recommendations", "details": str(e)}), 500
