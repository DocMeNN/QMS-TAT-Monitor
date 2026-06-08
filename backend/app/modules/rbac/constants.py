# backend/app/modules/rbac/constants.py

"""
RBAC Constants
--------------
Central authorization configuration.

Phase 27
Role Matrix Foundation

MeRulz Compliance
-----------------
- Fully typed
- Fully documented
- Security-ready
"""

from backend.app.models.permission import PermissionCode
from backend.app.models.user import UserRole


RBAC_MODULE_NAME = "rbac"


ROLE_PERMISSION_MATRIX = {

    UserRole.REQUESTOR: {
        PermissionCode.REQUEST_CREATE,
        PermissionCode.REQUEST_VIEW,
    },

    UserRole.PROCESSOR: {
        PermissionCode.REQUEST_VIEW,
        PermissionCode.REQUEST_PROCESS,
    },

    UserRole.REVIEWER: {
        PermissionCode.REQUEST_VIEW,
        PermissionCode.REQUEST_APPROVE,
        PermissionCode.REQUEST_REJECT,
    },

    UserRole.SUPERVISOR: {
        PermissionCode.REQUEST_VIEW,
        PermissionCode.REQUEST_ASSIGN,
        PermissionCode.REQUEST_ESCALATE,
        PermissionCode.REQUEST_APPROVE,
        PermissionCode.REQUEST_REJECT,
        PermissionCode.USER_VIEW,
    },

    UserRole.ADMINISTRATOR: {
        PermissionCode.REQUEST_CREATE,
        PermissionCode.REQUEST_VIEW,
        PermissionCode.REQUEST_ASSIGN,
        PermissionCode.REQUEST_PROCESS,
        PermissionCode.REQUEST_ESCALATE,
        PermissionCode.REQUEST_APPROVE,
        PermissionCode.REQUEST_REJECT,
        PermissionCode.REQUEST_COMPLETE,
        PermissionCode.USER_VIEW,
        PermissionCode.USER_CREATE,
        PermissionCode.USER_UPDATE,
        PermissionCode.USER_DELETE,
        PermissionCode.SYSTEM_ADMIN,
    },
}