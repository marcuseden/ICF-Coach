// ElevenLabs Conversational AI Agent Integration

export const ELEVENLABS_API_KEY = 'sk_df90556ebec37bbcd61e3f2c06fb058bbcb625f2b54c9ed0';
export const AGENT_ID = 'agent_8401k8tmvpwpfak9f6c3x6g4zgzv';

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

  constructor(agentId: string = AGENT_ID, apiKey: string = ELEVENLABS_API_KEY) {
    this.apiKey = apiKey;
    this.agentId = agentId;
  }

  // Initialize conversation with the agent
  async startConversation(): Promise<string> {
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
      throw new Error(`Failed to start conversation: ${response.statusText}`);
    }

    const data = await response.json();
    this.sessionId = data.conversation_id;
    
    if (!this.sessionId) {
      throw new Error('No conversation ID returned from API');
    }
    
    return this.sessionId;
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
    
    this.ws = new WebSocket(wsUrl);
    this.ws.binaryType = 'arraybuffer';

    this.ws.onopen = () => {
      console.log('✅ Connected to ElevenLabs agent');
    };

    this.ws.onmessage = (event) => {
      if (typeof event.data === 'string') {
        const data = JSON.parse(event.data);
        if (data.type === 'agent_response') {
          onMessage(data.content);
        }
      } else {
        // Audio data (ArrayBuffer)
        onMessage('', event.data);
      }
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      if (onError) onError(new Error('WebSocket connection failed'));
    };

    this.ws.onclose = () => {
      console.log('WebSocket connection closed');
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

