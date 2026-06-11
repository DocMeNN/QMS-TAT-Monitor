# Runtime Validation Findings Log

**Project:** QMS TAT Monitor
**Platform:** Autonomous Intelligence Platform / Laboratory TAT Management System
**Validation Phase:** Runtime Validation & Swagger Endpoint Verification
**Date:** June 2026

---

# Purpose

This document records governance, validation, and operational findings discovered during live Swagger/OpenAPI testing.

The objective is to identify platform weaknesses before declaring Runtime Validation Complete and before proceeding deeper into Mountain 6 Operational User Experience development.

---

# Finding RV-001

## Request Type Governance Missing

### Module

Requests

### Endpoint

```http
POST /api/requests/
```

### Observation

The platform currently enforces validation for:

* Status
* Priority

through controlled enumerations.

However:

```json
{
  "request_type": "Hematology"
}
```

is accepted as a free-text value.

The system currently lacks governance enforcement for request classifications.

### Risk

The following values could potentially be accepted:

```json
{
  "request_type": "XYZ"
}
```

```json
{
  "request_type": "Banana"
}
```

```json
{
  "request_type": "Unknown Department"
}
```

This creates:

* Reporting inconsistencies
* Dashboard inaccuracies
* Workflow routing ambiguity
* SLA classification errors
* Department assignment failures

### Recommendation

Introduce controlled Request Type governance through enumeration.

Example:

```text
HEMATOLOGY
CHEMICAL_PATHOLOGY
MICROBIOLOGY
HISTOPATHOLOGY
IMMUNOLOGY
MOLECULAR_BIOLOGY
BLOOD_TRANSFUSION
PARASITOLOGY
```

### Priority

🔴 HIGH

### Status

OPEN

---

# Finding RV-002

## Duplicate Request Detection Missing

### Module

Requests

### Endpoint

```http
POST /api/requests/
```

### Observation

The system currently allows creation of multiple requests with identical business content.

Example:

Request A

```json
{
  "title": "FBC + ESR, MP",
  "description": "Bacteriemia r/o malaria",
  "request_type": "Hematology"
}
```

Generated:

```text
REQ-708B8924
```

Request B

```json
{
  "title": "FBC + ESR, MP",
  "description": "Bacteriemia r/o malaria",
  "request_type": "Hematology"
}
```

Generated:

```text
REQ-E13CF886
```

Both requests were accepted.

### Risk

Duplicate requests can create:

* Artificial workload inflation
* Incorrect TAT calculations
* Incorrect SLA calculations
* Escalation inaccuracies
* Dashboard metric distortion
* Duplicate laboratory processing

### Recommendation

Introduce Duplicate Request Detection Engine.

Initial detection criteria:

* Same title
* Same description
* Same request type
* Same creator
* Configurable time window

Future enhancement:

* Patient ID
* Encounter ID
* Specimen ID
* Order Number

### Priority

🔴 HIGH

### Status

OPEN

---

# Finding RV-003

## Request Update User Experience Gap

### Module

Requests

### Endpoint

```http
PUT /api/requests/{request_id}
```

### Observation

The API endpoint functions correctly from a REST architecture perspective.

However, operational users are expected to:

1. Locate request ID
2. Manually enter request ID
3. Construct update payload

This is not aligned with expected laboratory workflow operations.

### Risk

Operational inefficiency.

Potential for:

* Wrong request updates
* User confusion
* Increased training burden

### Assessment

This is not a backend defect.

This is a User Experience gap.

### Recommendation

Future Workspace Flow:

```text
Search Request
      ↓
Open Request
      ↓
View Details
      ↓
Edit Request
      ↓
Save Changes
```

Request IDs should remain system-managed and hidden from routine operational users.

### Priority

🟡 MEDIUM

### Status

OPEN

### Planned Resolution Area

Mountain 6

Phase 30 Data Entry Workspace

Phase 31 Processor Workbench

---

# Runtime Validation Summary

## Open Findings

| ID     | Finding                             | Priority | Status |
| ------ | ----------------------------------- | -------- | ------ |
| RV-001 | Request Type Governance Missing     | HIGH     | OPEN   |
| RV-002 | Duplicate Request Detection Missing | HIGH     | OPEN   |
| RV-003 | Request Update User Experience Gap  | MEDIUM   | OPEN   |

---

# Recommended Order of Resolution

1. Request Type Governance
2. Duplicate Request Detection Engine
3. Complete Runtime Validation Re-Test
4. Declare Runtime Validation Complete
5. History Event Publication Expansion
6. Workspace Personalization Expansion
7. Workspace Alerts Engine

---

# Validation Status

Runtime Validation Phase remains active.

Swagger verification has successfully identified governance and operational gaps that should be resolved before declaring validation complete.

These findings are considered platform hardening tasks rather than architectural failures.

Platform status remains:

* Runnable
* Stable
* Endpoint Verified
* Cross-Module Verified
* Audit Timeline Verified

Further work focuses on governance completeness and operational robustness.
