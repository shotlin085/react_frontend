import { Link, useLocation } from 'react-router-dom'
import { Users, UserPlus } from 'lucide-react'

const Navbar = () => {
  const location = useLocation()

  return (
    <nav className="navbar glass-panel">
      <div className="nav-brand">
        <h1>Opslink v1</h1>
      </div>
      <div className="nav-links">
        <Link
          to="/"
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          <Users size={20} />
          <span>Directory</span>
        </Link>
        <Link
          to="/create"
          className={`nav-link ${location.pathname === '/create' ? 'active' : ''}`}
        >
          <UserPlus size={20} />
          <span>Add User</span>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
