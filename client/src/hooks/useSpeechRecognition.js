import { useState, useEffect, useRef, useCallback } from 'react';

const useSpeechRecognition = (options = {}) => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const [isSupported, setIsSupported] = useState(false);
  
  const recognitionRef = useRef(null);
  const continuousTranscriptRef = useRef('');
  const manualStopRef = useRef(false);

  // Check if browser supports Web Speech API
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);
    
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    // Initialize recognition
    const recognition = new SpeechRecognition();
    recognition.continuous = options.continuous !== false; // Default to true
    recognition.interimResults = options.interimResults !== false; // Default to true
    recognition.lang = options.lang || 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
      continuousTranscriptRef.current = '';
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      // Update continuous transcript
      if (finalTranscript) {
        continuousTranscriptRef.current += finalTranscript;
        setTranscript(continuousTranscriptRef.current.trim());
      } else if (interimTranscript) {
        // Show interim results appended to final transcript
        setTranscript((continuousTranscriptRef.current + interimTranscript).trim());
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      
      let errorMessage = 'Speech recognition error occurred.';
      switch (event.error) {
        case 'no-speech':
          errorMessage = 'No speech detected. Please try again.';
          // Auto-restart on no-speech (common in continuous mode)
          if (options.autoRestart !== false && recognition.continuous) {
            setTimeout(() => {
              if (recognitionRef.current) {
                try {
                  recognition.start();
                } catch (e) {
                  console.error('Error restarting recognition:', e);
                }
              }
            }, 1000);
          }
          break;
        case 'audio-capture':
          errorMessage = 'No microphone found. Please check your microphone.';
          setIsListening(false);
          break;
        case 'not-allowed':
          errorMessage = 'Microphone permission denied. Please allow microphone access.';
          setIsListening(false);
          break;
        case 'network':
          errorMessage = 'Network error. Please check your connection.';
          break;
        case 'aborted':
          // User or system stopped recognition - not an error
          return;
        default:
          errorMessage = `Speech recognition error: ${event.error}`;
      }
      
      setError(errorMessage);
    };

    recognition.onend = () => {
      setIsListening(false);
      
      // Auto-restart if continuous mode is enabled and not manually stopped
      if (options.autoRestart !== false && options.continuous !== false && !manualStopRef.current) {
        // Small delay before restarting
        setTimeout(() => {
          if (recognitionRef.current && !manualStopRef.current) {
            try {
              recognition.start();
            } catch (e) {
              // Recognition might already be starting or was manually stopped
              // This is expected behavior
            }
          }
        }, 500);
      }
      // Reset manual stop flag after processing
      manualStopRef.current = false;
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors on cleanup
        }
        recognitionRef.current = null;
      }
    };
  }, [options.continuous, options.interimResults, options.lang, options.autoRestart]);

  const startListening = useCallback(() => {
    if (!isSupported) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    if (recognitionRef.current && !isListening) {
      try {
        manualStopRef.current = false;
        continuousTranscriptRef.current = '';
        setTranscript('');
        setError(null);
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        setError('Failed to start speech recognition. Please try again.');
      }
    }
  }, [isSupported, isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        manualStopRef.current = true; // Mark as manual stop to prevent auto-restart
        recognitionRef.current.stop();
        setIsListening(false);
      } catch (error) {
        console.error('Error stopping recognition:', error);
      }
    }
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    continuousTranscriptRef.current = '';
    setTranscript('');
  }, []);

  return {
    transcript,
    isListening,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript
  };
};

export default useSpeechRecognition;

