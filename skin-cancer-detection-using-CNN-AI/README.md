# SkinCare AI - Skin Cancer Detection System

## Setup Instructions

### Frontend Setup
1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

### Backend Setup
1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

3. Set up environment variables:
- Create `.env` file in backend directory
- Add MongoDB URI and Secret Key

4. Start Flask server:
```bash
python app.py
```

## Features
- AI-powered skin cancer detection
- Patient and doctor portals
- Secure authentication
- History tracking
- Doctor feedback system