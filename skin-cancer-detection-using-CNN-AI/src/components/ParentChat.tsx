import React, { useState, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import axios from 'axios';

const ParentChat = () => {
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [token, setToken] = useState<string>('');

  // Fetch user data (you can get these from a state management or backend)
  useEffect(() => {
    // Example to set current user id and token (replace with actual logic)
    const userId = 'yourUserId';  // Set it dynamically
    const userToken = 'yourAuthToken';  // Set it dynamically
    
    setCurrentUserId(userId);
    setToken(userToken);
  }, []);

  return (
    <div>
      {currentUserId && token && (
        <ChatWindow currentUserId={currentUserId} token={token} />
      )}
    </div>
  );
};

export default ParentChat;
