import React, { useState, useEffect, useRef } from "react";

const Timer = ({ timer, onStart, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(timer.duration * 60 * 1000); // Convert to milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const startTimestamp = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    setTimeLeft(timer.duration * 60 * 1000); // Reset when timer changes
    setIsRunning(false);
    clearInterval(intervalRef.current);
  }, [timer]);

  useEffect(() => {
    if (isRunning) {
      onStart();
      startTimestamp.current = performance.now();
      intervalRef.current = requestAnimationFrame(updateTimer);
    } else {
      cancelAnimationFrame(intervalRef.current);
    }
    return () => cancelAnimationFrame(intervalRef.current);
  }, [isRunning]);

  const updateTimer = () => {
    const elapsed = performance.now() - startTimestamp.current;
    setTimeLeft((prevTime) => {
      const newTime = Math.max(prevTime - elapsed, 0);
      if (newTime === 0) {
        cancelAnimationFrame(intervalRef.current);
        onComplete(timer);
        setIsRunning(false);
      } else {
        intervalRef.current = requestAnimationFrame(updateTimer);
      }
      return newTime;
    });
    startTimestamp.current = performance.now();
  };

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setTimeLeft(timer.duration * 60 * 1000);
    setIsRunning(false);
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10); // Show two decimal milliseconds
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}.${ms < 10 ? "0" : ""}${ms}`;
  };

  return (
    <div className="text-center text-white p-6 bg-opacity-0 bg-black">
      <h2 className="text-3xl font-bold mb-4">{timer.name}</h2>
      <div className="text-6xl font-mono font-bold mb-4 transition-all duration-100 ease-in-out">
        {formatTime(timeLeft)}
      </div>
      <div className="flex justify-center space-x-4">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="px-6 py-3 bg-green-500 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition-all duration-300 ease-in-out"
          >
            Start
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="px-6 py-3 bg-red-500 hover:bg-red-700 text-white font-bold rounded-lg shadow-md transition-all duration-300 ease-in-out"
          >
            Pause
          </button>
        )}
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded-lg shadow-md transition-all duration-300 ease-in-out"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
