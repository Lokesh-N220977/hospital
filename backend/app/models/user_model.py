from typing import Optional, Dict, Any, List
from bson import ObjectId
from app.database import database


# --- MongoDB Model ---

class UserModel:

    @staticmethod
    def get_by_email(email: str) -> Optional[Dict[str, Any]]:
        return database.users.find_one({"email": email})

    @staticmethod
    def get_by_id(user_id: str) -> Optional[Dict[str, Any]]:
        try:
            return database.users.find_one({"_id": ObjectId(user_id)})
        except Exception:
            return None

    @staticmethod
    def create(user_data: Dict[str, Any]) -> str:
        result = database.users.insert_one(user_data)
        return str(result.inserted_id)

    @staticmethod
    def update(user_id: str, update_data: Dict[str, Any]) -> bool:
        try:
            result = database.users.update_one(
                {"_id": ObjectId(user_id)},
                {"$set": update_data}
            )
            return result.matched_count > 0
        except Exception:
            return False

    @staticmethod
    def get_all() -> List[Dict[str, Any]]:
        users = []
        for user in database.users.find():
            user["_id"] = str(user["_id"])
            users.append(user)
        return users
