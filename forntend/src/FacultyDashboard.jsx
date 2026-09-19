import { useEffect, useState } from 'react'
import './FacultyDashboard.css'

function FacultyDashboard() {

  const [students, setStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [reply, setReply] = useState('')

  // Load student messages
  const loadMessages = () => {

    const storedMessages =
      JSON.parse(localStorage.getItem('studentFacultyMessages')) || []

    setStudents(storedMessages)

    // Keep selected student updated
    if (selectedStudent) {

      const updatedStudent = storedMessages.find(
        student => student.id === selectedStudent.id
      )

      if (updatedStudent) {
        setSelectedStudent(updatedStudent)
      }
    }
  }

  useEffect(() => {

    loadMessages()

    // Check for new student messages
    const interval = setInterval(() => {
      loadMessages()
    }, 1000)

    return () => clearInterval(interval)

  }, [selectedStudent])

  // Select a student and mark messages as read
  const openStudentChat = (student) => {

    const updatedStudents = students.map(item => {

      if (item.id === student.id) {

        return {
          ...item,
          unread: 0
        }

      }

      return item
    })

    localStorage.setItem(
      'studentFacultyMessages',
      JSON.stringify(updatedStudents)
    )

    setStudents(updatedStudents)

    setSelectedStudent(
      updatedStudents.find(
        item => item.id === student.id
      )
    )
  }

  // Send faculty reply
  const sendReply = () => {

    if (reply.trim() === '' || !selectedStudent) {
      return
    }

    const newMessage = {
      sender: 'faculty',
      text: reply,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const updatedStudents = students.map(student => {

      if (student.id === selectedStudent.id) {

        return {
          ...student,
          messages: [
            ...student.messages,
            newMessage
          ]
        }

      }

      return student
    })

    localStorage.setItem(
      'studentFacultyMessages',
      JSON.stringify(updatedStudents)
    )

    setStudents(updatedStudents)

    setSelectedStudent(
      updatedStudents.find(
        student => student.id === selectedStudent.id
      )
    )

    setReply('')
  }

  const handleKeyDown = (event) => {

    if (event.key === 'Enter') {
      sendReply()
    }

  }

  // Logout
  const logout = () => {

    localStorage.removeItem('facultyLoggedIn')

    window.location.href = '/faculty-login'
  }

  return (
    <div className="faculty-dashboard-page">

      {/* Header */}

      <div className="faculty-dashboard-header">

        <div>

          <h1>
            Faculty Dashboard 👨‍🏫
          </h1>

          <p>
            View student messages and provide academic support.
          </p>

        </div>

        <button
          className="faculty-logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>


      <div className="faculty-dashboard-content">

        {/* Student List */}

        <div className="student-message-list">

          <h2>
            📩 Student Messages
          </h2>

          {students.length === 0 ? (

            <div className="no-students">

              <div>
                📭
              </div>

              <p>
                No student messages yet.
              </p>

            </div>

          ) : (

            students.map(student => (

              <div
                key={student.id}
                className={
                  selectedStudent &&
                  selectedStudent.id === student.id
                    ? 'student-message-card selected'
                    : 'student-message-card'
                }
                onClick={() => openStudentChat(student)}
              >

                <div className="student-avatar">
                  👨‍🎓
                </div>

                <div className="student-info">

                  {/* Student Name + New Indicator */}

                  <div className="student-name-row">

                    <h3>
                      {student.name}
                    </h3>

                    {student.unread > 0 && (

                      <span className="new-message-badge">
                        🔴 New
                      </span>

                    )}

                  </div>

                  <p>
                    {student.subject}
                  </p>

                  <span>
                    {student.messages[
                      student.messages.length - 1
                    ]?.text}
                  </span>

                </div>

              </div>

            ))

          )}

        </div>


        {/* Chat */}

        <div className="faculty-chat-panel">

          {!selectedStudent ? (

            <div className="select-student-message">

              <div>
                💬
              </div>

              <h2>
                Select a Student
              </h2>

              <p>
                Select a student from the left to view their messages.
              </p>

            </div>

          ) : (

            <>

              {/* Chat Header */}

              <div className="faculty-chat-header">

                <div className="faculty-student-avatar">
                  👨‍🎓
                </div>

                <div>

                  <h2>
                    {selectedStudent.name}
                  </h2>

                  <p>
                    {selectedStudent.subject}
                  </p>

                </div>

              </div>


              {/* Messages */}

              <div className="faculty-chat-messages">

                {selectedStudent.messages.map(
                  (msg, index) => (

                    <div
                      key={index}
                      className={`faculty-message-row ${msg.sender}`}
                    >

                      <div className="faculty-message-bubble">

                        <p>
                          {msg.text}
                        </p>

                        <span>
                          {msg.time}
                        </span>

                      </div>

                    </div>

                  )
                )}

              </div>


              {/* Reply */}

              <div className="faculty-reply-area">

                <input
                  type="text"
                  placeholder="Type your reply..."
                  value={reply}
                  onChange={(event) =>
                    setReply(event.target.value)
                  }
                  onKeyDown={handleKeyDown}
                />

                <button onClick={sendReply}>
                  Send
                </button>

              </div>

            </>

          )}

        </div>

      </div>

    </div>
  )
}

export default FacultyDashboard