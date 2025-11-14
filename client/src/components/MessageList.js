import React from 'react';
import MessageBubble from './MessageBubble';
import './MessageList.css';

function MessageList({ messages, currentTranscript }) {
  return (
    <div className="message-list">
      {messages.length === 0 && !currentTranscript && (
        <div className="empty-state">
          <p>No messages yet. Start speaking or type a message.</p>
        </div>
      )}
      
      {messages.map((message, index) => (
        <MessageBubble
          key={index}
          message={message}
        />
      ))}
      
      {currentTranscript && (
        <MessageBubble
          message={{
            sender: 'user',
            text: currentTranscript,
            isInterim: true
          }}
        />
      )}
    </div>
  );
}

export default MessageList;

