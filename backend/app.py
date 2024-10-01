from flask import Flask, jsonify, request
from flask_cors import CORS  # Import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import mysql.connector
from routes.transactions import transactions_bp
from routes.budgets import budgets_bp
from routes.goals import goals_bp
from routes.ai_assistant import ai_assistant_bp
from config import Config
from models import get_db_connection, get_users, create_user, get_transactions, add_transaction, get_budgets, set_budget, get_goals, add_goal, ai_assistant_response

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)  


app.register_blueprint(transactions_bp)
app.register_blueprint(budgets_bp)
app.register_blueprint(goals_bp)
app.register_blueprint(ai_assistant_bp)

# User Registration Route
@app.route('/api/register', methods=['POST'])
def create_user_route():
    data = request.get_json()
    if not data or not 'username' in data or not 'email' in data or not 'password' in data:
        return jsonify({"message": "Invalid data"}), 400

    username = data['username']
    email = data['email']
    password = generate_password_hash(data['password']) 
    create_user(username, email, password)
    return jsonify({"message": "User created successfully"}), 201


@app.route('/api/users', methods=['GET'])
def list_users_route():
    users = get_users()  
    return jsonify(users), 200  

@app.route('/api/transactions', methods=['GET'])
def get_transactions_route():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    transactions = get_transactions(user_id)
    return jsonify(transactions), 200

@app.route('/api/transactions', methods=['POST'])
def add_transaction_route():
    data = request.get_json()
    user_id = data.get('user_id')
    amount = data.get('amount')
    category = data.get('category')
    date = data.get('date')
    description = data.get('description', '')

    if not user_id or not amount or not category or not date:
        return jsonify({"error": "Missing required fields"}), 400

    add_transaction(user_id, amount, category, date, description)
    return jsonify({"message": "Transaction added successfully!"}), 201

@app.route('/api/budget', methods=['GET'])
def get_budgets_route():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    budgets = get_budgets(user_id)
    return jsonify(budgets), 200

@app.route('/api/budget', methods=['POST'])
def set_budget_route():
    data = request.get_json()
    user_id = data.get('user_id')
    category = data.get('category')
    budget_limit = data.get('budget_limit')

    if not user_id or not category or not budget_limit:
        return jsonify({"error": "Missing required fields"}), 400

    set_budget(user_id, category, budget_limit)
    return jsonify({"message": "Budget set successfully!"}), 201

@app.route('/api/goals', methods=['GET'])
def get_goals_route():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    goals = get_goals(user_id)
    return jsonify(goals), 200

@app.route('/api/goals', methods=['POST'])
def add_goal_route():
    data = request.get_json()
    user_id = data.get('user_id')
    goal_name = data.get('goal_name')
    target_amount = data.get('target_amount')
    current_amount = data.get('current_amount', 0)

    if not user_id or not goal_name or not target_amount:
        return jsonify({"error": "Missing required fields"}), 400

    add_goal(user_id, goal_name, target_amount, current_amount)
    return jsonify({"message": "Goal added successfully!"}), 201

@app.route('/api/ai_assistant', methods=['POST'])
def ai_assistant_route():
    query = request.json.get('query', '')
    response = ai_assistant_response(query)
    return jsonify({"response": response}), 200

if __name__ == '__main__':
    app.run(debug=True)







