// ElevenLabs Conversational AI Agent Integration
// Cross-platform support for Web, iOS, and Android

// Get API keys from environment variables
const getElevenLabsConfig = () => {
  const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY || process.env.ELEVENLABS_API_KEY;
  const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || process.env.ELEVENLABS_AGENT_ID;

  if (!apiKey || !agentId) {
    console.error('ElevenLabs configuration missing:', {
      hasApiKey: !!apiKey,
      hasAgentId: !!agentId,
    });
  }

  return { apiKey, agentId };
};

// Detect platform and audio capabilities
const detectPlatform = () => {
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : '';
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  const isAndroid = /android/.test(userAgent);
  const isMobile = isIOS || isAndroid;
  
  return {
    isIOS,
    isAndroid,
    isMobile,
    isWeb: !isMobile
  };
};

export interface ConversationConfig {
  agentId?: string;
  sessionId?: string;
}

export interface Message {
  role: 'agent' | 'user';
  content: string;
  timestamp: Date;
  audioUrl?: string;
}

export class ElevenLabsCoachAgent {
  private apiKey: string;
  private agentId: string;
  private sessionId?: string;
  private ws?: WebSocket;
  private audioContext?: AudioContext;
  private mediaStream?: MediaStream;
  private audioWorkletNode?: AudioWorkletNode;
  private scriptProcessorNode?: ScriptProcessorNode;
  private isRecordingActive: boolean = false;
  private platform = detectPlatform();
  private audioPlaybackQueue: AudioBufferSourceNode[] = [];

  constructor(agentId?: string, apiKey?: string) {
    const config = getElevenLabsConfig();
    this.apiKey = apiKey || config.apiKey || '';
    this.agentId = agentId || config.agentId || '';

    if (!this.apiKey || !this.agentId) {
      throw new Error('ElevenLabs API key and Agent ID are required');
    }

    console.log('🌍 Platform detected:', this.platform);
  }

  // Initialize conversation - for ElevenLabs Conversational AI, we just generate a session ID
  async startConversation(): Promise<string> {
    try {
      console.log('🔌 Starting ElevenLabs conversation...');
      console.log('Agent ID:', this.agentId?.substring(0, 20) + '...');
      
      // Generate a unique session ID for this conversation
      this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      console.log('✅ Session ID generated:', this.sessionId.substring(0, 20) + '...');
      return this.sessionId;
    } catch (error) {
      console.error('❌ Failed to start ElevenLabs conversation:', error);
      throw error;
    }
  }

  // Connect to WebSocket for real-time voice conversation
  connectWebSocket(
    onMessage: (message: string, audio?: ArrayBuffer) => void,
    onError?: (error: Error) => void
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.sessionId) {
        reject(new Error('Must start conversation before connecting WebSocket'));
        return;
      }

      // ElevenLabs Conversational AI WebSocket URL - direct connection with agent_id and API key
      const wsUrl = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${this.agentId}`;
      
      console.log('🔌 Connecting to WebSocket:', wsUrl);
      console.log('🔑 Using API Key:', this.apiKey.substring(0, 10) + '...');
      
      // Create WebSocket with API key in URL for authentication
      const authenticatedWsUrl = `${wsUrl}&xi_api_key=${this.apiKey}`;
      this.ws = new WebSocket(authenticatedWsUrl);
      this.ws.binaryType = 'arraybuffer';

      this.ws.onopen = () => {
        console.log('✅ Connected to ElevenLabs agent via WebSocket');
        
        // Wait a moment for WebSocket to be fully ready
        setTimeout(() => {
          if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            // Send initial configuration message
            this.ws.send(JSON.stringify({
              type: 'conversation_initiation_client_data',
              conversation_config_override: {
                agent: {
                  prompt: {
                    prompt: 'You are a professional ICF-certified life coach. Use open-ended questions, active listening, and help the user explore their goals and challenges.'
                  }
                }
              }
            }));
            console.log('📤 Sent conversation initialization');
            resolve();
          } else {
            reject(new Error('WebSocket not in OPEN state'));
          }
        }, 100);
      };

    this.ws.onmessage = async (event) => {
      if (typeof event.data === 'string') {
        try {
          const data = JSON.parse(event.data);
          console.log('📨 Received message type:', data.type);
          console.log('📨 Full message data:', JSON.stringify(data, null, 2));
          
          // Handle different message types from ElevenLabs
          switch (data.type) {
            case 'conversation_initiation_metadata':
              console.log('✅ Conversation initialized:', data);
              // Trigger initial greeting by sending empty audio chunk
              setTimeout(() => {
                if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                  console.log('👋 Triggering initial greeting...');
                  // Send a small silent audio chunk to prompt the agent to speak
                  const silentChunk = new Int16Array(1600); // 100ms of silence at 16kHz
                  const base64Silent = this.arrayBufferToBase64(silentChunk.buffer as ArrayBuffer);
                  this.ws.send(JSON.stringify({
                    type: 'user_audio_chunk',
                    audio_chunk: base64Silent
                  }));
                }
              }, 500);
              break;
            case 'audio':
              // Audio chunk received - decode and play
              console.log('🎵 Audio event received:', data);
              if (data.audio_event?.audio_base_64) {
                console.log('🔊 Decoding and playing audio...');
                const audioBuffer = this.base64ToArrayBuffer(data.audio_event.audio_base_64);
                await this.playAudioChunk(audioBuffer);
                onMessage('', audioBuffer);
              }
              break;
            case 'interruption':
              console.log('⏸️ Agent interrupted');
              break;
            case 'ping':
              // Respond to ping with pong
              this.ws?.send(JSON.stringify({ type: 'pong', event_id: data.event_id }));
              break;
            case 'user_transcript':
              console.log('👤 User said:', data.user_transcription);
              onMessage(data.user_transcription);
              break;
            case 'agent_response':
            case 'agent_response_correction':
              console.log('🤖 Agent response:', data.agent_response || data);
              if (data.agent_response) {
                onMessage(data.agent_response);
              }
              break;
            default:
              console.log('📨 Received message:', data);
          }
        } catch (e) {
          console.error('Failed to parse WebSocket message:', e);
        }
      } else {
        // Binary audio data (ArrayBuffer)
        console.log('🔊 Received binary audio data:', event.data.byteLength, 'bytes');
        await this.playAudioChunk(event.data);
        onMessage('', event.data);
      }
      };

      this.ws.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
        reject(new Error('WebSocket connection failed'));
        if (onError) onError(new Error('WebSocket connection failed'));
      };

      this.ws.onclose = (event) => {
        console.log('🔌 WebSocket connection closed:', event.code, event.reason);
      };
    });
  }

  // Helper to convert base64 to ArrayBuffer
  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  // Helper to play audio chunks (PCM16 format)
  private async playAudioChunk(audioBuffer: ArrayBuffer): Promise<void> {
    try {
      if (!this.audioContext) {
        // @ts-ignore - Safari uses webkitAudioContext
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContextClass({ sampleRate: 16000 });
      }

      // Resume audio context if suspended (iOS requirement)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      // Convert PCM16 ArrayBuffer to Float32Array for Web Audio API
      const pcm16 = new Int16Array(audioBuffer);
      const float32 = new Float32Array(pcm16.length);
      
      for (let i = 0; i < pcm16.length; i++) {
        // Convert PCM16 to Float32 (-1.0 to 1.0)
        float32[i] = pcm16[i] / 32768.0;
      }

      // Create audio buffer
      const audioBufferSource = this.audioContext.createBuffer(1, float32.length, 16000);
      audioBufferSource.getChannelData(0).set(float32);

      // Create source and play
      const source = this.audioContext.createBufferSource();
      source.buffer = audioBufferSource;
      source.connect(this.audioContext.destination);
      source.start();
      
      console.log('🔊 Playing audio chunk:', float32.length, 'samples');
    } catch (error) {
      console.error('❌ Failed to play audio chunk:', error);
    }
  }

  // Send text message to agent
  async sendMessage(text: string): Promise<void> {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket not connected');
    }

    this.ws.send(
      JSON.stringify({
        type: 'user_message',
        content: text,
      })
    );
  }

  // Send audio to agent (from user's microphone)
  sendAudio(audioData: ArrayBuffer): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket not connected');
    }

    // ElevenLabs expects audio as base64 encoded in a JSON message
    const base64Audio = this.arrayBufferToBase64(audioData);
    this.ws.send(JSON.stringify({
      type: 'user_audio_chunk',
      audio_chunk: base64Audio
    }));
  }

  // Helper to convert ArrayBuffer to base64
  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  // Start recording audio from user's microphone (cross-platform)
  async startRecording(): Promise<void> {
    try {
      console.log('🎤 Starting microphone recording...');
      
      // Request microphone access
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 16000,
          channelCount: 1
        } 
      });

      // Initialize audio context if not exists
      if (!this.audioContext) {
        // @ts-ignore - Safari uses webkitAudioContext
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContextClass({ sampleRate: 16000 });
      }

      // Resume audio context (required for iOS)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      const source = this.audioContext.createMediaStreamSource(this.mediaStream);
      
      // Use ScriptProcessorNode for better cross-platform support
      // (AudioWorklet not supported on all mobile browsers)
      const bufferSize = 2048;
      this.scriptProcessorNode = this.audioContext.createScriptProcessor(bufferSize, 1, 1);

      this.scriptProcessorNode.onaudioprocess = (event) => {
        if (!this.isRecordingActive) return;

        const inputData = event.inputBuffer.getChannelData(0);
        
        // Convert Float32Array to PCM16 (Int16Array)
        const pcm16 = this.floatToPCM16(inputData);
        
        // Send audio to ElevenLabs (convert to ArrayBuffer)
        const buffer = pcm16.buffer as ArrayBuffer;
        this.sendAudio(buffer);
      };

      // Connect the nodes
      source.connect(this.scriptProcessorNode);
      this.scriptProcessorNode.connect(this.audioContext.destination);

      this.isRecordingActive = true;
      console.log('✅ Recording started successfully');
    } catch (error) {
      console.error('❌ Failed to start recording:', error);
      throw error;
    }
  }

  // Stop recording
  stopRecording(): void {
    console.log('🛑 Stopping recording...');
    this.isRecordingActive = false;

    if (this.scriptProcessorNode) {
      this.scriptProcessorNode.disconnect();
      this.scriptProcessorNode = undefined;
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = undefined;
    }

    console.log('✅ Recording stopped');
  }

  // Convert Float32Array to PCM16 (Int16Array)
  private floatToPCM16(float32Array: Float32Array): Int16Array {
    const pcm16 = new Int16Array(float32Array.length);
    for (let i = 0; i < float32Array.length; i++) {
      // Clamp values to [-1, 1] and convert to 16-bit integers
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return pcm16;
  }

  // End conversation
  disconnect(): void {
    this.stopRecording();
    
    if (this.ws) {
      this.ws.close();
      this.ws = undefined;
    }
    
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = undefined;
    }
  }

  getSessionId(): string | undefined {
    return this.sessionId;
  }

  isRecording(): boolean {
    return this.isRecordingActive;
  }

  // Get platform information
  getPlatform() {
    return this.platform;
  }
}

// Helper function to record audio from user's microphone
export async function startAudioRecording(): Promise<MediaRecorder> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream, {
    mimeType: 'audio/webm',
  });

  return mediaRecorder;
}

// Helper to play audio response
export function playAudioResponse(audioBuffer: ArrayBuffer): HTMLAudioElement {
  const blob = new Blob([audioBuffer], { type: 'audio/mpeg' });
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  audio.play();

  audio.onended = () => {
    URL.revokeObjectURL(url);
  };

  return audio;
}

