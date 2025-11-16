import React from 'react'
import { Link } from 'react-router-dom'
import QuizSelection from '../components/QuizSelection'

function HomePage() {
  return (
    <>
      <QuizSelection />

      {/* CHANGE: 
        Added more space above by changing "pt-32" to "pt-48" 
      */}
      <div className="w-full text-center pt-56 pb-20 px-4">
        
        <h2 className="text-4xl md:text-5xl font-roslindale text-gray-900 dark:text-white mb-6">
          Test Your Typing Skills
        </h2>

            <Link
  to="/typing"
  className="inline-block bg-black dark:bg-white text-white dark:text-black font-medium py-3 px-8 rounded-full text-lg shadow-[0_4px_10px_rgba(0,0,0,0.25)] dark:shadow-[0_0_15px_3px_white] hover:opacity-90 transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-wide"
  >
          <i className="fas fa-keyboard mr-3"></i>
          Start Typing
        </Link>
      
      </div>
    </>
  )
}

export default HomePage