# backend/app/modules/rbac/service.py

"""
RBAC Service
------------
Core authorization logic.

Phase 27
Role Matrix (RBAC Foundation)

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Security-ready
- Governance-ready
"""

from backend.app.models.permission import Permission
from backend.app.modules.rbac.constants import (
    ROLE_PERMISSION_MATRIX,
)


class RBACService:
    """
    Manages platform authorization.
    """

    def get_roles(
        self,
    ) -> list[str]:

        return [
            role.value
            for role in ROLE_PERMISSION_MATRIX.keys()
        ]

    def get_permissions(
        self,
    ) -> list[Permission]:

        permissions: list[Permission] = []

        seen: set[str] = set()

        for role_permissions in (
            ROLE_PERMISSION_MATRIX.values()
        ):
            for permission in role_permissions:

                if permission.value in seen:
                    continue

                seen.add(permission.value)

                permissions.append(
                    Permission(
                        code=permission.value,
                        name=permission.value,
                        description=(
                            permission.value
                            .replace("_", " ")
                            .title()
                        ),
                    )
                )

        permissions.sort(
            key=lambda item: item.code,
        )

        return permissions

    def get_role_permissions(
        self,
        role: str,
    ) -> list[str]:

        for matrix_role, permissions in (
            ROLE_PERMISSION_MATRIX.items()
        ):
            if matrix_role.value == role:

                return sorted(
                    [
                        permission.value
                        for permission in permissions
                    ]
                )

        return []

    def has_permission(
        self,
        role: str,
        permission: str,
    ) -> bool:

        for matrix_role, permissions in (
            ROLE_PERMISSION_MATRIX.items()
        ):
            if matrix_role.value != role:
                continue

            return any(
                permission == item.value
                for item in permissions
            )

        return False


rbac_service = RBACService()