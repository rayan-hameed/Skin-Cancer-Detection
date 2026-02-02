import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Lock, UserCog, UserCheck, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const SECRET_KEY = '1234'; 

const Login = () => {
  const { login } = useAuth();
  const [userType, setUserType] = useState('patient');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [secretInput, setSecretInput] = useState('');
  const [isDoctorAllowed, setIsDoctorAllowed] = useState(false);
  const [error, setError] = useState('');

  const handleDoctorClick = () => {
    setShowSecretModal(true);
  };

  const verifySecretKey = () => {
    if (secretInput === SECRET_KEY) {
      setIsDoctorAllowed(true);
      setUserType('doctor');
      setShowSecretModal(false);
      setError('');
    } else {
      setError('Invalid secret key');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
        ...formData,
        role: userType
      });

      login(response.data.token, response.data.user); 
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        
        {/* Secret Key Modal */}
        {showSecretModal && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="glass rounded-2xl p-8 w-96 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Doctor Access</h3>
              <p className="text-sm text-slate-600 mb-4">Please enter the secure hospital key to continue.</p>
              
              <input
                type="password"
                value={secretInput}
                onChange={(e) => setSecretInput(e.target.value)}
                placeholder="Enter secret key"
                className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all mb-3 text-slate-800"
              />
              
              {error && <p className="text-red-500 text-sm mb-4 bg-red-50 px-3 py-2 rounded-lg border border-red-100">{error}</p>}
              
              <div className="flex justify-end gap-3 font-medium">
                <button
                  onClick={() => setShowSecretModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={verifySecretKey}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all"
                >
                  Verify Key
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="glass rounded-3xl shadow-2xl p-8 sm:p-10 relative overflow-hidden animate-slide-up">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 mb-4 shadow-inner">
              <UserCheck className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
            <p className="text-slate-500">Securely access your medical portal</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8 p-1 bg-slate-100/50 rounded-2xl">
            <button
              type="button"
              className={`flex items-center justify-center px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                userType === 'patient' 
                  ? 'bg-white text-blue-600 shadow-md transform scale-[1.02]' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
              onClick={() => {
                setUserType('patient');
                setIsDoctorAllowed(false);
              }}
            >
              <UserCheck className="h-4 w-4 mr-2" />
              Patient
            </button>
            <button
              type="button"
              className={`flex items-center justify-center px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                userType === 'doctor' 
                  ? 'bg-white text-blue-600 shadow-md transform scale-[1.02]' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
              onClick={handleDoctorClick}
            >
              <UserCog className="h-4 w-4 mr-2" />
              Doctor
            </button>
          </div>

          {(userType === 'patient' || isDoctorAllowed) && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-11 px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 text-slate-800 font-medium"
                    placeholder="Email address"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-11 px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 text-slate-800 font-medium"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500/20 bg-slate-50"
                  />
                  <span className="ml-2 text-sm text-slate-600 select-none">Remember me</span>
                </label>
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-4 px-4 rounded-xl text-white font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 transform transition-all duration-300 hover:-translate-y-0.5 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-8 text-center">
            <p className="text-slate-500">
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold text-blue-600 hover:text-indigo-600 transition-colors">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
