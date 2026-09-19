import { useState } from 'react'
import './MoodTracker.css'

function MoodTracker() {

  const [selectedMood, setSelectedMood] = useState(null)

  const moods = [
    {
      emoji: '😊',
      name: 'Happy',
      message: "That's great! Keep enjoying your day 🌸"
    },
    {
      emoji: '🙂',
      name: 'Good',
      message: "That's nice! Keep taking care of yourself 😊"
    },
    {
      emoji: '😐',
      name: 'Okay',
      message: "It's okay to feel neutral. Take some time for yourself 🌿"
    },
    {
      emoji: '😔',
      name: 'Sad',
      message: "It's okay to have difficult days. Take a moment for yourself 💙"
    },
    {
      emoji: '😣',
      name: 'Stressed',
      message: "Take a deep breath. You don't have to handle everything at once 🌿"
    }
  ]

  const selectMood = (mood) => {

    const now = new Date()

    setSelectedMood({
      ...mood,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    })
  }

  return (
    <div className="mood-page">

      <div className="mood-card">

        <h1>How are you feeling today?</h1>

        <p>
          Select the mood that best describes you.
        </p>


        <div className="mood-options">

          {moods.map((mood) => (

            <button
              key={mood.name}
              className="mood-button"
              onClick={() => selectMood(mood)}
            >

              <span>{mood.emoji}</span>

              <small>{mood.name}</small>

            </button>

          ))}

        </div>


        {/* Mood Popup */}

        {selectedMood && (

          <div className="mood-popup">

            <div className="popup-content">

              <span className="popup-emoji">
                {selectedMood.emoji}
              </span>

              <h2>
                You selected {selectedMood.name}
              </h2>

              <p>
                {selectedMood.message}
              </p>

              <div className="mood-date">
                📅 {selectedMood.date}
              </div>

              <div className="mood-time">
                🕐 {selectedMood.time}
              </div>

              <button
                onClick={() => setSelectedMood(null)}
                className="close-button"
              >
                Choose Another Mood
              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  )
}

export default MoodTracker