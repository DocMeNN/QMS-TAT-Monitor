# backend/app/modules/data_entry_workspace/__init__.py

"""
Phase 30 - Data Entry Workspace
"""

from .routes import router
from .service import (
    DataEntryWorkspaceService,
    workspace_service,
)

__all__ = [
    "router",
    "DataEntryWorkspaceService",
    "workspace_service",
]