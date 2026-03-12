from typing import Optional, Dict, Any, List
from bson import ObjectId
from app.database import database

# Projection: only expose safe, public fields from doctors collection
_PUBLIC_PROJECTION = {
    "password": 0  # exclude sensitive field; all others are included
}


# --- MongoDB Model ---

class DoctorModel:

    @staticmethod
    def get_all() -> List[Dict[str, Any]]:
        doctors = []
        for doctor in database.doctors.find({}, _PUBLIC_PROJECTION):
            doctor["_id"] = str(doctor["_id"])
            # Normalise 'fee' -> 'consultation_fee' for legacy seed data
            if "fee" in doctor and "consultation_fee" not in doctor:
                doctor["consultation_fee"] = doctor.pop("fee")
            doctors.append(doctor)
        return doctors

    @staticmethod
    def get_by_id(doctor_id: str) -> Optional[Dict[str, Any]]:
        try:
            doctor = database.doctors.find_one(
                {"_id": ObjectId(doctor_id)}, _PUBLIC_PROJECTION
            )
            if doctor:
                doctor["_id"] = str(doctor["_id"])
                if "fee" in doctor and "consultation_fee" not in doctor:
                    doctor["consultation_fee"] = doctor.pop("fee")
            return doctor
        except Exception:
            return None

    @staticmethod
    def get_by_user_id(user_id: str) -> Optional[Dict[str, Any]]:
        """Find doctor record by their associated user account ID."""
        try:
            doctor = database.doctors.find_one(
                {"user_id": user_id}, _PUBLIC_PROJECTION
            )
            if doctor:
                doctor["_id"] = str(doctor["_id"])
                if "fee" in doctor and "consultation_fee" not in doctor:
                    doctor["consultation_fee"] = doctor.pop("fee")
            return doctor
        except Exception:
            return None

    @staticmethod
    def create(doctor_data: Dict[str, Any]) -> str:
        result = database.doctors.insert_one(doctor_data)
        return str(result.inserted_id)

    @staticmethod
    def delete(doctor_id: str) -> bool:
        try:
            result = database.doctors.delete_one({"_id": ObjectId(doctor_id)})
            return result.deleted_count > 0
        except Exception:
            return False
