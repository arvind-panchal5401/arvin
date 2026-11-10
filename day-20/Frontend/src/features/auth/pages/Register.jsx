import React, { useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../hooks/auth.hook'
import { useNavigate } from 'react-router'

const Register = () => {

  const { loading, handleregister } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handlesubmit = async(e) => {
    e.preventDefault()

    await handleregister(username, email, password)
    navigate('/')
    
  }
  if (loading) {
    <main>
      <h1>Loading...</h1>
    </main>
  }
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handlesubmit}>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            type="text"
            name='username'
            id='useranme'
            placeholder='Enter username' />
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            type="email"
            name='email'
            id='email'
            placeholder='Enter email' />

          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            type="password"
            name="password"
            id="password"
            placeholder='Enter password' />
          <button className='button primary-button' type='submit'>Register</button>
        </form>
        <p>Already have an account ?  <Link to={'/login'}>Login to account.</Link> </p>
      </div>
    </main>
  )
}

export default Register