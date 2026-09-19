import { useEffect, useState } from 'react'
import './SupportHub.css'

function SupportHub() {

  const [selectedService, setSelectedService] = useState(null)
  const [selectedFaculty, setSelectedFaculty] = useState(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const facultyList = [
    {
      name: 'Dr. Priya',
      department: 'Software Engineering',
      subject: 'Object Oriented Programming',
      available: true
    },
    {
      name: 'Dr. Arun',
      department: 'Computer Science',
      subject: 'Data Structures',
      available: true
    },
    {
      name: 'Dr. Meena',
      department: 'Information Technology',
      subject: 'Database Management',
      available: false
    },
    {
      name: 'Dr. Karthik',
      department: 'Computer Science',
      subject: 'Operating Systems',
      available: true
    }
  ]

  const supportServices = [
    {
      icon: '🎓',
      title: 'Academic Support',
      text: 'Find help with subjects, assignments, study planning and academic difficulties.',
      details: [
        'Get help with difficult subjects.',
        'Plan your study schedule.',
        'Get guidance for assignments and projects.',
        'Discuss academic difficulties with faculty or mentors.'
      ]
    },
    {
      icon: '🧠',
      title: 'Wellbeing Support',
      text: 'Explore resources and support options for managing stress and maintaining wellbeing.',
      details: [
        'Track your mood regularly.',
        'Take breaks during long study sessions.',
        'Use relaxation and wellbeing resources.',
        'Reach out for support when you need it.'
      ]
    },
    {
      icon: '👨‍🏫',
      title: 'Faculty Support',
      text: 'Choose a faculty member and chat with them about your academic concerns.',
      details: [
        'Choose a faculty member.',
        'Check faculty availability.',
        'Start an individual chat.',
        'Send messages to discuss academic concerns.'
      ]
    },
    {
        icon: '🏫',
        title: 'Campus Resources',
        text: 'Explore useful campus resources and services available to students.',
        details: [
            '📚 Academic: Library, Academic Advising',
            '🚌 Transport: Shuttle Service',
            '🏋️ Health & Wellbeing: Gym in your particular hostel block',
            '🎭 Student Life: Clubs, Student Activity Centre, Anna Auditorium',
            '🍽️ Daily Services: Cafeteria, ATM, Campus Store'
        ]
    },
    {
        icon: '🆘',
        title: 'Emergency Help',
        text: 'Access important emergency support when needed.',
        details: [
            '🚨 Campus Security — Contact campus security for immediate safety concerns.',
            '🏥 Medical Emergency — Contact the campus health/medical centre for urgent medical assistance.',
            '🚑 Ambulance Service — Request emergency medical transportation when required.',
            '🏠 Hostel Emergency Support — Contact the hostel warden or hostel security for urgent hostel-related problems.'
        ]
    },
  ]

  /*
    Load messages for selected faculty
  */
  const loadMessages = (facultyName) => {

    const allMessages =
      JSON.parse(localStorage.getItem('studentFacultyMessages')) || []

    const conversation = allMessages.find(
      item => item.faculty === facultyName
    )

    if (conversation) {

      setMessages(conversation.messages)

    } else {

      setMessages([
        {
          sender: 'faculty',
          text: `Hello! I am ${facultyName}. How can I help you?`,
          time: 'Now'
        }
      ])

    }
  }

  /*
    Open Faculty Support
  */
  const openFacultySupport = () => {
    setSelectedService(null)
    setSelectedFaculty(null)
  }

  /*
    Open Faculty Chat
  */
  const openFacultyChat = (faculty) => {

    setSelectedFaculty(faculty)

    loadMessages(faculty.name)
  }

  /*
    Send Student Message
  */
  const sendMessage = () => {

    if (message.trim() === '' || !selectedFaculty) {
      return
    }

    const newMessage = {
      sender: 'student',
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const allMessages =
      JSON.parse(localStorage.getItem('studentFacultyMessages')) || []

    const existingConversation = allMessages.find(
      item => item.faculty === selectedFaculty.name
    )

    let updatedMessages

    if (existingConversation) {

      updatedMessages = allMessages.map(item => {

        if (item.faculty === selectedFaculty.name) {

          return {
            ...item,

            messages: [
              ...item.messages,
              newMessage
            ],

            // 🔴 Mark new student message as unread
            unread: (item.unread || 0) + 1
          }

        }

        return item

      })

    } else {

      updatedMessages = [
        ...allMessages,

        {
          id: Date.now(),

          name: 'Student',

          subject: selectedFaculty.subject,

          faculty: selectedFaculty.name,

          // 🔴 First message is unread
          unread: 1,

          messages: [
            {
              sender: 'faculty',
              text: `Hello! I am ${selectedFaculty.name}. How can I help you?`,
              time: 'Now'
            },

            newMessage
          ]
        }

      ]

    }

    localStorage.setItem(
      'studentFacultyMessages',
      JSON.stringify(updatedMessages)
    )

    const updatedConversation = updatedMessages.find(
      item => item.faculty === selectedFaculty.name
    )

    setMessages(updatedConversation.messages)

    setMessage('')
  }

  /*
    Check for Faculty Replies
  */
  useEffect(() => {

    if (!selectedFaculty) {
      return
    }

    const interval = setInterval(() => {

      const allMessages =
        JSON.parse(localStorage.getItem('studentFacultyMessages')) || []

      const conversation = allMessages.find(
        item => item.faculty === selectedFaculty.name
      )

      if (conversation) {

        setMessages(conversation.messages)

      }

    }, 1000)

    return () => clearInterval(interval)

  }, [selectedFaculty])

  const handleKeyDown = (event) => {

    if (event.key === 'Enter') {
      sendMessage()
    }

  }

  return (
    <div className="support-hub-page">

      <div className="support-hub-container">

        <button
          className="back-dashboard"
          onClick={() => window.location.href = '/dashboard'}
        >
          ← Back to Dashboard
        </button>

        <h1>🏫 Support Hub</h1>

        <p className="support-hub-intro">
          Find the right support and resources for your academic and
          wellbeing needs.
        </p>


        {/* Support Services */}

        {!selectedFaculty && (

          <div className="support-hub-grid">

            {supportServices.map((service, index) => (

              <div
                className="support-hub-card"
                key={index}
              >

                <div className="support-hub-icon">
                  {service.icon}
                </div>

                <h2>{service.title}</h2>

                <p>{service.text}</p>

                <button
                  onClick={() => {

                    if (service.title === 'Faculty Support') {
                      openFacultySupport()
                    } else {
                      setSelectedService(service)
                    }

                  }}
                >
                  Explore
                </button>

              </div>

            ))}

          </div>

        )}


        {/* Faculty List */}

        {!selectedFaculty &&
          !selectedService && (

          <div className="faculty-section">

            <h2>👨‍🏫 Faculty Support</h2>

            <p className="faculty-intro">
              Choose a faculty member to start a private academic chat.
            </p>

            <div className="faculty-grid">

              {facultyList.map((faculty, index) => (

                <div
                  className="faculty-card"
                  key={index}
                >

                  <div className="faculty-avatar">
                    👨‍🏫
                  </div>

                  <div className="faculty-info">

                    <h3>{faculty.name}</h3>

                    <p className="faculty-department">
                      {faculty.department}
                    </p>

                    <p className="faculty-subject">
                      📚 {faculty.subject}
                    </p>

                    <p
                      className={
                        faculty.available
                          ? 'faculty-status available'
                          : 'faculty-status unavailable'
                      }
                    >
                      ● {faculty.available
                        ? 'Available'
                        : 'Offline'}
                    </p>

                  </div>

                  <button
                    className="chat-faculty-btn"
                    disabled={!faculty.available}
                    onClick={() => openFacultyChat(faculty)}
                  >
                    💬 Chat
                  </button>

                </div>

              ))}

            </div>

          </div>

        )}


        {/* Support Details */}

        {selectedService && (

          <div className="support-details">

            <div className="support-details-card">

              <div className="support-details-icon">
                {selectedService.icon}
              </div>

              <h2>{selectedService.title}</h2>

              <p>
                Here are some ways this support area can help you:
              </p>

              <ul>

                {selectedService.details.map(
                  (detail, index) => (

                    <li key={index}>
                      {detail}
                    </li>

                  )
                )}

              </ul>

              <button
                className="close-support-btn"
                onClick={() => setSelectedService(null)}
              >
                Close
              </button>

            </div>

          </div>

        )}


        {/* Faculty Chat */}

        {selectedFaculty && (

          <div className="faculty-chat-section">

            <button
              className="back-faculty-btn"
              onClick={() => setSelectedFaculty(null)}
            >
              ← Back to Faculty List
            </button>

            <div className="chat-container">

              <div className="chat-header">

                <div className="chat-faculty-avatar">
                  👨‍🏫
                </div>

                <div>

                  <h2>
                    {selectedFaculty.name}
                  </h2>

                  <p>
                    {selectedFaculty.department}
                  </p>

                  <span
                    className={
                      selectedFaculty.available
                        ? 'chat-status available'
                        : 'chat-status unavailable'
                    }
                  >
                    ● {selectedFaculty.available
                      ? 'Available'
                      : 'Offline'}
                  </span>

                </div>

              </div>


              {/* Messages */}

              <div className="chat-messages">

                {messages.map((msg, index) => (

                  <div
                    key={index}
                    className={`message-row ${msg.sender}`}
                  >

                    <div className="message-bubble">

                      <p>
                        {msg.text}
                      </p>

                      <span>
                        {msg.time}
                      </span>

                    </div>

                  </div>

                ))}

              </div>


              {/* Message Input */}

              <div className="chat-input-area">

                <input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                  onKeyDown={handleKeyDown}
                />

                <button onClick={sendMessage}>
                  Send
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  )
}

export default SupportHub