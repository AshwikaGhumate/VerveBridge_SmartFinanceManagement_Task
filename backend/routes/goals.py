from flask import Blueprint, jsonify, request
import mysql.connector
from config import Config

goals_bp = Blueprint('goals', __name__)

def get_db_connection():
    return mysql.connector.connect(
        host=Config.MYSQL_HOST,
        user=Config.MYSQL_USER,
        password=Config.MYSQL_PASSWORD,
        database=Config.MYSQL_DB
    )

@goals_bp.route('/api/goals', methods=['GET'])
def get_goals():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM goals WHERE user_id = %s", (user_id,))
    goals = cursor.fetchall()

    cursor.close()
    conn.close()
    
    return jsonify(goals), 200

@goals_bp.route('/api/goals', methods=['POST'])
def add_goal():
    data = request.get_json()
    user_id = data.get('user_id')
    goal_name = data.get('goal_name')
    target_amount = data.get('target_amount')
    current_amount = data.get('current_amount', 0)

    if not user_id or not goal_name or not target_amount:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO goals (user_id, goal_name, target_amount, current_amount) VALUES (%s, %s, %s, %s)",
        (user_id, goal_name, target_amount, current_amount)
    )
    conn.commit()

    cursor.close()
    conn.close()
    
    return jsonify({"message": "Goal added successfully!"}), 201
