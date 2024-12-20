from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Route to check MongoDB status
@app.route('/status', methods=['GET'])
def check_status():
    try:
        return jsonify({'status': 'MongoDB is running!'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route to create a backup
@app.route('/backup', methods=['POST'])
def create_backup():
    try:
        # Run the backup command
        result = subprocess.run(
            ['docker', 'exec', 'percona-backup', 'pbm', 'backup'],
            capture_output=True, text=True
        )

        # Get the list of backups
        list_result = subprocess.run(
            ['docker', 'exec', 'percona-backup', 'pbm', 'list'],
            capture_output=True, text=True
        )

        return jsonify({'message': 'Backup created', 'output': list_result.stdout})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route to restore a backup
@app.route('/restore', methods=['POST'])
def restore_backup():
    timestamp = request.json.get('timestamp')
    if not timestamp:
        return jsonify({'error': 'Timestamp is required'}), 400
    try:
        result = subprocess.run(
            ['docker', 'exec', 'percona-backup', 'pbm', 'restore', timestamp],
            capture_output=True, text=True
        )
        return jsonify({'message': 'Backup restored', 'output': result.stdout})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route to enter data into MongoDB
@app.route('/enter-data', methods=['POST'])
def enter_data():
    try:
        data = request.json
        name = data.get('name')
        age = data.get('age')

        # Command to insert data into MongoDB
        mongo_command = f'''
        use demoDB;
        db.users.insertOne({{"name": "{name}", "age": {age}}});
        '''

        result = subprocess.run(
            ['docker', 'exec', '-i', 'mongodb', 'mongosh'],
            input=mongo_command, text=True, capture_output=True
        )

        return jsonify({'message': 'Data entered successfully', 'output': result.stdout})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route to display data from MongoDB
@app.route('/display', methods=['GET'])
def display_data():
    try:
        # Command to retrieve all documents from the 'users' collection
        mongo_command = '''
        use demoDB;
        db.users.find().toArray();
        '''
        result = subprocess.run(
            ['docker', 'exec', '-i', 'mongodb', 'mongosh'],
            input=mongo_command, text=True, capture_output=True
        )
        return jsonify({'data': result.stdout})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
