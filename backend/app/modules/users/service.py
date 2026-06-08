# backend/app/modules/users/service.py

"""
User Service
------------
Core user identity management logic.

Phase 25
User Identity Foundation

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Identity-ready
- Security-ready
- Audit-ready
"""

from datetime import datetime
from uuid import uuid4

from backend.app.models.user import UserAccount
from backend.app.models.user import UserProfile
from backend.app.modules.users.constants import (
    DEFAULT_USER_STATUS,
)


class UserService:
    """
    Manages platform user identities.
    """

    def __init__(self) -> None:
        self._users: dict[str, UserAccount] = {}
        self._profiles: dict[str, UserProfile] = {}

    def create_user(
        self,
        username: str,
        email: str,
        full_name: str,
        role: str,
        password: str,
        department: str | None = None,
        job_title: str | None = None,
    ) -> UserAccount:

        user_id = str(uuid4())

        user = UserAccount(
            user_id=user_id,
            username=username,
            email=email,
            full_name=full_name,
            role=role,
            status=DEFAULT_USER_STATUS.value,
            created_at=datetime.utcnow(),
            hashed_password=password,
        )

        profile = UserProfile(
            user_id=user_id,
            department=department,
            job_title=job_title,
        )

        self._users[user_id] = user
        self._profiles[user_id] = profile

        return user

    def get_user(
        self,
        user_id: str,
    ) -> UserAccount | None:

        return self._users.get(user_id)

    def list_users(
        self,
    ) -> list[UserAccount]:

        return list(self._users.values())

    def get_profile(
        self,
        user_id: str,
    ) -> UserProfile | None:

        return self._profiles.get(user_id)

    def update_user(
        self,
        user_id: str,
        full_name: str | None = None,
        email: str | None = None,
        role: str | None = None,
        status: str | None = None,
    ) -> UserAccount | None:

        user = self.get_user(user_id)

        if user is None:
            return None

        if full_name is not None:
            user.full_name = full_name

        if email is not None:
            user.email = email

        if role is not None:
            user.role = role

        if status is not None:
            user.status = status

        return user


user_service = UserService()