import React from 'react';
import './StatusIndicator.css';

function StatusIndicator({ isListening, cameraStatus }) {
  return (
    <div className="status-indicator">
      <div className={`status-item ${isListening ? 'status-active' : 'status-inactive'}`}>
        <span className="status-icon">🎤</span>
        <span className="status-text">{isListening ? 'Listening' : 'Not listening'}</span>
        {isListening && <span className="status-pulse"></span>}
      </div>
      {cameraStatus && (
        <div className={`status-item ${cameraStatus === 'active' ? 'status-active' : 'status-inactive'}`}>
          <span className="status-icon">📷</span>
          <span className="status-text">Camera {cameraStatus === 'active' ? 'On' : 'Off'}</span>
        </div>
      )}
    </div>
  );
}

export default StatusIndicator;

