import React from 'react'

import NavBar from './NavBar'

function NotFound() {
  return (
    <div>
        <NavBar/>
        <div className='page-content'>
          <h1>404 - Page Not Found</h1>
        </div>
        <div className='hero-image'></div>
        <div className='footer'>🛒 eCommerce</div>
    </div>
  )
}

export default NotFound
