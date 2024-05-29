'use client'
import React, { useState } from 'react';
import TimerTab from './components/TimerTab';
import Timer from './components/Timer';
import Log from './components/Log';
import MusicPlayer from './components/MusicPlayer';
import { FaHistory } from 'react-icons/fa';

const timers = [
  { name: 'Pomodoro Sprint', duration: 25, bg: 'bg-pomodoro' },
  { name: 'Small Break', duration: 5, bg: 'bg-small-break' },
  { name: 'Long Break', duration: 15, bg: 'bg-long-break' },
];

const Home = () => {
  const [selectedTimer, setSelectedTimer] = useState(timers[0]);
  const [log, setLog] = useState([]);
  const [isLogOpen, setIsLogOpen] = useState(false);

  const handleTimerComplete = (timer) => {
    setLog([...log, timer.name]);
  };

  const toggleLog = () => {
    setIsLogOpen(!isLogOpen);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${selectedTimer.bg}`}>
      <div className="w-full max-w-lg p-4 relative">
        <div className="tabs flex justify-center mb-4">
          {timers.map((timer, index) => (
            <TimerTab
              key={index}
              timer={timer}
              isSelected={selectedTimer.name === timer.name}
              onClick={() => setSelectedTimer(timer)}
            />
          ))}
        </div>
        <div className="blurred-gui">
          <div className="log-icon" onClick={toggleLog}>
            <FaHistory size={24} />
          </div>
          <Timer timer={selectedTimer} onComplete={handleTimerComplete} />
          <MusicPlayer />
        </div>
      </div>
      <Log log={log} isOpen={isLogOpen} onClose={toggleLog} />
    </div>
  );
};

export default Home;
