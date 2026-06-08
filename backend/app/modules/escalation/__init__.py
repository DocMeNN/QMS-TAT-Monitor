# backend/app/modules/escalation/__init__.py

"""
Escalation Workflow Engine

Phase 23

Provides:

- SLA escalation management
- Escalation tracking
- Escalation acknowledgement
- Escalation resolution
"""

from backend.app.modules.escalation.routes import router

__all__ = [
    "router",
]