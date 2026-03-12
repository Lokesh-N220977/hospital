import re
from pydantic import BaseModel, field_validator
from typing import Optional, List

_DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")


class DoctorLeave(BaseModel):
    doctor_id: str
    leave_date: str   # YYYY-MM-DD
    reason: str

    @field_validator("leave_date")
    @classmethod
    def validate_date(cls, v: str) -> str:
        if not _DATE_RE.match(v):
            raise ValueError("leave_date must be in YYYY-MM-DD format")
        return v


class LeaveResponse(BaseModel):
    id: str
    doctor_id: str
    leave_date: str
    reason: str
