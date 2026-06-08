# backend/app/schemas/permission.py

"""
Permission Schemas
------------------
Shared RBAC schemas.

Phase 27
Role Matrix Foundation
"""

from dataclasses import dataclass


@dataclass
class PermissionSummary:
    code: str

    name: str

    description: str


@dataclass
class RolePermissionSummary:
    role: str

    permission_count: int