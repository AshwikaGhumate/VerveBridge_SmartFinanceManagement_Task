from flask import Blueprint, jsonify, request
import mysql.connector
from config import Config

transactions_bp = Blueprint('transactions', __name__)

def get_db_connection():
    return mysql.connector.connect(
        host=Config.MYSQL_HOST,
        user=Config.MYSQL_USER,
        password=Config.MYSQL_PASSWORD,
        database=Config.MYSQL_DB
    )

@transactions_bp.route('/api/transactions', methods=['GET'])
def get_transactions():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    cursor.execute("SELECT * FROM transactions WHERE user_id = %s", (user_id,))
    transactions = cursor.fetchall()
    
    cursor.close()
    conn.close()
    
    return jsonify(transactions), 200

@transactions_bp.route('/api/transactions', methods=['POST'])
def add_transaction():
    data = request.get_json()
    user_id = data.get('user_id')
    amount = data.get('amount')
    category = data.get('category')
    date = data.get('date')
    description = data.get('description', '')

    if not user_id or not amount or not category or not date:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute(
        "INSERT INTO transactions (user_id, amount, category, date, description) VALUES (%s, %s, %s, %s, %s)",
        (user_id, amount, category, date, description)
    )
    conn.commit()
    
    cursor.close()
    conn.close()
    
    return jsonify({"message": "Transaction added successfully!"}), 201
