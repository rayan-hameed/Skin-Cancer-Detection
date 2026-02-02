import React from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  Shield,
  UserPlus,
  Activity,
  Award,
  BarChart as ChartBar,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left animate-slide-up">
              <div className="inline-flex items-center px-4 py-2 rounded-full glass mb-8 animate-fade-in">
                <span className="flex h-2 w-2 relative mr-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-slate-600 font-medium text-sm">AI-Powered Dermatology</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-8 leading-tight">
                Detect Skin Cancer with <span className="text-gradient">AI Precision</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
                Our advanced deep learning model analyzes skin lesions with 97% accuracy, providing instant, reliable assessments for peace of mind.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-600/30 group"
                >
                  Start Analysis
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full glass text-slate-700 font-semibold text-lg hover:bg-white transform hover:scale-105 transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="relative lg:block hidden animate-fade-in animation-delay-500">
              <div className="relative z-10 bg-white p-2 rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Dermatology Analysis" 
                  className="rounded-2xl w-full object-cover h-[500px]"
                />
                
                {/* Floating Card */}
                <div className="absolute -bottom-6 -left-6 glass p-4 rounded-2xl flex items-center gap-4 animate-bounce-slow">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Accuracy Status</p>
                    <p className="text-lg font-bold text-slate-900">97.8% Verified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - Floating */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Activity, value: "97%", label: "Accuracy Rate", desc: "Clinically validated results" },
            { icon: ChartBar, value: "50K+", label: "Scans Analyzed", desc: "Trusted by thousands" },
            { icon: Award, value: "Expert", label: "Verification", desc: "Dermatologist approved" }
          ].map((stat, idx) => (
            <div key={idx} className="glass p-8 rounded-3xlcard-hover group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-2xl group-hover:bg-blue-600 transition-colors duration-300">
                  <stat.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-4xl font-bold text-slate-900">{stat.value}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{stat.label}</h3>
              <p className="text-slate-500">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Advanced Technology, <br/><span className="text-gradient">Simple Experience</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We combine medical expertise with cutting-edge AI to provide hospital-grade skin assessment in seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Brain, 
                title: "Deep Learning Core", 
                desc: "Powered by advanced CNN models trained on over 100,000 diverse skin lesion images."
              },
              { 
                icon: Shield, 
                title: "Privacy First", 
                desc: "Your medical data is encrypted and processed securey. We adhere to strict HIPAA guidelines." 
              },
              { 
                icon: UserPlus, 
                title: "Doctor Connect", 
                desc: "Seamlessly share reports with verified dermatologists for immediate second opinions." 
              }
            ].map((feature, idx) => (
              <div key={idx} className="glass p-8 rounded-3xl card-hover relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-125 duration-500">
                  <feature.icon className="w-48 h-48 text-blue-600" />
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[3rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            
            <div className="relative z-10 py-20 px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Ready to take control?
              </h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                Join over 50,000 users trusting SkinCare AI for their early detection needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/signup"
                  className="inline-flex items-center px-8 py-4 rounded-full bg-white text-blue-600 font-bold text-lg hover:bg-blue-50 transition-colors shadow-xl"
                >
                  Create Free Account
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center px-8 py-4 rounded-full bg-blue-700/50 backdrop-blur-sm border border-blue-400/30 text-white font-semibold text-lg hover:bg-blue-700/70 transition-all"
                >
                  View Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
