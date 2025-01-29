"use client";
import React, { useState, useRef } from "react";
import TimerTab from "../components/TimerTab";
import Timer from "../components/Timer";
import Log from "../components/Log";
import MusicPlayer from "../components/MusicPlayer";
import dayjs from "dayjs";
import { FaHistory } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

const timers = [
  { name: "Pomodoro Sprint", duration: 25, bg: "bg-pomodoro" },
  { name: "Small Break", duration: 5, bg: "bg-small-break" },
  { name: "Long Break", duration: 15, bg: "bg-long-break" },
  { name: "placeholder", duration: 0, bg: "bg-pomodoro" },
];

const Home = () => {
  const [selectedTimer, setSelectedTimer] = useState(timers[0]);
  const [log, setLog] = useState([]);
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const currentLogId = useRef(null); // Using useRef to track logs and prevent duplicates

  const handleTimerStart = () => {
    setStartTime(dayjs());
    currentLogId.current = uuidv4();
  };

  const handleTimerComplete = () => {
    if (!startTime || !currentLogId.current) return;

    const endTime = dayjs();
    const newLogEntry = {
      id: currentLogId.current,
      name: selectedTimer.name,
      startTime: startTime.format("hh:mm:ss A"),
      endTime: endTime.format("hh:mm:ss A"),
    };

    setLog((prevLog) => [newLogEntry, ...prevLog]);

    setStartTime(null);
    currentLogId.current = null;
  };

  const toggleLog = () => {
    setIsLogOpen(!isLogOpen);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${selectedTimer.bg}`}
    >
      <div className="w-full max-w-lg p-4 relative">
        {/* Timer Tabs */}
        <div className="tabs flex justify-center mb-4">
          {timers.slice(0, 3).map((timer, index) => (
            <TimerTab
              key={index}
              timer={timer}
              isSelected={selectedTimer.name === timer.name}
              onClick={() => {
                console.log(`Timer Selected: ${timer.name}`); // Debugging log
                setSelectedTimer(timer);
              }}
            />
          ))}
        </div>

        {/* Main Timer UI */}
        <div className="blurred-gui relative p-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg">
          {/* Log Button */}
          <div
            className="log-icon absolute top-4 right-4 text-gray-200 hover:text-white cursor-pointer"
            onClick={toggleLog}
          >
            <FaHistory size={24} />
          </div>

          <Timer
            timer={selectedTimer}
            onStart={handleTimerStart}
            onComplete={() => handleTimerComplete(selectedTimer)}
          />
          <MusicPlayer />
        </div>
      </div>

      {/* Log Modal */}
      {isLogOpen && <Log log={log} onClose={toggleLog} />}
    </div>
  );
};

export default Home;
