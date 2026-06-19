import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import routes
from routes.resume import resume_bp
from routes.skills import skills_bp
from routes.chat import chat_bp
from routes.projects import projects_bp
from routes.interview import interview_bp

def create_app():
    app = Flask(__name__)
    # Enable CORS for the React frontend running on Vite's default port 5173
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Register blueprints
    app.register_blueprint(resume_bp, url_prefix='/api/resume')
    app.register_blueprint(skills_bp, url_prefix='/api/skills')
    app.register_blueprint(chat_bp, url_prefix='/api/chat')
    app.register_blueprint(projects_bp, url_prefix='/api/projects')
    app.register_blueprint(interview_bp, url_prefix='/api/interview')

    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({"status": "healthy", "service": "SkillBridge AI"}), 200

    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({"error": "Bad Request", "message": str(error)}), 400

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({"error": "Not Found", "message": "The requested resource was not found"}), 404

    @app.errorhandler(500)
    def server_error(error):
        return jsonify({"error": "Internal Server Error", "message": str(error)}), 500

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
