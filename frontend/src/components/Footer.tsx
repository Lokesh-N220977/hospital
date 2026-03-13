import { FaPlusSquare, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa"
import { Link } from "react-router-dom"

function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <Link to="/" className="logo">
                        <FaPlusSquare className="logo-icon" />
                        <span>MedicPulse</span>
                    </Link>
                    <p className="footer-desc">
                        A modern, intuitive, and secure platform bridging the gap between patients and healthcare providers. Making quality healthcare accessible to everyone.
                    </p>
                    <div className="social-links">
                        <a href="#"><FaFacebook /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaLinkedin /></a>
                    </div>
                </div>

                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><a href="/#doctors">Doctors</a></li>
                        <li><a href="/#about">About</a></li>

                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h3>Contact Info</h3>
                    <ul>
                        <li><FaMapMarkerAlt /> <span>Medical District, Healthcare Center</span></li>
                        <li><FaPhone /> <span>+91 XXXXX XXXXX</span></li>
                        <li><FaEnvelope /> <span>support@medicpulse.com</span></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <p>© 2026 MedicPulse. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer