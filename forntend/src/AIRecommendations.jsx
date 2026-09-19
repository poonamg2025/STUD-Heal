import './AIRecommendations.css'

function AIRecommendations() {

  const recommendations = [
    {
      icon: '📚',
      title: 'Study Recommendation',
      text: 'Consider spending some focused time on your upcoming assessments.'
    },
    {
      icon: '🧠',
      title: 'Wellbeing Recommendation',
      text: 'Take short breaks between study sessions and give yourself time to relax.'
    },
    {
      icon: '📅',
      title: 'Planning Recommendation',
      text: 'Use your study planner to organize important tasks and deadlines.'
    }
  ]

  return (
    <div className="ai-page">

      <div className="ai-container">

        <button
          className="back-dashboard"
          onClick={() => window.location.href = '/dashboard'}
        >
          ← Back to Dashboard
        </button>

        <h1>🤖 AI Recommendations</h1>

        <p className="ai-intro">
          Personalized suggestions to support your academic and wellbeing goals.
        </p>

        <div className="ai-info-card">

          <div className="ai-icon">
            🤖
          </div>

          <div>
            <h2>Your Recommendations</h2>

            <p>
              These recommendations can later be generated using your
              academic progress and wellbeing information.
            </p>
          </div>

        </div>

        <div className="recommendation-list">

          {recommendations.map((item, index) => (

            <div
              className="recommendation-card"
              key={index}
            >

              <div className="recommendation-icon">
                {item.icon}
              </div>

              <div>
                <h3>{item.title}</h3>

                <p>{item.text}</p>
              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default AIRecommendations