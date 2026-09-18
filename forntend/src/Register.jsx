function Register() {
  return (
    <div className="login-page">

      <div className="login-card">
        <button
            className="back-home-login"
            onClick={() => window.location.href = '/'}
        >
            ← Back to Home
        </button>

        <h1>Create Account</h1>

        <p>Join STUD-Heal today</p>

        <form>

          <label>Name</label>

          <input
            type="text"
            placeholder="Enter your name"
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Create a password"
          />

          <label>Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm your password"
          />

          <button
            type="button"
            onClick={() => window.location.href = '/verify-email'}
          >
            Register
          </button>

        </form>

        <p className="signup-text">
          Already have an account?

          <span onClick={() => window.location.href = '/login'}>
            Login
          </span>
        </p>

      </div>

    </div>
  )
}

export default Register