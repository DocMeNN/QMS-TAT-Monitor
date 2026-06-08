# backend/app/modules/requests/schemas.py

"""
Requests Module Schemas
-----------------------
Module-specific request contracts.
"""

from app.schemas.request import (
    RequestCreate,
    RequestUpdate,
    RequestResponse,
)

__all__ = [
    "RequestCreate",
    "RequestUpdate",
    "RequestResponse",
]