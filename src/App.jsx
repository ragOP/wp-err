import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chatbot from './Chatbot';
import ChatbotTwo from './Chatbottwo';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/engsf1" element={<Chatbot />} />
        <Route path="/engsf2200" element={<ChatbotTwo />} />
      </Routes>
    </Router>
  );
};

export default App;
