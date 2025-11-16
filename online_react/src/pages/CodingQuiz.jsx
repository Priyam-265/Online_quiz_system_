import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { gql, useQuery } from "@apollo/client";


const GET_QUESTIONS = gql`
  query {
    questions {
      id
      text
      code
      answers
      correct
    }
  }
`;


const CodingQuiz = () => {
    const [theme, setTheme] = useState('light');
    const { data, loading, error } = useQuery(GET_QUESTIONS);
    const [gameState, setGameState] = useState({
        started: false,
        finished: false,
        currentQuestion: 0,
        correct: 0,
        wrong: 0,
        empty: 0,
        selectedAnswer: null
    });
    const [questions, setQuestions] = useState([]);

    const backButtonRef = useRef(null);
    const introTitleRef = useRef(null);
    const introDescRef = useRef(null);
    const introButtonRef = useRef(null);
    const introContentRef = useRef(null);
    const indicatorRef = useRef(null);
    const questionTextRef = useRef(null);
    const codeBlockRef = useRef(null);
    const answersRef = useRef([]);
    const gameRef = useRef(null);

    useEffect(() => {
        // Detect system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => setTheme(e.matches ? 'dark' : 'light');
        mediaQuery.addEventListener('change', handleChange);

        // Initial animations
        animateIntro();

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

// Load questions when GraphQL data arrives
useEffect(() => {
  if (data) {
    const loaded = data.questions.map(q => ({
      ...q,
      selection: null
    }));
    setQuestions(loaded);
  }
}, [data]);

    const animateIntro = () => {
        gsap.to(backButtonRef.current, {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.3
        });

        gsap.fromTo(introTitleRef.current,
            { y: -30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.5 }
        );

        gsap.fromTo(introDescRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.7 }
        );

        gsap.fromTo(introButtonRef.current,
            { y: 30, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.9 }
        );
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const goBack = () => {
        gsap.to(gameRef.current, {
            scale: 0.95,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in"
        });
    };

    const startQuiz = () => {
        gsap.to(introContentRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
                setGameState(prev => ({ ...prev, started: true }));

                setTimeout(() => {
                    if (indicatorRef.current) {
                        gsap.fromTo(indicatorRef.current,
                            { opacity: 0, y: 20 },
                            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                        );
                    }
                }, 100);
            }
        });
    };

    const selectAnswer = (index) => {
        setGameState(prev => ({ ...prev, selectedAnswer: index }));
    };

    const nextQuestion = () => {
        const currentQ = questions[gameState.currentQuestion];
        const updatedQuestions = [...questions];
        updatedQuestions[gameState.currentQuestion].selection = gameState.selectedAnswer;

        let newState = { ...gameState };

        if (gameState.selectedAnswer === null) {
            newState.empty++;
        } else if (gameState.selectedAnswer === currentQ.correct) {
            newState.correct++;
        } else {
            newState.wrong++;
        }

        newState.selectedAnswer = null;
        newState.currentQuestion++;

        setQuestions(updatedQuestions);

        // Check if this was the last question
        if (newState.currentQuestion >= questions.length) {
            newState.finished = true;
            setGameState(newState);
        } else {
            setGameState(newState);
        }
    };

const restartQuiz = () => {
    setGameState({
        started: false,
        finished: false,
        currentQuestion: 0,
        correct: 0,
        wrong: 0,
        empty: 0,
        selectedAnswer: null
    });

    // Reload fresh questions from GraphQL
    if (data?.questions) {
        setQuestions(
            data.questions.map(q => ({
                ...q,
                selection: null
            }))
        );
    }

    gsap.to(introContentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
    });
};


    const getLanguageClass = (code) => {
        if (!code) return '';
        if (code.includes('console.log') || code.includes('var ') || code.includes('function')) return 'javascript';
        if (code.includes('print(') || code.includes('def ') || code.includes('import ')) return 'python';
        if (code.includes('cout') || code.includes('#include')) return 'cpp';
        if (code.includes('SELECT') || code.includes('FROM')) return 'sql';
        if (code.includes('System.out.println') || code.includes('public class')) return 'java';
        return '';
    };

    useEffect(() => {
        if (gameState.started && !gameState.finished && questions.length > 0) {
            if (questionTextRef.current) {
                gsap.fromTo(questionTextRef.current,
                    { x: 40, opacity: 0, scale: 0.95 },
                    { x: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
                );
            }

            if (codeBlockRef.current) {
                gsap.fromTo(codeBlockRef.current,
                    { x: 40, opacity: 0, scale: 0.95 },
                    { x: 0, opacity: 1, scale: 1, duration: 0.5, delay: 0.1, ease: "power2.out" }
                );
            }

            if (answersRef.current.length > 0) {
                gsap.fromTo(answersRef.current,
                    { opacity: 0, x: 40, scale: 0.9 },
                    { x: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" }
                );
            }
        }
    }, [gameState.currentQuestion, gameState.started, gameState.finished]);

    const currentQuestion = questions[gameState.currentQuestion];
    if (loading) return <div className="text-white p-20 text-4xl">Loading quiz…</div>;
if (error) return <div className="text-red-500 p-20 text-4xl">Error loading quiz</div>;

    return (
        <div className="w-full h-screen overflow-hidden flex m-0" style={{
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            fontFamily: '"Be Vietnam Pro", sans-serif'
        }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap');
        @import url('https://db.onlinewebfonts.com/c/554de251fec51511723effebd5d0ed84?family=Roslindale+Display+Condensed+Medium');
              @import url('https://db.onlinewebfonts.com/c/554de251fec51511723effebd5d0ed84?family=Roslindale+Display+Condensed+Medium');
      .font-roslindale {
        font-family: 'Roslindale Display Condensed Medium', serif;
      }
        :root {
          --bg-primary: #c5c0b2;
          --bg-secondary: #ffffff;
          --text-primary: #000000;
          --text-secondary: #333333;
          --accent-color: #8a8170;
          --card-bg: rgba(255, 255, 255, 0.9);
          --card-border: rgba(138, 129, 112, 0.3);
          --card-hover: rgba(138, 129, 112, 0.15);
          --nav-bg: rgba(197, 192, 178, 0.95);
          --code-bg: #2d2d2d;
          --code-text: #f8f8f2;
        }

        [data-theme="dark"] {
          --bg-primary: #000000;
          --bg-secondary: #0a0a0a;
          --text-primary: #ffffff;
          --text-secondary: #e5e5e5;
          --accent-color: #c5c0b2;
          --card-bg: rgba(197, 192, 178, 0.1);
          --card-border: rgba(197, 192, 178, 0.3);
          --card-hover: rgba(197, 192, 178, 0.2);
          --nav-bg: rgba(0, 0, 0, 0.95);
          --code-bg: #1a1a1a;
          --code-text: #e6e6e6;
        }

        * {
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }

        .code-block {
          background-color: var(--code-bg);
          color: var(--code-text);
          padding: 15px;
          border-radius: 6px;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          overflow-x: auto;
          margin: 15px 0;
          line-height: 1.5;
        }

        .indicator-item {
          width: 12px;
          height: 4px;
          border-radius: 6px;
          background-color: var(--text-secondary);
          transition: all 0.3s ease;
        }

        .indicator-item + .indicator-item {
          margin-left: 8px;
        }

        .indicator-item.completed {
          background-color: var(--accent-color);
          height: 6px;
        }

        .question-answer {
          position: relative;
          padding-right: 40px;
        }

        .question-answer:before {
          height: 16px;
          width: 16px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' stroke='%232c2c2c' stroke-width='3' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
          content: "";
          background-size: cover;
          opacity: 0.5;
          transition: 0.3s;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }

        input:checked + .question-answer:before {
          opacity: 1;
          transform: translateX(-24px) translateY(-50%);
        }

        .is-true .question-answer:before {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' stroke='%238a8170' stroke-width='3' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
          opacity: 1;
          transform: translateX(-24px) translateY(-50%);
        }

        .correction [data-selected="true"].is-true .question-answer:before {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' stroke='%234a7c59' stroke-width='3' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
        }

        .correction [data-selected="true"]:not(.is-true) .question-answer:before {
          opacity: 1;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' stroke='%23ff6161' stroke-width='3' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='18' y1='6' x2='6' y2='18'%3E%3C/line%3E%3Cline x1='6' y1='6' x2='18' y2='18'%3E%3C/line%3E%3C/svg%3E");
        }
      `}</style>
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
                

            <div className="w-full h-full flex items-center flex-wrap justify-center">
                <div ref={gameRef} className="relative max-w-6xl w-full rounded-xl overflow-hidden flex transition-all duration-300 shadow-2xl"
                    style={{
                        height: '70vh',
                        margin: '15vh auto',
                        boxShadow: '0 0 80px rgba(0, 0, 0, 0.5)',
                        background: 'var(--bg-secondary)'
                    }}>

                    {/* Intro Section */}
                    <div className={`h-full flex-shrink-0 relative flex items-center justify-center border transition-all duration-300 ${gameState.started ? 'w-1/2' : 'w-full'}`}
                        style={{ background: 'var(--bg-secondary)', borderColor: 'var(--card-border)' }}>   
                        <Link to="/second">
                        <button
                            ref={backButtonRef}
                            className="absolute top-5 left-5 px-5 py-2 rounded border cursor-pointer text-sm transition-all duration-300 hover:transform hover:-translate-y-0.5 hover:scale-105"
                            style={{
                                backgroundColor: 'rgba(138, 129, 112, 0.2)',
                                borderColor: 'var(--card-border)',
                                color: 'var(--text-primary)',
                                opacity: 0,
                                transform: 'translateX(-20px)'
                            }}
                            >
                            ← Back to Subjects
                        </button>
                            </Link>
                        <div className={`text-center w-full transition-all duration-300 ${gameState.started ? 'px-8 py-4' : 'px-16 py-8'}`}>
                            <h1 ref={introTitleRef} className="m-0 text-5xl font-medium"
                                style={{ fontFamily: "'Roslindale Display Condensed Medium', serif", textShadow: '1px 2px 0 rgba(0, 0, 0, 0.35)' }}>
                                Coding Quiz
                            </h1>

                            {!gameState.started && (
                                <div ref={introContentRef}>
                                    <p ref={introDescRef} className="opacity-80 font-light mt-4" style={{ color: 'var(--text-secondary)' }}>
                                        Test your coding knowledge with 10 programming questions. No time limit.
                                    </p>
                                    <button
                                        ref={introButtonRef}
                                        className="border-0 px-7 py-3 rounded text-lg cursor-pointer font-medium shadow-lg mt-6"
                                        style={{
                                            backgroundColor: 'var(--accent-color)',
                                            color: 'var(--text-primary)',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
                                        }}
                                        onClick={startQuiz}>
                                        Start Quiz
                                    </button>
                                </div>
                            )}

                            {gameState.started && (
                                <div ref={indicatorRef} className="flex justify-center relative max-w-4/5 mx-auto mt-5">
                                    {questions.map((_, index) => (
                                        <div key={index} className={`indicator-item ${index < gameState.currentQuestion ? 'completed' : ''}`} />
                                    ))}
                                </div>
                            )}

                            {gameState.finished && (
                                <div className="mt-10 flex flex-col w-full max-w-4/5 mx-auto">
                                    <div className="inline-flex flex-row-reverse justify-between w-full px-3 py-1" style={{ color: '#42ff73' }}>
                                        <span className="text-3xl font-semibold">{gameState.correct}</span>
                                        <span className="text-xs tracking-widest opacity-80 flex font-medium items-center">
                                            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                                <path d="M22 4L12 14.01 9 11.01"></path>
                                            </svg>
                                            CORRECT
                                        </span>
                                    </div>
                                    <div className="inline-flex flex-row-reverse justify-between w-full px-3 py-1 border-t mt-2" style={{ color: '#ffa2a2', borderColor: 'rgba(138, 129, 112, 0.2)' }}>
                                        <span className="text-3xl font-semibold">{gameState.wrong}</span>
                                        <span className="text-xs tracking-widest opacity-80 flex font-medium items-center">
                                            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <path d="M15 9L9 15"></path>
                                                <path d="M9 9L15 15"></path>
                                            </svg>
                                            WRONG
                                        </span>
                                    </div>
                                    <div className="inline-flex flex-row-reverse justify-between w-full px-3 py-1 border-t mt-2" style={{ borderColor: 'rgba(138, 129, 112, 0.2)' }}>
                                        <span className="text-3xl font-semibold">{gameState.empty}</span>
                                        <span className="text-xs tracking-widest opacity-80 flex font-medium items-center">
                                            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <path d="M8 12L16 12"></path>
                                            </svg>
                                            EMPTY
                                        </span>
                                    </div>
                                    <button
                                        className="h-10 border rounded mx-auto mt-8 px-4 font-medium transition-all duration-300 cursor-pointer hover:opacity-80"
                                        style={{ borderColor: 'var(--card-border)', backgroundColor: 'transparent', color: 'var(--text-primary)' }}
                                        onClick={restartQuiz}>
                                        Restart Quiz
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Game Area */}
                    {gameState.started && (
                        <div className="overflow-auto p-10 flex-grow transition-all duration-300" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                            {!gameState.finished && currentQuestion && (
                                <div className="flex flex-col h-full">
                                    <div className="my-auto">
                                        <h2 ref={questionTextRef} className="mb-5" style={{ color: 'var(--text-primary)' }}>
                                            {currentQuestion.text}
                                        </h2>

                                        {currentQuestion.code && (
                                            <div ref={codeBlockRef} className="code-block">
                                                <pre><code className={getLanguageClass(currentQuestion.code)}>{currentQuestion.code}</code></pre>
                                            </div>
                                        )}

                                        <ul className="list-none p-0">
                                            {currentQuestion.answers.map((answer, index) => (
                                                <li
                                                    key={index}
                                                    ref={el => answersRef.current[index] = el}
                                                    className={`mt-2.5 ${index === currentQuestion.correct && gameState.finished ? 'is-true' : ''}`}
                                                    data-selected={gameState.selectedAnswer === index ? 'true' : 'false'}>
                                                    <input
                                                        type="radio"
                                                        name={`q_${currentQuestion.id}`}
                                                        value={`q${currentQuestion.id}-${index}`}
                                                        id={`q${currentQuestion.id}-${index}`}
                                                        checked={gameState.selectedAnswer === index}
                                                        onChange={() => selectAnswer(index)}
                                                        className="hidden"
                                                    />
                                                    <label
                                                        htmlFor={`q${currentQuestion.id}-${index}`}
                                                        className="question-answer flex p-3 text-sm rounded overflow-hidden items-center border-2 cursor-pointer"
                                                        style={{
                                                            borderColor: gameState.selectedAnswer === index ? 'var(--accent-color)' : 'var(--card-border)',
                                                            color: 'var(--text-primary)',
                                                            backgroundColor: gameState.selectedAnswer === index ? 'var(--card-hover)' : 'var(--card-bg)'
                                                        }}>
                                                        {answer}
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <button
                                        className="px-7 py-3 rounded mt-5 text-base cursor-pointer font-medium"
                                        style={{
                                            backgroundColor: 'var(--accent-color)',
                                            color: 'var(--text-primary)',
                                            border: 'none'
                                        }}
                                        onClick={nextQuestion}>
                                        {gameState.currentQuestion !== questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                                    </button>
                                </div>
                            )}

                            {gameState.finished && (
                                <div className="correction">
                                    {questions.map((question, qIndex) => (
                                        <div key={question.id} className={`${qIndex > 0 ? 'mt-8' : ''}`}>
                                            <h2 className="mb-3" style={{ color: 'var(--text-primary)' }}>{question.text}</h2>

                                            {question.code && (
                                                <div className="code-block">
                                                    <pre><code className={getLanguageClass(question.code)}>{question.code}</code></pre>
                                                </div>
                                            )}

                                            <ul className="list-none p-0">
                                                {question.answers.map((answer, index) => (
                                                    <li
                                                        key={index}
                                                        className={`mt-2.5 ${index === question.correct ? 'is-true' : ''}`}
                                                        data-selected={question.selection === index ? 'true' : 'false'}>
                                                        <input
                                                            type="radio"
                                                            name={`q_${question.id}_r`}
                                                            checked={question.selection === index}
                                                            readOnly
                                                            className="hidden"
                                                        />
                                                        <label
                                                            className="question-answer flex p-3 text-sm rounded overflow-hidden items-center border-2"
                                                            style={{
                                                                borderColor: question.selection === index
                                                                    ? (index === question.correct ? '#4a7c59' : '#ff6161')
                                                                    : (index === question.correct ? 'var(--accent-color)' : 'var(--card-border)'),
                                                                color: 'var(--text-primary)',
                                                                backgroundColor: question.selection === index
                                                                    ? (index === question.correct ? '#d4edda' : '#ffd5dc')
                                                                    : (index === question.correct ? 'rgba(138, 129, 112, 0.2)' : 'var(--card-bg)')
                                                            }}>
                                                            {answer}
                                                        </label>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Theme Toggle Button */}
            <div
                className="fixed bottom-5 right-5 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer z-50 shadow-lg"
                style={{
                    background: 'var(--accent-color)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
                onClick={toggleTheme}>
                <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} text-xl`} style={{ color: 'var(--text-primary)' }}></i>
            </div>

            {/* Font Awesome */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        </div>
    );
};

export default CodingQuiz;