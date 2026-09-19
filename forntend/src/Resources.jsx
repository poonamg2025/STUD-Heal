import './Resources.css'

function Resources() {

  return (
    <div className="resources-page">

      <div className="resources-container">

        {/* Back to Home */}

        <button
          className="back-home"
          onClick={() => window.location.href = '/'}
        >
          ← Back to Home
        </button>


        {/* Heading */}

        <h1>🧠 Wellbeing Resources</h1>

        <p className="resources-intro">
          Explore simple and useful resources to support your
          mental wellbeing and manage everyday challenges.
        </p>


        {/* Resources Grid */}

        <div className="resources-grid">


          {/* Stress Management */}

          <div className="resource-card">

            <div className="resource-icon">🌿</div>

            <h2>Stress Management</h2>

            <p>
              Learn simple ways to manage stress, relax your mind,
              and handle challenging situations.
            </p>

            <button
              onClick={() => alert(
                '🌿 Stress Management Tips:\n\n' +
                '• Take short breaks while studying.\n' +
                '• Practice deep breathing.\n' +
                '• Organize your tasks into smaller steps.\n' +
                '• Get enough sleep and rest.\n' +
                '• Talk to someone you trust when you feel overwhelmed.'
              )}
            >
              Explore
            </button>

          </div>


          {/* Breathing Exercises */}

          <div className="resource-card">

            <div className="resource-icon">🫁</div>

            <h2>Breathing Exercises</h2>

            <p>
              Practice simple breathing techniques that can help
              you relax and stay calm.
            </p>

            <button
              onClick={() => alert(
                '🫁 Breathing Exercise:\n\n' +
                '1. Sit comfortably and relax your shoulders.\n' +
                '2. Breathe in slowly through your nose for 4 seconds.\n' +
                '3. Hold your breath gently for 4 seconds.\n' +
                '4. Breathe out slowly for 4 seconds.\n' +
                '5. Repeat this for a few cycles.\n\n' +
                'Stop if you feel uncomfortable or dizzy.'
              )}
            >
              Explore
            </button>

          </div>


          {/* Sleep and Rest */}

          <div className="resource-card">

            <div className="resource-icon">😴</div>

            <h2>Sleep & Rest</h2>

            <p>
              Discover healthy habits that can support better
              sleep and proper rest.
            </p>

            <button
              onClick={() => alert(
                '😴 Sleep & Rest Tips:\n\n' +
                '• Try to maintain a regular sleep schedule.\n' +
                '• Avoid using your phone right before sleeping.\n' +
                '• Keep your sleeping environment comfortable and quiet.\n' +
                '• Avoid heavy meals close to bedtime.\n' +
                '• Give yourself enough time to rest and recover.'
              )}
            >
              Explore
            </button>

          </div>


          {/* Study and Exam Stress */}

          <div className="resource-card">

            <div className="resource-icon">📚</div>

            <h2>Study & Exam Stress</h2>

            <p>
              Find practical tips for managing academic pressure,
              exams, and study-related stress.
            </p>

            <button
              onClick={() => alert(
                '📚 Study & Exam Stress Tips:\n\n' +
                '• Create a realistic study schedule.\n' +
                '• Break large topics into smaller sections.\n' +
                '• Take short breaks between study sessions.\n' +
                '• Avoid comparing your progress with others.\n' +
                '• Get enough sleep before an exam.\n' +
                '• Take a few deep breaths if you feel overwhelmed.'
              )}
            >
              Explore
            </button>

          </div>


          {/* Self Care */}

          <div className="resource-card">

            <div className="resource-icon">💚</div>

            <h2>Self Care</h2>

            <p>
              Build small daily habits that support your emotional
              wellbeing and personal growth.
            </p>

            <button
              onClick={() => alert(
                '💚 Self Care Tips:\n\n' +
                '• Take regular breaks during busy days.\n' +
                '• Spend some time doing activities you enjoy.\n' +
                '• Stay hydrated and eat regular meals.\n' +
                '• Get enough sleep and physical activity.\n' +
                '• Make time to connect with people you trust.\n' +
                '• Be patient and kind to yourself.'
              )}
            >
              Explore
            </button>

          </div>


          {/* Getting Support */}

          <div className="resource-card">

            <div className="resource-icon">💬</div>

            <h2>Getting Support</h2>

            <p>
              Learn when it may be helpful to talk to a trusted
              person, counselor, or professional.
            </p>

            <button
              onClick={() => alert(
                '💬 Getting Support:\n\n' +
                '• Talk to a trusted friend or family member.\n' +
                '• Consider speaking with a college counselor.\n' +
                '• Reach out to a teacher or mentor when you need help.\n' +
                '• Do not hesitate to ask for professional support.\n' +
                '• If you feel unsafe or are in immediate danger, contact local emergency services or a trusted person nearby.'
              )}
            >
              Explore
            </button>

          </div>


        </div>

      </div>

    </div>
  )
}

export default Resources