import { Link } from "react-router-dom"

function Sidebar() {
    return (
        <aside className="sidebar">

            <Link to="/patient/dashboard">Dashboard</Link>
            <Link to="/patient/appointments">Appointments</Link>
            <Link to="/patient/profile">Profile</Link>

        </aside>
    )
}

export default Sidebar