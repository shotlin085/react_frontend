import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateUser = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })
  
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/users'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create user')
      }

      setStatus({ type: 'success', message: 'User created successfully!' })
      setName('')
      setEmail('')
      
      // Redirect to home after 1.5 seconds
      setTimeout(() => {
        navigate('/')
      }, 1500)

    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container fade-in max-w-lg mx-auto">
      <div className="header-section text-center">
        <h2>Add New User</h2>
        <p>Enter details to create a new record</p>
      </div>

      <div className="glass-panel">
        <form onSubmit={handleSubmit} className="user-form">
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
              placeholder="e.g. John Doe"
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              placeholder="e.g. john@example.com"
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create User'}
          </button>
        </form>

        {status.message && (
          <div className={`status-message status-${status.type}`}>
            {status.message}
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateUser
