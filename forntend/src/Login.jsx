import './Login.css'

function Login() {
  return (
    <div className="login-page">

      <div className="login-card">
        <button
            className="back-home-login"
            onClick={() => window.location.href = '/'}
        >
            ← Back to Home
        </button>

        <h1>Welcome Back</h1>

        <p>Login to your STUD-Heal account</p>

        <form>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p className="signup-text">
            Don't have an account?
            <span onClick={() => window.location.href = '/register'}>
                Register
            </span>
        </p>
      </div>

    </div>
  )
}

export default Login