# backend/app/modules/rbac/__init__.py

"""
Role Matrix (RBAC Foundation)

Phase 27

Provides:

- Role registry
- Permission registry
- Role-permission mapping
- Authorization checks
- RBAC APIs
"""

from backend.app.modules.rbac.routes import router

__all__ = [
    "router",
]