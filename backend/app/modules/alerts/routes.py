# backend/app/modules/alerts/routes.py

from fastapi import APIRouter

router = APIRouter()


@router.get("/alerts")
def alerts():
    return {
        "status": "warning",
        "message": "7 SLA breaches detected"
    }