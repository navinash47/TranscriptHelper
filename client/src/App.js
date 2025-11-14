import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Transcript Helper</h1>
        <p className="subtitle">Voice-Enabled AI Chat Assistant</p>
      </header>
      <main className="app-main">
        <div className="chat-container">
          <div className="chat-messages">
            <div className="welcome-message">
              <p>Welcome! The chat interface will appear here.</p>
              <p className="status-text">Phase 1: Project setup complete</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

