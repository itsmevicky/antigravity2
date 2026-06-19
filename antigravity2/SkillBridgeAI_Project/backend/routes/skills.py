from flask import Blueprint, request, jsonify
from services.gemini_service import analyze_skill_gap
from services.skill_data import get_role_requirements

skills_bp = Blueprint('skills', __name__)

@skills_bp.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON payload provided"}), 400
        
    current_skills = data.get('current_skills', [])
    target_role = data.get('target_role', '')
    
    if not target_role:
        return jsonify({"error": "target_role is required"}), 400
        
    try:
        role_reqs = get_role_requirements(target_role)
        result = analyze_skill_gap(current_skills, target_role, role_reqs)
        return jsonify(result), 200
    except Exception as e:
        print(f"Error in skill gap analysis: {e}")
        return jsonify({"error": "Failed to analyze skill gap", "details": str(e)}), 500
