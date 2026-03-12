from typing import Optional, Dict, Any, List
from bson import ObjectId
from app.database import database


# --- MongoDB Model ---

class ScheduleModel:

    @staticmethod
    def upsert(doctor_id: str, schedule_data: Dict[str, Any]) -> str:
        """
        Insert or replace the schedule for a doctor.
        Only one schedule document per doctor is kept.
        Returns the document _id as a string.
        """
        result = database.schedules.find_one_and_replace(
            {"doctor_id": doctor_id},
            schedule_data,
            upsert=True,
            return_document=True,
        )
        return str(result["_id"])

    @staticmethod
    def get_by_doctor(doctor_id: str) -> Optional[Dict[str, Any]]:
        doc = database.schedules.find_one({"doctor_id": doctor_id})
        if doc:
            doc["_id"] = str(doc["_id"])
        return doc

    @staticmethod
    def delete_by_doctor(doctor_id: str) -> bool:
        result = database.schedules.delete_one({"doctor_id": doctor_id})
        return result.deleted_count > 0
