# backend/app/modules/rbac/schemas.py

"""
RBAC API Schemas
----------------
Request and response schemas for
authorization operations.

Phase 27
Role Matrix (RBAC Foundation)

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Security-ready
"""

from dataclasses import dataclass


@dataclass
class PermissionCheckRequest:
    role: str

    permission: str


@dataclass
class PermissionCheckResponse:
    role: str

    permission: str

    allowed: bool


@dataclass
class RolePermissionsResponse:
    role: str

    permissions: list[str]