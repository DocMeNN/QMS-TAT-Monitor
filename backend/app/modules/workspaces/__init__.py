# backend/app/modules/workspaces/__init__.py

"""
Workspace Segmentation

Phase 28

Provides:

- Workspace management
- Workspace membership
- Organizational boundaries
- Multi-workspace support
"""

from backend.app.modules.workspaces.routes import (
    router,
)

__all__ = [
    "router",
]