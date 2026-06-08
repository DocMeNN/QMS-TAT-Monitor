# backend/app/modules/users/schemas.py

"""
User API Schemas
----------------
Request and response schemas for
user management operations.

Phase 25
User Identity Foundation

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- API-ready
"""

from dataclasses import dataclass
from typing import Optional


@dataclass
class CreateUserRequest:
    username: str

    email: str

    full_name: str

    role: str

    password: str

    department: Optional[str] = None

    job_title: Optional[str] = None


@dataclass
class UpdateUserRequest:
    full_name: Optional[str] = None

    email: Optional[str] = None

    role: Optional[str] = None

    status: Optional[str] = None

    department: Optional[str] = None

    job_title: Optional[str] = None


@dataclass
class UserResponse:
    user_id: str

    username: str

    email: str

    full_name: str

    role: str

    status: str


@dataclass
class UserProfileResponse:
    user_id: str

    department: Optional[str]

    job_title: Optional[str]

    phone_number: Optional[str]

    manager_id: Optional[str]