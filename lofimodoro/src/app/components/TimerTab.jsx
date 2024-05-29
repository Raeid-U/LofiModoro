// /components/TimerTab.jsx
import React from 'react';

const TimerTab = ({ timer, isSelected, onClick }) => {
  return (
    <div
      className={`tab ${isSelected ? 'tab-selected' : ''}`}
      onClick={onClick}
    >
      {timer.name}
    </div>
  );
};

export default TimerTab;
