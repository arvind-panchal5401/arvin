import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [username, setuserName] = useState('')
  const [password, setPassword] = useState('')

  async function loginApi() {
    axios.post('http://localhost:3000/api/auth/login', {
      username,
      password
    }, { withCredentials: true }).then(res => {
      console.log(res.data);
      
    })
  }


  async function submitHandler(e) {
    e.preventDefault()
    loginApi()
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