from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson import ObjectId
import os
import tf_keras as keras
from tf_keras.preprocessing import image
import numpy as np
from io import BytesIO
from datetime import datetime, timedelta
import bcrypt
from functools import wraps
import jwt
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from bson.objectid import ObjectId
from bson.errors import InvalidId


# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# MongoDB Configuration
app.config["MONGO_URI"] = "mongodb+srv://rayan_567:rayan_567@cluster0.7l2op.mongodb.net/skincancer?retryWrites=true&w=majority"
mongo = PyMongo(app)

# Secret Key for JWT
app.config['SECRET_KEY'] = 'your-secret-key'

# Load the trained model using manual reconstruction to avoid Keras 3 compatibility issues
def load_detection_model():
    try:
        model_path = 'D:/Rayan/FYp/My FYP final code/skin-cancer-backend/skin_cancer_model.h5'
        print(f"Loading model with reconstruction from: {model_path}")
        # Build architecture matching the saved .h5 weights
        base_model = keras.applications.MobileNetV2(input_shape=(224, 224, 3), include_top=False, weights=None)
        x = keras.layers.GlobalAveragePooling2D()(base_model.output)
        output = keras.layers.Dense(1, activation='sigmoid', name='dense')(x)
        model = keras.models.Model(inputs=base_model.input, outputs=output)
        
        # Load weights by name from .h5 file
        if os.path.exists(model_path):
            model.load_weights(model_path, by_name=True)
            print("Model weights loaded successfully!")
            return model
        else:
            print(f"Model file not found at {model_path}")
            return None
    except Exception as e:
        import traceback
        with open('startup_error.txt', 'w') as f:
            f.write(traceback.format_exc())
        print(f"Error loading model: {e}")
        return None

model = load_detection_model()

# JWT Token Decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        try:
            token = token.split(' ')[1]
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = mongo.db.users.find_one({'_id': ObjectId(data['user_id'])})
            if not current_user:
                return jsonify({'message': 'User not found'}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401
        return f(current_user, *args, **kwargs)
    return decorated

# Send Email Route
@app.route('/send-email', methods=['POST'])
def send_email():
    try:
        data = request.get_json()
        message = data.get('message')
        if not message:
            return jsonify({"error": "Message is required"}), 400

        sender_email = "youremail@gmail.com"
        sender_password = "yourapppassword"
        receiver_email = "rayanhameed6@gmail.com"

        patient_name = data.get("name")
        patient_email = data.get("email")
        message_content = data.get("message")

        subject = f"New Message from Patient: {patient_name}"
        message = f"Patient Name: {patient_name}\nPatient Email: {patient_email}\n\nMessage:\n{message_content}"

        mongo.db.chats.insert_one({
            'sender_name': patient_name,
            'sender_email': patient_email,
            'receiver_email': receiver_email,
            'subject': subject,
            'message': message_content,
            'timestamp': datetime.utcnow(),
        })

        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = receiver_email
        msg['Subject'] = subject
        msg.attach(MIMEText(message, 'plain'))

        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, receiver_email, msg.as_string())

        return jsonify({'message': 'Email sent successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        if mongo.db.users.find_one({'email': data['email']}):
            return jsonify({'message': 'Email already exists'}), 400

        hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

        user = {
            'name': data['name'],
            'email': data['email'],
            'password': hashed_password,
            'role': data['role'],
            'created_at': datetime.utcnow()
        }

        if data['role'] == 'doctor':
            user['license'] = data.get('license', '')

        mongo.db.users.insert_one(user)
        return jsonify({'message': 'User registered successfully'}), 201
    except Exception as e:
        return jsonify({'message': f"Server error: {e}"}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        user = mongo.db.users.find_one({'email': data['email']})

        if user and bcrypt.checkpw(data['password'].encode('utf-8'), user['password']):
            token = jwt.encode({
                'user_id': str(user['_id']),
                'email': user['email'],
                'role': user['role'],
                'exp': datetime.utcnow() + timedelta(days=1)
            }, app.config['SECRET_KEY'])

            return jsonify({
                'token': token,
                'user': {
                    'id': str(user['_id']),
                    'name': user['name'],
                    'email': user['email'],
                    'role': user['role']
                }
            })

        return jsonify({'message': 'Invalid credentials'}), 401
    except Exception as e:
        return jsonify({'message': f"Server error: {e}"}), 500

@app.route('/predict', methods=['POST'])
@token_required
def predict(current_user):
    if model is None:
        return jsonify({'error': 'AI Model not loaded. Check server startup logs.'}), 503
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part in the request.'}), 400

        img_file = request.files['file']
        if img_file.filename == '':
            return jsonify({'error': 'No file selected.'}), 400

        img_bytes = img_file.read()
        img = image.load_img(BytesIO(img_bytes), target_size=(224, 224))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0) / 255.0

        prediction = model.predict(img_array)
        class_names = ['benign', 'malignant']
        predicted_label = class_names[int(prediction[0][0] > 0.5)]
        confidence = float(prediction[0][0])

        result = {
            'user_id': current_user['_id'],
            'prediction': predicted_label,
            'confidence': confidence,
            'timestamp': datetime.utcnow(),
            'image_name': img_file.filename
        }

        result_id = mongo.db.predictions.insert_one(result).inserted_id

        return jsonify({
            'prediction': predicted_label,
            'confidence': confidence,
            'timestamp': result['timestamp'].isoformat(),
            'report_id': str(result_id)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/history', methods=['GET'])
@token_required
def get_history(current_user):
    try:
        if current_user['role'] == 'doctor':
            predictions = mongo.db.predictions.find().sort('timestamp', -1)
        else:
            predictions = mongo.db.predictions.find({'user_id': current_user['_id']}).sort('timestamp', -1)

        results = []
        for pred in predictions:
            user = mongo.db.users.find_one({'_id': pred['user_id']})
            results.append({
                '_id': str(pred['_id']),
                'prediction': pred['prediction'],
                'confidence': pred['confidence'],
                'timestamp': pred['timestamp'].isoformat(),
                'image_name': pred['image_name'],
                'email': user['email'] if user else 'N/A'
            })

        return jsonify(results)
    except Exception as e:
        return jsonify({'error': f"Error retrieving history: {e}"}), 500

@app.route('/history/<report_id>', methods=['DELETE'])
def delete_report(report_id):
    try:
        from bson import ObjectId
        object_id = ObjectId(report_id)
        report = mongo.db.predictions.find_one({'_id': object_id})  # <-- updated to 'predictions'
    except Exception as e:
        print(f"Error with ID conversion: {e}")
        return jsonify({'message': 'Invalid report ID'}), 400

    if not report:
        print(f"Report with ID {report_id} not found.")
        return jsonify({'message': 'Report not found'}), 404

    mongo.db.predictions.delete_one({'_id': object_id})  # <-- also updated to 'predictions'
    return jsonify({'message': 'Report deleted successfully'}), 200





@app.route('/history/view/<report_id>', methods=['GET'])
@token_required
def view_report(current_user, report_id):
    try:
        app.logger.info(f"Received report_id: {report_id}")  # Log received report_id

        # Check if the report_id is valid
        if not ObjectId.is_valid(report_id):
            return jsonify({'message': 'Invalid report ID format'}), 400

        report = mongo.db.predictions.find_one({'_id': ObjectId(report_id)})

        if not report:
            return jsonify({'message': 'Report not found'}), 404

        return jsonify({
            'id': str(report['_id']),
            'prediction': report['prediction'],
            'confidence': report['confidence'],
            'timestamp': report['timestamp'].isoformat(),
            'image_name': report['image_name']
        })
    except Exception as e:
        app.logger.error(f"Error fetching report: {e}")
        return jsonify({'message': 'Error fetching report'}), 500
    
@app.route('/all-history', methods=['GET'])
@token_required
def get_all_history(current_user):
    try:
        # Check if the current user has doctor role
        if current_user.get('role') != 'doctor':
            return jsonify({'message': 'Unauthorized access: Only doctors can view all history.'}), 403

        # Fetch all prediction records, newest first
        predictions = mongo.db.predictions.find().sort('timestamp', -1)

        results = []
        for pred in predictions:
            user = mongo.db.users.find_one({'_id': pred.get('user_id')})
            results.append({
                '_id': str(pred['_id']),
                'prediction': pred.get('prediction'),
                'confidence': pred.get('confidence'),
                'timestamp': pred.get('timestamp').isoformat() if pred.get('timestamp') else '',
                'image_name': pred.get('image_name', 'N/A'),
                'email': user['email'] if user and 'email' in user else 'N/A'
            })

        return jsonify(results), 200

    except Exception as e:
        print(f"Error in /all-history route: {e}")  # Log to console for debugging
        return jsonify({'error': 'Internal server error while retrieving history.'}), 500

@app.route('/all-history/<report_id>', methods=['DELETE'])
@token_required
def delete_any_report(current_user, report_id):
    try:
        # Only allow doctors to delete
        if current_user.get('role') != 'doctor':
            return jsonify({'message': 'Unauthorized access: Only doctors can delete reports.'}), 403

        from bson import ObjectId
        object_id = ObjectId(report_id)

        report = mongo.db.predictions.find_one({'_id': object_id})
        if not report:
            return jsonify({'message': 'Report not found.'}), 404

        mongo.db.predictions.delete_one({'_id': object_id})
        return jsonify({'message': 'Report deleted successfully.'}), 200

    except Exception as e:
        print(f"Error deleting report: {e}")
        return jsonify({'message': 'Invalid report ID or server error.'}), 400


@app.route('/patients', methods=['GET'])
@token_required
def get_patients(current_user):
    try:
        if current_user['role'] != 'doctor':
            return jsonify({'message': 'Unauthorized'}), 403

        patients = mongo.db.users.find({'role': 'patient'})
        return jsonify([{
            "id": str(patient['_id']),
            "name": patient['name'],
            "email": patient.get('email', 'No email provided'),
            "date": patient['created_at'].isoformat(),
            "status": patient.get('status', 'N/A'),
            "result": patient.get('result', 'N/A'),
        } for patient in patients])
    except Exception as e:
        return jsonify({"error": "Failed to fetch patients"}), 500

@app.route('/users', methods=['GET'])
@token_required
def get_users(current_user):
    try:
        if current_user['role'] != 'doctor':
            return jsonify({'message': 'Unauthorized'}), 403

        users = mongo.db.users.find({'role': 'patient'})
        return jsonify([{
            'id': str(user['_id']),
            'name': user['name'],
            'email': user['email']
        } for user in users])
    except Exception as e:
        return jsonify({'error': f'Failed to fetch users: {e}'}), 500

@app.route('/chat/<email>', methods=['GET'])
@token_required
def get_chat(current_user, email):
    try:
        if current_user['role'] != 'doctor' and current_user['email'] != email:
            return jsonify({'message': 'Unauthorized access'}), 403

        messages = list(mongo.db.chats.find({
            '$or': [
                {'sender_email': email, 'receiver_email': current_user['email']},
                {'sender_email': current_user['email'], 'receiver_email': email}
            ]
        }).sort('timestamp', 1))

        return jsonify([{
            'id': str(msg['_id']),
            'sender_email': msg['sender_email'],
            'receiver_email': msg['receiver_email'],
            'message': msg['message'],
            'timestamp': msg['timestamp'].isoformat()
        } for msg in messages])
    except Exception as e:
        return jsonify({'error': 'Error fetching chat'}), 500
    
# Add new secret key (admin use)
@app.route('/secret-keys', methods=['POST'])
def add_secret_key():
    data = request.get_json()
    new_key = data.get('key')
    
    if not new_key:
        return jsonify({'message': 'Key is required'}), 400

    if mongo.db.secret_keys.find_one({'key': new_key}):
        return jsonify({'message': 'Key already exists'}), 400

    mongo.db.secret_keys.insert_one({'key': new_key, 'created_at': datetime.utcnow()})
    return jsonify({'message': 'Secret key added successfully'}), 201

# Get all secret keys (admin use)
@app.route('/secret-keys', methods=['GET'])
def get_secret_keys():
    keys = mongo.db.secret_keys.find()
    return jsonify([{'key': k['key'], 'created_at': k['created_at'].isoformat()} for k in keys]), 200    

@app.route('/ping_db')
def ping_db():
    try:
        mongo.db.users.find_one()
        return "MongoDB connected!"
    except Exception as e:
        return f"Error connecting to MongoDB: {e}"

if __name__ == '__main__':
    app.run(debug=True)
