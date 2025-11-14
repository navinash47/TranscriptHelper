import React from 'react';
import './MessageBubble.css';

function MessageBubble({ message }) {
  const isUser = message.sender === 'user';
  const isAssistant = message.sender === 'assistant';
  const isInterim = message.isInterim || false;

  return (
    <div className={`message-bubble ${isUser ? 'message-user' : 'message-assistant'} ${isInterim ? 'message-interim' : ''}`}>
      <div className="message-content">
        {message.text}
      </div>
      {message.timestamp && (
        <div className="message-timestamp">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      )}
    </div>
  );
}

export default MessageBubble;

