import { useState } from 'react'
import './AssessmentManagement.css'

function AssessmentManagement() {

  const [assessment, setAssessment] = useState({
    name: '',
    subject: '',
    type: '',
    date: ''
  })

  const [assessments, setAssessments] = useState([])

  const handleChange = (e) => {
    setAssessment({
      ...assessment,
      [e.target.name]: e.target.value
    })
  }

  const addAssessment = () => {

    if (
      assessment.name.trim() === '' ||
      assessment.subject.trim() === '' ||
      assessment.type === '' ||
      assessment.date === ''
    ) {
      alert('Please fill all fields.')
      return
    }

    setAssessments([
      ...assessments,
      {
        id: Date.now(),
        ...assessment
      }
    ])

    setAssessment({
      name: '',
      subject: '',
      type: '',
      date: ''
    })
  }

  const deleteAssessment = (id) => {
    setAssessments(
      assessments.filter((item) => item.id !== id)
    )
  }

  return (
    <div className="assessment-page">

      <div className="assessment-container">

        <button
          className="back-dashboard"
          onClick={() => window.location.href = '/dashboard'}
        >
          ← Back to Dashboard
        </button>

        <h1>📝 Assessment Management</h1>

        <p className="assessment-intro">
          Add and manage your tests, assignments and examinations.
        </p>

        {/* Add Assessment */}

        <div className="assessment-form-card">

          <h2>Add Assessment</h2>

          <label>Assessment Name</label>

          <input
            type="text"
            name="name"
            value={assessment.name}
            onChange={handleChange}
            placeholder="Example: Data Structures Test"
          />

          <label>Subject</label>

          <input
            type="text"
            name="subject"
            value={assessment.subject}
            onChange={handleChange}
            placeholder="Example: Data Structures"
          />

          <label>Assessment Type</label>

          <select
            name="type"
            value={assessment.type}
            onChange={handleChange}
          >
            <option value="">Select type</option>
            <option value="Test">Test</option>
            <option value="Assignment">Assignment</option>
            <option value="Exam">Exam</option>
            <option value="Project">Project</option>
          </select>

          <label>Due Date</label>

          <input
            type="date"
            name="date"
            value={assessment.date}
            onChange={handleChange}
          />

          <button
            className="add-assessment-btn"
            onClick={addAssessment}
          >
            + Add Assessment
          </button>

        </div>

        {/* Assessment List */}

        <div className="assessment-list">

          <h2>Your Assessments</h2>

          {assessments.length === 0 ? (

            <p className="no-assessments">
              No assessments added yet.
            </p>

          ) : (

            assessments.map((item) => (

              <div
                className="assessment-item"
                key={item.id}
              >

                <div className="assessment-info">

                  <h3>{item.name}</h3>

                  <p>📚 {item.subject}</p>

                  <p>📌 {item.type}</p>

                  <p>📅 {item.date}</p>

                </div>

                <button
                  className="delete-assessment"
                  onClick={() => deleteAssessment(item.id)}
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

export default AssessmentManagement