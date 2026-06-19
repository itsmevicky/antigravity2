from flask import Blueprint, request, jsonify
from services.resume_parser import extract_text_from_pdf
from services.gemini_service import analyze_resume

resume_bp = Blueprint('resume', __name__)

@resume_bp.route('/analyze', methods=['POST'])
def analyze():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400
        
    target_role = request.form.get('target_role', 'Software Engineer')
    
    try:
        # Extract text from PDF
        resume_text = extract_text_from_pdf(file)
        if not resume_text.strip():
            return jsonify({"error": "Could not extract text from PDF"}), 400
            
        # Get AI analysis
        analysis_result = analyze_resume(resume_text, target_role)
        
        return jsonify(analysis_result), 200
        
    except Exception as e:
        print(f"Error in resume analysis: {e}")
        return jsonify({"error": "Failed to analyze resume", "details": str(e)}), 500
