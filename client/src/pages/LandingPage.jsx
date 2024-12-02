import React from 'react'
import Navbar from '../components/Navbar'
import Security from '../assets/security.spline'

function LandingPage() {
  return (
    <div className='min-h-screen w-full flex flex-col'>
      <Navbar />
      <div className='h-screen w-full flex'>
        <div className="w-1/2 pl-8 min-h-full flex flex-col items-start justify-center">
          <div className="max-w-4xl w-full text-center space-y-6 px-4">
            <h1 className="text-5xl font-extrabold leading-tight tracking-wide">
              Empowering Communities with Web3
            </h1>
            <p className="text-xl sm:text-2xl font-medium max-w-lg mx-auto">
              Unlocking the potential of decentralized solutions to solve real-world problems.
            </p>

            <div className="mt-12 flex justify-center space-x-6">
              <a href="#explore" className="bg-yellow-500 hover:bg-yellow-600 text-black text-lg font-bold py-3 px-6 rounded-md shadow-lg transition duration-300 transform hover:scale-105">
                Explore Solutions
              </a>
              <a href="#join" className="bg-transparent border-2 border-white text-white text-lg font-bold py-3 px-6 rounded-md shadow-lg transition duration-300 transform hover:scale-105">
                Join the Revolution
              </a>
            </div>
          </div>
        </div>
        <div className='w-1/2 min-h-full flex items-center justify-center'>
          <Security />
        </div>
      </div>
    </div>
  )
}

export default LandingPage
