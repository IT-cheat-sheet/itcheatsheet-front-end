import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../core/components/button'
import Footer from '../../core/components/footer'
import Navbar from '../../core/components/navbar'

export default function NotFound() {
  useEffect(() => {
    document.title = "ITCheatSheet – Not Found"
  })

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
      <Navbar />
      <div className="flex flex-col space-y-10 md:space-y-8 justify-center items-center mt-44 mb-16 md:my-16">
        <div>
          <img src="/images/notFound.png" />
        </div>
        <div className="text-center w-2/3 mb:w-1/5">
          <p className="text-4xl md:text-popup font-bold tracking-wide">Whoops!</p>
          <p className="mt-1 tracking-wide">We could not connect you to the page you are looking for.</p>
        </div>
        <Link to="/" className="w-1/2 md:w-1/6">
          <Button color="purple" size="md" children="Back to Home" />
        </Link>
      </div>
      </div>
      <Footer />
    </div>
  )
}