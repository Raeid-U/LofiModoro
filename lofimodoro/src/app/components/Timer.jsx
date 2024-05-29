// /components/Timer.jsx
import React, { useState, useEffect } from 'react';

const Timer = ({ timer, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(timer.duration * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setTimeLeft(timer.duration * 60);
    setIsRunning(false);
  }, [timer]);

  useEffect(() => {
    let timerInterval;
    if (isRunning && timeLeft > 0) {
      timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      onComplete(timer);
      setIsRunning(false);
    }
    return () => clearInterval(timerInterval);
  }, [isRunning, timeLeft, timer, onComplete]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="timer">
      <h2 className="timer-name">{timer.name}</h2>
      <div className="timer-display">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <button className="timer-button" onClick={handleStartStop}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
    </div>
  );
};

export default Timer;
