# backend/app/modules/queue/routes.py

from fastapi import APIRouter

router = APIRouter()


@router.get("/queue")
def queue():
    return {
        "pending": 18,
        "processing": 11,
        "completed": 221
    }