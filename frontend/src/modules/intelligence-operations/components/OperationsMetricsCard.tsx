// src/modules/intelligence-operations/components/OperationsMetricsCard.tsx

interface Props {
  title: string;

  value:
    | string
    | number;
}

export function OperationsMetricsCard({
  title,
  value,
}: Props) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="text-sm text-gray-500">
        {title}
      </div>

      <div className="mt-2 text-2xl font-bold">
        {value}
      </div>
    </div>
  );
}

export default OperationsMetricsCard;