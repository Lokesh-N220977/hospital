from pydantic import BaseModel
from typing import Optional


class VisitHistoryCreate(BaseModel):
    """Payload for POST /visit-history/add (sent by doctor after a visit)."""
    appointment_id: str
    doctor_id: str
    patient_id: str
    diagnosis: str
    prescription: Optional[str] = None
    notes: Optional[str] = None


class VisitHistoryResponse(BaseModel):
    """Typed response for a single visit record."""
    id: str
    appointment_id: str
    doctor_id: str
    patient_id: str
    diagnosis: str
    prescription: Optional[str] = None
    notes: Optional[str] = None
    doctor_name: Optional[str] = None
    visit_date: Optional[str] = None     # stored as YYYY-MM-DD
    created_at: Optional[str] = None
