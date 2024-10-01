from flask import Blueprint, jsonify, request

ai_assistant_bp = Blueprint('ai_assistant', __name__)

@ai_assistant_bp.route('/api/ai_assistant', methods=['POST'])
def ai_assistant():
    query = request.json.get('query', '')
    
   
    if 'budget' in query.lower():
        response = "Your budget is under control"
    else:
        response = "I'm still learning. How can I assist you with your finances today?"
    
    return jsonify({"response": response}), 200
