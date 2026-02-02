# 🩺 Skin Cancer Detection System

An AI-powered web application for early detection of skin cancer using Convolutional Neural Networks (CNN). The system provides instant analysis of skin lesion images and helps in identifying potentially malignant conditions.

## ✨ Features

- **AI-Powered Detection**: Uses MobileNetV2-based CNN model for accurate skin lesion classification
- **User Authentication**: Secure login and signup system with JWT tokens
- **Role-Based Access**: Separate interfaces for patients and doctors
- **Medical History**: Track and view past diagnoses and predictions
- **Real-time Analysis**: Instant prediction results with confidence scores
- **Doctor Dashboard**: Healthcare professionals can view all patient records
- **Responsive Design**: Modern, mobile-friendly interface built with React and Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React** with **Vite** - Fast and modern development experience
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Axios** - HTTP client for API requests
- **React Router** - Client-side routing

### Backend
- **Flask** - Python web framework
- **TensorFlow/Keras** - Deep learning model
- **MongoDB** - NoSQL database for user and prediction data
- **JWT** - Secure authentication
- **Flask-CORS** - Cross-origin resource sharing

### AI Model
- **MobileNetV2** architecture
- Binary classification (Benign/Malignant)
- Image preprocessing and normalization
- Model size: ~9MB

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **MongoDB** (local or Atlas)
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/rayan-hameed/Skin-Cancer-Detection.git
cd Skin-Cancer-Detection
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd skin-cancer-backend

# Create and activate virtual environment
python -m venv .venv
.venv\Scripts\activate  # Windows
# source .venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Create .env file and add your MongoDB URI
echo MONGO_URI=your_mongodb_connection_string > .env
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd skin-cancer-detection-using-CNN-AI

# Install dependencies
npm install

# Create .env file for Supabase (if using)
echo VITE_SUPABASE_URL=your_supabase_url > .env
echo VITE_SUPABASE_ANON_KEY=your_supabase_key >> .env
```

### 4. Download AI Model

> **Note**: The AI model file (`skin_cancer_model.h5`) is not included in the repository due to its size. You need to obtain it separately and place it in the `skin-cancer-backend` directory.

## 💻 Running Locally

### Quick Start (Windows)
```bash
# From the root directory
.\run_servers.bat
```

This will start both servers in separate windows:
- Frontend: http://localhost:5173
- Backend: http://127.0.0.1:5000

### Manual Start

**Backend:**
```bash
cd skin-cancer-backend
.venv\Scripts\activate
python app.py
```

**Frontend:**
```bash
cd skin-cancer-detection-using-CNN-AI
npm run dev
```

## 🌐 Deployment

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import repository: `rayan-hameed/Skin-Cancer-Detection`
4. Set root directory: `skin-cancer-detection-using-CNN-AI`
5. Framework: **Vite**
6. Add environment variables from `.env`
7. Deploy!

### Backend Deployment (Render)

1. Go to [Render](https://render.com)
2. Create new Web Service
3. Connect repository: `rayan-hameed/Skin-Cancer-Detection`
4. Root directory: `skin-cancer-backend`
5. Build command: `pip install -r requirements.txt`
6. Start command: `gunicorn app:app`
7. Add environment variables (MongoDB URI, SECRET_KEY)
8. Deploy!

> **Important**: Update CORS settings in `app.py` to include your Vercel domain after deployment.

## 📁 Project Structure

```
Skin-Cancer-Detection/
├── skin-cancer-detection-using-CNN-AI/  # Frontend
│   ├── src/
│   │   ├── pages/          # React pages/routes
│   │   ├── utils/          # API and auth utilities
│   │   └── App.tsx         # Main component
│   ├── package.json
│   └── vite.config.ts
│
├── skin-cancer-backend/     # Backend
│   ├── app.py              # Flask application
│   ├── requirements.txt    # Python dependencies
│   └── skin_cancer_model.h5 # AI model (not in repo)
│
├── run_servers.bat          # Unified startup script
├── .gitignore
└── README.md
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- Environment variables for sensitive data
- CORS configuration for cross-origin security

## 🎯 Usage

1. **Sign Up**: Create an account as a patient or doctor
2. **Login**: Access the dashboard with your credentials
3. **Upload Image**: Select a skin lesion image for analysis
4. **Get Results**: View AI prediction with confidence score
5. **View History**: Access past diagnoses and reports

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is developed as a Final Year Project (FYP).

## 👨‍💻 Author

**Rayan Hameed**
- GitHub: [@rayan-hameed](https://github.com/rayan-hameed)

## ⚠️ Disclaimer

This application is for educational and research purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers with any questions regarding a medical condition.

## 🙏 Acknowledgments

- MobileNetV2 architecture for transfer learning
- TensorFlow/Keras team for the deep learning framework
- Open-source community for various libraries and tools

---

**Made with ❤️ for early skin cancer detection**
