// Web Speech API utilities for Text-to-Speech (TTS) and Speech-to-Text (STT)

export interface VoiceRecognitionState {
  isListening: boolean;
  transcript: string;
  isSupported: boolean;
  error?: string;
}

/**
 * Speaks the given text using browser SpeechSynthesis API.
 */
export const speakText = (text: string, lang: string = 'en-IN'): Promise<void> => {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis is not supported in this browser.');
      resolve();
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Clean text of markdown/emojis for cleaner speech
    const cleanText = text
      .replace(/[^\w\s\u0980-\u09FF\u0900-\u097F\uABC0-\uABFF,.:-]/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) {
      resolve();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95; // Slightly slower for clear driving instructions
    utterance.pitch = 1.0;

    // Map language code to BCP 47 tags
    const langMap: Record<string, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      as: 'as-IN',
      bn: 'bn-IN',
      mn: 'mni-IN',
    };

    const targetLang = langMap[lang] || lang || 'en-IN';
    utterance.lang = targetLang;

    // Pick appropriate voice if available
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find((v) => v.lang.startsWith(targetLang.split('-')[0]));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      resolve();
    };

    window.speechSynthesis.speak(utterance);
  });
};

/**
 * Checks if Speech Recognition is supported in the browser.
 */
export const isSpeechRecognitionSupported = (): boolean => {
  return typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
};

/**
 * Creates and initializes a SpeechRecognition instance.
 */
export const createSpeechRecognition = (
  onResult: (transcript: string, isFinal: boolean) => void,
  onError: (error: string) => void,
  onEnd: () => void,
  lang: string = 'en-IN'
): any => {
  if (!isSpeechRecognitionSupported()) {
    onError('Speech recognition is not supported in this browser.');
    return null;
  }

  const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = new SpeechRecognitionClass();

  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  const langMap: Record<string, string> = {
    en: 'en-IN',
    hi: 'hi-IN',
    as: 'as-IN',
    bn: 'bn-IN',
    mn: 'mni-IN',
  };

  recognition.lang = langMap[lang] || 'en-IN';

  recognition.onresult = (event: any) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    const currentText = finalTranscript || interimTranscript;
    onResult(currentText, Boolean(finalTranscript));
  };

  recognition.onerror = (event: any) => {
    console.warn('Speech recognition error:', event.error);
    let message = 'Could not recognize speech. Please try again.';
    if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
      message = 'Microphone permission denied. Please allow microphone access in browser settings.';
    } else if (event.error === 'no-speech') {
      message = 'No speech detected. Please speak into your microphone.';
    }
    onError(message);
  };

  recognition.onend = () => {
    onEnd();
  };

  return recognition;
};
