# backend/app/modules/users/routes.py

"""
User Routes
-----------
API endpoints for user identity management.

Phase 25
User Identity Foundation
"""

from fastapi import APIRouter
from fastapi import HTTPException

from backend.app.modules.users.schemas import (
    CreateUserRequest,
    UpdateUserRequest,
)
from backend.app.modules.users.service import user_service

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.post("/")
def create_user(
    payload: CreateUserRequest,
):

    return user_service.create_user(
        username=payload.username,
        email=payload.email,
        full_name=payload.full_name,
        role=payload.role,
        password=payload.password,
        department=payload.department,
        job_title=payload.job_title,
    )


@router.get("/")
def list_users():

    return user_service.list_users()


@router.get("/{user_id}")
def get_user(
    user_id: str,
):

    user = user_service.get_user(user_id)

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return user


@router.get("/{user_id}/profile")
def get_profile(
    user_id: str,
):

    profile = user_service.get_profile(user_id)

    if profile is None:
        raise HTTPException(
            status_code=404,
            detail="Profile not found",
        )

    return profile


@router.put("/{user_id}")
def update_user(
    user_id: str,
    payload: UpdateUserRequest,
):

    user = user_service.update_user(
        user_id=user_id,
        full_name=payload.full_name,
        email=payload.email,
        role=payload.role,
        status=payload.status,
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return user