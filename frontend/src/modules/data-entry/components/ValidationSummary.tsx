// src/modules/data-entry/components/ValidationSummary.tsx

interface Props {
  valid: boolean;
  errors: string[];
}

export default function ValidationSummary({
  valid,
  errors,
}: Props) {
  return (
    <div className="bg-slate-800 border-slate-700 text-slate-100 p-4 rounded-xl border">
      <h3 className="font-semibold mb-2">
        Validation Status
      </h3>

      {valid ? (
        <p className="text-green-600">
          All validation checks passed
        </p>
      ) : (
        <ul className="text-red-600 text-sm space-y-1">
          {errors.map((error, index) => (
            <li key={index}>• {error}</li>
          ))}
        </ul>
      )}
    </div>
  );
}