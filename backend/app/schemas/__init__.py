"""
Schemas package.
All Pydantic request/response models are here.
"""
from app.schemas.user_schema import UserCreate, UserUpdate, UserLogin, UserProfileUpdate, UserResponse
from app.schemas.doctor_schema import DoctorCreate, DoctorResponse
from app.schemas.appointment_schema import AppointmentCreate, AppointmentBook, AppointmentResponse
from app.schemas.leave_schema import DoctorLeave, LeaveResponse
from app.schemas.schedule_schema import ScheduleSet, ScheduleResponse
from app.schemas.visit_history_schema import VisitHistoryCreate, VisitHistoryResponse
