# backend/app/modules/auth/routes.py

"""
Authentication Routes
---------------------
API endpoints for authentication.

Phase 26
Authentication Engine
"""

from fastapi import APIRouter
from fastapi import HTTPException

from backend.app.modules.auth.schemas import (
    LoginRequest,
    LogoutRequest,
)
from backend.app.modules.auth.service import auth_service

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post("/login")
def login(
    payload: LoginRequest,
):

    result = auth_service.authenticate(
        username=payload.username,
        password=payload.password,
    )

    if not result.success:
        raise HTTPException(
            status_code=401,
            detail=result.message,
        )

    return result


@router.post("/logout")
def logout(
    payload: LogoutRequest,
):

    success = auth_service.logout(
        payload.session_id,
    )

    if not success:
        raise HTTPException(
            status_code=404,
            detail="Session not found",
        )

    return {
        "success": True,
    }


@router.get("/sessions")
def list_sessions():

    return auth_service.list_sessions()


@router.get("/sessions/{session_id}")
def get_session(
    session_id: str,
):

    session = auth_service.get_session(
        session_id,
    )

    if session is None:
        raise HTTPException(
            status_code=404,
            detail="Session not found",
        )

    return session