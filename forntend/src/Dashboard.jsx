import './Dashboard.css'

function Dashboard() {

  return (
    <div className="dashboard-page">

      {/* Header */}

      <div className="dashboard-header">

        <div>
          <h1>Welcome to STUD-Heal 💚</h1>
          <p>Your student wellbeing and academic support space.</p>
        </div>

        <button
          className="profile-button"
          onClick={() => window.location.href = '/profile'}
        >
          👤 Profile
        </button>

      </div>

      {/* Welcome Card */}

      <div className="welcome-card">

        <div>
          <h2>How are you doing today?</h2>

          <p>
            Take a moment to check your wellbeing and plan your day.
          </p>

          <button
            onClick={() => window.location.href = '/mood'}
          >
            🧠 Check My Wellbeing
          </button>
        </div>

        <div className="welcome-icon">
          🌱
        </div>

      </div>

      {/* Dashboard Features */}

      <h2 className="section-title">
        Your Student Tools
      </h2>

      <div className="dashboard-grid">

        {/* Subjects */}

        <div className="dashboard-card">

          <div className="dashboard-icon">
            📚
          </div>

          <h3>Subjects</h3>

          <p>
            Manage your subjects and keep track of your academic work.
          </p>

          <button
            onClick={() => window.location.href = '/subjects'}
          >
            Manage Subjects
          </button>

        </div>

        {/* Assessments */}

        <div className="dashboard-card">

          <div className="dashboard-icon">
            📝
          </div>

          <h3>Assessments</h3>

          <p>
            Add and keep track of tests, assignments and examinations.
          </p>

          <button
            onClick={() => window.location.href = '/assessments'}
          >
            View Assessments
          </button>

        </div>

        {/* Study Planner */}

        <div className="dashboard-card">

          <div className="dashboard-icon">
            📅
          </div>

          <h3>Study Planner</h3>

          <p>
            Organize your study tasks and create a simple study plan.
          </p>

          <button
            onClick={() => window.location.href = '/planner'}
          >
            Open Planner
          </button>

        </div>

        {/* What-If Simulator */}

        <div className="dashboard-card">

          <div className="dashboard-icon">
            🔄
          </div>

          <h3>What-If Simulator</h3>

          <p>
            Explore different academic scenarios and understand their
            possible outcomes.
          </p>

          <button
            onClick={() => window.location.href = '/whatif'}
          >
            Try Simulator
          </button>

        </div>

        {/* AI Recommendations */}

        <div className="dashboard-card">

          <div className="dashboard-icon">
            🤖
          </div>

          <h3>AI Recommendations</h3>

          <p>
            Get personalized suggestions based on your academic and
            wellbeing information.
          </p>

          <button
            onClick={() => window.location.href = '/ai-recommendations'}
          >
            View Recommendations
          </button>

        </div>

        {/* Peer Support */}

        <div className="dashboard-card">

          <div className="dashboard-icon">
            🤝
          </div>

          <h3>Peer Support</h3>

          <p>
            Connect with other students and explore peer support options.
          </p>

          <button
            onClick={() => window.location.href = '/peer-support'}
          >
            Explore Support
          </button>

        </div>

        {/* Support Hub */}

        <div className="dashboard-card">

          <div className="dashboard-icon">
            🏫
          </div>

          <h3>Support Hub</h3>

          <p>
            Find academic, wellbeing, peer and campus support resources
            in one place.
          </p>

          <button
            onClick={() => window.location.href = '/support-hub'}
          >
            Explore Support Hub
          </button>

        </div>

      </div>

      {/* Quick Access */}

      <div className="quick-section">

        <h2>Quick Access</h2>

        <div className="quick-buttons">

          <button
            onClick={() => window.location.href = '/mood'}
          >
            🧠 Mood Tracker
          </button>

          <button
            onClick={() => window.location.href = '/journal'}
          >
            📝 Private Journal
          </button>

          <button
            onClick={() => window.location.href = '/resources'}
          >
            🌿 Wellbeing Resources
          </button>

        </div>

      </div>

    </div>
  )
}

export default Dashboard