// components/Timer.jsx
"use client";
import React, { useEffect, useRef, useState } from "react";

export default function Timer({
  timer,
  onStart,
  onComplete,
  onStopEarly,
  onAbandon,
  disableSwitchHint = false,
}) {
  const targetMs = timer.duration * 60 * 1000;

  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(targetMs);
  const [hasStarted, setHasStarted] = useState(false);

  // For pause/resume accounting
  const startedAtRef = useRef(null); // epoch ms when (re)started
  const elapsedRef = useRef(0); // accumulated elapsed before current run
  const tickRef = useRef(null);

  // Reset timer when switching tab
  useEffect(() => {
    setIsRunning(false);
    setHasStarted(false);
    setTimeLeft(targetMs);
    startedAtRef.current = null;
    elapsedRef.current = 0;
    if (tickRef.current) clearInterval(tickRef.current);
  }, [timer?.name, targetMs]);

  useEffect(() => {
    if (!isRunning) {
      if (tickRef.current) clearInterval(tickRef.current);
      return;
    }
    // Start/resume
    if (!hasStarted) {
      setHasStarted(true);
      onStart?.();
    }
    startedAtRef.current = Date.now();
    tickRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = elapsedRef.current + (now - startedAtRef.current);
      const remaining = Math.max(0, targetMs - elapsed);
      setTimeLeft(remaining);
      if (remaining === 0) {
        clearInterval(tickRef.current);
        setIsRunning(false);
        onComplete?.();
      }
    }, 250);

    return () => clearInterval(tickRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  const handleStart = () => {
    if (!isRunning) setIsRunning(true);
  };

  const handlePause = () => {
    if (!isRunning) return;
    const now = Date.now();
    elapsedRef.current += now - startedAtRef.current;
    setIsRunning(false);
  };

  const handleResetAbandon = () => {
    // Abandon: user explicitly discards the session (no DB log)
    elapsedRef.current = 0;
    setTimeLeft(targetMs);
    setIsRunning(false);
    setHasStarted(false);
    onAbandon?.();
  };

  const handleStopEarly = () => {
    // partial log using elapsed so far
    if (isRunning) {
      const now = Date.now();
      elapsedRef.current += now - startedAtRef.current;
    }
    setIsRunning(false);
    setHasStarted(false);
    setTimeLeft(targetMs);
    onStopEarly?.();
    elapsedRef.current = 0;
  };

  const mmss = (ms) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="timer">
      <div className="text-white/80 text-sm mb-1">
        {disableSwitchHint
          ? "Finish or stop before switching timers."
          : "\u00A0"}
      </div>
      <h2 className="timer-name">{timer.name}</h2>
      <div className="timer-display mt-2">{mmss(timeLeft)}</div>

      <div className="timer-actions">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="timer-button bg-emerald-600 hover:bg-emerald-700"
          >
            {hasStarted ? "Resume" : "Start"}
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="timer-button bg-amber-600 hover:bg-amber-700"
          >
            Pause
          </button>
        )}
        <button
          onClick={handleStopEarly}
          disabled={!hasStarted}
          className="timer-button bg-sky-600/90 hover:bg-sky-700 disabled:opacity-40"
        >
          Stop early (log)
        </button>
        <button
          onClick={handleResetAbandon}
          disabled={!hasStarted}
          className="timer-button bg-rose-600 hover:bg-rose-700 disabled:opacity-40"
        >
          Abandon
        </button>
      </div>
    </div>
  );
}
