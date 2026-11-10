import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './features/auth/pages/Login.jsx'
import Register from './features/auth/pages/Register.jsx'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<h1>Welcome to the App</h1>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes