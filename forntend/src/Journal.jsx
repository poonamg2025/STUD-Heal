import { useState } from 'react'
import './Journal.css'

function Journal() {

  const [mood, setMood] = useState('')
  const [thoughts, setThoughts] = useState('')
  const [entries, setEntries] = useState([])

  const moods = ['😊', '🙂', '😐', '😔', '😣']

  const saveEntry = () => {

    if (thoughts.trim() === '') {
      alert('Please write something before saving.')
      return
    }

    const now = new Date()

    const newEntry = {
      id: Date.now(),
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
      mood: mood || '😐',
      thoughts: thoughts
    }

    setEntries([newEntry, ...entries])

    setThoughts('')
    setMood('')

    alert('Journal entry saved successfully! 📝')
  }


  const deleteEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id))
  }


  // Clear all journal entries

  const clearAllEntries = () => {

    if (entries.length === 0) {
      alert('There are no entries to delete.')
      return
    }

    const confirmDelete = window.confirm(
      'Are you sure you want to delete all journal entries?'
    )

    if (confirmDelete) {
      setEntries([])
    }
  }


  return (
    <div className="journal-page">

      <div className="journal-card">

        {/* Back to Home Button */}

        <button
          className="back-home"
          onClick={() => window.location.href = '/'}
        >
          ← Back to Home
        </button>


        <h1>📝 Private Journal</h1>

        <p>
          Write freely. This space is yours.
        </p>


        <h3>How are you feeling today?</h3>

        <div className="journal-moods">

          {moods.map((item) => (
            <button
              key={item}
              className={mood === item ? 'selected-mood' : ''}
              onClick={() => setMood(item)}
            >
              {item}
            </button>
          ))}

        </div>


        <textarea
          value={thoughts}
          onChange={(e) => setThoughts(e.target.value)}
          placeholder="Write your thoughts here..."
        />


        <button
          className="save-entry"
          onClick={saveEntry}
        >
          Save Entry
        </button>


        {/* Previous Entries */}

        <div className="previous-entries">

          <div className="previous-header">

            <h2>📚 Previous Entries</h2>

            {entries.length > 0 && (
              <button
                className="clear-all"
                onClick={clearAllEntries}
              >
                🗑️ Clear All
              </button>
            )}

          </div>


          {entries.length === 0 ? (

            <p className="no-entries">
              No journal entries yet. Your saved entries will appear here.
            </p>

          ) : (

            entries.map((entry) => (

              <div
                className="journal-entry"
                key={entry.id}
              >

                <div className="entry-header">

                  <div className="entry-date">
                    📅 {entry.date} &nbsp; 🕐 {entry.time}
                  </div>

                  <div className="entry-mood">
                    Mood: {entry.mood}
                  </div>

                </div>


                <p>
                  {entry.thoughts}
                </p>


                <button
                  className="delete-entry"
                  onClick={() => deleteEntry(entry.id)}
                >
                  🗑️ Delete
                </button>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  )
}

export default Journal