import { useState, useEffect } from 'react'

const Home = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/users'

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error('Failed to fetch users')
        const data = await res.json()
        setUsers(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <div className="loading-state">Loading users...</div>
  if (error) return <div className="status-error text-center mt-4">{error}</div>

  return (
    <div className="page-container fade-in">
      <div className="header-section">
        <h2>Recent Users</h2>
        <p>A list of all users in the directory</p>
      </div>
      
      <div className="glass-panel">
        {users.length === 0 ? (
          <div className="empty-state">No users found.</div>
        ) : (
          <div className="users-grid">
            {users.map((user, index) => (
              <div 
                key={user.id} 
                className="user-card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="user-info">
                  <div className="user-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="user-name">{user.name}</h3>
                    <p className="user-email">{user.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
