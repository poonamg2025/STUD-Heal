import './EmailVerification.css'

function EmailVerification() {

  return (
    <div className="verification-page">

      <div className="verification-card">

        <div className="verification-icon">
          📧
        </div>

        <h1>Verify Your Email</h1>

        <p>
          We have sent a verification code to your email address.
        </p>

        <label>Verification Code</label>

        <input
          type="text"
          placeholder="Enter verification code"
          maxLength="6"
        />

        <button
          onClick={() => alert('Email verification will be connected to the backend soon.')}
        >
          Verify Email
        </button>

        <p className="resend-text">
          Didn't receive the code?
          <span
            onClick={() => alert('A new verification code will be sent soon.')}
          >
            Resend Code
          </span>
        </p>

        <button
          className="back-login"
          onClick={() => window.location.href = '/login'}
        >
          ← Back to Login
        </button>

      </div>

    </div>
  )
}

export default EmailVerification