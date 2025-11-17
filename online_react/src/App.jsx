// 
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 

import First from "./pages/First";
import Second from "./pages/Second";
import HomePage from "./pages/HomePage";
import Leaderboard from "./pages/Leaderboard";
import Typing from "./pages/Typing";
import CodingQuiz from "./pages/CodingQuiz";
import GeneralKnowledgeQuiz from "./pages/GeneralKnowledgeQuiz";
import ComputerQuiz from "./pages/ComputerQuiz";
import ScienceQuiz from "./pages/ScienceQuiz";
import AboutUs from "./pages/AboutUs";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/first" replace />} />
        <Route path="/first" element={<First />} />
        <Route path="/second" element={<Second />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/typing" element={<Typing />} />
        <Route path="/CodingQuiz" element={<CodingQuiz />} />
        <Route path="/GeneralKnowledgeQuiz" element={<GeneralKnowledgeQuiz />} />
        <Route path="/ComputerQuiz" element={<ComputerQuiz />} />
        <Route path="/ScienceQuiz" element={<ScienceQuiz />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactPage" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
