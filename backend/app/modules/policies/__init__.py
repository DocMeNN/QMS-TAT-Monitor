# backend/app/modules/policies/__init__.py

"""
Access Policy Engine

Phase 29

Provides:

- Policy registry
- Policy lifecycle management
- Policy evaluation
- Access decision framework
"""

from backend.app.modules.policies.routes import (
    router,
)

__all__ = [
    "router",
]