# backend/app/modules/rbac/routes.py

"""
RBAC Routes
-----------
API endpoints for authorization.

Phase 27
Role Matrix (RBAC Foundation)

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Security-ready
"""

from fastapi import APIRouter
from fastapi import HTTPException

from backend.app.modules.rbac.schemas import (
    PermissionCheckRequest,
    PermissionCheckResponse,
    RolePermissionsResponse,
)
from backend.app.modules.rbac.service import (
    rbac_service,
)

router = APIRouter(
    prefix="/rbac",
    tags=["RBAC"],
)


@router.get("/roles")
def get_roles():

    return rbac_service.get_roles()


@router.get("/permissions")
def get_permissions():

    return rbac_service.get_permissions()


@router.get("/roles/{role}")
def get_role_permissions(
    role: str,
):

    permissions = (
        rbac_service.get_role_permissions(
            role=role,
        )
    )

    if not permissions:
        raise HTTPException(
            status_code=404,
            detail="Role not found",
        )

    return RolePermissionsResponse(
        role=role,
        permissions=permissions,
    )


@router.post("/check")
def check_permission(
    payload: PermissionCheckRequest,
):

    allowed = (
        rbac_service.has_permission(
            role=payload.role,
            permission=payload.permission,
        )
    )

    return PermissionCheckResponse(
        role=payload.role,
        permission=payload.permission,
        allowed=allowed,
    )