import React from 'react'
import FaceExpression from '../../Expression/components/FaceDetection'
import Player from '../components/Player'
import './Home.scss'

const Home = () => {
  return (
    <main className="home-page">
      <header className="home-header">
        <span className="home-brand-mark" aria-hidden="true">♫</span>
        <div>
          <p className="home-eyebrow">MOODIFY</p>
          <h1>Your mood, your music.</h1>
        </div>
      </header>
      <div className="home-content">
        <section className="expression-panel" aria-label="Mood detection">
          <FaceExpression />
        </section>
        <Player />
      </div>
    </main>
  )
}

export default Home