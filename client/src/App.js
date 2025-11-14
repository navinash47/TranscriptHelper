import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import MessageList from './components/MessageList';
import ControlButtons from './components/ControlButtons';
import TextInput from './components/TextInput';
import StatusIndicator from './components/StatusIndicator';
import useSpeechRecognition from './hooks/useSpeechRecognition';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cameraStatus, setCameraStatus] = useState(null);
  const messagesEndRef = useRef(null);
  const transcriptBufferRef = useRef(''); // Buffer for transcripts since last cut

  // Initialize speech recognition with continuous listening
  const {
    transcript,
    isListening,
    error: speechError,
    isSupported: isSpeechSupported,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechRecognition({
    continuous: true,
    interimResults: true,
    autoRestart: true,
    lang: 'en-US'
  });

  // Update transcript buffer when new transcript comes in
  useEffect(() => {
    if (transcript) {
      transcriptBufferRef.current = transcript;
    }
  }, [transcript]);

  // Auto-start listening on mount
  useEffect(() => {
    if (isSpeechSupported) {
      // Request microphone permission and start listening
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          startListening();
        })
        .catch((error) => {
          console.error('Microphone permission denied:', error);
        });
    }
  }, [isSpeechSupported, startListening]);

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
  }, [messages, transcript]);

  const handleCut = async () => {
    const textToSend = transcriptBufferRef.current.trim();
    
    // If no transcript buffer, check if there's a last message
    if (!textToSend && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === 'user') {
        // Resend last user message
        await sendToAI(lastMessage.text);
        return;
      }
    }

    if (!textToSend) {
      return;
    }

    // Stop listening temporarily while processing
    stopListening();
    setIsLoading(true);

    // Clear the transcript buffer
    transcriptBufferRef.current = '';
    resetTranscript();

    // Send to AI
    await sendToAI(textToSend);

    // Resume listening after a short delay
    setTimeout(() => {
      startListening();
    }, 500);
  };

  const sendToAI = async (textToSend) => {
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
    // Clear the transcript buffer
    transcriptBufferRef.current = '';
    resetTranscript();
    // Keep listening - just clear the buffer
  };

  const handleTextSend = async (text) => {
    if (!text.trim()) return;

    // Temporarily stop listening while sending text
    stopListening();
    setIsLoading(true);

    await sendToAI(text);

    // Resume listening after a short delay
    setTimeout(() => {
      startListening();
    }, 500);
  };

  // Toggle listening (for future use with a button)
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
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

      {speechError && (
        <div className="error-banner">
          <span>⚠️ {speechError}</span>
          {!isSpeechSupported && (
            <span className="error-hint">Please use Chrome or Edge browser.</span>
          )}
        </div>
      )}

      <main className="app-main">
        <div className="chat-container">
          <MessageList 
            messages={messages}
            currentTranscript={transcript}
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
        hasTranscript={!!transcript.trim()}
      />

      <TextInput
        onSend={handleTextSend}
        disabled={isLoading}
      />
    </div>
  );
}

export default App;
