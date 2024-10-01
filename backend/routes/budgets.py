from flask import Blueprint, jsonify, request
import mysql.connector
from config import Config

budgets_bp = Blueprint('budgets', __name__)

def get_db_connection():
    return mysql.connector.connect(
        host=Config.MYSQL_HOST,
        user=Config.MYSQL_USER,
        password=Config.MYSQL_PASSWORD,
        database=Config.MYSQL_DB
    )

@budgets_bp.route('/api/budget', methods=['GET'])
def get_budgets():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM budgets WHERE user_id = %s", (user_id,))
    budgets = cursor.fetchall()
    
    cursor.close()
    conn.close()
    
    return jsonify(budgets), 200

@budgets_bp.route('/api/budget', methods=['POST'])
def set_budget():
    data = request.get_json()
    user_id = data.get('user_id')
    category = data.get('category')
    budget_limit = data.get('budget_limit')

    if not user_id or not category or not budget_limit:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

   
    cursor.execute("SELECT * FROM budgets WHERE user_id = %s AND category = %s", (user_id, category))
    budget = cursor.fetchone()
    
    if budget:
        cursor.execute(
            "UPDATE budgets SET budget_limit = %s, updated_at = NOW() WHERE id = %s",
            (budget_limit, budget[0])  # Using the budget ID
        )
    else:
        cursor.execute(
            "INSERT INTO budgets (user_id, category, budget_limit) VALUES (%s, %s, %s)",
            (user_id, category, budget_limit)
        )

    conn.commit()
    cursor.close()
    conn.close()
    
    return jsonify({"message": "Budget set successfully!"}), 201
