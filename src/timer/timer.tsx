import { useCallback, useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { reset, store, tick, useAppDispatch, useAppSelector } from './store';

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

function TimerInner({ onFinish }: TimerProps) {
  const timerRef = useRef<number | null>(null);
  const remaining = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

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
        dispatch(tick());
      } else {
        stop();
        onFinish?.();
      }
    }, 1000);
  };
  const handleStop = () => stop();
  const handleReset = () => dispatch(reset(5 * 60));

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

function Timer({ onFinish }: TimerProps) {
  return (
    <Provider store={store}>
      <TimerInner onFinish={onFinish} />
    </Provider>
  );
}

export { Timer };
