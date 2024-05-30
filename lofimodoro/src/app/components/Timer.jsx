// components/Timer.jsx
import React, { useState, useEffect } from 'react';

const Timer = ({ timer, onStart, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(timer.duration * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setTimeLeft(timer.duration * 60);
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

  const handleStartStop = () => {
    setIsRunning(!isRunning);
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
      <button
        onClick={handleStartStop}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
      >
        {isRunning ? 'Stop' : 'Start'}
      </button>
    </div>
  );
};

export default Timer;
