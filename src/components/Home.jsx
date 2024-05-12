import React from 'react'

import NavBar from './NavBar'

function Home() {
  return (
    <div>
        <NavBar/>
        <div className='page-content'>
          <h1>Welcome!</h1>
          <div className='hero-image'></div>
          <h2>Here you can manage customers, products, and customer orders!</h2>
        </div>
    </div>
  )
}

export default Home
