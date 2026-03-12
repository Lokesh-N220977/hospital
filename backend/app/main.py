from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import users_router, doctors_router, appointments_router, admin_router, visit_history_router

# Create the FastAPI app
app = FastAPI(
    title="MedicPulse Backend API",
    description="Clean, production-ready hospital management system backend.",
    version="2.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(users_router.router, prefix="/api/auth", tags=["auth"])
app.include_router(doctors_router.router, prefix="/api/doctors", tags=["doctors"])
app.include_router(appointments_router.router, prefix="/api/appointments", tags=["appointments"])
app.include_router(admin_router.router, prefix="/api/admin", tags=["admin"])
app.include_router(visit_history_router.router, prefix="/api/visit-history", tags=["visit-history"])

@app.get("/", tags=["health"])
def root():
    """Health check endpoint."""
    return {"message": "MedicPulse API is running smoothly", "status": "online"}
