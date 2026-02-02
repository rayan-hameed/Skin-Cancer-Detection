import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Stethoscope, Menu, X, LogOut, Upload, History, Layout } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const NavLink = ({ to, children, icon: Icon }: { to: string; children: React.ReactNode; icon?: any }) => (
    <Link
      to={to}
      className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        isActive(to)
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
          : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
      }`}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </Link>
  );

  const getNavLinks = () => {
    if (!isAuthenticated) {
      return (
        <>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <div className="w-px h-6 bg-slate-200 mx-2" />
          <Link
            to="/login"
            className="text-slate-600 hover:text-blue-600 font-medium text-sm px-4 py-2"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Get Started
          </Link>
        </>
      );
    }

    if (user?.role === 'patient') {
      return (
        <>
          <NavLink to="/detection" icon={Upload}>Detection</NavLink>
          <NavLink to="/history" icon={History}>My History</NavLink>
        </>
      );
    }

    if (user?.role === 'doctor') {
      return (
        <>
          <NavLink to="/doctor-dashboard" icon={Layout}>Dashboard</NavLink>
          <NavLink to="/history" icon={History}>Patient Records</NavLink>
        </>
      );
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
        scrolled ? 'w-[95%]' : 'w-full'
      }`}>
        <div className={`rounded-2xl transition-all duration-300 ${
          scrolled ? 'glass px-6 py-2' : 'bg-transparent py-2'
        }`}>
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to={isAuthenticated ? (user?.role === 'doctor' ? '/doctor-dashboard' : '/detection') : '/'} className="flex items-center group">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform duration-300">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <div className="ml-3">
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
                    SkinCare AI
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-2">
              {getNavLinks()}
              {isAuthenticated && (
                <button
                  onClick={logout}
                  className="ml-4 flex items-center px-4 py-2 rounded-full border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-300 text-sm font-medium"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 p-4 transition-all duration-300 ${
        isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="glass rounded-2xl p-4 space-y-2">
          {getNavLinks()}
          {isAuthenticated && (
            <button
              onClick={logout}
              className="w-full text-left px-4 py-3 rounded-xl text-base font-medium text-red-600 hover:bg-red-50 flex items-center"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;