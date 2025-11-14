import React from 'react';
import './ControlButtons.css';

function ControlButtons({ onCut, onDiscard, disabled, hasTranscript }) {
  return (
    <div className="control-buttons">
      <button
        className="btn btn-cut"
        onClick={onCut}
        disabled={disabled || !hasTranscript}
        aria-label="Cut and submit to AI"
        title={!hasTranscript ? "Speak or type a message first" : "Submit to AI"}
      >
        <span className="btn-icon">✂️</span>
        <span className="btn-label">Cut</span>
      </button>
      <button
        className="btn btn-discard"
        onClick={onDiscard}
        disabled={disabled || !hasTranscript}
        aria-label="Discard current transcript"
        title={!hasTranscript ? "No transcript to discard" : "Clear current transcript"}
      >
        <span className="btn-icon">🗑️</span>
        <span className="btn-label">Discard</span>
      </button>
    </div>
  );
}

export default ControlButtons;

