import React from 'react';
import { Brain, Award, Users, Clock, CheckCircle, Shield } from 'lucide-react';
import { Link } from 'react-router-dom'; // ✅ Added import

const About = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              About <span className="text-blue-600">SkinCare AI</span>
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Revolutionizing skin cancer detection through artificial intelligence
              and expert medical collaboration.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We're committed to making early skin cancer detection accessible to everyone,
              combining advanced AI technology with medical expertise to save lives.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-blue-50 rounded-2xl p-8 transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-blue-100 rounded-xl p-3 inline-block">
                  <Brain className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">Advanced Technology</h3>
                <p className="mt-2 text-gray-600">
                  Utilizing state-of-the-art convolutional neural networks for accurate detection
                </p>
              </div>

              <div className="bg-green-50 rounded-2xl p-8 transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-green-100 rounded-xl p-3 inline-block">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">Expert Team</h3>
                <p className="mt-2 text-gray-600">
                  Collaboration with certified dermatologists and AI specialists
                </p>
              </div>

              <div className="bg-purple-50 rounded-2xl p-8 transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-purple-100 rounded-xl p-3 inline-block">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">Quick Results</h3>
                <p className="mt-2 text-gray-600">
                  Fast and accurate analysis with detailed reports within minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our platform offers unique advantages in skin cancer detection
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">High Accuracy</h3>
                <p className="mt-2 text-gray-600">
                  98% accuracy rate in detecting malignant and benign skin lesions
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Shield className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Privacy First</h3>
                <p className="mt-2 text-gray-600">
                  Your data is encrypted and protected with the highest security standards
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Award className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Certified Experts</h3>
                <p className="mt-2 text-gray-600">
                  Access to board-certified dermatologists for professional consultation
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Brain className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Continuous Learning</h3>
                <p className="mt-2 text-gray-600">
                  Our AI model continuously improves with new data and research
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Join Us in the Fight Against Skin Cancer
          </h2>
          <Link
            to="/signup"
            className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-xl text-white hover:bg-white hover:text-blue-600 transition-colors duration-150 ease-in-out"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
