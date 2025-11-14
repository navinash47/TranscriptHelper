import React from 'react';
import './ControlButtons.css';

function ControlButtons({ onCut, onDiscard, disabled }) {
  return (
    <div className="control-buttons">
      <button
        className="btn btn-cut"
        onClick={onCut}
        disabled={disabled}
        aria-label="Cut and submit to AI"
      >
        <span className="btn-icon">✂️</span>
        <span className="btn-label">Cut</span>
      </button>
      <button
        className="btn btn-discard"
        onClick={onDiscard}
        disabled={disabled}
        aria-label="Discard current transcript"
      >
        <span className="btn-icon">🗑️</span>
        <span className="btn-label">Discard</span>
      </button>
    </div>
  );
}

export default ControlButtons;

