import React, { useState, useEffect, useRef } from 'react';
import '@google/model-viewer';
import Second from './second.jsx';
import { Link } from 'react-router-dom';
// GSAP from CDN
const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;

const First = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [chatVisible, setChatVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

const handleNavigate = (page) => {
  setCurrentPage(page);
  window.scrollTo(0, 0);
};


  const diamondRef = useRef(null);
  const mainRef = useRef(null);
  const characterRef = useRef(null);
  const chatboxRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const colorTextRef = useRef(null);

  const BOT_EMOJI = "🐰 ";
  const USER_EMOJI = "🐼 ";

  // Detect environment and set API base
  const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  // const API_BASE = isLocal 
  //   ? "http://localhost:3000" 
  //   : "https://online-quiz-system-s3z6.onrender.com";

    const API_BASE=import.meta.env.VITE_NAT_BASE;

  // Intro animation
  useEffect(() => {
    if (!gsap || !diamondRef.current) return;

    const tl = gsap.timeline();
    
    tl.fromTo(diamondRef.current,
      { scale: 0, rotate: 45 },
      { 
        scale: 1.5, 
        rotate: 405,
        duration: 2, 
        ease: "power3.inOut"
      }
    )
    .to(diamondRef.current, { 
      rotate: 720, 
      scale: 1, 
      duration: 1.2, 
      ease: "power4.out" 
    })
    .to(diamondRef.current, { 
      scale: 32, 
      duration: 1.5, 
      ease: "expo.inOut" 
    })
    .to({}, {
      duration: 0.7,
      onComplete: () => {
        setShowIntro(false);
      }
    });

    return () => tl.kill();
  }, []);

  // Main content animations
  useEffect(() => {
    if (showIntro || !gsap || !mainRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Fade in main content
    gsap.to(mainRef.current, { 
      opacity: 1, 
      duration: 1, 
      ease: "power2.inOut" 
    });

    // Nav animations
    gsap.delayedCall(0.3, () => {
      gsap.from(".site-logo", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
      });
      gsap.from(".menu-item", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        delay: 0.3
      });
      gsap.from("#head1", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        delay: 1
      });
      gsap.from("#head2", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        delay: 1.1
      });
      gsap.from("#head3", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        delay: 1.2
      });
    });

    // Brain model animation
    const brainModel = document.getElementById('brainModel');
    if (brainModel) {
      gsap.from(brainModel, {
        opacity: 0,
        scale: 0.5,
        duration: 2,
        ease: "elastic.out(1, 0.5)",
        delay: 1.5
      });
    }

    // Character animation
    if (characterRef.current) {
      gsap.from(characterRef.current, {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: characterRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: true
        }
      });
    }

    // Color transition text
    if (colorTextRef.current) {
      const words = colorTextRef.current.querySelectorAll('span');
      words.forEach((word, i) => {
        gsap.fromTo(
          word,
          { 
            color: isDark ? "#ffffff" : "#9ca3af"
          },
          { 
            color: isDark ? "#d1d5db" : "#4b5563",
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: colorTextRef.current,
              start: `top+=${i * 40} bottom-=100`,
              end: `top+=${(i + 1) * 40} bottom-=100`,
              scrub: true
            }
          }
        );
      });
    }

    // Card animations
    const cardWrappers = document.querySelectorAll('.card-wrapper');
    cardWrappers.forEach((wrapper, i) => {
      const card = wrapper.querySelector('.card');
      if (!card) return;

      let scale = 1;
      let rotation = 0;
      
      if (i !== cardWrappers.length - 1) {
        scale = 0.9 + 0.025 * i;
        rotation = -10;
      }

      gsap.to(card, {
        scale: scale,
        rotationX: rotation,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: `top ${60 + 10 * i}`,
          end: "bottom 550",
          endTrigger: ".wrapper",
          scrub: true,
          pin: wrapper,
          pinSpacing: false
        }
      });
    });

    // Chatbox reveal
    ScrollTrigger.create({
      trigger: characterRef.current,
      start: "top 75%",
      once: true,
      onEnter: () => {
        setChatVisible(true);
        if (chatboxRef.current) {
          gsap.fromTo(
            chatboxRef.current,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
          );
        }
        setTimeout(() => {
          addBotMessage("Hi — I'm Nat! 🌸");
        }, 280);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [showIntro, isDark]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const addBotMessage = (text) => {
    setChatMessages(prev => [...prev, { type: 'bot', text }]);
  };

  const addUserMessage = (text) => {
    setChatMessages(prev => [...prev, { type: 'user', text }]);
  };

  const fetchAIResponse = async (message) => {
    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      return data.reply || "Sorry, I didn't understand that. 😅";
    } catch (err) {
      console.error("❌ Fetch error:", err);
      return "Oops, something went wrong. 😢";
    }
  };

  const handleSendMessage = async () => {
    const text = userInput.trim();
    if (!text) return;

    addUserMessage(text);
    setUserInput('');
    setIsThinking(true);

    const reply = await fetchAIResponse(text);
    setIsThinking(false);
    addBotMessage(reply);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const introText = "Welcome curious minds and competitive spirits! Our quiz website just a place to answer questions—it's a launchpad for learning, challenge, and fun. you're here to test your general knowledge, sharpen your skills, or simply enjoy the thrill of a timed quiz, isn't we've crafted an experience that's fast, engaging, and rewarding. With sleek design, interactive cards, and scroll-triggered animations, every click pulls you deeper into a world where thinking fast and learning smart go hand in hand. So gear up, dive in, and let the questions spark your brilliance—because here, every answer is a step toward mastery.";
  
  const words = introText.split(' ');
  if (currentPage !== "home") {
  return <Second onNavigate={handleNavigate} currentPage={currentPage} isDark={isDark} />;
}

  return (
    <>
      <style>{`
        @import url('https://db.onlinewebfonts.com/c/554de251fec51511723effebd5d0ed84?family=Roslindale+Display+Condensed+Medium');
        
        .font-roslindale {
          font-family: 'Roslindale Display Condensed Medium', serif;
        }

        html {
          scroll-behavior: smooth;
        }

        .chat-scroll::-webkit-scrollbar {
          width: 4px;
        }
        
        .chat-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .chat-scroll::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.3);
          border-radius: 2px;
        }

        .dark .chat-scroll::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.3);
        }

        model-viewer {
          width: 100%;
          height: 100%;
        }
      `}</style>

      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

      <div className={`${isDark ? 'dark' : ''}`}>
        {/* Intro Section */}
        {showIntro && (
          <section className="fixed inset-0 z-50 flex items-center justify-center bg-black dark:bg-white">
            <div 
              ref={diamondRef}
              className="w-32 h-32 bg-[#c5c0b2] dark:bg-black rounded-xl transform rotate-45"
            />
          </section>
        )}

        {/* Main Content */}
        {!showIntro && (
          <div className="bg-[#c5c0b2] dark:bg-black min-h-screen">
            <main ref={mainRef} className="opacity-0">
              {/* Navigation */}
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

              {/* Hero Section */}
              <section className="relative pt-60 flex flex-row justify-between items-center w-full px-20">
                <h2 id="head1" className="font-roslindale text-black dark:text-white text-5xl">
                  Test your brain<br/>Beat the clock
                </h2>

                {/* Brain 3D Model */}
                <div id="brainModel" className="w-[650px] h-[650px] mx-10">
                  <model-viewer 
                    src="/Neon_Brain_Illustrati_0831192955_texture.glb"
                    alt="Neon Brain 3D Model"
                    auto-rotate
                    camera-controls
                    shadow-intensity="0"
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>

                <h2 id="head2" className="font-roslindale text-black dark:text-white text-4xl">
                  Think fast!<br/>Think creative!!
                </h2>
              </section>

              <div className="mt-40">
                <h2 id="head3" className="font-roslindale ml-20 text-black dark:text-white text-6xl">
                  Your knowledge<br/>Your power
                </h2>
              </div>

              <div className="h-[50vh] flex justify-center mt-80">
                <hr className="border-black dark:border-white w-[80%]" />
              </div>

              {/* Interactive Text Section */}
              <section className="relative min-h-screen w-full flex items-center justify-between px-20 py-20">
                <p ref={colorTextRef} className="text-[2rem] leading-relaxed tracking-wide font-medium select-none text-gray-400 dark:text-white max-w-4xl text-left">
                  {words.map((word, i) => (
                    <span key={i} className="mr-1 inline-block">{word}</span>
                  ))}
                  <br/>
{/*                   
                  <button 
                    className="px-6 py-2 mt-4 font-roslindale bg-black text-[#c5c0b2] dark:bg-white dark:text-black rounded-3xl cursor-pointer hover:opacity-85 transition-opacity"
                  >
                    Play Quiz
                  </button> */}
                  <Link to="/second">
  <button 
    className="px-6 py-2 mt-4 font-roslindale bg-black text-[#c5c0b2] dark:bg-white dark:text-black rounded-3xl cursor-pointer hover:opacity-85 transition-opacity"
  >
    Play Quiz
  </button>
</Link>
                </p>

                <div className="flex flex-col items-center relative w-[500px] h-[500px]">
                  {/* Chatbox */}
                  {chatVisible && (
                    <div 
                      ref={chatboxRef}
                      className="absolute -top-40 left-1/2 -translate-x-1/2 w-72 h-48 rounded-xl p-4 shadow-lg bg-[#c5c0b2] text-black dark:bg-black dark:text-white z-10"
                    >
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-[#c5c0b2] dark:border-t-black"></div>
                      
                      <div className="text-sm font-semibold mb-2">Nat🌸</div>
                      
                      <div ref={chatMessagesRef} className="chat-scroll text-sm h-20 overflow-y-auto mb-3 space-y-1 pr-1">
                        {chatMessages.map((msg, idx) => (
                          <div key={idx} className={msg.type === 'bot' ? "text-left py-1" : "text-right py-1"}>
                            <span className={`inline-block px-3 py-1 rounded-lg text-sm ${
                              msg.type === 'bot' 
                                ? "bg-white/90 dark:bg-gray-800/90 text-black dark:text-white"
                                : "bg-black text-[#c5c0b2] dark:bg-white dark:text-black"
                            }`}>
                              {msg.type === 'bot' ? BOT_EMOJI : USER_EMOJI}{msg.text}
                            </span>
                          </div>
                        ))}
                        {isThinking && (
                          <div className="text-left py-1">
                            <span className="inline-block px-3 py-1 rounded-lg text-sm bg-white/90 dark:bg-gray-800/90 text-black dark:text-white italic opacity-70">
                              {BOT_EMOJI}Thinking... 🤔
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <input 
                          type="text"
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Type here..." 
                          className="flex-1 rounded-lg px-2 py-1 text-sm border border-black focus:outline-none focus:ring-2 focus:ring-black dark:border-white dark:focus:ring-white bg-transparent"
                        />
                        <button 
                          onClick={handleSendMessage}
                          className="px-3 rounded-lg text-sm font-medium bg-black text-[#c5c0b2] hover:opacity-90 transition dark:bg-white dark:text-black"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Character 3D Model */}
                  <div ref={characterRef} className="w-full h-full">
                    <model-viewer 
                      src="/r.glb"
                      alt="Nat Character 3D Model"
                      auto-rotate
                      camera-controls
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                </div>
              </section>

              <div className="h-[35vh] flex justify-center">
                <hr className="border-black dark:border-white w-[80%]" />
              </div>

              {/* Cards Section */}
              <section className="wrapper w-full min-h-screen pt-[100px] pb-[50px]">
                <div className="cards w-full max-w-[750px] mx-auto px-5">
                  {[
                    {
                      title: "Explore Quizzes",
                      text: "Dive into a vast collection of quizzes across various topics — from science and history to entertainment and more. Filter by difficulty or category to find the perfect quiz that suits your mood and knowledge level. Challenge yourself and learn something new every day!",
                      button: "Play Quiz"
                    },
                    {
                      title: "Your Progress",
                      text: "Keep track of your quiz performances with detailed stats and insights. Review your past scores, analyze your strengths and weaknesses, and watch your progress over time. This helps you focus your learning and celebrate your improvements!",
                      button: "View Results"
                    },
                    {
                      title: "Featured Quizzes",
                      text: "Check out our handpicked selection of trending and popular quizzes. Updated regularly with new content, these quizzes are designed to keep you engaged and entertained while sharpening your skills.",
                      button: "Try now"
                    },
                    {
                      title: "Quiz Tips & Tricks",
                      text: "Want to get better at quizzes? Explore expert tips, learning strategies, and best practices to boost your performance. Whether you're prepping for a test or just love trivia, these tips will help you level up your quiz game!",
                      button: "Learn more"
                    }
                  ].map((card, idx) => (
                    <div key={idx} className="card-wrapper w-full mb-[50px] [perspective:500px]">
                      <div className="card w-full h-[400px] flex justify-center items-center rounded-[10px] bg-black dark:bg-white">
                        <div className="content flex flex-col gap-9 m-3">
                          <h2 className="text-4xl w-1/2 text-[#c5c0b2] mt-4 dark:text-black font-roslindale">
                            {card.title}
                          </h2>
                          <p className="text-3xl text-[#c5c0b2] dark:text-black">
                            {card.text}
                          </p>
                          <button className="px-4 py-2 font-roslindale w-fit bg-[#c5c0b2] text-black rounded-3xl cursor-pointer hover:opacity-85 transition dark:bg-white dark:text-black">
                            {card.button}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="h-[35vh]"></div>

              {/* Footer */}
              <footer className="h-[10vh] font-roslindale text-[#c5c0b2] bg-black dark:bg-white dark:text-black">
                <div className="flex flex-col">
                  <div className="flex justify-between m-4 gap-8">
                    <h2 className="text-4xl">Nexora</h2>
                    <ul className="flex gap-4">
                      <li><a href="#about">About</a></li>
                      <li><a href="#privacy">Privacy policy</a></li>
                      <li><a href="#license">Licencing</a></li>
                      <li><a href="#contact">Contact</a></li>
                    </ul>
                  </div>
                  <div className="flex justify-center items-center">
                    © 2025 <a href="#home" className="ml-1">Nexora</a>
                  </div>
                </div>
              </footer>
            </main>
          </div>
        )}
      </div>
    </>
  );
};

export default First;


