import { useState } from 'react'
import './WhatIfSimulator.css'

function WhatIfSimulator() {

  const [marks, setMarks] = useState('')
  const [totalMarks, setTotalMarks] = useState('')
  const [result, setResult] = useState('')

  const calculateResult = () => {

    if (marks === '' || totalMarks === '') {
      alert('Please enter both marks and total marks.')
      return
    }

    const percentage = (Number(marks) / Number(totalMarks)) * 100

    setResult(percentage.toFixed(2))
  }

  return (
    <div className="whatif-page">

      <div className="whatif-container">

        <button
          className="back-dashboard"
          onClick={() => window.location.href = '/dashboard'}
        >
          ← Back to Dashboard
        </button>

        <h1>🔄 What-If Simulator</h1>

        <p className="whatif-intro">
          Explore how different marks can affect your academic performance.
        </p>

        <div className="whatif-card">

          <h2>Try a Scenario</h2>

          <label>Marks Obtained</label>

          <input
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            placeholder="Example: 80"
            min="0"
          />

          <label>Total Marks</label>

          <input
            type="number"
            value={totalMarks}
            onChange={(e) => setTotalMarks(e.target.value)}
            placeholder="Example: 100"
            min="1"
          />

          <button
            className="calculate-btn"
            onClick={calculateResult}
          >
            Calculate
          </button>

          {result !== '' && (

            <div className="result-card">

              <h3>📊 Your Result</h3>

              <p>
                Percentage: <strong>{result}%</strong>
              </p>

              <p>
                This is a simulated result based on the marks you entered.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  )
}

export default WhatIfSimulator