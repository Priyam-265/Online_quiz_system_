import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Outro() {
  const containerRef = useRef(null)
  const textRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline()
      
      tl.to(textRef.current, {
        y: "-100vh",
        ease: "power1.inOut",
      })

      ScrollTrigger.create({
        animation: tl,
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%", 
        scrub: 1,
        pin: true,
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      <h1 
        ref={textRef}
        className="text-[40vw] font-bold dark:text-white [text-shadow:_0_0_25px_white]"
      >
        Choose
      </h1>
    </section>
  )
}

export default Outro