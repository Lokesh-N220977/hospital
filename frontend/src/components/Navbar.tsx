import { Link } from "react-router-dom"
import { FaPlusSquare } from "react-icons/fa"

function Navbar() {
    return (
        <nav className="navbar">
            <div className="container nav-container">
                <Link to="/" className="logo">
                    <FaPlusSquare className="logo-icon" />
                    <span>MedicPulse</span>
                </Link>

                <div className="nav-links">
                    <Link to="/" className="nav-link active">Home</Link>
                    <a href="/#doctors" className="nav-link">Doctors</a>
                    <a href="/#about" className="nav-link">About</a>


                    <div className="nav-btns">
                        <Link to="/login" className="btn btn-outline-nav">Login</Link>
                        <Link to="/register" className="btn btn-primary-nav">Register</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar