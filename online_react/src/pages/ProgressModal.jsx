// import React from 'react';

// // === NEW DATA ===
// // Here is the predefined data for the modal
// const userProgressData = {
//   quickStats: {
//     quizzesPlayed: 78,
//     correctPercentage: 82,
//     averageScore: 7940,
//     bestScore: 9850,
//     bestCategory: "Science",
//     worstCategory: "History",
//   },
//   // Data for the bar chart. 10000 is used as the max possible score.
//   scoreHistory: [
//     { month: "June", score: 6500 },
//     { month: "July", score: 7100 },
//     { month: "Aug", score: 7000 },
//     { month: "Sept", score: 7800 },
//     { month: "Oct", score: 8200 },
//     { month: "Nov", score: 9100 },
//   ],
//   maxPossibleScore: 10000,
// };
// // === END NEW DATA ===


// function ProgressModal({ isOpen, onClose }) {
//   if (!isOpen) {
//     return null;
//   }

//   // === NEW: Prepare stats for mapping ===
//   const stats = [
//     { label: "Quizzes Played", value: userProgressData.quickStats.quizzesPlayed },
//     { label: "Correct Answers", value: `${userProgressData.quickStats.correctPercentage}%` },
//     { label: "Average Score", value: userProgressData.quickStats.averageScore.toLocaleString() },
//     { label: "Best Score", value: userProgressData.quickStats.bestScore.toLocaleString() },
//     { label: "Best Category", value: userProgressData.quickStats.bestCategory },
//     { label: "Worst Category", value: userProgressData.quickStats.worstCategory },
//   ];

//   return (
//     <>
//       {/* Backdrop */}
//       <div 
//         className="fixed inset-0 bg-black bg-opacity-70 z-[100] transition-opacity"
//         onClick={onClose}
//       ></div>

//       {/* Modal Content */}
//       <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
//         <div 
//           className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-2xl w-full max-w-2xl transform transition-all max-h-[90vh] overflow-y-auto"
//         >
//           {/* Modal Header */}
//           <div className="flex justify-between items-center p-5 border-b border-border-light dark:border-border-dark sticky top-0 bg-surface-light dark:bg-surface-dark z-10">
//             <h2 className="text-2xl font-bold text-black dark:text-white">Your Progress</h2>
//             <button 
//               onClick={onClose}
//               className="text-black dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors text-2xl"
//             >
//               &times;
//             </button>
//           </div>

//           {/* Modal Body */}
//           <div className="p-6">
//             <p className="text-black dark:text-gray-300 mb-6">
//               Here you can see your performance over time, your best categories, and your quiz-taking habits.
//             </p>

//             {/* === UPDATED CHART === */}
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Score Over Time</h3>
//               {/* Chart container */}
//               <div className="bg-muted-light dark:bg-muted-dark rounded-lg p-4 h-56 flex items-end justify-around gap-2">
//                 {userProgressData.scoreHistory.map(item => (
//                   <div key={item.month} className="flex flex-col items-center flex-1 h-full">
//                     {/* Bar (grows from bottom) */}
//                     <div className="flex items-end w-full h-full">
//                       <div 
//                         className="w-full bg-primary rounded-t-md transition-all duration-500 ease-out"
//                         style={{ height: `${(item.score / userProgressData.maxPossibleScore) * 100}%` }}
//                         title={`Score: ${item.score.toLocaleString()}`}
//                       >
//                       </div>
//                     </div>
//                     {/* Label */}
//                     <span className="text-xs mt-2 text-black dark:text-gray-400">{item.month}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             {/* === END UPDATED CHART === */}


//             {/* === UPDATED STATS === */}
//             <div>
//               <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Quick Stats</h3>
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                 {stats.map(stat => (
//                   <div key={stat.label} className="bg-muted-light dark:bg-muted-dark rounded-lg p-4">
//                     <div className="text-sm uppercase text-black dark:text-gray-400 mb-1">{stat.label}</div>
//                     <div className="text-2xl font-bold text-black dark:text-white">{stat.value}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             {/* === END UPDATED STATS === */}
            
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ProgressModal;
import React from 'react';

// === NEW DATA ===
const userProgressData = {
  quickStats: {
    quizzesPlayed: 78,
    correctPercentage: 82,
    averageScore: 7940,
    bestScore: 9850,
    bestCategory: "Science",
    worstCategory: "History",
  },
  scoreHistory: [
    { month: "June", score: 6500 },
    { month: "July", score: 7100 },
    { month: "Aug", score: 7000 },
    { month: "Sept", score: 7800 },
    { month: "Oct", score: 8200 },
    { month: "Nov", score: 9100 },
  ],
  maxPossibleScore: 10000,
};

function ProgressModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const stats = [
    { label: "Quizzes Played", value: userProgressData.quickStats.quizzesPlayed },
    { label: "Correct Answers", value: `${userProgressData.quickStats.correctPercentage}%` },
    { label: "Average Score", value: userProgressData.quickStats.averageScore.toLocaleString() },
    { label: "Best Score", value: userProgressData.quickStats.bestScore.toLocaleString() },
    { label: "Best Category", value: userProgressData.quickStats.bestCategory },
    { label: "Worst Category", value: userProgressData.quickStats.worstCategory },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-70 z-[100] transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <div
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl transform transition-all bg-[#c5c0b2] text-black dark:bg-black dark:text-white"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b border-gray-400 dark:border-gray-700 sticky top-0 bg-[#c5c0b2] dark:bg-black z-10">
            <h2 className="text-2xl font-bold font-roslindale uppercase">Your Progress</h2>
            <button
              onClick={onClose}
              className="text-3xl font-bold text-black dark:text-white hover:text-yellow-500 transition"
            >
              &times;
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-8">
            <p className="leading-relaxed">
              Track your journey — see your score growth, category strengths, and performance stats.
            </p>

            {/* === SCORE CHART === */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Score Over Time</h3>
              <div className="bg-[#d8d3c3] dark:bg-neutral-900 rounded-xl p-4 h-56 flex items-end justify-around gap-3">
                {userProgressData.scoreHistory.map(item => (
                  <div key={item.month} className="flex flex-col items-center flex-1 h-full">
                    <div className="flex items-end w-full h-full">
                      <div
                        className="w-full bg-yellow-500 dark:bg-yellow-400 rounded-t-md transition-all duration-500 ease-out"
                        style={{ height: `${(item.score / userProgressData.maxPossibleScore) * 100}%` }}
                        title={`Score: ${item.score.toLocaleString()}`}
                      ></div>
                    </div>
                    <span className="text-xs mt-2 font-semibold">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* === QUICK STATS === */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {stats.map(stat => (
                  <div
                    key={stat.label}
                    className="bg-[#d8d3c3] dark:bg-neutral-900 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                  >
                    <div className="text-sm uppercase opacity-80 mb-1">{stat.label}</div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProgressModal;
