import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import MessageList from './components/MessageList';
import ControlButtons from './components/ControlButtons';
import TextInput from './components/TextInput';
import StatusIndicator from './components/StatusIndicator';

function App() {
  const [messages, setMessages] = useState([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cameraStatus, setCameraStatus] = useState(null);
  const messagesEndRef = useRef(null);

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chat_messages');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chat_messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentTranscript]);

  const handleCut = async () => {
    if (!currentTranscript.trim() && messages.length === 0) {
      return;
    }

    const textToSend = currentTranscript.trim() || messages[messages.length - 1]?.text || '';
    if (!textToSend) return;

    setIsLoading(true);
    setCurrentTranscript('');

    // Add user message
    const userMessage = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      // Call backend API
      const response = await fetch('http://localhost:3001/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-5) // Last 5 messages for context
        }),
      });

      const data = await response.json();
      
      // Add assistant response
      const assistantMessage = {
        sender: 'assistant',
        text: data.answer || 'No response received',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending query:', error);
      const errorMessage = {
        sender: 'assistant',
        text: 'Sorry, I encountered an error. Please check your connection and try again.',
        timestamp: new Date().toISOString(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiscard = () => {
    setCurrentTranscript('');
  };

  const handleTextSend = async (text) => {
    if (!text.trim()) return;

    setIsLoading(true);

    // Add user message
    const userMessage = {
      sender: 'user',
      text: text,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      // Call backend API
      const response = await fetch('http://localhost:3001/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-5) // Last 5 messages for context
        }),
      });

      const data = await response.json();
      
      // Add assistant response
      const assistantMessage = {
        sender: 'assistant',
        text: data.answer || 'No response received',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending query:', error);
      const errorMessage = {
        sender: 'assistant',
        text: 'Sorry, I encountered an error. Please check your connection and try again.',
        timestamp: new Date().toISOString(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Transcript Helper</h1>
        <p className="subtitle">Voice-Enabled AI Chat Assistant</p>
      </header>
      
      <StatusIndicator 
        isListening={isListening}
        cameraStatus={cameraStatus}
      />

      <main className="app-main">
        <div className="chat-container">
          <MessageList 
            messages={messages}
            currentTranscript={currentTranscript}
          />
          {isLoading && (
            <div className="loading-indicator">
              <div className="loading-spinner"></div>
              <span>AI is thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <ControlButtons
        onCut={handleCut}
        onDiscard={handleDiscard}
        disabled={isLoading}
      />

      <TextInput
        onSend={handleTextSend}
        disabled={isLoading}
      />
    </div>
  );
}

export default App;
