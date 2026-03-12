"""
Analytics service — provides aggregated statistics for the admin dashboard.
Business logic is separated here from the route handler.
"""
from typing import Dict, Any
from datetime import datetime
from app.database import database


class AnalyticsService:

    @staticmethod
    def get_dashboard_stats() -> Dict[str, Any]:
        """Fetch top-level statistics for the admin dashboard."""
        today_str = datetime.now().strftime("%Y-%m-%d")

        total_doctors = database.doctors.count_documents({})
        total_patients = database.users.count_documents({"role": "patient"})
        total_appointments = database.appointments.count_documents({})
        today_appointments = database.appointments.count_documents({
            "appointment_date": today_str,
            "status": {"$ne": "cancelled"}
        })
        pending_appointments = database.appointments.count_documents({"status": "pending"})
        confirmed_appointments = database.appointments.count_documents({"status": "confirmed"})
        cancelled_appointments = database.appointments.count_documents({"status": "cancelled"})

        return {
            "total_doctors": total_doctors,
            "total_patients": total_patients,
            "total_appointments": total_appointments,
            "today_appointments": today_appointments,
            "pending_appointments": pending_appointments,
            "confirmed_appointments": confirmed_appointments,
            "cancelled_appointments": cancelled_appointments,
        }

    @staticmethod
    def get_appointments_by_month() -> Dict[str, int]:
        """Return appointment counts grouped by month (YYYY-MM)."""
        pipeline = [
            {
                "$group": {
                    "_id": {"$substr": ["$appointment_date", 0, 7]},
                    "count": {"$sum": 1}
                }
            },
            {"$sort": {"_id": 1}}
        ]
        results = list(database.appointments.aggregate(pipeline))
        return {r["_id"]: r["count"] for r in results if r.get("_id")}

    @staticmethod
    def get_top_specializations(limit: int = 5) -> list:
        """Return the most-booked specializations."""
        pipeline = [
            {"$group": {"_id": "$department", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
            {"$limit": limit}
        ]
        results = list(database.appointments.aggregate(pipeline))
        return [{"specialization": r["_id"], "count": r["count"]} for r in results if r.get("_id")]
