// src/modules/workflow-management/data/defaultWorkflows.ts

import type {
  LaboratoryDepartment,
  WorkflowDefinition,
} from "../types/workflow.types";

const now = new Date().toISOString();

function createWorkflow(
  id: string,
  code: string,
  name: string,
  department: LaboratoryDepartment,
  stageNames: Array<{
    name: string;
    tatHours: number;
    role: string;
  }>
): WorkflowDefinition {
  const stages = stageNames.map(
    (stage, index) => ({
      id: `${id}-stage-${index + 1}`,
      name: stage.name,
      order: index + 1,
      tatHours: stage.tatHours,
      mandatory: true,
      assignment: {
        role: stage.role,
        department,
      },
    })
  );

  const transitions = stages
    .slice(0, -1)
    .map((stage, index) => ({
      id: `${id}-transition-${index + 1}`,
      fromStageId: stage.id,
      toStageId:
        stages[index + 1].id,
      type:
        "SEQUENTIAL" as const,
    }));

  return {
    id,
    code,
    name,
    department,
    version: 1,
    status: "ACTIVE",
    stages,
    transitions,
    createdAt: now,
    updatedAt: now,
  };
}

export const DEFAULT_WORKFLOWS: WorkflowDefinition[] =
  [
    createWorkflow(
      "haematology",
      "HAEM-001",
      "Haematology Workflow",
      "HAEMATOLOGY",
      [
        {
          name:
            "Sample Reception",
          tatHours: 1,
          role:
            "Reception Officer",
        },
        {
          name:
            "Sample Verification",
          tatHours: 1,
          role:
            "Laboratory Scientist",
        },
        {
          name: "Analysis",
          tatHours: 4,
          role:
            "Laboratory Scientist",
        },
        {
          name: "QC Review",
          tatHours: 2,
          role:
            "Quality Officer",
        },
        {
          name:
            "Scientist Validation",
          tatHours: 2,
          role:
            "Senior Scientist",
        },
        {
          name:
            "Result Release",
          tatHours: 1,
          role:
            "Authorized Signatory",
        },
      ]
    ),

    createWorkflow(
      "chemical-pathology",
      "CHEM-001",
      "Chemical Pathology Workflow",
      "CHEMICAL_PATHOLOGY",
      [
        {
          name:
            "Sample Reception",
          tatHours: 1,
          role:
            "Reception Officer",
        },
        {
          name:
            "Sample Verification",
          tatHours: 1,
          role:
            "Laboratory Scientist",
        },
        {
          name:
            "Sample Processing",
          tatHours: 2,
          role:
            "Laboratory Scientist",
        },
        {
          name: "Analysis",
          tatHours: 4,
          role:
            "Laboratory Scientist",
        },
        {
          name: "QC Review",
          tatHours: 2,
          role:
            "Quality Officer",
        },
        {
          name:
            "Scientist Validation",
          tatHours: 2,
          role:
            "Senior Scientist",
        },
        {
          name:
            "Result Release",
          tatHours: 1,
          role:
            "Authorized Signatory",
        },
      ]
    ),

    createWorkflow(
      "microbiology",
      "MICRO-001",
      "Microbiology Workflow",
      "MICROBIOLOGY",
      [
        {
          name:
            "Sample Reception",
          tatHours: 1,
          role:
            "Reception Officer",
        },
        {
          name:
            "Culture Setup",
          tatHours: 3,
          role:
            "Microbiologist",
        },
        {
          name:
            "Incubation",
          tatHours: 24,
          role:
            "Microbiologist",
        },
        {
          name:
            "Identification",
          tatHours: 6,
          role:
            "Microbiologist",
        },
        {
          name:
            "Sensitivity Testing",
          tatHours: 8,
          role:
            "Microbiologist",
        },
        {
          name: "Review",
          tatHours: 2,
          role:
            "Consultant Microbiologist",
        },
        {
          name:
            "Result Release",
          tatHours: 1,
          role:
            "Authorized Signatory",
        },
      ]
    ),

    createWorkflow(
      "histopathology",
      "HISTO-001",
      "Histopathology Workflow",
      "HISTOPATHOLOGY",
      [
        {
          name:
            "Sample Reception",
          tatHours: 1,
          role:
            "Reception Officer",
        },
        {
          name:
            "Gross Examination",
          tatHours: 3,
          role:
            "Pathologist",
        },
        {
          name:
            "Tissue Processing",
          tatHours: 12,
          role:
            "Histotechnologist",
        },
        {
          name:
            "Embedding",
          tatHours: 2,
          role:
            "Histotechnologist",
        },
        {
          name:
            "Sectioning",
          tatHours: 3,
          role:
            "Histotechnologist",
        },
        {
          name:
            "Staining",
          tatHours: 4,
          role:
            "Histotechnologist",
        },
        {
          name:
            "Consultant Review",
          tatHours: 8,
          role:
            "Consultant Pathologist",
        },
        {
          name:
            "Result Release",
          tatHours: 1,
          role:
            "Authorized Signatory",
        },
      ]
    ),

    createWorkflow(
      "immunology",
      "IMMUNO-001",
      "Immunology Workflow",
      "IMMUNOLOGY",
      [
        {
          name:
            "Sample Reception",
          tatHours: 1,
          role:
            "Reception Officer",
        },
        {
          name:
            "Sample Verification",
          tatHours: 1,
          role:
            "Scientist",
        },
        {
          name:
            "Immunological Analysis",
          tatHours: 4,
          role:
            "Scientist",
        },
        {
          name: "QC Review",
          tatHours: 2,
          role:
            "Quality Officer",
        },
        {
          name:
            "Consultant Review",
          tatHours: 2,
          role:
            "Consultant Immunologist",
        },
        {
          name:
            "Result Release",
          tatHours: 1,
          role:
            "Authorized Signatory",
        },
      ]
    ),

    createWorkflow(
      "blood-banking",
      "BB-001",
      "Blood Banking Workflow",
      "BLOOD_BANKING",
      [
        {
          name:
            "Sample Reception",
          tatHours: 1,
          role:
            "Reception Officer",
        },
        {
          name:
            "Blood Grouping",
          tatHours: 2,
          role:
            "Blood Bank Scientist",
        },
        {
          name:
            "Crossmatching",
          tatHours: 3,
          role:
            "Blood Bank Scientist",
        },
        {
          name:
            "Compatibility Testing",
          tatHours: 2,
          role:
            "Blood Bank Scientist",
        },
        {
          name:
            "Scientist Review",
          tatHours: 1,
          role:
            "Senior Scientist",
        },
        {
          name:
            "Release",
          tatHours: 1,
          role:
            "Authorized Signatory",
        },
      ]
    ),

    createWorkflow(
      "molecular",
      "MOLECULAR-001",
      "Molecular Diagnostics Workflow",
      "MOLECULAR_DIAGNOSTICS",
      [
        {
          name:
            "Sample Reception",
          tatHours: 1,
          role:
            "Reception Officer",
        },
        {
          name:
            "Extraction",
          tatHours: 3,
          role:
            "Molecular Scientist",
        },
        {
          name:
            "PCR Setup",
          tatHours: 2,
          role:
            "Molecular Scientist",
        },
        {
          name:
            "Amplification",
          tatHours: 6,
          role:
            "Molecular Scientist",
        },
        {
          name:
            "Result Interpretation",
          tatHours: 2,
          role:
            "Senior Scientist",
        },
        {
          name:
            "Release",
          tatHours: 1,
          role:
            "Authorized Signatory",
        },
      ]
    ),

    createWorkflow(
      "cytology",
      "CYTO-001",
      "Cytology Workflow",
      "CYTOLOGY",
      [
        {
          name:
            "Sample Reception",
          tatHours: 1,
          role:
            "Reception Officer",
        },
        {
          name:
            "Sample Preparation",
          tatHours: 2,
          role:
            "Cytotechnologist",
        },
        {
          name:
            "Microscopic Examination",
          tatHours: 4,
          role:
            "Cytotechnologist",
        },
        {
          name:
            "Pathologist Review",
          tatHours: 4,
          role:
            "Pathologist",
        },
        {
          name:
            "Result Release",
          tatHours: 1,
          role:
            "Authorized Signatory",
        },
      ]
    ),
  ];

export default DEFAULT_WORKFLOWS;