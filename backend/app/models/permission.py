# backend/app/models/permission.py

"""
Permission Domain Models
------------------------
Represents authorization permissions
for the Laboratory QMS Platform.

Phase 27
Role Matrix (RBAC Foundation)

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Security-ready
- Governance-ready
- Audit-ready
"""

from dataclasses import dataclass
from enum import Enum


class PermissionCode(str, Enum):
    REQUEST_CREATE = "REQUEST_CREATE"
    REQUEST_VIEW = "REQUEST_VIEW"
    REQUEST_ASSIGN = "REQUEST_ASSIGN"
    REQUEST_PROCESS = "REQUEST_PROCESS"
    REQUEST_ESCALATE = "REQUEST_ESCALATE"
    REQUEST_APPROVE = "REQUEST_APPROVE"
    REQUEST_REJECT = "REQUEST_REJECT"
    REQUEST_COMPLETE = "REQUEST_COMPLETE"

    USER_VIEW = "USER_VIEW"
    USER_CREATE = "USER_CREATE"
    USER_UPDATE = "USER_UPDATE"
    USER_DELETE = "USER_DELETE"

    SYSTEM_ADMIN = "SYSTEM_ADMIN"


@dataclass
class Permission:
    """
    Represents a platform permission.
    """

    code: str

    name: str

    description: str