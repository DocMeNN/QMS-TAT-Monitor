# backend/app/schemas/user.py

"""
User Schemas
------------
Shared user schemas.

Phase 25
User Identity Foundation
"""

from dataclasses import dataclass


@dataclass
class UserSummary:
    user_id: str

    username: str

    full_name: str

    role: str

    status: str


@dataclass
class UserMetrics:
    total_users: int

    active_users: int

    inactive_users: int

    locked_users: int

    suspended_users: int