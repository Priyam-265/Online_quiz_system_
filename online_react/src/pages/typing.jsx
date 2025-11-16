import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
// Removed imports for @fortawesome/react-fontawesome, @fortawesome/free-solid-svg-icons, and gsap to fix build errors.

// --- Your list of common words (moved outside the component) ---
const commonWords = [
  "the", "of", "and", "a", "to", "in", "is", "you", "that", "it", "he", "was",
  "for", "on", "are", "as", "with", "his", "they", "i", "at", "be", "this", "have",
  "from", "or", "one", "had", "by", "word", "but", "not", "what", "all", "were",
  "we", "when", "your", "can", "said", "there", "each", "which", "she", "do",
  "how", "their", "if", "will", "up", "other", "about", "out", "many", "then",
  "them", "these", "so", "some", "her", "would", "make", "like", "into", "him",
  "has", "two", "more", "go", "no", "way", "could", "my", "than", "first", "water",
  "been", "call", "who", "its", "now", "find", "long", "down", "day", "did", "get",
  "come", "made", "may", "part", "over", "new", "sound", "take", "only", "little",
  "work", "know", "place", "year", "live", "me", "back", "give", "most", "very",
  "after", "thing", "our", "just", "name", "good", "sentence", "man", "think",
  "say", "great", "where", "help", "through", "much", "before", "line", "right",
  "too", "mean", "old", "any", "same", "tell", "boy", "follow", "came", "want",
  "show", "also", "around", "form", "three", "small", "set", "put", "end", "why",
  "again", "turn", "here", "off", "went", "own", "under", "stop", "start", "city",
  "earth", "eye", "light", "thought", "head", "story", "saw", "left", "don't",
  "few", "while", "along", "might", "close", "something", "seem", "next", "hard",
  "open", "example", "begin", "life", "always", "those", "both", "paper",
  "together", "got", "group", "often", "run", "important", "until", "children",
  "side", "feet", "car", "mile", "night", "walk", "white", "sea", "began", "grow",
  "took", "river", "four", "carry", "state", "once", "book", "hear", "stop",
  "without", "second", "later", "miss", "idea", "enough", "eat", "face", "watch",
  "far", "indian", "really", "almost", "let", "above", "girl", "sometimes",
  "mountain", "cut", "young", "talk", "soon", "list", "song", "being", "leave",
  "family", "it's"
];

function Typing() {
  // --- STATE MANAGEMENT ---
  const [currentLevel, setCurrentLevel] = useState('easy');
  const [includePunctuation, setIncludePunctuation] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [testMode, setTestMode] = useState('time');
  const [testValue, setTestValue] = useState(15);
  
  const [currentWords, setCurrentWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [letterStates, setLetterStates] = useState([]); // Tracks correct/incorrect letters
  
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  
  const [isTestActive, setIsTestActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [pauseStartTime, setPauseStartTime] = useState(null);
  const [totalPauseTime, setTotalPauseTime] = useState(0);
  
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const [scrollOffset, setScrollOffset] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // --- REFS ---
  const inputFieldRef = useRef(null);
  const textContentRef = useRef(null);
  const caretRef = useRef(null);
  const timerIntervalRef = useRef(null);

  // --- GENERATE WORDS LOGIC ---
  const generateWords = useCallback((count = 100) => {
    const words = [];
    for (let i = 0; i < count; i++) {
      let word = commonWords[Math.floor(Math.random() * commonWords.length)];
      if (includePunctuation && Math.random() < 0.1) {
        const punctuation = ['.', ',', '!', '?', ';', ':'];
        word += punctuation[Math.floor(Math.random() * punctuation.length)];
      }
      if (includeNumbers && Math.random() < 0.05) {
        word = Math.floor(Math.random() * 100).toString();
      }
      words.push(word);
    }
    return words;
  }, [includePunctuation, includeNumbers]);


  // --- FINISH TEST LOGIC ---
  const finishTest = useCallback(() => {
    setIsTestActive(false);
    clearInterval(timerIntervalRef.current);
    setShowResults(true);
  }, []);

  // --- STATS UPDATER ---
  const updateStats = useCallback(() => {
    if (!startTime) return;

    const now = Date.now();
    const elapsed = (now - startTime - totalPauseTime) / 1000;
    setTimeElapsed(elapsed);

    const wordsTyped = correctChars / 5;
    const currentWpm = Math.round((wordsTyped / elapsed) * 60) || 0;
    setWpm(currentWpm);

    const currentAccuracy = Math.round((correctChars / (correctChars + incorrectChars)) * 100) || 100;
    setAccuracy(currentAccuracy);
    
    if (testMode === 'time') {
      const remaining = testValue - elapsed;
      if (remaining <= 0) {
        setTimeElapsed(testValue);
        finishTest();
      }
    }
  }, [startTime, totalPauseTime, correctChars, incorrectChars, testMode, testValue, finishTest]);

  // --- TIMER MANAGEMENT ---
  useEffect(() => {
    if (isTestActive && !isPaused) {
      timerIntervalRef.current = setInterval(updateStats, 100);
    } else {
      clearInterval(timerIntervalRef.current);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [isTestActive, isPaused, updateStats]);


  // --- RESTART TEST LOGIC ---
  const restartTest = useCallback(() => {
    const newWords = generateWords();
    setCurrentWords(newWords);
    
    const newLetterStates = newWords.map(word => 
      word.split('').map(() => 'untyped')
    );
    setLetterStates(newLetterStates);
    
    setCurrentWordIndex(0);
    setCurrentLetterIndex(0);
    setCorrectChars(0);
    setIncorrectChars(0);
    setIsTestActive(false);
    setIsPaused(false);
    setStartTime(null);
    setPauseStartTime(null);
    setTotalPauseTime(0);
    setTimeElapsed(0);
    setWpm(0);
    setAccuracy(100);
    setScrollOffset(0);
    setShowResults(false);
    
    clearInterval(timerIntervalRef.current);
    
    if (inputFieldRef.current) {
      inputFieldRef.current.value = '';
      inputFieldRef.current.focus();
    }
  }, [generateWords]);

  // --- INITIALIZATION ---
  useEffect(() => {
    restartTest();
  }, [restartTest]);

  // --- AUTO THEME SWITCHING ---
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateTheme = (e) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    updateTheme(mediaQuery);
    mediaQuery.addEventListener('change', updateTheme);
    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, []);


  // --- CARET & SCROLLING UPDATE ---
  useEffect(() => {
    if (!textContentRef.current) return;

    const currentWordEl = textContentRef.current.querySelector(`[data-word="${currentWordIndex}"]`);
    if (currentWordEl) {
      const textRect = textContentRef.current.getBoundingClientRect();
      let caretLeft, caretTop, caretHeight;
      let currentLetterEl = currentWordEl.querySelector(`[data-letter="${currentLetterIndex}"]`);
      
      if (currentLetterEl) {
        const rect = currentLetterEl.getBoundingClientRect();
        caretLeft = rect.left - textRect.left;
        caretTop = rect.top - textRect.top;
        caretHeight = rect.height;
      } else {
        const lastLetterEl = currentWordEl.querySelector(`[data-letter="${currentWords[currentWordIndex].length - 1}"]`);
        if (lastLetterEl) {
          const rect = lastLetterEl.getBoundingClientRect();
          caretLeft = rect.right - textRect.left;
          caretTop = rect.top - textRect.top;
          caretHeight = rect.height;
        } else {
          const rect = currentWordEl.getBoundingClientRect();
          caretLeft = rect.left - textRect.left;
          caretTop = rect.top - textRect.top;
          caretHeight = rect.height;
        }
      }
      
      if (caretRef.current) {
        caretRef.current.style.left = `${caretLeft}px`;
        caretRef.current.style.top = `${caretTop}px`;
        caretRef.current.style.height = `${caretHeight}px`;
      }

      if (caretHeight > 0) {
        const linesScrolled = Math.floor(scrollOffset / caretHeight);
        const currentLine = Math.floor(caretTop / caretHeight);
        
        if (currentLine > linesScrolled + 1) {
            setScrollOffset( (linesScrolled + 1) * caretHeight);
        } else if (currentLine < linesScrolled) {
            setScrollOffset( (linesScrolled - 1) * caretHeight);
        }
      }
    }
  }, [currentWordIndex, currentLetterIndex, currentWords, scrollOffset]);
  

  // --- KEY PRESS HANDLER ---
  const handleKeyPress = (char) => {
    if (showResults || isPaused) return;

    if (!isTestActive) {
      setIsTestActive(true);
      setStartTime(Date.now());
    }

    const currentWord = currentWords[currentWordIndex];
    if (currentLetterIndex < currentWord.length) {
      const currentChar = currentWord[currentLetterIndex];
      const newLetterStates = [...letterStates];
      
      if (char === currentChar) {
        newLetterStates[currentWordIndex][currentLetterIndex] = 'correct';
        setCorrectChars(c => c + 1);
      } else {
        newLetterStates[currentWordIndex][currentLetterIndex] = 'incorrect';
        setIncorrectChars(i => i + 1);
        if (currentLevel === 'hard') {
          finishTest();
          return;
        }
      }
      setLetterStates(newLetterStates);
      setCurrentLetterIndex(l => l + 1);
    }
  };

  // --- SPACEBAR HANDLER (UPDATED) ---
  const handleSpace = () => {
    if (showResults || isPaused) return;

    // Start test if not active
    if (!isTestActive) {
      setIsTestActive(true);
      setStartTime(Date.now());
    }

    const currentWord = currentWords[currentWordIndex];

    // Case 1: End of word (Correct action)
    if (currentLetterIndex === currentWord.length) {
      setCurrentWordIndex(w => w + 1);
      setCurrentLetterIndex(0);
      
      if (currentWordIndex >= currentWords.length - 1) {
        finishTest();
      }
      return;
    } 
    
    // Case 2: Middle of word (Treated as an error)
    if (currentLetterIndex < currentWord.length) {
      const newLetterStates = [...letterStates];

      // Mark the current expected letter as 'incorrect' (missed or 'space' error)
      newLetterStates[currentWordIndex][currentLetterIndex] = 'incorrect';
      setIncorrectChars(i => i + 1);
      
      if (currentLevel === 'hard') {
        finishTest();
        return;
      }
      
      setLetterStates(newLetterStates);
      setCurrentLetterIndex(l => l + 1);
    }
  };
  
  // --- BACKSPACE HANDLER ---
  const handleBackspace = () => {
    if (showResults || isPaused) return;
    if (currentWordIndex === 0 && currentLetterIndex === 0) return;

    const newLetterStates = [...letterStates];
    
    if (currentLetterIndex > 0) {
      setCurrentLetterIndex(l => l - 1);
      const state = letterStates[currentWordIndex][currentLetterIndex - 1];
      if (state === 'correct') setCorrectChars(c => c - 1);
      if (state === 'incorrect') setIncorrectChars(i => i - 1);
      newLetterStates[currentWordIndex][currentLetterIndex - 1] = 'untyped';
      
    } else if (currentWordIndex > 0) {
      const prevWordIndex = currentWordIndex - 1;
      const prevWord = currentWords[prevWordIndex];
      setCurrentWordIndex(w => w - 1);
      setCurrentLetterIndex(prevWord.length);
    }
    setLetterStates(newLetterStates);
  };

  // --- INPUT & KEYDOWN HANDLING ---
  const handleKeyDown = (e) => {
    if (showResults) return;

    if (e.key === 'Escape') {
      togglePause();
      return;
    }
    if (e.ctrlKey && e.key === 'r') {
      e.preventDefault();
      restartTest();
      return;
    }
    if (isPaused) return;

    if (e.key === ' ') {
      e.preventDefault();
      handleSpace();
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      handleBackspace();
    } else if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
      e.preventDefault();
      handleKeyPress(e.key);
    }
  };

  // --- PAUSE LOGIC ---
  const togglePause = () => {
    if (!isTestActive || showResults) return;
    
    const now = Date.now();
    if (isPaused) {
      setTotalPauseTime(t => t + (now - pauseStartTime));
      setPauseStartTime(null);
      inputFieldRef.current.focus();
    } else {
      setPauseStartTime(now);
    }
    setIsPaused(p => !p);
  };
  
  // --- CONFIG BUTTON HANDLERS ---
  const handleLevelChange = useCallback((level) => {
    setCurrentLevel(level);
    setTimeout(restartTest, 0);
  }, [restartTest]);
  
  const handleConfigChange = useCallback((type) => {
    if (type === 'punctuation') {
      setIncludePunctuation(p => !p);
    } else if (type === 'numbers') {
      setIncludeNumbers(n => !n);
    }
    setTimeout(restartTest, 0);
  }, [restartTest]);
  
  const handleTimeChange = useCallback((value) => {
    setTestMode('time');
    setTestValue(value);
    setTimeout(restartTest, 0);
  }, [restartTest]);
  
  // --- HELPER to get remaining time ---
  const getRemainingTime = () => {
    if (!startTime) return testValue;
    if (showResults) return 0;
    const remaining = Math.max(0, testValue - timeElapsed);
    return Math.ceil(remaining);
  };
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // --- FINAL RESULTS CALCULATION ---
  const finalWpm = wpm;
  const finalAccuracy = accuracy;
  const finalChars = `${correctChars}/${correctChars + incorrectChars}`;
  const finalTime = `${Math.round(timeElapsed)}s`;


  // --- JSX (THE RENDER) ---
  return (
  <div
    className="h-screen w-screen bg-[#c5c0b2] text-black overflow-hidden dark:bg-black dark:text-white"
    onClick={() => inputFieldRef.current && inputFieldRef.current.focus()}
  >
    <style>{`
      @import url('https://db.onlinewebfonts.com/c/554de251fec51511723effebd5d0ed84?family=Roslindale+Display+Condensed+Medium');
      .font-roslindale {
        font-family: 'Roslindale Display Condensed Medium', serif;
      }
    `}</style>

    {/* ✅ Navbar with correct colors */}
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
 

    {/* =================== MAIN SECTION =================== */}
    <section className="items">
      <div className="flex flex-col h-screen">
        {/* --- Config Panel --- */}
        <div className="flex flex-wrap justify-center items-center gap-5 p-10 border-b border-gray-700 bg-[#c5c0b2] dark:bg-black relative top-[100px] z-40">
          <div className="flex gap-2 items-center">
            <button
              className={`level-btn border-2 border-gray-700 text-gray-700 dark:text-gray-400 font-bold px-4 py-2 rounded-lg hover:text-black hover:border-black dark:hover:text-white dark:hover:border-white ${currentLevel === 'easy' ? 'active text-black border-black dark:text-white dark:border-white' : ''}`}
              onClick={() => handleLevelChange('easy')}
            >
              Easy
            </button>
            <button
              className={`level-btn border-2 border-gray-700 text-gray-700 dark:text-gray-400 font-bold px-4 py-2 rounded-lg hover:text-black hover:border-black dark:hover:text-white dark:hover:border-white ${currentLevel === 'hard' ? 'active text-black border-black dark:text-white dark:border-white' : ''}`}
              onClick={() => handleLevelChange('hard')}
            >
              Hard
            </button>
          </div>

          <div className="flex gap-2 items-center">
            <button
              className={`config-btn border-none text-gray-700 dark:text-gray-400 px-3 py-2 rounded-lg hover:text-black dark:hover:text-white ${includePunctuation ? 'active text-black dark:text-white' : ''}`}
              onClick={() => handleConfigChange('punctuation')}
            >
              punctuation
            </button>
            <button
              className={`config-btn border-none text-gray-700 dark:text-gray-400 px-3 py-2 rounded-lg hover:text-black dark:hover:text-white ${includeNumbers ? 'active text-black dark:text-white' : ''}`}
              onClick={() => handleConfigChange('numbers')}
            >
              numbers
            </button>
          </div>

          <div className="flex gap-2 items-center">
            {[15, 30, 60, 120].map((time) => (
              <button
                key={time}
                className={`config-btn border-none text-gray-700 dark:text-gray-400 px-3 py-1 rounded-lg hover:text-black dark:hover:text-white ${testValue === time ? 'active text-black dark:text-white' : ''}`}
                onClick={() => handleTimeChange(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* --- Typing Test Box --- */}
        <div className="relative flex-1 flex flex-col justify-center items-center p-5 pt-[100px]">
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-4xl font-bold text-black dark:text-white z-10" id="timer">
            {formatTime(getRemainingTime())}
          </div>

          {/* Stats Display */}
          <div className={`flex justify-center gap-10 mb-5 ${isTestActive && !showResults ? 'invisible' : 'visible'}`} id="stats">
            <div className="text-center">
              <div className="text-2xl text-black dark:text-white font-bold" id="wpm">{wpm}</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">wpm</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-black dark:text-white font-bold" id="accuracy">{accuracy}%</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">acc</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-black dark:text-white font-bold" id="time">{getRemainingTime()}</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">time</div>
            </div>
          </div>

          {/* Typing Words */}
          <div
            className={`relative max-w-4xl w-full h-40 p-10 rounded-xl border border-gray-700 bg-[#c5c0b2] dark:bg-black shadow-lg overflow-hidden text-3xl md:text-4xl ${isPaused ? 'opacity-50' : ''}`}
            id="test-words"
          >
            {isPaused && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                <h2 className="text-4xl font-bold text-white">Paused</h2>
              </div>
            )}

            <div
              className="relative"
              id="text-content"
              ref={textContentRef}
              style={{ transform: `translateY(-${scrollOffset}px)`, transition: 'transform 0.2s linear' }}
            >
              {currentWords.map((word, wordIndex) => (
                <div className="word inline-block mr-3" data-word={wordIndex} key={wordIndex}>
                  {word.split('').map((letter, letterIndex) => {
                    const state = letterStates[wordIndex]?.[letterIndex];
                    let letterClass = 'letter';
                    if (state === 'correct') letterClass += ' text-green-400';
                    if (state === 'incorrect') letterClass += ' text-red-500';
                    return (
                      <span className={letterClass} data-letter={letterIndex} key={letterIndex}>
                        {letter}
                      </span>
                    );
                  })}
                </div>
              ))}
              <div
                className="absolute w-0.5 bg-black dark:bg-white animate-blink"
                id="caret"
                ref={caretRef}
              ></div>
            </div>
          </div>

          {/* Restart Button */}
          <button
            className={`${showResults ? 'block' : 'hidden'} bg-black text-white dark:bg-white dark:text-black font-bold px-6 py-3 rounded-lg mt-5`}
            id="end-restart-btn"
            onClick={restartTest}
          >
            restart test
          </button>

          <input
            type="text"
            id="input-field"
            ref={inputFieldRef}
            onKeyDown={handleKeyDown}
            className="absolute left-[-9999px] opacity-0"
            autoComplete="off"
            disabled={showResults}
          />
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-5 p-5 bg-[#c5c0b2] dark:bg-black border-t border-gray-700">
          <button
            className="border-2 border-gray-700 text-gray-700 dark:text-gray-400 font-bold px-4 py-2 rounded-lg hover:text-black hover:border-black dark:hover:text-white dark:hover:border-white disabled:opacity-50 disabled:cursor-not-allowed"
            id="pause-btn"
            onClick={togglePause}
            disabled={!isTestActive || showResults}
          >
            {isPaused ? 'resume' : 'pause'}
          </button>
          <button
            className="border-2 border-gray-700 text-gray-700 dark:text-gray-400 font-bold px-4 py-2 rounded-lg hover:text-black hover:border-black dark:hover:text-white dark:hover:border-white"
            id="restart-btn"
            onClick={restartTest}
          >
            restart
          </button>
        </div>

        {/* Results Modal */}
        {showResults && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-xl p-10 rounded-xl border border-gray-700 bg-[#c5c0b2] dark:bg-black shadow-lg" id="results">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-5 text-center">Test Complete</h2>
            <div className="grid grid-cols-2 gap-8 mb-5">
              <div className="text-center">
                <div className="text-3xl font-bold text-black dark:text-white" id="final-wpm">{finalWpm}</div>
                <div className="text-gray-700 dark:text-gray-400 mt-2">wpm</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black dark:text-white" id="final-accuracy">{finalAccuracy}%</div>
                <div className="text-gray-700 dark:text-gray-400 mt-2">accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black dark:text-white" id="final-characters">{finalChars}</div>
                <div className="text-gray-700 dark:text-gray-400 mt-2">characters</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black dark:text-white" id="final-time">{finalTime}</div>
                <div className="text-gray-700 dark:text-gray-400 mt-2">time</div>
              </div>
            </div>
            <button
              className="bg-black text-white dark:bg-white dark:text-black font-bold px-6 py-3 rounded-lg w-full"
              onClick={restartTest}
            >
              try again
            </button>
          </div>
        )}
      </div>
    </section>
  </div>
);

}

export default Typing;


