from pydantic import BaseModel
from typing import Optional, List


class DoctorCreate(BaseModel):
    name: str
    email: str
    phone: str
    password: str
    specialization: str
    experience: int
    consultation_fee: Optional[float] = None
    available_days: List[str]
    operating_hours: str
    start_time: str = "09:00"
    end_time: str = "17:00"
    slot_duration: int = 30
    break_start: Optional[str] = "13:00"
    break_end: Optional[str] = "14:00"
    profilePic: Optional[str] = None


class DoctorResponse(BaseModel):
    """Typed response schema for public doctor data."""
    id: str
    name: str
    email: str
    phone: Optional[str] = None
    specialization: str
    experience: int
    consultation_fee: Optional[float] = None
    available_days: Optional[List[str]] = None
    operating_hours: Optional[str] = None
    start_time: Optional[str] = None
    end_time: Optional[str] = None
    slot_duration: Optional[int] = None
    break_start: Optional[str] = None
    break_end: Optional[str] = None
    profilePic: Optional[str] = None
