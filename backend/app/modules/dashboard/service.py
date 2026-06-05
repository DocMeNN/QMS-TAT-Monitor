# backend/app/modules/dashboard/service.py

"""
Dashboard service
-----------------
Provides simulated live analytics dashboard data
with dynamic metric drift, health derivation,
and deterministic time-series analytics for
advanced chart visualization.

Phase 10.1 Enhancements
-----------------------
- Historical analytics dataset expansion
- Trend baseline stabilization
- Realistic directional metric progression
- Modular chart-ready payload generation
- Production-style service isolation

MeRulz Compliance
-----------------
- Full modular service isolation
- Fully documented
- Production-ready structure
- Timezone-safe timestamp generation
"""

from datetime import datetime, timezone, timedelta
import random


# ============================================================
# Application Timezone Configuration
# ============================================================

APP_TIMEZONE = timezone(timedelta(hours=1))


# ============================================================
# Simulated Live Dashboard State
# ============================================================

_dashboard_state = {
    "total_requests": 1248,
    "avg_tat_hours": 4.2,
    "completed": 1103,
    "breached_sla": 27,
    "completion_rate": 88.4,
    "sla_compliance": 97.8,
}


# ============================================================
# Historical Trend Labels
# ============================================================

TREND_LABELS = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
]


# ============================================================
# Metric Simulation Engine
# ============================================================

def _simulate_metric_drift():
    """
    Simulates realistic dashboard movement
    during each refresh cycle.
    """

    _dashboard_state["total_requests"] += random.randint(4, 14)
    _dashboard_state["completed"] += random.randint(3, 12)

    _dashboard_state["avg_tat_hours"] = round(
        max(
            2.5,
            min(
                8.0,
                _dashboard_state["avg_tat_hours"] + random.uniform(-0.15, 0.25),
            ),
        ),
        1,
    )

    _dashboard_state["breached_sla"] += random.randint(0, 2)

    _dashboard_state["completion_rate"] = round(
        max(
            80.0,
            min(
                99.9,
                _dashboard_state["completion_rate"] + random.uniform(-0.4, 0.5),
            ),
        ),
        1,
    )

    _dashboard_state["sla_compliance"] = round(
        max(
            90.0,
            min(
                99.9,
                _dashboard_state["sla_compliance"] + random.uniform(-0.25, 0.25),
            ),
        ),
        1,
    )


# ============================================================
# Operational Health Derivation
# ============================================================

def _derive_system_health():
    """
    Determines operational health
    from dashboard thresholds.
    """

    sla = _dashboard_state["sla_compliance"]
    tat = _dashboard_state["avg_tat_hours"]
    breaches = _dashboard_state["breached_sla"]

    if sla >= 97 and tat <= 4.5 and breaches < 35:
        return "healthy"

    if sla >= 94 and tat <= 6.0 and breaches < 50:
        return "warning"

    return "critical"


# ============================================================
# Generic Trend Builder
# ============================================================

def _build_trend_series(base, variance, upward_bias=0):
    """
    Builds realistic progressive trend data.

    Parameters
    ----------
    base : float
        Starting metric value
    variance : float
        Maximum random fluctuation
    upward_bias : float
        Progressive positive drift
    """

    trend = []

    current = base

    for label in TREND_LABELS:
        drift = random.uniform(-variance, variance) + upward_bias
        current = round(current + drift, 1)

        trend.append({
            "label": label,
            "value": current,
        })

    return trend


# ============================================================
# Chart Dataset Generators
# ============================================================

def _generate_throughput_trend():
    """
    Generates request throughput progression.
    """

    return _build_trend_series(
        base=110,
        variance=8,
        upward_bias=9,
    )


def _generate_compliance_trend():
    """
    Generates SLA compliance progression.
    """

    return _build_trend_series(
        base=96.8,
        variance=0.25,
        upward_bias=0.15,
    )


def _generate_completion_trend():
    """
    Generates completion efficiency progression.
    """

    return _build_trend_series(
        base=82.5,
        variance=0.45,
        upward_bias=1.0,
    )


# ============================================================
# Dashboard Data Provider
# ============================================================

def get_dashboard_data():
    """
    Returns live analytics payload
    for dashboard consumption.
    """

    _simulate_metric_drift()

    return {
        "metrics": {
            "total_requests": _dashboard_state["total_requests"],
            "avg_tat_hours": _dashboard_state["avg_tat_hours"],
            "completed": _dashboard_state["completed"],
            "breached_sla": _dashboard_state["breached_sla"],
        },
        "throughput": _generate_throughput_trend(),
        "compliance_trend": _generate_compliance_trend(),
        "completion_trend": _generate_completion_trend(),
        "completion_rate": _dashboard_state["completion_rate"],
        "sla_compliance": _dashboard_state["sla_compliance"],
        "system_health": _derive_system_health(),
        "last_updated": datetime.now(APP_TIMEZONE).isoformat(),
    }