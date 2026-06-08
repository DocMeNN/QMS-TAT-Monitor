# backend/app/modules/auth/__init__.py

"""
Authentication Engine

Phase 26

Provides:

- User authentication
- Session management
- Login
- Logout
- Session tracking
"""

from backend.app.modules.auth.routes import router

__all__ = [
    "router",
]