import { useState } from 'react'
import './SubjectManagement.css'

function SubjectManagement() {

  const [subject, setSubject] = useState('')
  const [subjects, setSubjects] = useState([])

  const addSubject = () => {

    if (subject.trim() === '') {
      alert('Please enter a subject name.')
      return
    }

    setSubjects([
      ...subjects,
      {
        id: Date.now(),
        name: subject
      }
    ])

    setSubject('')
  }

  const deleteSubject = (id) => {
    setSubjects(
      subjects.filter((item) => item.id !== id)
    )
  }

  return (
    <div className="subject-page">

      <div className="subject-container">

        {/* Back to Dashboard */}

        <button
          className="back-dashboard"
          onClick={() => window.location.href = '/dashboard'}
        >
          ← Back to Dashboard
        </button>

        <h1>📚 Subject Management</h1>

        <p className="subject-intro">
          Add and manage your academic subjects.
        </p>

        {/* Add Subject */}

        <div className="add-subject-card">

          <h2>Add a Subject</h2>

          <div className="subject-input-area">

            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject name"
            />

            <button onClick={addSubject}>
              + Add Subject
            </button>

          </div>

        </div>

        {/* Subject List */}

        <div className="subject-list">

          <h2>Your Subjects</h2>

          {subjects.length === 0 ? (

            <p className="no-subjects">
              No subjects added yet.
            </p>

          ) : (

            subjects.map((item) => (

              <div
                className="subject-item"
                key={item.id}
              >

                <div>
                  📖 {item.name}
                </div>

                <button
                  onClick={() => deleteSubject(item.id)}
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

export default SubjectManagement