import './App.css'
import Login from './Login'
import Register from './Register'
import MoodTracker from './MoodTracker'
import Journal from './Journal'
import Resources from './Resources'
import Dashboard from './Dashboard'
import EmailVerification from './EmailVerification'
import SubjectManagement from './SubjectManagement'
import AssessmentManagement from './AssessmentManagement'
import StudyPlanner from './StudyPlanner'
import WhatIfSimulator from './WhatIfSimulator'
import AIRecommendations from './AIRecommendations'
import PeerSupport from './PeerSupport'
import SupportHub from './SupportHub'
import ProfileSettings from './ProfileSettings'
import FacultyLogin from './FacultyLogin'

function App() {
  const path = window.location.pathname
  /* Login Page */
   if (path === '/faculty-login') {
    return <FacultyLogin />
  }
  if (window.location.pathname === '/login') {
    return <Login />
  }


  /* Register Page */

  if (window.location.pathname === '/register') {
    return <Register />
  }


  /* Mood Tracker Page */

  if (window.location.pathname === '/mood') {
    return <MoodTracker />
  }
  if (window.location.pathname === '/journal') {
    return <Journal />
  }
  if (window.location.pathname === '/resources') {
    return <Resources />
  }
  if (window.location.pathname === '/dashboard') {
    return <Dashboard />
  }
  if (window.location.pathname === '/subjects') {
    return <SubjectManagement />
  }
  /* Assessment Management */
  if (window.location.pathname === '/assessments') {
    return <AssessmentManagement />
  }
  /* Study Planner */
  if (window.location.pathname === '/planner') {
    return <StudyPlanner />
  }
  if (window.location.pathname === '/verify-email') {
    return <EmailVerification />
  }
  /* What-If Simulator */

  if (window.location.pathname === '/whatif') {
    return <WhatIfSimulator />
  }
  /* AI Recommendations */

  if (window.location.pathname === '/ai-recommendations') {
    return <AIRecommendations />
  }
  /* Peer Support */
  if (window.location.pathname === '/peer-support') {
    return <PeerSupport />
  }
  /* Support Hub */

  if (window.location.pathname === '/support-hub') {
    return <SupportHub />
  }
  /* Profile & Privacy Settings */

  if (window.location.pathname === '/profile') {
    return <ProfileSettings />
  }
  
  return (
    <div className="app">


      {/* Navigation Bar */}

      <nav className="navbar">

        <h2>STUD-Heal</h2>

        <div className="nav-links">

          <a href="/">Home</a>

          <a href="#">About</a>

          <a href="/resources">Resources</a>

          <button
            onClick={() => window.location.href = '/login'}
          >
            Login
          </button>

        </div>

      </nav>


      {/* Hero Section */}

      <section className="hero-section">

        <div className="hero-text">

          <h1>
            Your Mind Matters.
            <br />
            <span>Take Care of It.</span>
          </h1>

          <p>
            STUD-Heal is a student wellbeing platform designed
            to help you understand your emotions, manage stress,
            and build healthier daily habits.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => window.location.href = '/dashboard'}
            >
              Get Started
            </button>

            <button className="secondary-btn">
              Learn More
            </button>

          </div>

        </div>


        {/* Mood Card */}

        <div className="hero-card">

          <div className="heart">♡</div>

          <h2>How are you feeling today?</h2>

          <p>
            Take a moment to check in with yourself.
          </p>

          <div className="moods">

            <button>😊</button>
            <button>🙂</button>
            <button>😐</button>
            <button>😔</button>
            <button>😣</button>

          </div>

        </div>

      </section>


      {/* Features Section */}

      <section className="features">

        <h2>Everything You Need for Your Wellbeing</h2>

        <div className="feature-container">


          {/* Mood Tracker */}

          <div
            className="feature-card"
            onClick={() => window.location.href = '/mood'}
          >

            <div className="feature-icon">
              😊
            </div>

            <h3>Mood Tracker</h3>

            <p>
              Track your mood and understand your emotional patterns.
            </p>

          </div>


          {/* Private Journal */}

          <div
            className="feature-card"
            onClick={() => window.location.href = '/journal'}
          >

            <div className="feature-icon">
              📝
            </div>

            <h3>Private Journal</h3>

            <p>
              Write down your thoughts in a safe and private space.
            </p>

          </div>


          {/* Wellbeing Resources */}

          <div
            className="feature-card"
            onClick={() => window.location.href = '/resources'}
          >

            <div className="feature-icon">
              🧠
            </div>

            <h3>Wellbeing Resources</h3>

            <p>
              Discover useful resources for managing stress and wellbeing.
            </p>

          </div>


        </div>

      </section>

    </div>
  )
}

export default App