import { useRef, useState } from 'react';

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}

function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [remaining, setRemaining] = useState(5 * 60);
  const timerRef = useRef();

  const stop = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setIsRunning(false);
  };

  const handleReset = () => setRemaining(5 * 60);
  const handleStart = () => {
    if (isRunning) {
      return;
    }

    timerRef.current = setInterval(() => {
      if (remaining > 0) {
        setRemaining((s) => s - 1);
      } else {
        stop();
      }
    }, 1000);
    setIsRunning(true);
  };
  const handleStop = () => stop();

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
