import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chatbot from './Chatbot';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/engsf1" element={<Chatbot />} />
      </Routes>
    </Router>
  );
};

export default App;
