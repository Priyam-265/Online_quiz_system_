import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
const AboutUs = () => {
    const [theme, setTheme] = useState('light');
    const navRef = useRef(null);
    const heroRef = useRef(null);
    const contentRefs = useRef([]);
    const flipRefs = useRef([]);

    useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => setTheme(e.matches ? 'dark' : 'light');
        mediaQuery.addEventListener('change', handleChange);

        animateContent();
        animateFlipCards();

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const animateContent = () => {
        gsap.fromTo(navRef.current,
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
        );

        gsap.fromTo(heroRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.3 }
        );

        contentRefs.current.forEach((ref, index) => {
            if (ref) {
                gsap.fromTo(ref,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.5 + index * 0.15 }
                );
            }
        });
    };

    // 🔥 Staggered GSAP Pop-in
    const animateFlipCards = () => {
        gsap.fromTo(
            flipRefs.current,
            { opacity: 0, scale: 0.8, y: 30 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.25,
                delay: 1
            }
        );
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    // Navigation handlers
    const handleNavigation = (page) => {
        console.log(`Navigating to: ${page}`);
        alert(`Navigating to ${page} page!`); // Temporary feedback
        // You can replace this with actual routing later
    };

    // TEAM: The 4P's of Nexora
    const teamMembers = [
        {
            name: "Priyam",
            role: "The System Backbone",
            description: "Manages backend, APIs, and performance to keep Nexora seamless and fast."
        },
       
        {
            name: "Pranav",
            role: "The Logic Architect",
            description: "Builds core functionality, animations, and ensures smooth and responsive performance."
        },
        {
            name: "Prachi",
            role: "The Content Alchemist",
            description: "Transforms ideas into immersive quizzes and powerful learning experiences."
        },
        {
            name: "Prabhsimran",
            role: "The Visionary designer",
            description: "Shapes Nexora's identity through creative visuals and immersive UI experiences."
        }
    ];

    const features = [
        {
            icon: "fa-brain",
            title: "Smart Learning",
            description: "Adaptive quizzes that adjust to your knowledge level and learning pace."
        },
        {
            icon: "fa-chart-line",
            title: "Track Progress",
            description: "Comprehensive analytics to monitor improvement over time."
        },
        {
            icon: "fa-trophy",
            title: "Gamification",
            description: "Compete on leaderboards and earn achievements as you learn."
        },
        {
            icon: "fa-users",
            title: "Community",
            description: "Join thousands of learners sharing knowledge and experiences."
        }
    ];

    return (
        <div className="w-full min-h-screen overflow-x-hidden" style={{
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            fontFamily: '"Be Vietnam Pro", sans-serif'
        }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap');
                @import url('https://db.onlinewebfonts.com/c/554de251fec51511723effebd5d0ed84?family=Roslindale+Display+Condensed+Medium');
                
                :root {
                    --bg-primary: #c5c0b2;
                    --bg-secondary: #ffffff;
                    --text-primary: #000000;
                    --text-secondary: #333333;
                    --accent-color: #8a8170;
                    --card-bg: rgba(255, 255, 255, 0.9);
                    --card-border: rgba(138, 129, 112, 0.3);
                    --nav-bg: rgba(197, 192, 178, 0.95);
                }

                [data-theme="dark"] {
                    --bg-primary: #000000;
                    --bg-secondary: #0a0a0a;
                    --text-primary: #ffffff;
                    --text-secondary: #e5e5e5;
                    --accent-color: #c5c0b2;
                    --card-bg: rgba(197, 192, 178, 0.1);
                    --card-border: rgba(197, 192, 178, 0.3);
                    --nav-bg: rgba(0, 0, 0, 0.95);
                }

                .hover-lift {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .hover-lift:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                }

                .nav-item {
                    cursor: pointer;
                    transition: all 0.3s ease;
                    padding: 8px 12px;
                    border-radius: 6px;
                }

                .nav-item:hover {
                    background-color: var(--accent-color);
                    color: var(--bg-primary);
                    transform: translateY(-2px);
                }

                /* Flip Card Styling */
                .flip-card {
                    perspective: 1000px;
                }
                .flip-card-inner {
                    transition: transform 0.7s;
                    transform-style: preserve-3d;
                }
                .flip-card:hover .flip-card-inner {
                    transform: rotateY(180deg);
                }
                .flip-card-front, .flip-card-back {
                    backface-visibility: hidden;
                }
                .flip-card-back {
                    transform: rotateY(180deg);
                }
            `}</style>
            <style>
{`
  @import url('https://db.onlinewebfonts.com/c/554de251fec51511723effebd5d0ed84?family=Roslindale+Display+Condensed+Medium');
  .font-roslindale {
    font-family: 'Roslindale Display Condensed Medium', serif;
  }
`}
</style>


            {/* NAVBAR */}
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
                

            {/* HERO */}
            <div ref={heroRef} className="pt-40 pb-20 px-10 text-center">
                <h1 className="text-7xl font-medium mb-6"
                    style={{
                        fontFamily: "'Roslindale Display Condensed Medium', serif",
                        textShadow: '2px 3px 0 rgba(0, 0, 0, 0.2)'
                    }}>
                    About Nexora
                </h1>
                <p className="text-xl max-w-3xl mx-auto opacity-90"
                    style={{ color: 'var(--text-secondary)' }}>
                    Empowering learners globally through innovation, creativity, and intelligent quiz technology.
                </p>
            </div>

            {/* MISSION */}
            <div className="max-w-6xl mx-auto px-10 py-16">
                <div ref={el => contentRefs.current[0] = el}
                    className="rounded-2xl p-12 hover-lift"
                    style={{
                        backgroundColor: 'var(--card-bg)',
                        border: '2px solid var(--card-border)'
                    }}>
                    <h2 className="text-4xl font-semibold mb-6"
                        style={{ fontFamily: "'Roslindale Display Condensed Medium', serif" }}>
                        Our Mission
                    </h2>
                    <p className="text-lg opacity-90"
                        style={{ color: 'var(--text-secondary)' }}>
                        Nexora is built on the belief that learning should be exciting—not boring. We create intelligent quiz tools that make it easier, faster, and more fun to improve your skills every single day.
                    </p>
                </div>
            </div>

            {/* FEATURES */}
            <div className="max-w-6xl mx-auto px-10 py-16">
                <h2 ref={el => contentRefs.current[1] = el} className="text-5xl font-semibold mb-12 text-center"
                    style={{ fontFamily: "'Roslindale Display Condensed Medium', serif" }}>
                    Why Choose Nexora
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            ref={el => contentRefs.current[2 + index] = el}
                            className="rounded-xl p-8 hover-lift"
                            style={{
                                backgroundColor: 'var(--card-bg)',
                                border: '2px solid var(--card-border)'
                            }}>
                            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                                style={{ backgroundColor: 'var(--accent-color)' }}>
                                <i className={`fas ${feature.icon} text-2xl`}
                                    style={{ color: 'var(--bg-primary)' }}></i>
                            </div>
                            <h3 className="text-2xl font-semibold">{feature.title}</h3>
                            <p className="text-base opacity-85"
                                style={{ color: 'var(--text-secondary)' }}>
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 🔥 NEW FLIP STATS SECTION (GSAP + 3D) */}
            <div className="max-w-6xl mx-auto px-10 py-24">
                <h2 className="text-5xl font-semibold mb-16 text-center"
                    style={{ fontFamily: "'Roslindale Display Condensed Medium', serif" }}>
                    What Nexora Offers
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {[
                        {
                            icon: "fa-users",
                            title: "50K+ Active Learners",
                            desc: "A fast-growing community of learners improving their skills daily."
                        },
                        {
                            icon: "fa-brain",
                            title: "1M+ Quizzes Completed",
                            desc: "Powered by an adaptive quiz engine designed for faster learning."
                        },
                        {
                            icon: "fa-book-open",
                            title: "100+ Topics",
                            desc: "A rich library designed for learners of every age and skill level."
                        }
                    ].map((item, i) => (
                        <div key={i} ref={el => flipRefs.current[i] = el}
                            className="flip-card w-full h-64">

                            <div className="flip-card-inner w-full h-full relative">

                                {/* FRONT */}
                                <div className="flip-card-front absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-8"
                                    style={{
                                        backgroundColor: 'var(--card-bg)',
                                        border: '2px solid var(--card-border)'
                                    }}>
                                    <i className={`fas ${item.icon} text-5xl mb-4`}
                                        style={{ color: 'var(--accent-color)' }}></i>
                                    <h3 className="text-xl font-bold">{item.title}</h3>
                                </div>

                                {/* BACK */}
                                <div className="flip-card-back absolute inset-0 rounded-2xl flex items-center justify-center p-6 text-center"
                                    style={{
                                        backgroundColor: 'var(--accent-color)',
                                        color: 'var(--bg-primary)'
                                    }}>
                                    <p className="text-lg">{item.desc}</p>
                                </div>

                            </div>
                        </div>
                    ))}

                </div>
            </div>

            {/* TEAM */}
            <div className="max-w-6xl mx-auto px-10 py-16">
                <h2 ref={el => contentRefs.current[6] = el}
                    className="text-5xl font-semibold mb-12 text-center"
                    style={{ fontFamily: "'Roslindale Display Condensed Medium', serif" }}>
                    The Team of Nexora
                </h2>

                <p className="text-center text-lg mb-16 opacity-85 max-w-3xl mx-auto"
                    style={{ color: 'var(--text-secondary)' }}>
                    Four creative minds — one shared vision: to transform learning into an intelligent, enjoyable experience.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            ref={el => contentRefs.current[7 + index] = el}
                            className="rounded-xl p-6 text-center hover-lift"
                            style={{
                                backgroundColor: 'var(--card-bg)',
                                border: '2px solid var(--card-border)'
                            }}>
                            <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold"
                                style={{
                                    backgroundColor: 'var(--accent-color)',
                                    color: 'var(--bg-primary)'
                                }}>
                                {member.name[0]}
                            </div>
                            <h3 className="text-xl font-semibold">{member.name}</h3>
                            <p className="text-sm font-medium mb-3 opacity-80"
                                style={{ color: 'var(--accent-color)' }}>
                                {member.role}
                            </p>
                            <p className="text-sm opacity-75"
                                style={{ color: 'var(--text-secondary)' }}>
                                {member.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="max-w-6xl mx-auto px-10 py-20 text-center">
                <div ref={el => contentRefs.current[12] = el}>
                    <h2 className="text-5xl font-semibold mb-6"
                        style={{ fontFamily: "'Roslindale Display Condensed Medium', serif" }}>
                        Ready to Start Learning?
                    </h2>
                    <p className="text-xl mb-8 opacity-90"
                        style={{ color: 'var(--text-secondary)' }}>
                        Join thousands of learners taking their skills to the next level.
                    </p>
                    <Link to="/second">
                    <button
                        className="px-10 py-4 rounded-lg text-lg font-semibold hover:scale-105 transition-transform cursor-pointer"
                        style={{
                            backgroundColor: 'var(--accent-color)',
                            color: 'var(--text-primary)',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                        }}
                        >
                        Get Started Now
                    </button>
                    </Link>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="py-12 px-10 text-center border-t"
                style={{
                    borderColor: 'var(--card-border)',
                    backgroundColor: 'var(--bg-secondary)'
                }}>
                <p className="opacity-70" style={{ color: 'var(--text-secondary)' }}>
                    © 2025 Nexora. All rights reserved.
                </p>
            </footer>

            {/* THEME TOGGLE */}
            <div className="fixed bottom-5 right-5 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform"
                style={{ background: 'var(--accent-color)' }}
                onClick={toggleTheme}>
                <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} text-xl`}></i>
            </div>

            {/* FONT AWESOME */}
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
            />

        </div>
    );
};

export default AboutUs;