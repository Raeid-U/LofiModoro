// components/Timer.jsx
import React, { useState, useEffect } from 'react';

const Timer = ({ timer, onStart, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(timer.duration * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setTimeLeft(timer.duration * 60);
    setIsRunning(false); // Reset running state when timer changes
  }, [timer]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      onStart();
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            onComplete(timer);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTimeLeft(timer.duration * 60);
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="text-center text-white">
      <h2 className="text-2xl font-bold mb-4">{timer.name}</h2>
      <div className="text-6xl font-bold mb-4">{formatTime(timeLeft)}</div>
      <div className="flex justify-center space-x-4">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
          >
            Start
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded"
          >
            Stop
          </button>
        )}
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
