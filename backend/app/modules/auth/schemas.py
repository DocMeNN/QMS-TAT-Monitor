# backend/app/modules/auth/schemas.py

"""
Authentication API Schemas
--------------------------
Request and response schemas
for authentication operations.

Phase 26
Authentication Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- API-ready
"""

from dataclasses import dataclass


@dataclass
class LoginRequest:
    username: str

    password: str


@dataclass
class LoginResponse:
    success: bool

    access_token: str | None

    user_id: str | None

    username: str | None

    message: str


@dataclass
class LogoutRequest:
    session_id: str