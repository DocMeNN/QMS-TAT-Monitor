# backend/app/main.py

"""
QMS TAT Monitor API
-------------------
Application bootstrap and router registration.

Current Active Modules
----------------------
- Alerts
- Approval
- Assignment
- Dashboard
- Escalation
- History
- Queue
- Requests
- SLA
- Workflow
- Workflow Rules

Platform
--------
Autonomous Intelligence Platform /
Laboratory TAT Management System

MeRulz Compliance
-----------------
- Full file output
- Modular architecture
- Production-ready routing
- Swagger-ready
- Documentation-compliant
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.modules.alerts.routes import (
    router as alerts_router,
)
from backend.app.modules.approval.routes import (
    router as approval_router,
)
from backend.app.modules.assignment.routes import (
    router as assignment_router,
)
from backend.app.modules.dashboard.routes import (
    router as dashboard_router,
)
from backend.app.modules.escalation.routes import (
    router as escalation_router,
)
from backend.app.modules.history.routes import (
    router as history_router,
)
from backend.app.modules.queue.routes import (
    router as queue_router,
)
from backend.app.modules.requests.routes import (
    router as requests_router,
)
from backend.app.modules.sla.routes import (
    router as sla_router,
)
from backend.app.modules.workflow.routes import (
    router as workflow_router,
)
from backend.app.modules.workflow_rules.routes import (
    router as workflow_rules_router,
)

app = FastAPI(
    title="QMS TAT Monitor API",
    description=(
        "Autonomous Intelligence Platform for "
        "Laboratory Turnaround Time Management, "
        "Workflow Automation, Governance, "
        "Monitoring, Auditability, and "
        "Operational Intelligence."
    ),
    version="1.0.0",
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
# Alphabetical Registration Order
# ============================================================

app.include_router(
    alerts_router,
    prefix="/api",
)

app.include_router(
    approval_router,
    prefix="/api",
)

app.include_router(
    assignment_router,
    prefix="/api",
)

app.include_router(
    dashboard_router,
    prefix="/api",
)

app.include_router(
    escalation_router,
    prefix="/api",
)

app.include_router(
    history_router,
    prefix="/api",
)

app.include_router(
    queue_router,
    prefix="/api",
)

app.include_router(
    requests_router,
    prefix="/api",
)

app.include_router(
    sla_router,
    prefix="/api",
)

app.include_router(
    workflow_router,
    prefix="/api",
)

app.include_router(
    workflow_rules_router,
    prefix="/api",
)