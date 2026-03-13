import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGO_URL: str
    SECRET_KEY: str = "your-secret-key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    model_config = {
        "env_file": ".env",
        "extra": "ignore"
    }

settings = Settings()
