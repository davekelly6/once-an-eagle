import { useState, useEffect } from 'react'
import './App.css'

const MOODS = ['Happy', 'Sad', 'Energetic', 'Calm', 'Romantic', 'Angry', 'Nostalgic', 'Curious']

const RECOMMENDATION = {
  title: 'Walking on Broken Glass',
  artist: 'Annie Lennox',
}

function App() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [visibleMood, setVisibleMood] = useState<string | null>(null)

  useEffect(() => {
    if (!selectedMood) return
    setVisibleMood(null)
    const timer = setTimeout(() => setVisibleMood(selectedMood), 300)
    return () => clearTimeout(timer)
  }, [selectedMood])

  return (
    <div className="playlist-app">
      <h1>Once an Eagle, Always an Eagle</h1>
      <h2>Song Recommender</h2>
      <p className="subtitle">Just select your current mood, and you'll get the perfect song for the moment. Only bangers will return.</p>

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

      {visibleMood && (
        <div className="recommendation fade-in">
          <p className="rec-label">Perfect song for a <strong>{visibleMood}</strong> mood:</p>
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
