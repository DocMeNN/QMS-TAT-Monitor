// src/modules/intelligence-history/components/ReplayControls.tsx

interface ReplayControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
}

export default function ReplayControls({
  isPlaying,
  onPlay,
  onPause,
  onReset,
}: ReplayControlsProps) {
  return (
    <div className="flex gap-2">
      {!isPlaying ? (
        <button
          onClick={onPlay}
          className="rounded border px-4 py-2"
        >
          Play Replay
        </button>
      ) : (
        <button
          onClick={onPause}
          className="rounded border px-4 py-2"
        >
          Pause Replay
        </button>
      )}

      <button
        onClick={onReset}
        className="rounded border px-4 py-2"
      >
        Reset
      </button>
    </div>
  );
}