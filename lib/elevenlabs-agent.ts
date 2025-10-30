// ElevenLabs Conversational AI Agent Integration

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

  constructor(agentId?: string, apiKey?: string) {
    const config = getElevenLabsConfig();
    this.apiKey = apiKey || config.apiKey || '';
    this.agentId = agentId || config.agentId || '';

    if (!this.apiKey || !this.agentId) {
      throw new Error('ElevenLabs API key and Agent ID are required');
    }
  }

  // Initialize conversation with the agent
  async startConversation(): Promise<string> {
    try {
      console.log('🔌 Starting ElevenLabs conversation...');
      console.log('Agent ID:', this.agentId?.substring(0, 20) + '...');
      
      const response = await fetch(
        `https://api.elevenlabs.io/v1/convai/conversation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': this.apiKey,
          },
          body: JSON.stringify({
            agent_id: this.agentId,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('ElevenLabs API Error:', errorText);
        throw new Error(`Failed to start conversation: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      this.sessionId = data.conversation_id;
      
      if (!this.sessionId) {
        throw new Error('No conversation ID returned from API');
      }
      
      console.log('✅ Conversation started:', this.sessionId.substring(0, 20) + '...');
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
  ): void {
    if (!this.sessionId) {
      throw new Error('Must start conversation before connecting WebSocket');
    }

    const wsUrl = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${this.agentId}&conversation_id=${this.sessionId}`;
    
    console.log('🔌 Connecting to WebSocket...');
    
    this.ws = new WebSocket(wsUrl);
    this.ws.binaryType = 'arraybuffer';

    this.ws.onopen = () => {
      console.log('✅ Connected to ElevenLabs agent via WebSocket');
    };

    this.ws.onmessage = (event) => {
      if (typeof event.data === 'string') {
        try {
          const data = JSON.parse(event.data);
          console.log('📨 Received message:', data);
          if (data.type === 'agent_response' || data.message) {
            onMessage(data.content || data.message || data.text);
          }
        } catch (e) {
          console.error('Failed to parse WebSocket message:', e);
        }
      } else {
        // Audio data (ArrayBuffer)
        console.log('🔊 Received audio data:', event.data.byteLength, 'bytes');
        onMessage('', event.data);
      }
    };

    this.ws.onerror = (error) => {
      console.error('❌ WebSocket error:', error);
      if (onError) onError(new Error('WebSocket connection failed'));
    };

    this.ws.onclose = (event) => {
      console.log('🔌 WebSocket connection closed:', event.code, event.reason);
    };
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

    this.ws.send(audioData);
  }

  // End conversation
  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = undefined;
    }
  }

  getSessionId(): string | undefined {
    return this.sessionId;
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

