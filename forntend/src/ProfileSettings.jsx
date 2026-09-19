import { useState } from 'react'
import './ProfileSettings.css'

function ProfileSettings() {

  const [profile, setProfile] = useState({
    name: '',
    email: ''
  })

  const [notifications, setNotifications] = useState(true)
  const [privateProfile, setPrivateProfile] = useState(true)

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    })
  }

  const saveProfile = () => {
    alert('Profile settings saved successfully.')
  }

  return (
    <div className="profile-settings-page">

      <div className="profile-settings-container">

        <button
          className="back-dashboard"
          onClick={() => window.location.href = '/dashboard'}
        >
          ← Back to Dashboard
        </button>

        <h1>👤 Profile & Privacy</h1>

        <p className="profile-intro">
          Manage your profile information and privacy preferences.
        </p>

        {/* Profile Information */}

        <div className="profile-card">

          <h2>Profile Information</h2>

          <label>Name</label>

          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />

          <label>Email</label>

          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <button
            className="save-profile-btn"
            onClick={saveProfile}
          >
            Save Profile
          </button>

        </div>

        {/* Privacy Settings */}

        <div className="profile-card">

          <h2>🔒 Privacy Settings</h2>

          <div className="setting-row">

            <div>
              <h3>Private Profile</h3>
              <p>
                Keep your profile information private from other students.
              </p>
            </div>

            <input
              type="checkbox"
              checked={privateProfile}
              onChange={(e) => setPrivateProfile(e.target.checked)}
            />

          </div>

          <div className="setting-row">

            <div>
              <h3>Notifications</h3>
              <p>
                Receive reminders and important STUD-Heal notifications.
              </p>
            </div>

            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />

          </div>

        </div>

        {/* Account Actions */}

        <div className="profile-card">

          <h2>⚙️ Account Actions</h2>

          <button
            className="change-password-btn"
            onClick={() => alert('Password change will be connected to the backend soon.')}
          >
            Change Password
          </button>

          <button
            className="logout-btn"
            onClick={() => window.location.href = '/login'}
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  )
}

export default ProfileSettings