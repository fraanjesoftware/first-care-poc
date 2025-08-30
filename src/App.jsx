import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Quiz from './pages/Quiz';
import Contact from './pages/Contact';
import Results from './pages/Results';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Quiz />} />
          <Route path="contact" element={<Contact />} />
          <Route path="resultaten" element={<Results />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;