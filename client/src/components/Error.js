import React from 'react'
import error from '../assests/error.png'
import { NavLink } from 'react-router-dom'

const Error = () => {
  return (
    <>
    <div className='error-container'>
        <img className="error-img" src={error} />
        <div className='error-content'>
        <h4>Something Went Wrong </h4>
        <NavLink to='/'><button>BACK TO HOMEPAGE</button></NavLink>
        </div>
        
    </div>
    </>
  )
}

export default Error
