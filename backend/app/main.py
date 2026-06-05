# backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.modules.dashboard.routes import router as dashboard_router
from app.modules.queue.routes import router as queue_router
from app.modules.alerts.routes import router as alerts_router
from app.modules.history.routes import router as history_router

app = FastAPI(title="QMS TAT Monitor API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard_router, prefix="/api")
app.include_router(queue_router, prefix="/api")
app.include_router(alerts_router, prefix="/api")
app.include_router(history_router, prefix="/api")