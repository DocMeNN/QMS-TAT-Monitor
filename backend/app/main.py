# backend/app/main.py

"""
QMS TAT Monitor API
-------------------
Application bootstrap and router registration.

Current Active Modules
----------------------
- Dashboard
- Queue
- Alerts
- History
- Requests
- Workflow
- Assignment
- SLA
- Workflow Rules

MeRulz Compliance
-----------------
- Full file output
- Modular architecture
- Production-ready routing
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.modules.dashboard.routes import router as dashboard_router
from app.modules.queue.routes import router as queue_router
from app.modules.alerts.routes import router as alerts_router
from app.modules.history.routes import router as history_router
from app.modules.requests.routes import router as requests_router
from app.modules.workflow.routes import router as workflow_router
from backend.app.modules.assignment.routes import router as assignment_router
from app.modules.sla.routes import router as sla_router
from app.modules.workflow_rules.routes import (
    router as workflow_rules_router,
)

app = FastAPI(
    title="QMS TAT Monitor API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================
# Module Registration
# ============================================================

app.include_router(
    dashboard_router,
    prefix="/api",
)

app.include_router(
    queue_router,
    prefix="/api",
)

app.include_router(
    alerts_router,
    prefix="/api",
)

app.include_router(
    history_router,
    prefix="/api",
)

app.include_router(
    requests_router,
    prefix="/api",
)

app.include_router(
    workflow_router,
    prefix="/api",
)

app.include_router(
    assignment_router,
    prefix="/api",
)

app.include_router(
    sla_router,
    prefix="/api",
)

app.include_router(
    workflow_rules_router,
    prefix="/api",
)