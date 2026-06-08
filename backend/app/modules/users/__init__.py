# backend/app/modules/users/__init__.py

"""
User Identity Foundation

Phase 25

Provides:

- User identity management
- User profile management
- User lookup
- User lifecycle management
"""

from backend.app.modules.users.routes import router

__all__ = [
    "router",
]