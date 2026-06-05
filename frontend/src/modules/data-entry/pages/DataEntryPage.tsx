import RequestEntryForm from "../components/RequestEntryForm";
import RequestMetadataPanel from "../components/RequestMetadataPanel";
import SubmissionQueuePanel from "../components/SubmissionQueuePanel";
import ValidationSummary from "../components/ValidationSummary";
import AssignmentPreview from "../components/AssignmentPreview";

export default function DataEntryPage() {
  return (
    <div className="p-6 space-y-8 text-slate-100">

      <div>
        <h1 className="text-3xl font-bold text-indigo-300">
          Data Entry Layer
        </h1>

        <p className="text-slate-300">
          Transaction intake and workflow registration
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RequestEntryForm />
        <RequestMetadataPanel />
        <SubmissionQueuePanel />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ValidationSummary
          valid={false}
          errors={[
            "Description too short",
            "Department required",
          ]}
        />

        <AssignmentPreview
          owner="Infrastructure Team"
          queue="Infrastructure Queue"
          slaHours={24}
        />
      </div>

    </div>
  );
}