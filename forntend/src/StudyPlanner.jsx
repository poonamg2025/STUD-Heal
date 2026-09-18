import { useState } from 'react'
import './StudyPlanner.css'

function StudyPlanner() {

  const [task, setTask] = useState({
    title: '',
    subject: '',
    date: '',
    time: ''
  })

  const [tasks, setTasks] = useState([])

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    })
  }

  const addTask = () => {

    if (
      task.title.trim() === '' ||
      task.subject.trim() === '' ||
      task.date === '' ||
      task.time === ''
    ) {
      alert('Please fill all fields.')
      return
    }

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        ...task
      }
    ])

    setTask({
      title: '',
      subject: '',
      date: '',
      time: ''
    })
  }

  const deleteTask = (id) => {
    setTasks(
      tasks.filter((item) => item.id !== id)
    )
  }

  return (
    <div className="planner-page">

      <div className="planner-container">

        <button
          className="back-dashboard"
          onClick={() => window.location.href = '/dashboard'}
        >
          ← Back to Dashboard
        </button>

        <h1>📅 Study Planner</h1>

        <p className="planner-intro">
          Organize your study tasks and plan your study time.
        </p>

        {/* Add Study Task */}

        <div className="planner-form-card">

          <h2>Add Study Task</h2>

          <label>Task Name</label>

          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Example: Practice Stack Problems"
          />

          <label>Subject</label>

          <input
            type="text"
            name="subject"
            value={task.subject}
            onChange={handleChange}
            placeholder="Example: Data Structures"
          />

          <label>Date</label>

          <input
            type="date"
            name="date"
            value={task.date}
            onChange={handleChange}
          />

          <label>Study Time</label>

          <input
            type="time"
            name="time"
            value={task.time}
            onChange={handleChange}
          />

          <button
            className="add-task-btn"
            onClick={addTask}
          >
            + Add Study Task
          </button>

        </div>

        {/* Study Task List */}

        <div className="planner-list">

          <h2>My Study Plan</h2>

          {tasks.length === 0 ? (

            <p className="no-tasks">
              No study tasks added yet.
            </p>

          ) : (

            tasks.map((item) => (

              <div
                className="study-task"
                key={item.id}
              >

                <div className="task-info">

                  <h3>{item.title}</h3>

                  <p>📚 {item.subject}</p>

                  <p>📅 {item.date}</p>

                  <p>⏰ {item.time}</p>

                </div>

                <button
                  className="delete-task"
                  onClick={() => deleteTask(item.id)}
                >
                  🗑️ Delete
                </button>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  )
}

export default StudyPlanner