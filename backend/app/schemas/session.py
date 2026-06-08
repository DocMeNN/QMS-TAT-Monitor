# backend/app/schemas/session.py

"""
Session Schemas
---------------
Shared session schemas.

Phase 26
Authentication Engine
"""

from dataclasses import dataclass


@dataclass
class SessionSummary:
    session_id: str

    user_id: str

    username: str

    status: str


@dataclass
class SessionMetrics:
    total_sessions: int

    active_sessions: int

    expired_sessions: int

    revoked_sessions: int