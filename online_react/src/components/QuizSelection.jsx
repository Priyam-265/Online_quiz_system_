import React, { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

function QuizSelection() {
  const wrapperRef = useRef(null)
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)
  const card3Ref = useRef(null)
  const card4Ref = useRef(null)

  useLayoutEffect(() => {
    const cards = [
      { ref: card1Ref, endTranslateX: -2000, rotate: 45 },
      { ref: card2Ref, endTranslateX: -1000, rotate: -30 },
      { ref: card3Ref, endTranslateX: -2000, rotate: 45 },
      { ref: card4Ref, endTranslateX: -1500, rotate: -30 },
    ]

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.to(wrapperRef.current, {
        x: "-350vw",
        ease: "none"
      }, 0)

      cards.forEach((card) => {
        tl.to(card.ref.current, {
          x: `${card.endTranslateX}px`,
          rotate: `${card.rotate * 2}`,
          ease: "none"
        }, 0)
      })

      ScrollTrigger.create({
        animation: tl,
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=400vh",
        scrub: 1,
        pin: true,
      })

    }, wrapperRef)

    return () => ctx.revert()

  }, [])

  return (
    <section ref={wrapperRef} className="wrapper-404 relative w-[400vw] h-[100vh] will-change-transform">
      <h1 className="text w-full text-[43.8vw] font-normal text-center m-0 [text-shadow:1px_1px_6px_rgba(0,0,0,0.25)] dark:text-white dark:[text-shadow:_0_0_25px_white] mb-1">Choose a challenge!</h1>

      <div ref={card1Ref} className="card absolute w-[350px] h-[350px] shadow-[0_6px_12px_rgba(0,0,0,0.2)] dark:shadow-[0_0_20px_5px_white] rounded-3xl overflow-hidden top-[50%] left-[20%]" id="card1">
        <Link to="/CodingQuiz"><img className="w-full h-full object-cover" src="/coding_card.png" alt="Coding Quiz" /></Link>
      </div>

      <div ref={card2Ref} className="card absolute w-[350px] h-[350px] shadow-[0_6px_12px_rgba(0,0,0,0.2)] dark:shadow-[0_0_20px_5px_white] rounded-3xl overflow-hidden top-[25%] left-[40%]" id="card2">
        <Link to="/GeneralKnowledgeQuiz"><img className="w-full h-full object-cover" src="/gk_card2.png" alt="General Knowledge Quiz" /></Link>
      </div>

      <div ref={card3Ref} className="card absolute w-[350px] h-[350px] shadow-[0_6px_12px_rgba(0,0,0,0.2)] dark:shadow-[0_0_20px_5px_white] rounded-3xl overflow-hidden top-[45%] left-[60%]" id="card3">
        <Link to="/ScienceQuiz"><img className="w-full h-full object-cover" src="/science_card.png" alt="Science Quiz" /></Link>
      </div>

      <div ref={card4Ref} className="card absolute w-[350px] h-[320px] shadow-[0_6px_12px_rgba(0,0,0,0.2)] dark:shadow-[0_0_20px_5px_white] rounded-3xl overflow-hidden top-[15%] left-[80%]" id="card4">
        <Link to="/ComputerQuiz"><img className="w-full h-full object-cover" src="/computer.png" alt="Computer Quiz" /></Link>
      </div>
    </section>
  )
}

export default QuizSelection