import React, { useState } from 'react'
import '../style/login.scss'
import FormGroup from '../components/FormGroup'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'



const Login = () => {
    const { loading, user, handleLogin } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()

        await handleLogin({ email, password })
        navigate('/')
    }
    return (
        <main className="login-pages">
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit} >
                    <FormGroup
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        label="Email"
                        placeholder="Enter email" />
                    <FormGroup
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        label="Password"
                        placeholder="Enter password" />
                    <button className='button' type='submit'>Login</button>

                </form>
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
        </main>
    )
}

export default Login