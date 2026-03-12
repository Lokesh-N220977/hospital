import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGO_URL: str
    JWT_SECRET: str = "your-secret-key"  # Default fallback, should be in .env
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    class Config:
        env_file = ".env"

settings = Settings()
