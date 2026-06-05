// src/modules/data-entry/components/RequestEntryForm.tsx

import { useState } from "react";

import { useDashboardStore } from "../../dashboard/store/dashboardStore";

import {
  useIntelligenceStore,
} from "../../intelligence-bus";

export default function RequestEntryForm() {
  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [department, setDepartment] =
    useState("Infrastructure");

  const [priority, setPriority] =
    useState("Medium");

  const addRequest =
    useDashboardStore(
      (state) => state.addRequest
    );

  const emit =
    useIntelligenceStore(
      (state) => state.emit
    );

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!title.trim()) {
      alert(
        "Request title is required"
      );
      return;
    }

    if (
      description.trim().length < 10
    ) {
      alert(
        "Description must be at least 10 characters"
      );
      return;
    }

    const request = {
      id: crypto.randomUUID(),

      title,

      description,

      department,

      priority,

      status: "submitted",

      source: "request-entry",

      submittedBy: "operator",

      createdAt:
        new Date().toISOString(),
    };

    addRequest(request);

    emit({
      type: "REQUEST_CREATED",

      payload: {
        ...request,

        intelligence: {
          severity:
            priority === "Critical"
              ? 95
              : priority === "High"
              ? 80
              : priority === "Medium"
              ? 60
              : 35,

          executionWeight:
            priority === "Critical"
              ? 100
              : priority === "High"
              ? 75
              : priority === "Medium"
              ? 50
              : 25,

          requiresEscalation:
            priority === "Critical",

          predictedRisk:
            priority === "Critical"
              ? 92
              : priority === "High"
              ? 78
              : priority === "Medium"
              ? 58
              : 25,
        },
      },

      timestamp:
        new Date().toISOString(),
    });

    alert(
      "Request submitted successfully"
    );

    setTitle("");
    setDescription("");
    setDepartment(
      "Infrastructure"
    );
    setPriority("Medium");
  }

  return (
    <div className="dashboard-card rounded-xl shadow-md p-5">
      <h3 className="text-lg font-semibold mb-4">
        Request Entry Form
      </h3>

      <form
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full border rounded-lg p-2 bg-white text-black"
          placeholder="Request Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          className="w-full border rounded-lg p-2 bg-white text-black"
          placeholder="Request Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

        <select
          className="w-full border rounded-lg p-2 bg-white text-black"
          value={department}
          onChange={(e) =>
            setDepartment(
              e.target.value
            )
          }
        >
          <option>
            Infrastructure
          </option>
          <option>
            Compliance
          </option>
          <option>
            Security
          </option>
        </select>

        <select
          className="w-full border rounded-lg p-2 bg-white text-black"
          value={priority}
          onChange={(e) =>
            setPriority(
              e.target.value
            )
          }
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}