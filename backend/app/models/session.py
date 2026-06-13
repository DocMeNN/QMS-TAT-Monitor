# backend/app/models/session.py

"""
Session Domain Models
---------------------
Represents authenticated user sessions.

Phase 26
Authentication Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Security-ready
- Audit-ready
"""

from dataclasses import dataclass
from datetime import (datetime, UTC,)
from enum import Enum
from typing import Optional


class SessionStatus(str, Enum):
    ACTIVE = "ACTIVE"
    EXPIRED = "EXPIRED"
    REVOKED = "REVOKED"


@dataclass
class UserSession:
    """
    Represents an authenticated session.
    """

    session_id: str

    user_id: str

    username: str

    access_token: str

    status: str

    created_at: datetime

    expires_at: datetime

    last_activity_at: Optional[datetime] = None


@dataclass
class AuthenticationResult:
    """
    Authentication outcome.
    """

    success: bool

    user_id: Optional[str] = None

    username: Optional[str] = None

    access_token: Optional[str] = None

    message: Optional[str] = None