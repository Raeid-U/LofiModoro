// components/TimerTab.jsx
import React from 'react';

const TimerTab = ({ timer, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer px-4 py-2 mx-2 rounded-lg transition-colors duration-300 ease-in-out ${isSelected ? 'bg-white bg-opacity-20 backdrop-blur-sm text-white' : 'bg-white bg-opacity-10 backdrop-blur-sm text-gray-200'}`}
    >
      {timer.name}
    </div>
  );
};

export default TimerTab;
