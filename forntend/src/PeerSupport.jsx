import { useEffect, useState } from 'react'
import './PeerSupport.css'

function PeerSupport() {

  const supportOptions = [
    {
      icon: '💬',
      title: 'Student Discussion',
      text: 'Share experiences and discuss common academic challenges with other students.'
    },
    {
      icon: '🤝',
      title: 'Peer Guidance',
      text: 'Explore opportunities to learn from students who have faced similar challenges.'
    },
    {
      icon: '🌱',
      title: 'Support Community',
      text: 'Take part in a supportive student community focused on learning and wellbeing.'
    }
  ]

  const guidanceOptions = [
    {
      icon: '📚',
      title: 'Academic Difficulty',
      description: 'Find guidance from students who have faced difficulties with subjects or coursework.',
      tips: [
        'Break difficult topics into smaller sections.',
        'Discuss difficult concepts with classmates.',
        'Practice regularly instead of studying everything at the last minute.',
        'Ask faculty for clarification when needed.'
      ]
    },
    {
      icon: '⏰',
      title: 'Time Management',
      description: 'Learn how other students manage classes, assignments and personal time.',
      tips: [
        'Create a simple daily study schedule.',
        'Prioritize important assignments and exams.',
        'Avoid leaving assignments until the last day.',
        'Take short breaks during long study sessions.'
      ]
    },
    {
      icon: '😰',
      title: 'Exam Stress',
      description: 'Explore strategies students use to manage pressure before examinations.',
      tips: [
        'Start preparing early.',
        'Use short and regular study sessions.',
        'Practice previous questions and mock tests.',
        'Get enough sleep before the examination.'
      ]
    },
    {
      icon: '💻',
      title: 'Programming Challenges',
      description: 'Learn how other students approach coding and programming problems.',
      tips: [
        'Understand the problem before writing code.',
        'Practice basic concepts regularly.',
        'Debug your code step by step.',
        'Work on small programming problems every day.'
      ]
    },
    {
      icon: '🎤',
      title: 'Presentation & Communication',
      description: 'Get ideas from students who have improved their presentation confidence.',
      tips: [
        'Practice your presentation before presenting.',
        'Start by speaking in front of a small group.',
        'Keep your points simple and organized.',
        'Do not worry about making small mistakes.'
      ]
    },
    {
      icon: '🎯',
      title: 'Career & Internship',
      description: 'Explore how other students prepare for internships and future careers.',
      tips: [
        'Build projects related to your interests.',
        'Practice programming and technical fundamentals.',
        'Create and maintain a professional resume.',
        'Look for internships and opportunities early.'
      ]
    }
  ]

  /* Support Community content */

  const communityMessage = {
    icon: '🌱',
    title: 'Student Support Community',
    text: 'A safe space where students can encourage each other, share helpful study ideas and support one another.'
  }

  const [selectedOption, setSelectedOption] = useState(null)

  const [selectedGuidance, setSelectedGuidance] = useState(null)

  const [posts, setPosts] = useState([])

  const [topic, setTopic] = useState('')
  const [postText, setPostText] = useState('')

  const [replyText, setReplyText] = useState('')
  const [replyPostId, setReplyPostId] = useState(null)


  // Load discussion posts

  useEffect(() => {

    const savedPosts =
      JSON.parse(localStorage.getItem('studentDiscussionPosts')) || []

    setPosts(savedPosts)

  }, [])


  // Create a new discussion

  const createPost = () => {

    if (topic.trim() === '' || postText.trim() === '') {
      alert('Please enter a topic and discussion message.')
      return
    }

    const newPost = {

      id: Date.now(),

      student: 'You',

      topic: topic,

      text: postText,

      likes: 0,

      liked: false,

      replies: [],

      time: new Date().toLocaleString([], {
        dateStyle: 'short',
        timeStyle: 'short'
      })

    }

    const updatedPosts = [
      newPost,
      ...posts
    ]

    setPosts(updatedPosts)

    localStorage.setItem(
      'studentDiscussionPosts',
      JSON.stringify(updatedPosts)
    )

    setTopic('')
    setPostText('')

    alert('Your discussion has been posted!')

  }


  // Like a discussion

  const likePost = (postId) => {

    const updatedPosts = posts.map(post => {

      if (post.id === postId) {

        return {
          ...post,
          likes: post.liked
            ? post.likes - 1
            : post.likes + 1,
          liked: !post.liked
        }

      }

      return post

    })

    setPosts(updatedPosts)

    localStorage.setItem(
      'studentDiscussionPosts',
      JSON.stringify(updatedPosts)
    )

  }


  // Add reply

  const addReply = (postId) => {

    if (replyText.trim() === '') {
      return
    }

    const newReply = {

      id: Date.now(),

      student: 'You',

      text: replyText,

      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })

    }

    const updatedPosts = posts.map(post => {

      if (post.id === postId) {

        return {
          ...post,
          replies: [
            ...post.replies,
            newReply
          ]
        }

      }

      return post

    })

    setPosts(updatedPosts)

    localStorage.setItem(
      'studentDiscussionPosts',
      JSON.stringify(updatedPosts)
    )

    setReplyText('')
    setReplyPostId(null)

  }


  // ================================
  // Student Discussion Screen
  // ================================

  if (selectedOption === 'discussion') {

    return (

      <div className="peer-page">

        <div className="peer-container">

          <button
            className="back-dashboard"
            onClick={() => setSelectedOption(null)}
          >
            ← Back to Peer Support
          </button>

          <h1>💬 Student Discussion</h1>

          <p className="peer-intro">
            Share your thoughts, ask questions and discuss academic topics
            with other students.
          </p>


          <div className="discussion-create-card">

            <h2>📝 Start a Discussion</h2>

            <input
              type="text"
              placeholder="Discussion topic"
              value={topic}
              onChange={(event) =>
                setTopic(event.target.value)
              }
            />

            <textarea
              placeholder="What would you like to discuss?"
              value={postText}
              onChange={(event) =>
                setPostText(event.target.value)
              }
            />

            <button
              className="post-discussion-btn"
              onClick={createPost}
            >
              Post Discussion
            </button>

          </div>


          <div className="discussion-section">

            <h2>👥 Student Discussions</h2>

            {posts.length === 0 ? (

              <div className="no-discussions">

                <div>💬</div>

                <h3>No discussions yet</h3>

                <p>
                  Be the first student to start a discussion!
                </p>

              </div>

            ) : (

              posts.map(post => (

                <div
                  className="discussion-post"
                  key={post.id}
                >

                  <div className="discussion-post-header">

                    <div className="student-discussion-avatar">
                      👨‍🎓
                    </div>

                    <div>

                      <h3>
                        {post.student}
                      </h3>

                      <span>
                        {post.time}
                      </span>

                    </div>

                  </div>


                  <h2 className="discussion-topic">
                    {post.topic}
                  </h2>

                  <p className="discussion-text">
                    {post.text}
                  </p>


                  <div className="discussion-actions">

                    <button
                      onClick={() => likePost(post.id)}
                    >
                      {post.liked ? '❤️ Liked' : '🤍 Like'}
                      {' '}
                      {post.likes}
                    </button>

                    <button
                      onClick={() =>
                        setReplyPostId(
                          replyPostId === post.id
                            ? null
                            : post.id
                        )
                      }
                    >
                      💬 Reply {post.replies.length}
                    </button>

                  </div>


                  {post.replies.length > 0 && (

                    <div className="discussion-replies">

                      {post.replies.map(reply => (

                        <div
                          className="discussion-reply"
                          key={reply.id}
                        >

                          <div className="reply-avatar">
                            👤
                          </div>

                          <div>

                            <strong>
                              {reply.student}
                            </strong>

                            <p>
                              {reply.text}
                            </p>

                            <span>
                              {reply.time}
                            </span>

                          </div>

                        </div>

                      ))}

                    </div>

                  )}


                  {replyPostId === post.id && (

                    <div className="reply-box">

                      <input
                        type="text"
                        placeholder="Write a reply..."
                        value={replyText}
                        onChange={(event) =>
                          setReplyText(event.target.value)
                        }
                        onKeyDown={(event) => {

                          if (event.key === 'Enter') {
                            addReply(post.id)
                          }

                        }}
                      />

                      <button
                        onClick={() =>
                          addReply(post.id)
                        }
                      >
                        Send
                      </button>

                    </div>

                  )}

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    )

  }


  // ================================
  // Peer Guidance Screen
  // ================================

  if (selectedOption === 'guidance') {

    return (

      <div className="peer-page">

        <div className="peer-container">

          <button
            className="back-dashboard"
            onClick={() => setSelectedOption(null)}
          >
            ← Back to Peer Support
          </button>

          <h1>🤝 Peer Guidance</h1>

          <p className="peer-intro">
            Learn from students who have faced similar challenges and
            discover practical ways to handle them.
          </p>


          <div className="guidance-intro-card">

            <div className="guidance-main-icon">
              🤝
            </div>

            <div>

              <h2>Learn From Your Peers</h2>

              <p>
                Every student faces challenges. Explore experiences and
                practical suggestions that can help you handle common
                academic and student-life situations.
              </p>

            </div>

          </div>


          <div className="guidance-grid">

            {guidanceOptions.map((guidance, index) => (

              <div
                className="guidance-card"
                key={index}
              >

                <div className="guidance-icon">
                  {guidance.icon}
                </div>

                <h3>
                  {guidance.title}
                </h3>

                <p>
                  {guidance.description}
                </p>

                <button
                  className="guidance-explore-btn"
                  onClick={() =>
                    setSelectedGuidance(guidance)
                  }
                >
                  Explore Guidance
                </button>

              </div>

            ))}

          </div>


          {selectedGuidance && (

            <div className="guidance-details">

              <div className="guidance-details-card">

                <div className="guidance-details-icon">
                  {selectedGuidance.icon}
                </div>

                <h2>
                  {selectedGuidance.title}
                </h2>

                <p>
                  Here are some practical suggestions students commonly
                  find useful:
                </p>

                <ul>

                  {selectedGuidance.tips.map(
                    (tip, index) => (

                      <li key={index}>
                        {tip}
                      </li>

                    )
                  )}

                </ul>

                <button
                  className="close-guidance-btn"
                  onClick={() =>
                    setSelectedGuidance(null)
                  }
                >
                  Close
                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    )

  }


  // ================================
  // Support Community Screen
  // ================================

  if (selectedOption === 'community') {

    return (

      <div className="peer-page">

        <div className="peer-container">

          <button
            className="back-dashboard"
            onClick={() => setSelectedOption(null)}
          >
            ← Back to Peer Support
          </button>

          <h1>🌱 Support Community</h1>

          <p className="peer-intro">
            Connect with students and support each other through academic
            and wellbeing challenges.
          </p>


          <div className="community-simple-card">

            <div className="community-simple-icon">
              {communityMessage.icon}
            </div>

            <h2>
              {communityMessage.title}
            </h2>

            <p>
              {communityMessage.text}
            </p>

            <button
              className="community-simple-btn"
              onClick={() =>
                alert(
                  'You are now part of the student support community!'
                )
              }
            >
              Join Community
            </button>

          </div>

        </div>

      </div>

    )

  }


  // ================================
  // Main Peer Support Page
  // ================================

  return (

    <div className="peer-page">

      <div className="peer-container">

        <button
          className="back-dashboard"
          onClick={() => window.location.href = '/dashboard'}
        >
          ← Back to Dashboard
        </button>

        <h1>🤝 Peer Support</h1>

        <p className="peer-intro">
          Connect with fellow students and explore peer support opportunities.
        </p>


        <div className="peer-info-card">

          <div className="peer-icon">
            🤝
          </div>

          <div>

            <h2>You Are Not Alone</h2>

            <p>
              Connect, share and learn with other students in a supportive
              environment.
            </p>

          </div>

        </div>


        <div className="support-options">

          {supportOptions.map((item, index) => (

            <div
              className="support-card"
              key={index}
            >

              <div className="support-icon">
                {item.icon}
              </div>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.text}
              </p>

              <button
                onClick={() => {

                  if (item.title === 'Student Discussion') {

                    setSelectedOption('discussion')

                  } else if (item.title === 'Peer Guidance') {

                    setSelectedOption('guidance')

                  } else if (item.title === 'Support Community') {

                    setSelectedOption('community')

                  }

                }}
              >
                Explore
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>

  )

}

export default PeerSupport