from typing import Optional, Dict, Any, List, Tuple
from app.models import AppointmentModel
from app.models import DoctorModel
from app.models import UserModel
from app.utils import hash_password

class AdminService:
    
    @staticmethod
    def get_all_appointments() -> List[Dict[str, Any]]:
        return AppointmentModel.get_all()

    @staticmethod
    def delete_appointment(appointment_id: str) -> Tuple[bool, str]:
        success = AppointmentModel.delete(appointment_id)
        if success:
            return True, "Appointment deleted"
        return False, "Failed to delete appointment"

    @staticmethod
    def add_doctor(data: dict):
        required_fields = ["name", "email", "password", "specialization", "experience"]
        for field in required_fields:
            if not data.get(field):
                return None, f"Missing required field: {field}"

        existing_user = UserModel.get_by_email(data.get("email"))
        if existing_user:
            return None, "Email already registered"

        hashed_password = hash_password(data.get("password"))
        user_data = {
            "name": data.get("name"),
            "fullName": data.get("name"),
            "email": data.get("email"),
            "password": hashed_password,
            "role": "doctor",
            "isActive": True
        }
        
        user_id = UserModel.create(user_data)

        new_doctor = data.copy()
        new_doctor["password"] = hashed_password
        new_doctor["user_id"] = user_id
        
        # Add defaults expected by DoctorCreate schema
        if "start_time" not in new_doctor: new_doctor["start_time"] = "09:00"
        if "end_time" not in new_doctor: new_doctor["end_time"] = "17:00"
        if "slot_duration" not in new_doctor: new_doctor["slot_duration"] = 30
        
        doctor_id = DoctorModel.create(new_doctor)
        
        return doctor_id, None

    @staticmethod
    def delete_doctor(doctor_id: str) -> Tuple[bool, Optional[str]]:
        success = DoctorModel.delete(doctor_id)
        if success:
            return True, None
        return False, "Failed to delete doctor"

    @staticmethod
    def get_dashboard_stats() -> Dict[str, Any]:
        """Fetch statistics for the admin dashboard via AnalyticsService."""
        from app.services import AnalyticsService
        return AnalyticsService.get_dashboard_stats()
