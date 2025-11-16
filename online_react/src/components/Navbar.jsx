import React, { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

function Navbar() {
  const navRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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
    }, navRef)
    
    return () => ctx.revert()
  }, [])

  return (
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
               
  )
}

export default Navbar