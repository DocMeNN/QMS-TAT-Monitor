# backend/app/models/user.py

"""
User Domain Models
------------------
Represents system identities for the
Laboratory QMS Platform.

Phase 25
User Identity Foundation

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Security-ready
- Workflow-ready
- Audit-ready
"""

from dataclasses import dataclass
from datetime import (datetime, UTC,)
from enum import Enum
from typing import Optional


class UserRole(str, Enum):
    ADMINISTRATOR = "ADMINISTRATOR"
    SUPERVISOR = "SUPERVISOR"
    REVIEWER = "REVIEWER"
    PROCESSOR = "PROCESSOR"
    REQUESTOR = "REQUESTOR"


class UserStatus(str, Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"
    LOCKED = "LOCKED"
    SUSPENDED = "SUSPENDED"


@dataclass
class UserAccount:
    """
    Represents a platform user identity.
    """

    user_id: str

    username: str

    email: str

    full_name: str

    role: str

    status: str

    created_at: datetime

    hashed_password: Optional[str] = None

    last_login: Optional[datetime] = None


@dataclass
class UserProfile:
    """
    Extended user profile information.
    """

    user_id: str

    department: Optional[str] = None

    job_title: Optional[str] = None

    phone_number: Optional[str] = None

    manager_id: Optional[str] = None