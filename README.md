# Voice-Enabled AI Chat Assistant

A voice-enabled chat assistant web application built with React that allows users to interact with an AI (similar to ChatGPT/Claude) through voice and text. The system continuously listens to the user's voice (and optionally another speaker's voice), transcribes the conversation, and enables the AI to provide helpful answers or suggestions.

## 📋 Project Overview

This is a personal-use application designed for local network deployment (single-user scenario). It functions as a real-time Q&A assistant where users can speak questions or have someone ask them questions, and by pressing a button, the system generates an AI-driven answer based on the recorded context.

### Key Features

- **Continuous Voice Transcription**: Real-time speech-to-text using Web Speech API
- **Dual-Speaker Support**: Captures speech from both the user and other speakers
- **AI-Powered Responses**: Integrates with AI models (OpenAI GPT or local models) for intelligent answers
- **Camera Integration**: Optional camera feed (local or Wi-Fi) for visual context
- **Chat Interface**: Modern chat-style UI with conversation history
- **Persistent Storage**: Conversation history saved locally (survives page refresh)
- **Mobile-Optimized**: Responsive design optimized for mobile devices

## 🎯 Current Implementation Status

### ✅ Completed
- **SRS Document**: Comprehensive Software Requirements Specification document created (`srsdocument.txt`)
- **Project Planning**: Requirements analysis and design documentation complete
- **README Documentation**: Complete project documentation with roadmap
- **Phase 1 - Project Setup**: 
  - ✅ React frontend application structure created
  - ✅ Node.js/Express backend structure created
  - ✅ Package.json files configured
  - ✅ Build tools and development scripts set up
  - ✅ Project folder structure established
  - ✅ Environment configuration and .gitignore created
  - ✅ Setup documentation created
  - ✅ **Node.js v24.11.0 installed**
  - ✅ **All dependencies installed** (root, server, client)

### ✅ Completed
- **Phase 2 - Basic UI Foundation**: 
  - ✅ Chat interface layout with header, message area, and controls
  - ✅ Message bubble components (user vs assistant)
  - ✅ Cut and Discard control buttons
  - ✅ Text input field with send button
  - ✅ Responsive mobile-first design
  - ✅ Loading states and placeholders
  - ✅ LocalStorage integration for message persistence
  - ✅ Status indicators (microphone, camera)

### 🚧 In Progress
- **Phase 3 - Voice Transcription**: Ready to begin implementation

### 📝 To Be Implemented

**Current Status**: Phase 1 and Phase 2 are **complete**. The basic UI foundation is implemented with a fully functional chat interface. Next step is Phase 3: Voice Transcription.

**What's Been Done**:
1. ✅ Analyzed the complete SRS document (214 lines)
2. ✅ Created comprehensive README with:
   - Project overview and features
   - Architecture design
   - Technology stack
   - Detailed 12-step implementation roadmap
   - Functional requirements checklist
   - Configuration guidelines
3. ✅ **Phase 1 Complete**:
   - React app structure with basic App component
   - Express backend server with health check endpoint
   - Development scripts for running both servers
   - Environment variable configuration
   - Setup documentation (SETUP.md)
   - **Node.js v24.11.0 installed via winget**
   - **All dependencies installed** (root: 30 packages, server: 125 packages, client: 1328 packages)

**What's Been Done (Phase 2)**:
4. ✅ **Phase 2 Complete**:
   - Created 6 React components (MessageList, MessageBubble, ControlButtons, TextInput, StatusIndicator)
   - Implemented chat interface with message bubbles (user right, assistant left)
   - Added Cut and Discard buttons with proper styling
   - Integrated text input with send functionality
   - Implemented localStorage for message persistence
   - Added loading states and animations
   - Mobile-responsive design with touch-friendly buttons
   - Connected to backend API for AI queries

**Next Steps**:
1. ✅ ~~Install dependencies~~ - **COMPLETE**
2. ✅ ~~Phase 2: Basic UI Foundation~~ - **COMPLETE**
3. Configure environment variables (create `server/.env` with OpenAI API key - see SETUP.md)
4. Begin implementing Phase 3: Voice Transcription (Web Speech API integration)

### 📝 To Be Implemented

#### Phase 1: Core Infrastructure ✅
- [x] Project setup (React app, backend server structure)
- [x] Basic UI layout and chat interface
- [x] State management setup
- [x] Local storage integration for persistence

#### Phase 2: Basic UI Foundation ✅
- [x] Chat interface layout (header, message area, controls)
- [x] Message bubble components (user vs assistant)
- [x] Cut and Discard control buttons
- [x] Text input field with send button
- [x] Responsive mobile-first design
- [x] Loading states and placeholders

#### Phase 3: Voice Input & Transcription
- [ ] Speech Recognition module (Web Speech API integration)
- [ ] Continuous listening functionality
- [ ] Real-time transcript display
- [ ] Audio controller for managing listening state
- [ ] Dual-speaker transcription support

#### Phase 3: Chat Interface ✅ (Merged into Phase 2)
- [x] Chat window component with message bubbles
- [x] Message list with user/assistant distinction
- [x] Text input option (alternative to voice)
- [x] Cut/Discard button controls
- [x] Conversation history display

#### Phase 4: AI Integration
- [ ] Backend API server (Node.js/Express)
- [ ] AI Service module for querying AI models
- [ ] Context management (sending recent conversation history)
- [ ] Response handling and display
- [ ] Error handling for AI API failures

#### Phase 5: Camera Integration
- [ ] Camera controller module
- [ ] Local camera access (getUserMedia)
- [ ] Remote camera feed support (Wi-Fi camera)
- [ ] Snapshot capture on query trigger
- [ ] Camera status indicators

#### Phase 6: Advanced Features
- [ ] Hardware button support (volume button on mobile)
- [ ] Performance optimizations
- [ ] Error handling and user feedback
- [ ] Mobile-specific optimizations

## 🏗️ Architecture

### High-Level Components

1. **Frontend (React)**
   - UI Layer: Chat components, buttons, indicators
   - Control Layer: Audio controller, camera controller, chat manager
   - State Management: React Context/State for conversation and UI state

2. **Backend (Node.js/Express)**
   - AI Service: Interfaces with AI models (OpenAI API or local models)
   - Storage Service: Manages conversation persistence (optional, can use localStorage)
   - Camera Proxy: Handles remote camera feeds (if needed)

### Data Flow

1. **Voice Input** → Speech Recognition → Transcript Buffer → UI Display
2. **User Triggers Query** (Cut button) → Finalize transcript → Send to AI Service
3. **AI Processing** → Format context → Call AI API → Generate response
4. **Response Delivery** → Display in chat → Save to history → Resume listening
5. **Camera Snapshot** → Capture on Cut → Store/Display (optional AI processing)

## 🛠️ Technology Stack

### Frontend
- **React**: UI framework with functional components and hooks
- **Web Speech API**: Browser-based speech recognition
- **Tailwind CSS** (or CSS Modules): Styling
- **LocalStorage/IndexedDB**: Client-side persistence

### Backend
- **Node.js + Express**: Server framework
- **OpenAI API** (or alternative): AI model integration
- **SQLite** (optional): Server-side storage (or use localStorage)

### APIs & Services
- **Web Speech API**: Speech-to-text transcription
- **MediaDevices API**: Camera/microphone access
- **AI Model API**: OpenAI GPT-3.5/4 or local model

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Modern browser with Web Speech API support (Chrome recommended)
- Microphone access
- (Optional) Camera access or Wi-Fi camera

### Quick Start

**Windows:**
- Double-click `start.bat` or run `.\start.ps1` in PowerShell
- To stop: Double-click `stop.bat` or run `.\stop.ps1`

**Linux/Mac:**
```bash
chmod +x start.sh stop.sh
./start.sh
# To stop: ./stop.sh
```

**Manual Start:**
```bash
# Install dependencies
npm run install-all

# Start both servers
npm run dev
```

The scripts will automatically:
- Check for Node.js installation
- Install missing dependencies
- Start both frontend (port 3000) and backend (port 3001) servers

## 🚀 Usage

1. **Start the Application**: Open the app in a supported browser
2. **Grant Permissions**: Allow microphone (and camera if using) access
3. **Start Speaking**: The system continuously listens and transcribes
4. **Trigger AI Query**: Press "Cut" button when you want an AI response
5. **View Response**: AI answer appears in the chat interface
6. **Continue Conversation**: Keep speaking for follow-up questions

### Controls

- **Cut/Submit Button**: Sends current transcript to AI for response
- **Discard Button**: Clears current transcript without sending to AI
- **Text Input**: Alternative to voice input (type questions)
- **Camera Toggle**: Enable/disable camera feed

## 📋 Functional Requirements (from SRS)

### Voice Input & Transcription
- [ ] FR1: Continuous Listening
- [ ] FR2: Dual-Speaker Transcription
- [ ] FR3: Voice Activation Control
- [ ] FR4: Transcription Display

### Chat Interface & AI Interaction
- [ ] FR5: Chat Interface Layout
- [ ] FR6: Text Input Option
- [ ] FR7: AI Query Trigger (Context Cut)
- [ ] FR8: AI Response Generation
- [ ] FR9: AI Response via Voice (Optional - not planned)

### Context Management
- [ ] FR10: Discard Transcript
- [ ] FR11: Continuous Context vs Cut

### Camera Integration
- [ ] FR12: Camera Feed Option (Local or Remote)
- [ ] FR13: Snapshot on Query
- [ ] FR14: Camera Status Indicator
- [ ] FR15: Always-On Mode

### Session Management
- [ ] FR16: Conversation History Display
- [ ] FR17: Persistent Storage of Chats
- [ ] FR18: Multiple Sessions (Optional)

### Error Handling
- [ ] FR19: Speech Recognition Feedback
- [ ] FR20: AI Response Errors
- [ ] FR21: Camera Errors
- [ ] FR22: Performance Adjustments

## 🔧 Configuration

### Environment Variables (to be created)

```env
# Backend .env
OPENAI_API_KEY=your_api_key_here
PORT=3001
CAMERA_URL=http://your-camera-ip/snapshot.jpg  # Optional
```

### Camera Configuration

- **Local Camera**: Automatically detected via browser
- **Remote Camera**: Configure URL in settings (e.g., `http://192.168.1.100/snapshot.jpg`)

## 📝 Development Roadmap

### Step 1: Project Setup ✅
- [x] Create project structure
- [x] Create README documentation
- [x] Analyze SRS requirements
- [ ] Initialize React app (create-react-app or Vite)
- [ ] Initialize Node.js backend (Express)
- [ ] Set up build tools and scripts
- [ ] Configure development environment

### Step 2: Basic UI Foundation
- [ ] Create main App component structure
- [ ] Design chat interface layout (header, message area, controls)
- [ ] Implement message bubble components (user vs assistant)
- [ ] Add control buttons (Cut, Discard) with styling
- [ ] Add text input field with send button
- [ ] Implement responsive design (mobile-first)
- [ ] Add loading states and placeholders

### Step 3: State Management Setup
- [ ] Create React Context for chat state
- [ ] Implement ChatManager hook/context
- [ ] Define message data structure
- [ ] Set up transcript buffer state
- [ ] Add localStorage integration
- [ ] Implement save/load history functions
- [ ] Test persistence on page refresh

### Step 4: Voice Transcription
- [ ] Create SpeechRecognizer module/hook
- [ ] Integrate Web Speech API
- [ ] Implement continuous listening mode
- [ ] Handle interim and final results
- [ ] Display real-time transcripts in UI
- [ ] Add listening status indicator
- [ ] Handle speech recognition errors
- [ ] Implement auto-restart on silence

### Step 5: Audio Controller
- [ ] Create AudioController module
- [ ] Implement toggle listening functionality
- [ ] Handle Cut action (finalize transcript, send to AI)
- [ ] Handle Discard action (clear buffer)
- [ ] Manage listening state transitions
- [ ] Coordinate between SpeechRecognizer and ChatManager

### Step 6: Backend Setup
- [ ] Create Express server structure
- [ ] Set up CORS middleware
- [ ] Create API route structure
- [ ] Add environment variable configuration
- [ ] Set up error handling middleware
- [ ] Create health check endpoint

### Step 7: AI Integration
- [ ] Create AIService module
- [ ] Implement OpenAI API integration (or alternative)
- [ ] Create /api/query endpoint
- [ ] Format conversation context for AI
- [ ] Handle AI API responses
- [ ] Implement error handling for AI failures
- [ ] Add response streaming (optional enhancement)

### Step 8: Chat Integration
- [ ] Connect frontend to backend API
- [ ] Implement query sending on Cut action
- [ ] Display AI responses in chat
- [ ] Update conversation history after responses
- [ ] Handle loading states during AI processing
- [ ] Add retry mechanism for failed requests

### Step 9: Camera Integration (Local)
- [ ] Create CameraController module
- [ ] Implement getUserMedia for local camera
- [ ] Display camera preview (optional)
- [ ] Capture snapshot functionality
- [ ] Store snapshots with messages
- [ ] Add camera status indicator
- [ ] Handle camera permission errors

### Step 10: Camera Integration (Remote)
- [ ] Add remote camera URL configuration
- [ ] Implement snapshot fetching from IP camera
- [ ] Handle camera connection errors
- [ ] Add camera source toggle (local vs remote)
- [ ] Implement camera proxy if needed (RTSP)

### Step 11: Advanced Features
- [ ] Add hardware button support (if possible)
- [ ] Implement performance optimizations
- [ ] Add error boundaries
- [ ] Improve mobile UX
- [ ] Add keyboard shortcuts
- [ ] Implement conversation export

### Step 12: Polish & Testing
- [ ] Comprehensive error handling
- [ ] User feedback improvements
- [ ] Performance testing and optimization
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Documentation updates

## 🐛 Known Limitations

- **Browser Support**: Web Speech API works best in Chrome/Edge. Safari has limited support.
- **Hardware Buttons**: Volume button detection on mobile may not work in standard web apps (requires PWA or native wrapper)
- **Internet Required**: Web Speech API typically requires internet connection (uses cloud service)
- **AI API**: Requires API key for cloud services or local model setup for offline use

## 🔒 Security & Privacy

- API keys stored on backend (never exposed to client)
- All processing happens locally or on trusted services
- Conversation history stored locally (browser storage)
- No user authentication (single-user local use)
- HTTPS/localhost required for media device access

## 📚 References

- [SRS Document](./srsdocument.txt) - Complete Software Requirements Specification
- [Web Speech API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [MediaDevices API](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

## 📄 License

This project is for personal use. See LICENSE file for details.

## 🤝 Contributing

This is a personal project, but suggestions and improvements are welcome!

---

**Status**: 🚧 Early Development - Planning Phase Complete, Implementation Starting

**Last Updated**: 2024

