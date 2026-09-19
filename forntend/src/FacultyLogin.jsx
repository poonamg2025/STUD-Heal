import './FacultyLogin.css'

function FacultyLogin() {

  const handleLogin = (event) => {
    event.preventDefault()

    // Demo faculty login
    localStorage.setItem('facultyLoggedIn', 'true')

    window.location.href = '/faculty-dashboard'
  }

  return (
    <div className="faculty-login-page">

      <div className="faculty-login-card">

        <div className="faculty-login-icon">
          👨‍🏫
        </div>

        <h1>Faculty Login</h1>

        <p className="faculty-login-subtitle">
          Login to view and respond to student messages.
        </p>

        <form onSubmit={handleLogin}>

          <label>
            Faculty Email
          </label>

          <input
            type="email"
            placeholder="Enter faculty email"
            required
          />

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p className="demo-note">
          Demo mode: Any valid email and password can be used.
        </p>

      </div>

    </div>
  )
}

export default FacultyLogin