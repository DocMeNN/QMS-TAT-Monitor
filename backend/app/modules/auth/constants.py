# backend/app/modules/auth/constants.py

"""
Authentication Constants
------------------------
Central authentication configuration.

Phase 26
Authentication Engine
"""

from backend.app.models.session import SessionStatus


AUTH_MODULE_NAME = "auth"


ACCESS_TOKEN_EXPIRY_MINUTES = 60

REFRESH_TOKEN_EXPIRY_HOURS = 24


SESSION_STATUS_ACTIVE = SessionStatus.ACTIVE.value

SESSION_STATUS_EXPIRED = SessionStatus.EXPIRED.value

SESSION_STATUS_REVOKED = SessionStatus.REVOKED.value


MINIMUM_PASSWORD_LENGTH = 8


LOGIN_SUCCESS = "LOGIN_SUCCESS"

LOGIN_FAILED = "LOGIN_FAILED"

LOGOUT_SUCCESS = "LOGOUT_SUCCESS"

INVALID_CREDENTIALS = "INVALID_CREDENTIALS"

USER_NOT_FOUND = "USER_NOT_FOUND"

ACCOUNT_INACTIVE = "ACCOUNT_INACTIVE"