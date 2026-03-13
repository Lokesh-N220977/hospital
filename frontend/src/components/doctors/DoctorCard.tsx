import React from 'react';
import { FaBriefcase, FaStar, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

interface DoctorCardProps {
    name: string;
    specialization: string;
    image: string;
    experience?: string;
    rating?: string;
    location?: string;
    nextAvailable?: string;
    isFeatured?: boolean;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
    name,
    specialization,
    image,
    experience,
    rating,
    location,
    nextAvailable,
    isFeatured
}) => {
    return (
        <div className={`doctor-card ${isFeatured ? 'featured' : ''}`}>
            <div className="doctor-img-container">
                <img src={image} alt={name} className="doctor-img" />
                {isFeatured && (
                    <div className="featured-overlay">
                        <div className="meta-info">
                            <p><FaBriefcase /> {experience}</p>
                            <p><FaStar /> {rating} Rating</p>
                            <p><FaMapMarkerAlt /> {location}</p>
                            <p><FaClock /> Next Available: {nextAvailable}</p>
                        </div>
                        <button className="btn btn-primary-nav">Book Appointment</button>
                    </div>
                )}
            </div>
            <div className="doctor-content">
                <h3 className="doctor-name">{name}</h3>
                <p className="doctor-specialization">{specialization}</p>
            </div>
        </div>
    );
};

export default DoctorCard;
