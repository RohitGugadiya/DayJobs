import { Link } from 'react-router-dom'
import '../App.css'

function NavBar() {
  return (
    <header className="topbar">
      <nav className="nav-inner">
        <div className="brand">DayJobs</div>
        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      </nav>
    </header>
  )
}

export default NavBar
