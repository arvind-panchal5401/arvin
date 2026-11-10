import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [username, setuserName] = useState('')
  const [email, setuserEmail] = useState('')
  const [password, setuserPassword] = useState('')



  async function submitHandler(e) {
    e.preventDefault()
    registerApi()





  }
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={submitHandler}>
          <input
            value={username}
            onChange={(e) => {
              setuserName(e.target.value)
            }}
            type="text"
            name='username'
            placeholder='Enter username' />
          <input
            value={email}
            onChange={(e) => {
              setuserEmail(e.target.value)
            }}
            type="email"
            name='email'
            placeholder='Enter email' />
          <input
            value={password}
            onChange={(e) => {
              setuserPassword(e.target.value)
            }}
            type="password"
            name='password'
            placeholder='Enter password' />
          <button
            type='submit'>Register</button>
        </form>
        <p>Already have an account <Link className='toggleAuthForm' to={'/login'}>Login</Link> </p>
      </div>
    </main>
  )
}

export default Register