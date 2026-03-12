from pydantic import BaseModel, field_validator
from typing import Optional, List

_VALID_DAYS = {"monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"}


class ScheduleSet(BaseModel):
    """Payload for creating or updating a doctor's schedule."""
    doctor_id: str
    working_days: List[str]
    start_time: str        # "HH:MM" 24-hr
    end_time: str          # "HH:MM" 24-hr
    slot_duration: int     # minutes, e.g. 30
    break_start: Optional[str] = None   # "HH:MM" or None
    break_end: Optional[str] = None     # "HH:MM" or None

    @field_validator("working_days")
    @classmethod
    def validate_days(cls, days: List[str]) -> List[str]:
        normalised = [d.strip().lower() for d in days]
        invalid = [d for d in normalised if d not in _VALID_DAYS]
        if invalid:
            raise ValueError(f"Invalid day(s): {invalid}. Must be full English day names.")
        return normalised

    @field_validator("slot_duration")
    @classmethod
    def validate_duration(cls, v: int) -> int:
        if v <= 0 or v > 480:
            raise ValueError("slot_duration must be between 1 and 480 minutes.")
        return v


class ScheduleResponse(BaseModel):
    """Public representation of a stored schedule."""
    id: str
    doctor_id: str
    working_days: List[str]
    start_time: str
    end_time: str
    slot_duration: int
    break_start: Optional[str] = None
    break_end: Optional[str] = None
