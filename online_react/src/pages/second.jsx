import React from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import HomePage from "./HomePage";
import CodingQuiz from "./CodingQuiz";
import GeneralKnowledgeQuiz from "./GeneralKnowledgeQuiz";
import Typing from "./typing"; // make sure file name matches — Typing.jsx
// If Typing.jsx doesn’t exist yet, create it or comment this out

// Simple placeholders for quiz and typing pages
const QuizPage = () => (
  <div className="pt-[100px] text-white text-5xl text-center">
    Quiz Page (Build Me!)
  </div>
);

const TypingPage = () => (
  <div className="pt-[100px] text-white text-5xl text-center">
    Typing Page (Build Me!)
  </div>
);

function Second() {
  return (
    <>

      <style>{`
        @import url('https://db.onlinewebfonts.com/c/554de251fec51511723effebd5d0ed84?family=Roslindale+Display+Condensed+Medium');
        .font-roslindale {
          font-family: 'Roslindale Display Condensed Medium', serif;
        }
      `}</style>

      {/* ✅ Page container */}
      <div className="h-full w-full bg-[#c5c0b2] dark:bg-black font-roslindale overflow-x-hidden">
        <Navbar />

        <Routes>
          {/* Default route — shows HomePage */}
          <Route path="/" element={<HomePage />} />

          {/* Different quiz routes */}
          <Route path="/CodingQuiz" element={<CodingQuiz />} />
          <Route path="/GeneralKnowledgeQuiz" element={<GeneralKnowledgeQuiz />} />
          <Route path="/quiz/science" element={<QuizPage />} />
          <Route path="/quiz/computer" element={<QuizPage />} />

          {/* Typing route */}
          <Route path="/typing" element={<TypingPage />} />
        </Routes>
      </div>
    </>
  );
}

export default Second;
