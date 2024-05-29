// /components/Log.jsx
import React from 'react';

const Log = ({ log, isOpen, onClose }) => {
  return (
    <div className={`fixed-log ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <h2 className="text-2xl font-bold mb-4 text-white">Log</h2>
        {log.length === 0 ? (
          <p className="text-white">No timers completed yet.</p>
        ) : (
          <ul className="space-y-2">
            {log.map((entry, index) => (
              <li key={index} className="text-white">
                {entry}
              </li>
            ))}
          </ul>
        )}
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default Log;
