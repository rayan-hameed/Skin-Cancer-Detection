import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, ArrowLeft, Download, Share2 } from 'lucide-react';

interface ResultsData {
  class: string;
  confidence: number;
  timestamp: string;
}

const Results = () => {
  const location = useLocation();
  const results = location.state?.results as ResultsData;

  const isMalignant = results?.class === 'malignant';
  const confidencePercent = (results?.confidence * 100).toFixed(1);
  const confidence = parseFloat(confidencePercent);

  // Determine the recommendation based on the confidence score
  let recommendationMessage = '';
  if (confidence < 60) {
    recommendationMessage = "The analysis indicates a potential benign condition. However, due to the lower confidence, we strongly recommend early consultation with a dermatologist for accurate diagnosis and timely treatment.";
  } else {
    recommendationMessage = "Based on the analysis, the condition appears benign. While no immediate concern is suggested, consider home-based remedies like keeping the area moisturized and avoiding sun exposure. Keep monitoring the condition and consult a healthcare provider if any changes occur.";
  }

  // Function to download the report as a text file
  const downloadReport = () => {
    const reportContent = `Analysis Results:
    Classification: ${results?.class}
    Confidence: ${confidencePercent}%
    Timestamp: ${results?.timestamp}
    Recommendation: ${recommendationMessage}`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'skin_cancer_analysis_report.txt';
    link.click();
  };

  // Function to share the results (using navigator.share for mobile)
  const shareResults = () => {
    const reportContent = `Skin Cancer Analysis Results:
    Classification: ${results?.class}
    Confidence: ${confidencePercent}%
    Timestamp: ${results?.timestamp}
    Recommendation: ${recommendationMessage}`;

    if (navigator.share) {
      navigator.share({
        title: 'Skin Cancer Analysis Report',
        text: reportContent,
      }).catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Sharing is not supported on this device.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <Link
          to="/detection"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Detection
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className={`p-6 ${isMalignant ? 'bg-red-50' : 'bg-green-50'}`}>
            <div className="flex items-center">
              {isMalignant ? (
                <AlertCircle className="h-8 w-8 text-red-600 mr-3" />
              ) : (
                <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
              )}
              <h1 className="text-2xl font-bold text-gray-900">
                Analysis Results
              </h1>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                  Classification
                </h2>
                <div className={`inline-flex items-center px-4 py-2 rounded-full ${
                  isMalignant
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {results?.class.charAt(0).toUpperCase() + results?.class.slice(1)}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                  Confidence Score
                </h2>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-blue-100 text-blue-800">
                        {confidencePercent}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                    <div
                      style={{ width: `${confidencePercent}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Recommendation
              </h2>
              <p className="text-gray-600">{recommendationMessage}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button 
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700" 
                onClick={downloadReport}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </button>
              <button 
                className="inline-flex items-center px-4 py-2 border border-blue-600 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50" 
                onClick={shareResults}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Results
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Next Steps
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center">
              <span className="bg-blue-100 rounded-full p-1 mr-3">1</span>
              Save or download your results
            </li>
            <li className="flex items-center">
              <span className="bg-blue-100 rounded-full p-1 mr-3">2</span>
              Schedule a consultation with a specialist
            </li>
            <li className="flex items-center">
              <span className="bg-blue-100 rounded-full p-1 mr-3">3</span>
              Continue regular skin monitoring
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default Results;
