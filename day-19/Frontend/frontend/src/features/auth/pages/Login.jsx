import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setuserName] = useState('')
  const [password, setPassword] = useState('')

  const { handleLogin, loading } = useAuth()
  const navigate = useNavigate()
  
  if (loading) {
    return <h1>Loading...</h1>
  }

  async function submitHandler(e) {
    e.preventDefault()

    handleLogin(username, password)
      .then(res => {
        console.log(res);
        navigate('/')
      
    })
    
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <input
            
            value={username}
            onChange={(e) => {
              setuserName(e.target.value)
            }}

            type="text"
            name=' username'
            placeholder='Enter username' />
          <input
            value={password}

            onChange={(e) => {
              setPassword(e.target.value)
            }}

            type='password'
            name=' password'
            placeholder='Enter password' />
          <button type='submit'>Login</button>
        </form>
        
        <p>Don't have an account? <Link className='toggleAuthForm' to={'/register'}>Register</Link></p>
      </div>
    </main>
  )
}

export default Login