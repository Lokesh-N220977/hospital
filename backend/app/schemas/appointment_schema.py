import re
from pydantic import BaseModel, field_validator
from typing import Optional

_DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")


class AppointmentCreate(BaseModel):
    """Legacy schema — kept for backward compatibility."""
    department: str
    doctor_id: str
    appointment_date: str
    appointment_time: str


class AppointmentBook(BaseModel):
    """Schema for the POST /appointments/book endpoint."""
    doctor_id: str
    date: str        # YYYY-MM-DD
    time: str        # e.g. "09:30 AM"
    reason: Optional[str] = None
    department: Optional[str] = None

    @field_validator("date")
    @classmethod
    def validate_date(cls, v: str) -> str:
        if not _DATE_RE.match(v):
            raise ValueError("date must be in YYYY-MM-DD format")
        return v


class AppointmentResponse(BaseModel):
    """Typed response for a single appointment."""
    id: str
    doctor_id: str
    user_id: str
    date: Optional[str] = None
    time: Optional[str] = None
    status: Optional[str] = None
    reason: Optional[str] = None
    department: Optional[str] = None
