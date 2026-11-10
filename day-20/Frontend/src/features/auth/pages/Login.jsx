import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/auth.hook'




const Login = () => {
  const { user, loading, handlelogin } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handlesubmit = async (e) => {
    e.preventDefault()
    await handlelogin(username, password)
    navigate('/')


  }
  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    )
  }
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
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
            value={password}

            onChange={(e) => {
              setPassword(e.target.value)
            }}
            type="password"
            name="password"
            id="password"
            placeholder='Enter password' />
          <button className='button primary-button' type='submit'>Login</button>
        </form>
        <p>Don't have an account ?  <Link to={'/register'}>Create Account.</Link> </p>
      </div>
    </main>
  )
}

export default Login