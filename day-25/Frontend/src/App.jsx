import React from 'react'
import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import './features/shared/style/global.scss'
import { AuthProvider } from './features/auth/auth.context'
import { SongProvider } from './features/Home/song.context'


const App = () => {
  return (
    <AuthProvider>
      <SongProvider>
        <RouterProvider router={router} />
      </SongProvider>
    </AuthProvider>

  )
}

export default App