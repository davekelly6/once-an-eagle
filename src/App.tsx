import { useState, useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import eagleAnimation from './assets/independence-day-eagle-2zMutK6IUe.json'
import './App.css'

const MOODS = ['Happy', 'Sad', 'Energetic', 'Calm', 'Romantic', 'Angry', 'Nostalgic', 'Curious']

const RECOMMENDATION = {
  title: 'Walking On Broken Glass',
  artist: 'Annie Lennox',
}

function App() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [visibleMood, setVisibleMood] = useState<string | null>(null)
  const [showEagle, setShowEagle] = useState(false)
  const eagleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!selectedMood) return
    setVisibleMood(null)
    setShowEagle(true)
    const eagleTimer = setTimeout(() => {
      setShowEagle(false)
      setVisibleMood(selectedMood)
    }, 2000)
    return () => clearTimeout(eagleTimer)
  }, [selectedMood])

  useEffect(() => {
    if (!showEagle || !eagleRef.current) return
    const anim = lottie.loadAnimation({
      container: eagleRef.current,
      animationData: eagleAnimation,
      renderer: 'svg',
      loop: false,
      autoplay: true,
    })
    return () => anim.destroy()
  }, [showEagle])

  return (
    <div className="playlist-app">
      <h1>Once an Eagle, <br />Always an Eagle</h1>
      <h2>Super Fancy, Good Time Song Recommender</h2>
      <p className="subtitle">Just select your current mood, and you'll get the perfect song for the moment.</p>
     <p className="subtitle">Only Slappin' Bangers® will be recommended.</p>

      <div className="mood-grid">
        {MOODS.map((mood) => (
          <button
            key={mood}
            className={`mood-btn${selectedMood === mood ? ' selected' : ''}`}
            onClick={() => setSelectedMood(mood)}
          >
            {mood}
          </button>
        ))}
      </div>

      {showEagle && (
        <div className="eagle-container fade-in" ref={eagleRef} />
      )}

      {visibleMood && (
        <div className="recommendation fade-in">
          <p className="rec-label">Perfect song for {/^[aeiou]/i.test(visibleMood) ? 'an' : 'a'} <strong>{visibleMood}</strong> mood:</p>
          <div className="song-card">
            <span className="song-title">{RECOMMENDATION.title}</span>
            <span className="song-artist">{RECOMMENDATION.artist}</span>
            <iframe
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
              frameBorder="0"
              height="175"
              style={{ width: '100%', maxWidth: 660, overflow: 'hidden', borderRadius: 10 }}
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              src="https://embed.music.apple.com/us/song/258646686"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
