// src/modules/intelligence-history/components/TimelineNavigator.tsx

interface TimelineNavigatorProps {
  currentIndex: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function TimelineNavigator({
  currentIndex,
  totalSteps,
  onPrevious,
  onNext,
}: TimelineNavigatorProps) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="mb-3 font-semibold">
        Timeline Navigator
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onPrevious}
          disabled={currentIndex <= 0}
          className="rounded border px-3 py-2"
        >
          Previous
        </button>

        <span className="text-sm">
          Step {currentIndex + 1} of {totalSteps}
        </span>

        <button
          onClick={onNext}
          disabled={
            currentIndex >= totalSteps - 1
          }
          className="rounded border px-3 py-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}