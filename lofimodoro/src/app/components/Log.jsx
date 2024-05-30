// components/Log.jsx
import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Log = ({ log, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-full max-w-lg bg-white bg-opacity-20 backdrop-blur-lg rounded-lg overflow-y-auto max-h-[80vh] p-6">
        <div className="absolute top-4 right-4 text-white hover:text-gray-400 cursor-pointer" onClick={onClose}>
          <FaTimes size={24} />
        </div>
        <h2 className="text-center text-white text-xl font-bold mb-4">Completed Timers</h2>
        <div className="text-white">
          <div className="flex justify-between mb-2">
            <span>Session Name</span>
            <span>Date</span>
            <span>Start Time</span>
            <span>End Time</span>
          </div>
          {log.length > 0 ? (
            log.map((entry, index) => (
              <div key={index} className="flex justify-between mb-2">
                <span>{entry.name}</span>
                <span>{entry.date}</span>
                <span>{entry.startTime}</span>
                <span>{entry.endTime}</span>
              </div>
            ))
          ) : (
            <p>No completed sessions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Log;
