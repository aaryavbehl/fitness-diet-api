from flask import Flask, request, jsonify, render_template
import json
import os
import webbrowser

app = Flask(__name__, static_folder="static", template_folder="templates")

DATA_FILE = 'users_data.json'

def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as file:
            return json.load(file)
    return {}

def save_data(data):
    with open(DATA_FILE, 'w') as file:
        json.dump(data, file, indent=4)

users_data = load_data()

exercises = [
    {"name": "Bench-Press", "type": "Weight_Training", "duration": "5 Minutes", "sets": 4, "reps": 15}
]

@app.route('/')

def index():
    return render_template('index.html')

@app.route('/get_user_plan', methods=['GET'])

def get_user_plan():
    user_id = request.args.get('user_id')
    if user_id in users_data:
        print(f"User data for {user_id}: {users_data[user_id]}") 
        return jsonify(users_data[user_id].get('fitness_plan', {}))
    return jsonify({"message": "User not found"}), 404

@app.route('/get_user_progress', methods=['GET'])

def get_user_progress():
    user_id = request.args.get('user_id')
    if user_id in users_data:
        print(f"User progress for {user_id}: {users_data[user_id].get('progress', [])}") 
        return jsonify(users_data[user_id].get('progress', []))
    return jsonify({"message": "User not found"}), 404

@app.route('/get_exercises', methods=['GET'])

def get_exercises():
    return jsonify(exercises)

@app.route('/submit_progress', methods=['POST'])

def submit_progress():
    data = request.json
    user_id = data.get('user_id')
    progress = data.get('progress')

    if not user_id or not progress:
        return jsonify({"message": "Invalid data"}), 400
    
    if user_id not in users_data:
        users_data[user_id] = {'progress': [], 'fitness_plan': {}}

    users_data[user_id]['progress'].append(progress)
    save_data(users_data)
    return jsonify({"message": "Progress submitted successfully"})

def open_browser():
    webbrowser.open('http://127.0.0.1:5000', new=2)

if __name__ == '__main__':
    app.run(debug=True)