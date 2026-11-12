import React from 'react'
import '../components/nav.scss'
import { useNavigate } from 'react-router'

const Nav = () => {
    const navigate = useNavigate()
  return (
      <nav className='nav-bar'>
          <p>insta</p>
          <button onClick={()=>{navigate('/create-post')}}
              className='button primary-button'> + Post</button>
          
      </nav>
  )
}

export default Nav