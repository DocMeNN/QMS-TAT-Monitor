# backend/app/modules/auth/service.py

"""
Authentication Service
----------------------
Core authentication logic.

Phase 26
Authentication Engine

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Security-ready
- Session-ready
"""

from datetime import datetime
from datetime import timedelta
from uuid import uuid4

from backend.app.models.session import AuthenticationResult
from backend.app.models.session import UserSession
from backend.app.modules.auth.constants import (
    ACCESS_TOKEN_EXPIRY_MINUTES,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    SESSION_STATUS_ACTIVE,
)
from backend.app.modules.users.service import user_service


class AuthenticationService:
    """
    Manages authentication sessions.
    """

    def __init__(self) -> None:
        self._sessions: dict[str, UserSession] = {}

    def authenticate(
        self,
        username: str,
        password: str,
    ) -> AuthenticationResult:

        users = user_service.list_users()

        for user in users:

            if (
                user.username == username
                and user.hashed_password == password
            ):

                access_token = str(uuid4())

                session = UserSession(
                    session_id=str(uuid4()),
                    user_id=user.user_id,
                    username=user.username,
                    access_token=access_token,
                    status=SESSION_STATUS_ACTIVE,
                    created_at=datetime.utcnow(),
                    expires_at=(
                        datetime.utcnow()
                        + timedelta(
                            minutes=ACCESS_TOKEN_EXPIRY_MINUTES
                        )
                    ),
                )

                self._sessions[
                    session.session_id
                ] = session

                user.last_login = datetime.utcnow()

                return AuthenticationResult(
                    success=True,
                    user_id=user.user_id,
                    username=user.username,
                    access_token=access_token,
                    message=LOGIN_SUCCESS,
                )

        return AuthenticationResult(
            success=False,
            message=LOGIN_FAILED,
        )

    def get_session(
        self,
        session_id: str,
    ) -> UserSession | None:

        return self._sessions.get(session_id)

    def list_sessions(
        self,
    ) -> list[UserSession]:

        return list(self._sessions.values())

    def logout(
        self,
        session_id: str,
    ) -> bool:

        if session_id not in self._sessions:
            return False

        del self._sessions[session_id]

        return True


auth_service = AuthenticationService()