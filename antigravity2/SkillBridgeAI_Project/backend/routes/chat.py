from flask import Blueprint, request, jsonify
from services.gemini_service import chat_with_ai

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/message', methods=['POST'])
def message():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON payload provided"}), 400
        
    user_msg = data.get('message', '')
    history = data.get('history', [])
    context = data.get('context', {})
    
    if not user_msg:
        return jsonify({"error": "Message is required"}), 400
        
    try:
        result = chat_with_ai(user_msg, history, context)
        return jsonify(result), 200
    except Exception as e:
        print(f"Error in chat: {e}")
        return jsonify({"error": "Failed to get chat response", "details": str(e)}), 500
