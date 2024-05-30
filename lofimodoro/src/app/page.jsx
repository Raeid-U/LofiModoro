'use client'
import React, { useState } from 'react';
import TimerTab from './components/TimerTab';
import Timer from './components/Timer';
import Log from './components/Log';
import MusicPlayer from './components/MusicPlayer';
import { FaHistory } from 'react-icons/fa';
import dayjs from 'dayjs';

const timers = [
  { name: 'Pomodoro Sprint', duration: 25, bg: 'bg-pomodoro' },
  { name: 'Small Break', duration: 1, bg: 'bg-small-break' },
  { name: 'Long Break', duration: 15, bg: 'bg-long-break' },
];

const Home = () => {
  const [selectedTimer, setSelectedTimer] = useState(timers[0]);
  const [log, setLog] = useState([]);
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const handleTimerStart = () => {
    setStartTime(dayjs());
  };

  const handleTimerComplete = (timer) => {
    const endTime = dayjs();
    const startTimeFormatted = startTime ? startTime.format('h:mm A') : '';
    const endTimeFormatted = endTime.format('h:mm A');

    setLog((prevLog) => [
      {
        name: timer.name,
        startTime: startTimeFormatted,
        endTime: endTimeFormatted,
      },
      ...prevLog,
    ]);

    setStartTime(null);
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
        <div className="blurred-gui relative p-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg">
          <div className="log-icon absolute top-4 right-4 text-gray-200 hover:text-white cursor-pointer" onClick={toggleLog}>
            <FaHistory size={24} />
          </div>
          <Timer timer={selectedTimer} onStart={handleTimerStart} onComplete={handleTimerComplete} />
          <MusicPlayer />
        </div>
      </div>
      {isLogOpen && <Log log={log} onClose={toggleLog} />}
    </div>
  );
};

export default Home;
