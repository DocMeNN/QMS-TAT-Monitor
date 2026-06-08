# backend/app/schemas/request.py

"""
Request API Schemas
-------------------
Shared request contracts used throughout
the operational workflow platform.
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class RequestCreate(BaseModel):
    title: str
    description: str
    request_type: str
    priority: str
    sla_hours: int = 24
    created_by: str


class RequestUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None


class RequestResponse(BaseModel):
    request_id: str
    title: str
    description: str
    request_type: str
    priority: str
    status: str

    assigned_to: Optional[str] = None
    assigned_department: Optional[str] = None

    sla_hours: int

    created_by: str
    created_at: Optional[datetime]
    updated_at: Optional[datetime]