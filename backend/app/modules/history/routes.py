# backend/app/modules/history/routes.py

from fastapi import APIRouter

router = APIRouter()


@router.get("/history")
def history():
    return [
        {"date": "Mon", "value": 5.2},
        {"date": "Tue", "value": 4.8},
        {"date": "Wed", "value": 4.4},
        {"date": "Thu", "value": 5.0},
        {"date": "Fri", "value": 4.6},
    ]