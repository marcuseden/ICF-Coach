// ElevenLabs Voice Integration for ICF Coach

export const ELEVENLABS_API_KEY = 'sk_df90556ebec37bbcd61e3f2c06fb058bbcb625f2b54c9ed0';

export interface VoiceConfig {
  voiceId?: string;
  modelId?: string;
  stability?: number;
  similarityBoost?: number;
}

// Default voice settings optimized for coaching
export const DEFAULT_VOICE_CONFIG: VoiceConfig = {
  voiceId: 'EXAVITQu4vr4xnSDxMaL', // Sarah - warm, empathetic female voice
  modelId: 'eleven_monolingual_v1',
  stability: 0.5,
  similarityBoost: 0.75,
};

export async function textToSpeech(
  text: string,
  config: VoiceConfig = DEFAULT_VOICE_CONFIG
): Promise<ArrayBuffer> {
  const voiceId = config.voiceId || DEFAULT_VOICE_CONFIG.voiceId;
  
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text,
        model_id: config.modelId || DEFAULT_VOICE_CONFIG.modelId,
        voice_settings: {
          stability: config.stability ?? DEFAULT_VOICE_CONFIG.stability,
          similarity_boost: config.similarityBoost ?? DEFAULT_VOICE_CONFIG.similarityBoost,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`ElevenLabs API error: ${response.statusText}`);
  }

  return response.arrayBuffer();
}

export function playAudio(audioBuffer: ArrayBuffer): HTMLAudioElement {
  const blob = new Blob([audioBuffer], { type: 'audio/mpeg' });
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  audio.play();
  
  // Clean up URL after playback
  audio.onended = () => {
    URL.revokeObjectURL(url);
  };
  
  return audio;
}

export async function speakText(
  text: string,
  config?: VoiceConfig
): Promise<HTMLAudioElement> {
  const audioBuffer = await textToSpeech(text, config);
  return playAudio(audioBuffer);
}

// Available voice IDs for different coaching styles
export const COACH_VOICES = {
  sarah: 'EXAVITQu4vr4xnSDxMaL', // Warm, empathetic female
  adam: '21m00Tcm4TlvDq8ikWAM', // Calm, grounded male
  bella: 'ErXwobaYiN019PkySvjV', // Professional, clear female
  josh: 'TxGEqnHWrfWFTfGW9XjX', // Friendly, approachable male
};

