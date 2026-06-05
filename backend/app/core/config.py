# app/core/config.py

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "QMS TAT Monitor"
    VERSION: str = "1.0.0"


settings = Settings()