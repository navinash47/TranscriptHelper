import React, { useState } from 'react';
import './TextInput.css';

function TextInput({ onSend, disabled }) {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() && !disabled) {
      onSend(inputText.trim());
      setInputText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="text-input-container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="text-input"
        placeholder="Type your message..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
      />
      <button
        type="submit"
        className="send-button"
        disabled={disabled || !inputText.trim()}
        aria-label="Send message"
      >
        <span className="send-icon">➤</span>
      </button>
    </form>
  );
}

export default TextInput;

