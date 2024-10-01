import mysql.connector
from werkzeug.security import generate_password_hash

def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='ashwika',  # replace with your MySQL username
        password='pass1234',  # replace with your MySQL password
        database='finance_manager_db'  # replace with your database name
    )


def create_user(username, email, password):
    password = generate_password_hash(password)
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)", 
                   (username, email, password))
    connection.commit()
    cursor.close()
    connection.close()

def get_users():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT id, username, email FROM users")  # Select only the fields you want to return
    users = cursor.fetchall()
    cursor.close()
    connection.close()
    return users


def get_transactions(user_id):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM transactions WHERE user_id = %s", (user_id,))
    transactions = cursor.fetchall()
    cursor.close()
    connection.close()
    return transactions

def add_transaction(user_id, amount, category, date, description):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("INSERT INTO transactions (user_id, amount, category, date, description) VALUES (%s, %s, %s, %s, %s)", 
                   (user_id, amount, category, date, description))
    connection.commit()
    cursor.close()
    connection.close()

def get_budgets(user_id):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM budgets WHERE user_id = %s", (user_id,))
    budgets = cursor.fetchall()
    cursor.close()
    connection.close()
    return budgets

def set_budget(user_id, category, budget_limit):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM budgets WHERE user_id = %s AND category = %s", (user_id, category))
    budget = cursor.fetchone()

    if budget:
        cursor.execute("UPDATE budgets SET budget_limit = %s WHERE user_id = %s AND category = %s", 
                       (budget_limit, user_id, category))
    else:
        cursor.execute("INSERT INTO budgets (user_id, category, budget_limit) VALUES (%s, %s, %s)", 
                       (user_id, category, budget_limit))

    connection.commit()
    cursor.close()
    connection.close()

def get_goals(user_id):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM goals WHERE user_id = %s", (user_id,))
    goals = cursor.fetchall()
    cursor.close()
    connection.close()
    return goals

def add_goal(user_id, goal_name, target_amount, current_amount):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("INSERT INTO goals (user_id, goal_name, target_amount, current_amount) VALUES (%s, %s, %s, %s)", 
                   (user_id, goal_name, target_amount, current_amount))
    connection.commit()
    cursor.close()
    connection.close()

def ai_assistant_response(query):
    if 'budget' in query.lower():
        return "Your budget is under control"
    else:
        return "I'm still learning. How can I assist you with your finances today?"
