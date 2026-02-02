import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Image as ImageIcon, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Detection = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('File size exceeds 10MB. Please upload a smaller image.');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file.');
        return;
      }
      setSelectedFile(file);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('File size exceeds 10MB. Please upload a smaller image.');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Please drop a valid image file.');
        return;
      }
      setSelectedFile(file);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to submit an image.');
        return;
      }

      const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      const results = {
        class: response.data.prediction,
        confidence: response.data.confidence,
        timestamp: new Date().toISOString(),
      };

      navigate('/results', { state: { results } });
    } catch (err) {
      console.error('Prediction Error:', err);
      setError('Error processing image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!message.trim()) {
      alert('Message cannot be empty.');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to send a message.');
        return;
      }
  
      // Log the message data
      console.log('Sending message:', { message });
  
      // Send message data to backend
      const response = await axios.post(
        'http://localhost:5000/send-email',
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('Email sent response:', response.data);
  
      alert('Email sent to specialist successfully!');
      setMessage('');
      setShowEmailForm(false);
    } catch (err) {
      console.error('Email Error:', err.response ? err.response.data : err.message);
      alert('Failed to send message. Please try again later.');
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Skin Cancer Detection
          </h1>
          <p className="text-xl text-gray-600">
            Upload a clear image of the skin lesion for AI analysis
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center ${previewUrl ? 'border-blue-500' : 'border-gray-300'} transition-colors duration-200`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="image-upload"
            />

            {!previewUrl ? (
              <label htmlFor="image-upload" className="cursor-pointer block">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-50 rounded-full p-4 mb-4">
                    <ImageIcon className="h-12 w-12 text-blue-500" />
                  </div>
                  <p className="text-xl font-medium text-gray-700 mb-2">
                    Drop your image here or click to upload
                  </p>
                  <p className="text-sm text-gray-500">Supports: JPG, PNG, JPEG (Max 10MB)</p>
                </div>
              </label>
            ) : (
              <div className="relative">
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(null);
                  }}
                  className="absolute top-2 right-2 bg-red-100 p-2 rounded-full hover:bg-red-200"
                >
                  <X className="h-5 w-5 text-red-600" />
                </button>
                <img src={previewUrl} alt="Preview" className="max-h-96 mx-auto rounded-lg" />
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg text-red-600">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={!selectedFile || isLoading}
            className={`mt-6 w-full flex items-center justify-center px-8 py-4 text-lg font-medium rounded-xl text-white ${selectedFile && !isLoading ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin h-5 w-5 mr-3" />
                Processing...
              </>
            ) : (
              <>
                <Upload className="h-5 w-5 mr-2" />
                Analyze Image
              </>
            )}
          </button>
        </div>

        {/* Toggle Message Form */}
        <div className="mt-8">
          <button
            onClick={() => setShowEmailForm(!showEmailForm)}
            className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
          >
            {showEmailForm ? 'Cancel Message' : 'Send Message to Specialist'}
          </button>
        </div>

        {/* Email Form */}
        {showEmailForm && (
          <div className="mt-6">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full p-4 border border-gray-300 rounded-md"
              placeholder="Write your message here..."
            ></textarea>
            <button
              onClick={handleSendEmail}
              className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
            >
              Send Message
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Detection;
