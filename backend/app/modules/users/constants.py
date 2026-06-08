# backend/app/modules/users/constants.py

"""
User Constants
--------------
Central user management configuration.

Phase 25
User Identity Foundation
"""

from backend.app.models.user import UserRole
from backend.app.models.user import UserStatus


USERS_MODULE_NAME = "users"


DEFAULT_USER_ROLE = UserRole.REQUESTOR

DEFAULT_USER_STATUS = UserStatus.ACTIVE


ACTIVE_USER_STATUSES = {
    UserStatus.ACTIVE,
}


INACTIVE_USER_STATUSES = {
    UserStatus.INACTIVE,
    UserStatus.LOCKED,
    UserStatus.SUSPENDED,
}


ROLE_HIERARCHY = {
    UserRole.REQUESTOR: 1,
    UserRole.PROCESSOR: 2,
    UserRole.REVIEWER: 3,
    UserRole.SUPERVISOR: 4,
    UserRole.ADMINISTRATOR: 5,
}