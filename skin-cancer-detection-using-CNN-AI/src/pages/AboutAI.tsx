import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Database, Cpu, BarChart, Microscope, Shield } from 'lucide-react';

const AboutAI = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-6">
            Our AI Technology
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-500">
            Understanding how our advanced MobileNet V2 model detects skin cancer
          </p>
        </div>

        {/* AI Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="bg-blue-100 rounded-xl p-3 inline-block mb-4">
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Deep Learning Model</h3>
            <p className="text-gray-600">
              We use MobileNet V2, a state-of-the-art convolutional neural network,
              trained on thousands of dermatological images.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="bg-green-100 rounded-xl p-3 inline-block mb-4">
              <Database className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Training Data</h3>
            <p className="text-gray-600">
              Our model is trained on a diverse dataset of over 10,000 validated
              skin lesion images from medical institutions worldwide.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="bg-purple-100 rounded-xl p-3 inline-block mb-4">
              <Cpu className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Processing Power</h3>
            <p className="text-gray-600">
              Advanced GPU acceleration ensures rapid analysis and results
              delivery within seconds of image upload.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Steps List */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Image Processing</h3>
              <p className="text-gray-600 mb-6">
                When you upload an image, our system:
              </p>
              <ol className="space-y-4 list-none">
                {[
                  'Preprocesses the image for optimal analysis',
                  'Extracts key features using CNN layers',
                  'Compares patterns with trained data',
                  'Generates prediction with confidence score'
                ].map((step, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="bg-blue-100 rounded-full px-3 py-1 mr-3 text-blue-600 font-bold">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Highlights */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <BarChart className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">97% Accuracy</h4>
                  <p className="text-sm text-gray-500">In clinical validation tests</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Microscope className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Expert Validated</h4>
                  <p className="text-sm text-gray-500">Results verified by dermatologists</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Privacy Protected</h4>
                  <p className="text-sm text-gray-500">Secure image processing and storage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutAI;
