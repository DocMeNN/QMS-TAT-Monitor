# backend/app/modules/approval/__init__.py

"""
Approval Workflow Layer

Phase 24

Provides:

- Approval creation
- Approval routing
- Approval review
- Approval decisions
- Approval tracking
"""

from backend.app.modules.approval.routes import router

__all__ = [
    "router",
]