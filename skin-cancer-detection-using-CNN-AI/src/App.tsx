import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AboutAI from './pages/AboutAI';
import Contact from './pages/Contact';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import Detection from './pages/Detection';
import Results from './pages/Results';
import History from './pages/History';
import About from './pages/About';
import ParentComponent from './components/ParentChat'; // Import ParentComponent for chat functionality
import PatientReports from './components/PatientReports'; // Import the PatientReports component
import { useAuth } from './context/AuthContext';
import PatientHistory from './components/PatientHistory';

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      <Route 
        path="/" 
        element={isAuthenticated ? <Navigate to={user?.role === 'doctor' ? '/doctor-dashboard' : '/detection'} /> : <Home />} 
      />
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to={user?.role === 'doctor' ? '/doctor-dashboard' : '/detection'} /> : <Login />} 
      />
      <Route 
        path="/signup" 
        element={isAuthenticated ? <Navigate to={user?.role === 'doctor' ? '/doctor-dashboard' : '/detection'} /> : <Signup />} 
      />
      <Route path="/about" element={<About></About>} />
      <Route path="/aboutai" element={<AboutAI></AboutAI>} />
      <Route path="contact" element={<Contact></Contact>}/>
      
      <Route 
        path="/patient-dashboard" 
        element={<ProtectedRoute allowedRoles={['patient']}><PatientDashboard /></ProtectedRoute>} 
      />
      <Route 
        path="/doctor-dashboard" 
        element={<ProtectedRoute allowedRoles={['doctor']}><DoctorDashboard /></ProtectedRoute>} 
      />
      <Route path="/detection" element={<ProtectedRoute allowedRoles={['patient']}><Detection /></ProtectedRoute>} />
      <Route path="/results" element={<ProtectedRoute allowedRoles={['patient']}><Results /></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
      {/* <Route path="/about-ai" element={<AboutAI />} /> */}
      <Route path="/patient-history" element={<ProtectedRoute><PatientHistory/></ProtectedRoute>} />
      {/* Add the route for PatientReports */}
      <Route path="/history/view/:reportId" element={<PatientReports />} />

      
      {/* Add the ParentComponent for chat functionality */}
      <Route 
        path="/doctor-dashboard/chat" 
        element={<ProtectedRoute allowedRoles={['doctor']}><ParentComponent /></ProtectedRoute>} 
      />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Toaster position="top-center" />
          <AnimatePresence mode="wait">
            <main className="pt-20">
              <AppRoutes />
            </main>
          </AnimatePresence>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
