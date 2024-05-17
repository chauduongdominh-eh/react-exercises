import { useCallback, useEffect, useRef, useState } from 'react';

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}

type TimerProps = {
  /**
   * Callback to run when the counter reaches zero
   */
  onFinish?: () => void;
};

function Timer({ onFinish }: TimerProps) {
  const [remaining, setRemaining] = useState(5 * 60);
  const timerRef = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = null;
  }, []);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  const handleStart = () => {
    if (timerRef.current !== null) {
      return;
    }

    timerRef.current = setInterval(() => {
      if (remaining > 0) {
        setRemaining((s) => s - 1);
      } else {
        stop();
        onFinish?.();
      }
    }, 1000);
  };
  const handleStop = () => stop();
  const handleReset = () => setRemaining(5 * 60);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <button type="button" onClick={handleStart}>
          Start
        </button>
        <button type="button" onClick={handleStop}>
          Stop
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div style={{ textAlign: 'center' }}>{formatTime(remaining)}</div>
    </>
  );
}

export { Timer };
