from pydantic import BaseModel, EmailStr
from typing import Optional


class PatientCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    phone: str
    gender: Optional[str] = None
    dob: Optional[str] = None
    blood_group: Optional[str] = None
    emergency_contact: Optional[str] = None
    address: Optional[str] = None


class PatientResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str] = None
    gender: Optional[str] = None
    dob: Optional[str] = None
    blood_group: Optional[str] = None
    emergency_contact: Optional[str] = None
    address: Optional[str] = None
    profilePic: Optional[str] = None
