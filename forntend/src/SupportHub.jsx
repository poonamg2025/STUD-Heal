import { useState } from 'react'
import './SupportHub.css'

function SupportHub() {

  const [selectedService, setSelectedService] = useState(null)

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
      text: 'Find guidance on contacting faculty members for academic or course-related concerns.',
      details: [
        'Contact your faculty for course-related questions.',
        'Discuss academic difficulties.',
        'Ask for clarification about assignments.',
        'Seek guidance about your academic progress.'
      ]
    },
    {
      icon: '🤝',
      title: 'Peer Support',
      text: 'Connect with student communities and explore peer-based support opportunities.',
      details: [
        'Connect with fellow students.',
        'Share common academic experiences.',
        'Discuss study strategies.',
        'Explore peer-based support communities.'
      ]
    },
    {
      icon: '🏫',
      title: 'Campus Resources',
      text: 'Explore useful campus services and resources available to students.',
      details: [
        'Explore student services available on campus.',
        'Find academic support facilities.',
        'Explore wellbeing and counselling resources.',
        'Find useful student facilities.'
      ]
    },
    {
      icon: '🆘',
      title: 'Emergency Help',
      text: 'Access important emergency and immediate-support information when needed.',
      details: [
        'If you are in immediate danger, contact your local emergency service.',
        'Reach out to a trusted person nearby.',
        'Contact your institution’s emergency or security service.',
        'Seek professional help when necessary.'
      ]
    }
  ]

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
                onClick={() => setSelectedService(service)}
              >
                Explore
              </button>

            </div>

          ))}

        </div>

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
                {selectedService.details.map((detail, index) => (
                  <li key={index}>
                    {detail}
                  </li>
                ))}
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

      </div>

    </div>
  )
}

export default SupportHub