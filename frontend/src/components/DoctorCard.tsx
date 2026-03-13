import { FaStar, FaBriefcase } from "react-icons/fa"

type DoctorCardProps = {
    name: string
    specialization: string
    image: string
    experience: string
    rating: string
}

function DoctorCard({ name, specialization, image, experience, rating }: DoctorCardProps) {
    return (
        <div className="doctor-card">
            <div className="doctor-img-wrapper">
                <img src={image} alt={name} className="doctor-img" />
            </div>
            <div className="doctor-info">
                <h3 className="doctor-name">{name}</h3>
                <p className="doctor-specialization">{specialization}</p>
                <div className="doctor-meta">
                    <div className="meta-item">
                        <FaBriefcase className="meta-icon" />
                        <span>{experience}</span>
                    </div>
                    <div className="meta-item">
                        <FaStar className="meta-icon star" />
                        <span>{rating}</span>
                    </div>
                </div>
                <button className="btn btn-outline-full">
                    Book Appointment
                </button>
            </div>
        </div>
    )
}

export default DoctorCard

