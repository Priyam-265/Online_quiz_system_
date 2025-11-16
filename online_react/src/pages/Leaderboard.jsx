// import React, { useState, useEffect, useMemo, useRef } from 'react';
// import ProgressModal from './ProgressModal.jsx'; 
// import WeeklyChallengeModal from './WeeklyChallengeModal.jsx'; // === NEW: Import the challenge modal ===
// import { Link } from 'react-router-dom';
// // === 1. AUTOMATIC DATA ===
// const now = Date.now();
// const oneDay = 1000 * 60 * 60 * 24;

// const allPlayers = [
//   // ... (all player data remains the same) ...
//   { id: 3, username: 'TriviaTitan', score: 8760, category: 'generalknowledge', badges: ['champion'], activity: 'online', date: now },
//   { id: 11, username: 'CodeMaster', score: 6400, category: 'coding', badges: ['champion'], activity: 'online', date: now - (oneDay / 2) },
//   { id: 1, username: 'QuizWhiz', score: 9850, category: 'science', badges: ['speed', 'streak'], activity: 'online', date: now - (oneDay * 2) },
//   { id: 6, username: 'SmartSparrow', score: 7840, category: 'generalknowledge', badges: ['streak'], activity: 'online', date: now - (oneDay * 3) },
//   { id: 16, username: 'DataDragon', score: 6000, category: 'coding', badges: ['streak'], activity: 'online', date: now - (oneDay * 4) },
//   { id: 18, username: 'QueryQueen', score: 5850, category: 'coding', badges: ['speed'], activity: 'online', date: now - (oneDay * 6) },
//   { id: 2, username: 'BrainyBee', score: 9320, category: 'history', badges: ['perfect'], activity: 'recent', date: now - (oneDay * 8) },
//   { id: 4, username: 'WiseOwl', score: 8450, category: 'science', badges: [], activity: 'recent', date: now - (oneDay * 10) },
//   { id: 7, username: 'CuriousCat', score: 7520, category: 'science', badges: ['perfect'], activity: 'recent', date: now - (oneDay * 12) },
//   { id: 9, username: 'MindMaven', score: 6930, category: 'generalknowledge', badges: ['champion', 'speed'], activity: 'online', date: now - (oneDay * 15) },
//   { id: 12, username: 'LogicLeopard', score: 6350, category: 'coding', badges: ['speed'], activity: 'recent', date: now - (oneDay * 20) },
//   { id: 14, username: 'SciShark', score: 6100, category: 'science', badges: ['perfect'], activity: 'online', date: now - (oneDay * 25) },
//   { id: 15, username: 'TriviaTrex', score: 6050, category: 'generalknowledge', badges: [], activity: 'recent', date: now - (oneDay * 28) },
//   { id: 21, username: 'AtomAnt', score: 5700, category: 'science', badges: ['perfect', 'streak'], activity: 'online', date: now - (oneDay * 29) },
//   { id: 5, username: 'KnowledgeKnight', score: 8120, category: 'history', badges: ['speed'], activity: 'offline', date: now - (oneDay * 35) },
//   { id: 8, username: 'ProfessorPuzzle', score: 7210, category: 'history', badges: [], activity: 'offline', date: now - (oneDay * 40) },
//   { id: 10, username: 'GeniusGazelle', score: 6650, category: 'science', badges: [], activity: 'offline', date: now - (oneDay * 50) },
//   { id: 13, username: 'HistoryHawk', score: 6200, category: 'history', badges: [], activity: 'offline', date: now - (oneDay * 60) },
//   { id: 17, username: 'PixelPuma', score: 5900, category: 'coding', badges: [], activity: 'offline', date: now - (oneDay * 70) },
//   { id: 19, username: 'FactFox', score: 5800, category: 'generalknowledge', badges: [], activity: 'recent', date: now - (oneDay * 80) },
//   { id: 20, username: 'PastPanda', score: 5750, category: 'history', badges: ['champion'], activity: 'offline', date: now - (oneDay * 90) },
// ];

// const ITEMS_PER_PAGE = 10;


// function Leaderboard() {
//   // === STATE MANAGEMENT ===
//   const [players, setPlayers] = useState([]);  
//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeTimeFilter, setActiveTimeFilter] = useState('All Time');
//   const [selectedCategories, setSelectedCategories] = useState({
//     science: true,
//     history: true,
//     generalknowledge: true,
//     coding: true,
//   });
//   const [selectedBadges, setSelectedBadges] = useState({
//     speed: false,
//     perfect: false,
//     streak: false,
//     champion: false,
//   });
//   const [selectedActivity, setSelectedActivity] = useState({
//     online: false,
//     recent: false,
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
//   const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false); // === NEW ===

//   // === DATA LOADING ===
//   useEffect(() => {
//     // ... (logic remains the same) ...
//     const sortedPlayers = [...allPlayers].sort((a, b) => b.score - a.score);
//     setPlayers(sortedPlayers);
//   }, []);

//   // === FILTERING LOGIC ===
//   const filteredRows = useMemo(() => {
//     // ... (logic remains the same) ...
//     const now = new Date();
//     const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); 
//     const oneWeekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
//     const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    
//     const activeCategories = Object.keys(selectedCategories).filter(k => selectedCategories[k]);
//     const activeBadges = Object.keys(selectedBadges).filter(k => selectedCategories[k]);
//     const activeActivities = Object.keys(selectedActivity).filter(k => selectedActivity[k]);

//     return players.filter(player => {
//       if (searchTerm && !player.username.toLowerCase().includes(searchTerm.toLowerCase())) {
//         return false;
//       }
//       const allCategoriesUnchecked = activeCategories.length === 0;
//       if (!allCategoriesUnchecked && !activeCategories.includes(player.category)) {
//         return false;
//       }
//       if (activeBadges.length > 0 && !activeBadges.every(badge => player.badges.includes(badge))) {
//         return false;
//       }
//       const allActivitiesUnchecked = activeActivities.length === 0;
//       if (!allActivitiesUnchecked && !activeActivities.includes(player.activity)) {
//         return false;
//       }
//       const playerDate = new Date(player.date);
//       switch (activeTimeFilter) {
//         case 'Today':
//           if (playerDate < today) return false;
//           break;
//         case 'Weekly':
//           if (playerDate < oneWeekAgo) return false;
//           break;
//         case 'Monthly':
//           if (playerDate < oneMonthAgo) return false;
//           break;
//         case 'All Time':
//         default:
//           break;
//       }
//       return true;
//     });
//   }, [players, searchTerm, selectedCategories, selectedBadges, selectedActivity, activeTimeFilter]);  

//   // === PAGINATION LOGIC ===
//   const totalPages = Math.ceil(filteredRows.length / ITEMS_PER_PAGE);
//   const paginatedRows = useMemo(() => {
//     // ... (logic remains the same) ...
//     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//     const endIndex = startIndex + ITEMS_PER_PAGE;
//     return filteredRows.slice(startIndex, endIndex);
//   }, [filteredRows, currentPage]);

//   // === EVENT HANDLERS ===
//   const handleCheckboxChange = (event, stateSetter) => {
//     // ... (logic remains the same) ...
//     const { id, checked } = event.target;
//     stateSetter(prevState => ({
//       ...prevState,
//       [id]: checked,
//     }));
//     setCurrentPage(1);  
//   };

//   const handlePageChange = (pageNumber) => {
//     // ... (logic remains the same) ...
//     setCurrentPage(pageNumber);
//   };

//   const handleTimeFilterChange = (filterName) => {
//     // ... (logic remains the same) ...
//     setActiveTimeFilter(filterName);
//     setCurrentPage(1);  
//   };
  
//   // === UPDATED: Handler for the 3 feature cards ===
//   const handleFeatureClick = (featureName) => {
//     if (featureName === 'Progress Tracking') {
//       setIsProgressModalOpen(true);
//     } else if (featureName === 'Weekly Challenges') {
//       setIsChallengeModalOpen(true); // === NEW ===
//     } else {
//       alert(`You clicked on "${featureName}"! This feature is coming soon.`);
//     }
//   };
  

//   // === JSX / RENDER ===
//   return (
//     <>
//       <style>{`
//     @import url('https://db.onlinewebfonts.com/c/554de251fec51511723effebd5d0ed84?family=Roslindale+Display+Condensed+Medium');
//     .font-roslindale {
//       font-family: 'Roslindale Display Condensed Medium', serif;
//     }
//   `}</style>
//       {/* === NAV BAR (FIXED) === */}
//       <nav className="fixed w-full h-[100px] p-10 flex justify-between items-center z-50 bg-[#c5c0b2] dark:bg-black">
//                 <div className="site-logo font-roslindale text-3xl text-black dark:text-white uppercase">
//                   <Link to="/first">Nexora</Link>
//                 </div>
//                 <div className="flex gap-7 font-roslindale text-3xl text-black dark:text-white uppercase">
//                   <div className="menu-item"> <Link to="/second">Quiz</Link></div>
//                   <div className="menu-item"><Link to="/Leaderboard">Leaderboard</Link></div>
//                   <div className="menu-item"><a href="#contact">Contact</a></div>
//                   <div className="menu-item"><a href="#about">About</a></div>
//                   <div className="menu-item">
//                     {/* <button onClick={() => setIsDark(!isDark)}>
//                       <i className={`fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
//                     </button> */}
//                   </div>
//                 </div>
//               </nav>

//       <section className="up">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="text-center mb-6 pt-32">
//             {/* ... (header content remains the same) ... */}
//             <h1 className="text-4xl mb-2 font-bold">Leaderboard</h1>
//             <p className="text-base dark:text-gray-300">See how you stack up against other quiz enthusiasts! Climb your way to the top with your knowledge.</p>
//           </div>

//           {/* Features (NOW CLICKABLE) */}
//           <div className="flex gap-5 my-8 features">
//             {/* === UPDATED: Card 1 === */}
//             <div 
//               className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl flex-1 text-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg feature-card cursor-pointer"
//               onClick={() => handleFeatureClick('Weekly Challenges')}
//             >
//               <div className="text-3xl mb-2 text-primary feature-icon"><i className="fas fa-trophy"></i></div>
//               <h3 className="text-lg font-semibold mb-2 text-black dark:text-white feature-title">Weekly Challenges</h3>
//               <p className="text-black dark:text-gray-300 feature-desc">Compete in weekly themed quizzes to earn bonus points and special badges.</p>
//             </div>

//             {/* === UPDATED: Card 2 === */}
//             <div 
//               className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl flex-1 text-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg feature-card cursor-pointer"
//               onClick={() => handleFeatureClick('Team Rankings')}
//             >
//               <div className="text-3xl mb-2 text-primary feature-icon"><i className="fas fa-users"></i></div>
//               <h3 className="text-lg font-semibold mb-2 text-black dark:text-white feature-title">Team Rankings</h3>
//               <p className="text-black dark:text-gray-300 feature-desc">Join forces with friends and compete as teams to climb the group leaderboard.</p>
//             </div>

//             {/* === UPDATED: Card 3 === */}
//             <div 
//               className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl flex-1 text-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg feature-card cursor-pointer"
//               onClick={() => handleFeatureClick('Progress Tracking')} 
//             >
//               <div className="text-3xl mb-2 text-primary feature-icon"><i className="fas fa-chart-line"></i></div>
//               <h3 className="text-lg font-semibold mb-2 text-black dark:text-white feature-title">Progress Tracking</h3>
//               <p className="text-black dark:text-gray-300 feature-desc">Monitor your improvement over time with detailed stats and performance analytics.</p>
//             </div>
//           </div>

//           {/* Main Content (Filters + Leaderboard) */}
//           <div className="flex gap-6">
            
//             {/* === FILTERS (ALL WORKING) === */}
//             <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl w-72 shadow-sm">
//               {/* ... (all filter JSX remains the same) ... */}
//               <h2 className="text-xl mb-4 border-b-2 border-border-light dark:border-border-dark pb-2 text-black dark:text-white">Filters</h2>
//               <div className="mb-5">
//                 <h3 className="text-base mb-2 text-black dark:text-gray-300">Categories</h3>
//                 <div className="flex flex-col gap-2">
//                   <label className="flex items-center">
//                     <input type="checkbox" id="science" checked={selectedCategories.science} onChange={(e) => handleCheckboxChange(e, setSelectedCategories)} className="mr-2 accent-primary cursor-pointer" />
//                     <span className="text-black dark:text-white">Science</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input type="checkbox" id="history" checked={selectedCategories.history} onChange={(e) => handleCheckboxChange(e, setSelectedCategories)} className="mr-2 accent-primary cursor-pointer" />
//                     <span className="text-black dark:text-white">History</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input type="checkbox" id="generalknowledge" checked={selectedCategories.generalknowledge} onChange={(e) => handleCheckboxChange(e, setSelectedCategories)} className="mr-2 accent-primary cursor-pointer" />
//                     <span className="text-black dark:text-white">General Knowledge</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input type="checkbox" id="coding" checked={selectedCategories.coding} onChange={(e) => handleCheckboxChange(e, setSelectedCategories)} className="mr-2 accent-primary cursor-pointer" />
//                     <span className="text-black dark:text-white">Coding</span>
//                   </label>
//                 </div>
//               </div>
//               <div className="mb-5">
//                 <h3 className="text-base mb-2 text-black dark:text-gray-300">Badges</h3>
//                 <div className="flex flex-col gap-2">
//                   <label className="flex items-center">
//                     <input type="checkbox" id="speed" checked={selectedBadges.speed} onChange={(e) => handleCheckboxChange(e, setSelectedBadges)} className="mr-2 accent-primary cursor-pointer" />
//                     <span className="text-black dark:text-white">Speed Demon</span>
//                   </label>
//                     <label className="flex items-center">
//                     <input type="checkbox" id="perfect" checked={selectedBadges.perfect} onChange={(e) => handleCheckboxChange(e, setSelectedBadges)} className="mr-2 accent-primary cursor-pointer" />
//                     <span className="text-black dark:text-white">Perfect Score</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input type="checkbox" id="streak" checked={selectedBadges.streak} onChange={(e) => handleCheckboxChange(e, setSelectedBadges)} className="mr-2 accent-primary cursor-pointer" />
//                     <span className="text-black dark:text-white">Streak Master</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input type="checkbox" id="champion" checked={selectedBadges.champion} onChange={(e) => handleCheckboxChange(e, setSelectedBadges)} className="mr-2 accent-primary cursor-pointer" />
//                     <span className="text-black dark:text-white">Quiz Champion</span>
//                   </label>
//                 </div>
//               </div>
//               <div className="mb-5">
//                 <h3 className="text-base mb-2 text-black dark:text-gray-300">Activity</h3>
//                 <div className="flex flex-col gap-2">
//                   <label className="flex items-center">
//                     <input type="checkbox" id="online" checked={selectedActivity.online} onChange={(e) => handleCheckboxChange(e, setSelectedActivity)} className="mr-2 accent-primary cursor-pointer" />
//                     <span className="text-black dark:text-white">Currently Online</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input type="checkbox" id="recent" checked={selectedActivity.recent} onChange={(e) => handleCheckboxChange(e, setSelectedActivity)} className="mr-2 accent-primary cursor-pointer" />
//                     <span className="text-black dark:text-white">Played Recently</span>
//                   </label>
//                 </div>
//               </div>
//             </div>

//             {/* Leaderboard Table */}
//             <div className="flex-1 bg-surface-light dark:bg-surface-dark p-5 rounded-xl shadow-sm">
              
//               {/* ... (Search, Time Filters, Table, Pagination all remain the same) ... */}
//               <div className="flex justify-between mb-5 flex-wrap gap-4">
//                 <div className="flex items-center border border-border-light dark:border-border-dark px-3 py-2 rounded-lg flex-1 max-w-xs bg-muted-light dark:bg-muted-dark search-box">
//                   <i className="fas fa-search mr-2 text-black dark:text-gray-300"></i>
//                   <input  
//                     type="text"  
//                     placeholder="Search for a player..."
//                     className="border-none outline-none flex-1 bg-transparent text-black dark:text-white placeholder-black dark:placeholder-gray-400"
//                     value={searchTerm}
//                     onChange={(e) => {
//                       setSearchTerm(e.target.value); 
//                       setCurrentPage(1); 
//                     }}
//                   />
//                 </div>
//                 <div className="flex gap-1">
//                   {['All Time', 'Monthly', 'Weekly', 'Today'].map(filterName => (
//                     <button
//                       key={filterName}
//                       onClick={() => handleTimeFilterChange(filterName)}
//                       className={
//                         activeTimeFilter === filterName
//                           ? "bg-primary text-black px-3 py-2 rounded border border-transparent cursor-pointer transition-colors duration-300 time-filter active"
//                           : "bg-muted-light dark:bg-surface-dark text-black dark:text-white px-3 py-2 rounded border border-border-light dark:border-border-dark cursor-pointer transition-colors duration-300 time-filter hover:bg-primary hover:text-black"
//                       }
//                     >
//                       {filterName}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//               <div className="border border-border-light dark:border-border-dark rounded-lg overflow-hidden">
//                 <div className="grid grid-cols-[80px_1fr_120px] px-4 py-3 border-b border-border-light dark:border-border-dark items-center bg-muted-light dark:bg-muted-dark font-bold text-black dark:text-white">
//                   <div>Rank</div>
//                   <div>Player</div>
//                   <div>Score</div>
//                 </div>
//                 <div className="leaderboard-rows">
//                   {paginatedRows.map((row, index) => {
//                     const rank = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
//                     return (
//                       <div  
//                         key={row.id}
//                         className="grid grid-cols-[80px_1fr_120px] px-4 py-3 border-b border-border-light dark:border-border-dark items-center bg-surface-light dark:bg-surface-dark transition-transform duration-200 hover:scale-[1.01] hover:shadow-md leaderboard-row text-black dark:text-white"
//                         data-category={row.category}
//                       >
//                         <div className="flex justify-center items-center rank">
//                           {rank === 1 ? (
//                             <span className="inline-block w-7 h-7 rounded-full text-white text-center leading-7 font-bold bg-yellow-400 medal gold">1</span>
//                           ) : rank === 2 ? (
//                             <span className="inline-block w-7 h-7 rounded-full text-white text-center leading-7 font-bold bg-gray-400 medal silver">2</span>
//                           ) : rank === 3 ? (
//                             <span className="inline-block w-7 h-7 rounded-full text-white text-center leading-7 font-bold bg-yellow-700 medal bronze">3</span>
//                           ) : (
//                             rank
//                           )}
//                         </div>
//                         <div className="user-info"><div className="username">{row.username}</div></div>
//                         <div className="score">{row.score}</div>
//                       </div>
//                     );
//                   })}
//                   {paginatedRows.length === 0 && (
//                     <div className="text-center p-5 text-black dark:text-white">
//                       No players match your filters.
//                     </div>
//                   )}
//                 </div>
//               </div>
//               {totalPages > 1 && (
//                 <div className="text-center mt-5">
//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
//                     <button
//                       key={pageNumber}
//                       onClick={() => handlePageChange(pageNumber)}
//                       className={
//                         currentPage === pageNumber
//                           ? "bg-primary text-black px-4 py-2 mx-1 rounded border border-transparent cursor-pointer transition-colors duration-300 pagination-btn active"
//                           : "bg-muted-light dark:bg-surface-dark text-black dark:text-white px-4 py-2 mx-1 rounded border border-border-light dark:border-border-dark cursor-pointer transition-colors duration-300 pagination-btn hover:bg-primary hover:text-black"
//                       }
//                     >
//                       {pageNumber}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Render the modals at the end */}
//       <ProgressModal 
//         isOpen={isProgressModalOpen} 
//         onClose={() => setIsProgressModalOpen(false)} 
//       />
//       {/* === NEW: Render the challenge modal === */}
//       <WeeklyChallengeModal 
//         isOpen={isChallengeModalOpen} 
//         onClose={() => setIsChallengeModalOpen(false)} 
//       />
//     </>
//   );
// }

// export default Leaderboard;
import React, { useState, useEffect, useMemo } from 'react';
import ProgressModal from './ProgressModal.jsx'; 
import WeeklyChallengeModal from './WeeklyChallengeModal.jsx';
import { Link } from 'react-router-dom';

const now = Date.now();
const oneDay = 1000 * 60 * 60 * 24;

const allPlayers = [
  { id: 3, username: 'TriviaTitan', score: 8760, category: 'generalknowledge', badges: ['champion'], activity: 'online', date: now },
  { id: 11, username: 'CodeMaster', score: 6400, category: 'coding', badges: ['champion'], activity: 'online', date: now - oneDay / 2 },
  { id: 1, username: 'QuizWhiz', score: 9850, category: 'science', badges: ['speed', 'streak'], activity: 'online', date: now - oneDay * 2 },
  { id: 6, username: 'SmartSparrow', score: 7840, category: 'generalknowledge', badges: ['streak'], activity: 'online', date: now - oneDay * 3 },
  { id: 16, username: 'DataDragon', score: 6000, category: 'coding', badges: ['streak'], activity: 'online', date: now - oneDay * 4 },
  { id: 18, username: 'QueryQueen', score: 5850, category: 'coding', badges: ['speed'], activity: 'online', date: now - oneDay * 6 },
  { id: 2, username: 'BrainyBee', score: 9320, category: 'history', badges: ['perfect'], activity: 'recent', date: now - oneDay * 8 },
  { id: 4, username: 'WiseOwl', score: 8450, category: 'science', badges: [], activity: 'recent', date: now - oneDay * 10 },
  { id: 7, username: 'CuriousCat', score: 7520, category: 'science', badges: ['perfect'], activity: 'recent', date: now - oneDay * 12 },
  { id: 9, username: 'MindMaven', score: 6930, category: 'generalknowledge', badges: ['champion', 'speed'], activity: 'online', date: now - oneDay * 15 },
  { id: 12, username: 'LogicLeopard', score: 6350, category: 'coding', badges: ['speed'], activity: 'recent', date: now - oneDay * 20 },
  { id: 14, username: 'SciShark', score: 6100, category: 'science', badges: ['perfect'], activity: 'online', date: now - oneDay * 25 },
  { id: 15, username: 'TriviaTrex', score: 6050, category: 'generalknowledge', badges: [], activity: 'recent', date: now - oneDay * 28 },
  { id: 21, username: 'AtomAnt', score: 5700, category: 'science', badges: ['perfect', 'streak'], activity: 'online', date: now - oneDay * 29 },
  { id: 5, username: 'KnowledgeKnight', score: 8120, category: 'history', badges: ['speed'], activity: 'offline', date: now - oneDay * 35 },
  { id: 8, username: 'ProfessorPuzzle', score: 7210, category: 'history', badges: [], activity: 'offline', date: now - oneDay * 40 },
  { id: 10, username: 'GeniusGazelle', score: 6650, category: 'science', badges: [], activity: 'offline', date: now - oneDay * 50 },
  { id: 13, username: 'HistoryHawk', score: 6200, category: 'history', badges: [], activity: 'offline', date: now - oneDay * 60 },
  { id: 17, username: 'PixelPuma', score: 5900, category: 'coding', badges: [], activity: 'offline', date: now - oneDay * 70 },
  { id: 19, username: 'FactFox', score: 5800, category: 'generalknowledge', badges: [], activity: 'recent', date: now - oneDay * 80 },
  { id: 20, username: 'PastPanda', score: 5750, category: 'history', badges: ['champion'], activity: 'offline', date: now - oneDay * 90 },
];

const ITEMS_PER_PAGE = 10;

function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTimeFilter, setActiveTimeFilter] = useState('All Time');
  const [selectedCategories, setSelectedCategories] = useState({
    science: true,
    history: true,
    generalknowledge: true,
    coding: true,
  });
  const [selectedBadges, setSelectedBadges] = useState({
    speed: false,
    perfect: false,
    streak: false,
    champion: false,
  });
  const [selectedActivity, setSelectedActivity] = useState({
    online: false,
    recent: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);

  useEffect(() => {
    const sortedPlayers = [...allPlayers].sort((a, b) => b.score - a.score);
    setPlayers(sortedPlayers);
  }, []);

  const filteredRows = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const oneWeekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    const activeCategories = Object.keys(selectedCategories).filter(k => selectedCategories[k]);
    const activeBadges = Object.keys(selectedBadges).filter(k => selectedBadges[k]);
    const activeActivities = Object.keys(selectedActivity).filter(k => selectedActivity[k]);

    return players.filter(player => {
      if (searchTerm && !player.username.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (activeCategories.length && !activeCategories.includes(player.category)) return false;
      if (activeBadges.length && !activeBadges.every(b => player.badges.includes(b))) return false;
      if (activeActivities.length && !activeActivities.includes(player.activity)) return false;
      const playerDate = new Date(player.date);
      switch (activeTimeFilter) {
        case 'Today': return playerDate >= today;
        case 'Weekly': return playerDate >= oneWeekAgo;
        case 'Monthly': return playerDate >= oneMonthAgo;
        default: return true;
      }
    });
  }, [players, searchTerm, selectedCategories, selectedBadges, selectedActivity, activeTimeFilter]);

  const totalPages = Math.ceil(filteredRows.length / ITEMS_PER_PAGE);
  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRows.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredRows, currentPage]);

  const handleCheckboxChange = (e, setState) => {
    const { id, checked } = e.target;
    setState(prev => ({ ...prev, [id]: checked }));
    setCurrentPage(1);
  };

  const handleFeatureClick = name => {
    if (name === 'Progress Tracking') setIsProgressModalOpen(true);
    else if (name === 'Weekly Challenges') setIsChallengeModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#c5c0b2] text-black dark:bg-black dark:text-white transition-colors duration-300">
      <style>{`
        @import url('https://db.onlinewebfonts.com/c/554de251fec51511723effebd5d0ed84?family=Roslindale+Display+Condensed+Medium');
        .font-roslindale { font-family: 'Roslindale Display Condensed Medium', serif; }
      `}</style>

      {/* NAVBAR */}
  <nav className="fixed w-full h-[100px] p-10 flex justify-between items-center z-50 bg-[#c5c0b2] dark:bg-black">
                <div className="site-logo font-roslindale text-3xl text-black dark:text-white uppercase">
                  <Link to="/first">Nexora</Link>
                </div>
                <div className="flex gap-7 font-roslindale text-3xl text-black dark:text-white uppercase">
                  <div className="menu-item"> <Link to="/second">Quiz</Link></div>
                  <div className="menu-item"><Link to="/Leaderboard">Leaderboard</Link></div>
                  <div className="menu-item"><Link to="/ContactPage">Contact</Link></div>
                  <div className="menu-item"><Link to="/AboutUs">About</Link></div>
                  <div className="menu-item">
                    {/* <button onClick={() => setIsDark(!isDark)}>
                      <i className={`fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
                    </button> */}
                  </div>
                </div>
              </nav>


      {/* MAIN CONTENT */}
      <section className="pt-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl mb-2 font-bold">Leaderboard</h1>
          <p className="text-base dark:text-gray-300">
            See how you stack up against other quiz enthusiasts!
          </p>
        </div>

        {/* FEATURES */}
        <div className="flex flex-col md:flex-row gap-5 my-8">
          {[
            { title: 'Weekly Challenges', icon: 'fa-trophy', desc: 'Compete in weekly themed quizzes.' },
            { title: 'Team Rankings', icon: 'fa-users', desc: 'Join forces and compete as teams.' },
            { title: 'Progress Tracking', icon: 'fa-chart-line', desc: 'Monitor your performance over time.' }
          ].map(card => (
            <div
              key={card.title}
              onClick={() => handleFeatureClick(card.title)}
              className="cursor-pointer bg-[#d8d3c3] dark:bg-neutral-900 p-6 rounded-xl flex-1 text-center transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-3xl mb-2 text-yellow-500">
                <i className={`fas ${card.icon}`}></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p className="text-sm dark:text-gray-300">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* FILTERS + TABLE */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters */}
          <div className="bg-[#d8d3c3] dark:bg-neutral-900 p-5 rounded-xl w-full lg:w-72 shadow">
            <h2 className="text-xl mb-4 font-bold border-b border-gray-400 dark:border-gray-700 pb-2">
              Filters
            </h2>
            <div className="space-y-4">
              {[
                { label: 'Categories', state: selectedCategories, setter: setSelectedCategories },
                { label: 'Badges', state: selectedBadges, setter: setSelectedBadges },
                { label: 'Activity', state: selectedActivity, setter: setSelectedActivity }
              ].map(group => (
                <div key={group.label}>
                  <h3 className="text-base mb-2">{group.label}</h3>
                  <div className="space-y-1">
                    {Object.keys(group.state).map(key => (
                      <label key={key} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={key}
                          checked={group.state[key]}
                          onChange={e => handleCheckboxChange(e, group.setter)}
                          className="accent-yellow-600 cursor-pointer"
                        />
                        <span className="capitalize">{key}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="flex-1 bg-[#d8d3c3] dark:bg-neutral-900 p-5 rounded-xl shadow">
            {/* Search */}
            <div className="flex justify-between mb-5 flex-wrap gap-4">
              <div className="flex items-center border border-gray-400 dark:border-gray-700 px-3 py-2 rounded-lg flex-1 max-w-xs bg-transparent">
                <i className="fas fa-search mr-2 text-black dark:text-gray-300"></i>
                <input
                  type="text"
                  placeholder="Search player..."
                  className="bg-transparent border-none outline-none flex-1 text-black dark:text-white"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                {['All Time', 'Monthly', 'Weekly', 'Today'].map(f => (
                  <button
                    key={f}
                    onClick={() => setActiveTimeFilter(f)}
                    className={`px-3 py-2 rounded ${
                      activeTimeFilter === f
                        ? 'bg-yellow-400 text-black'
                        : 'bg-transparent border border-gray-400 dark:border-gray-700 hover:bg-yellow-400 hover:text-black'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="border border-gray-400 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="grid grid-cols-[80px_1fr_120px] px-4 py-3 border-b border-gray-400 dark:border-gray-700 font-bold">
                <div>Rank</div>
                <div>Player</div>
                <div>Score</div>
              </div>

              {paginatedRows.map((row, i) => {
                const rank = (currentPage - 1) * ITEMS_PER_PAGE + i + 1;
                return (
                  <div
                    key={row.id}
                    className="grid grid-cols-[80px_1fr_120px] px-4 py-3 border-b border-gray-400 dark:border-gray-700 hover:bg-yellow-100 dark:hover:bg-neutral-800 transition"
                  >
                    <div className="text-center font-bold">
                      {rank <= 3 ? (
                        <span
                          className={`inline-block w-7 h-7 rounded-full text-white font-bold leading-7 ${
                            rank === 1
                              ? 'bg-yellow-400'
                              : rank === 2
                              ? 'bg-gray-400'
                              : 'bg-amber-700'
                          }`}
                        >
                          {rank}
                        </span>
                      ) : (
                        rank
                      )}
                    </div>
                    <div>{row.username}</div>
                    <div>{row.score}</div>
                  </div>
                );
              })}

              {paginatedRows.length === 0 && (
                <div className="text-center p-5">No players match your filters.</div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="text-center mt-5 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded ${
                      currentPage === page
                        ? 'bg-yellow-400 text-black'
                        : 'border border-gray-400 dark:border-gray-700 hover:bg-yellow-400 hover:text-black'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modals */}
      <ProgressModal isOpen={isProgressModalOpen} onClose={() => setIsProgressModalOpen(false)} />
      <WeeklyChallengeModal isOpen={isChallengeModalOpen} onClose={() => setIsChallengeModalOpen(false)} />
    </div>
  );
}

export default Leaderboard;
