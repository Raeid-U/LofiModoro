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
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">Session Name</th>
                <th className="py-2">Start Time</th>
                <th className="py-2">End Time</th>
              </tr>
            </thead>
            <tbody>
              {log.length > 0 ? (
                log.map((entry, index) => (
                  <tr key={index}>
                    <td className="py-2">{entry.name}</td>
                    <td className="py-2">{entry.startTime}</td>
                    <td className="py-2">{entry.endTime}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4">No completed sessions yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Log;
