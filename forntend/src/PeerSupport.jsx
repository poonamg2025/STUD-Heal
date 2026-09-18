import './PeerSupport.css'

function PeerSupport() {

  const supportOptions = [
    {
      icon: '💬',
      title: 'Student Discussion',
      text: 'Share experiences and discuss common academic challenges with other students.'
    },
    {
      icon: '🤝',
      title: 'Peer Guidance',
      text: 'Explore opportunities to learn from students who have faced similar challenges.'
    },
    {
      icon: '🌱',
      title: 'Support Community',
      text: 'Take part in a supportive student community focused on learning and wellbeing.'
    }
  ]

  return (
    <div className="peer-page">

      <div className="peer-container">

        <button
          className="back-dashboard"
          onClick={() => window.location.href = '/dashboard'}
        >
          ← Back to Dashboard
        </button>

        <h1>🤝 Peer Support</h1>

        <p className="peer-intro">
          Connect with fellow students and explore peer support opportunities.
        </p>

        <div className="peer-info-card">

          <div className="peer-icon">
            🤝
          </div>

          <div>
            <h2>You Are Not Alone</h2>

            <p>
              Connect, share and learn with other students in a supportive
              environment.
            </p>
          </div>

        </div>

        <div className="support-options">

          {supportOptions.map((item, index) => (

            <div
              className="support-card"
              key={index}
            >

              <div className="support-icon">
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.text}</p>

              <button
                onClick={() => alert(`${item.title} feature will be connected soon.`)}
              >
                Explore
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default PeerSupport