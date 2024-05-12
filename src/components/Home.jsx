import React from 'react'

import NavBar from './NavBar'

function Home() {
  return (
    <div>
        <NavBar/>
        <div className='page-content'>
          <h1><b>Welcome!</b></h1>
          <h3>Here you can manage customers, products, and customer orders!</h3>
          <div className='hero-image'></div>
        </div>
    </div>
  )
}

export default Home
