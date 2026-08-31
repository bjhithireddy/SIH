import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  X, 
  ArrowRight, 
  ShieldAlert, 
  Navigation, 
  Truck, 
  Hospital, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { 
  createSpeechRecognition, 
  isSpeechRecognitionSupported, 
  speakText 
} from '../../utils/speechUtils';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCommandRecognized?: (command: string) => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  onCommandRecognized,
}) => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [statusMessage, setStatusMessage] = useState('Tap the microphone to speak');
  const [feedbackResponse, setFeedbackResponse] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setIsSupported(isSpeechRecognitionSupported());
  }, []);

  useEffect(() => {
    if (isOpen && isSupported) {
      startListening();
    } else {
      stopListening();
    }

    return () => {
      stopListening();
    };
  }, [isOpen]);

  const handleCommand = (cmd: string) => {
    const text = cmd.toLowerCase().trim();
    if (!text) return;

    if (onCommandRecognized) {
      onCommandRecognized(cmd);
    }

    // Smart Driver Command Interpreter
    if (text.includes('hospital') || text.includes('medical') || text.includes('doctor') || text.includes('अस्पताल') || text.includes('হাসপাতাল')) {
      const resp = 'Finding nearest hospital. City General Hospital is 2 km away and open 24 hours.';
      setFeedbackResponse(resp);
      speakText(resp, language);
      setTimeout(() => {
        navigate('/driver/sos');
        onClose();
      }, 2200);
    } else if (text.includes('police') || text.includes('patrol') || text.includes('सुरक्षा') || text.includes('পুলিশ')) {
      const resp = 'Navigating to Emergency Help. Highway Patrol Station 4 is 5 km away.';
      setFeedbackResponse(resp);
      speakText(resp, language);
      setTimeout(() => {
        navigate('/driver/sos');
        onClose();
      }, 2200);
    } else if (text.includes('map') || text.includes('route') || text.includes('navigation') || text.includes('रास्ता') || text.includes('পথ')) {
      const resp = 'Opening live route map. Route is clear with next turn right in 500 meters.';
      setFeedbackResponse(resp);
      speakText(resp, language);
      setTimeout(() => {
        navigate('/driver/route');
        onClose();
      }, 2200);
    } else if (text.includes('delivery') || text.includes('start') || text.includes('warehouse') || text.includes('ডেলিভারি')) {
      const resp = 'Opening delivery mode for ABC Warehouse Guwahati.';
      setFeedbackResponse(resp);
      speakText(resp, language);
      setTimeout(() => {
        navigate('/driver/delivery');
        onClose();
      }, 2200);
    } else if (text.includes('sos') || text.includes('help') || text.includes('emergency') || text.includes('मदद') || text.includes('সহায়')) {
      const resp = 'Emergency SOS mode activated. Alerting nearest highway patrol and control room.';
      setFeedbackResponse(resp);
      speakText(resp, language);
      setTimeout(() => {
        navigate('/driver/sos');
        onClose();
      }, 2200);
    } else if (text.includes('traffic') || text.includes('weather') || text.includes('condition') || text.includes('alert')) {
      const resp = 'Route condition update: Highway 27 is clear. Guwahati checkpoint is 15 minutes away with moderate commercial traffic.';
      setFeedbackResponse(resp);
      speakText(resp, language);
    } else {
      const resp = `Command received: "${cmd}". Routing to live navigation.`;
      setFeedbackResponse(resp);
      speakText(resp, language);
    }
  };

  const startListening = () => {
    if (!isSpeechRecognitionSupported()) {
      setStatusMessage('Speech recognition not available on this device.');
      return;
    }

    setTranscript('');
    setFeedbackResponse(null);
    setStatusMessage('Listening... Speak into your microphone');
    setIsListening(true);

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      recognitionRef.current = createSpeechRecognition(
        (recognizedText: string, isFinal: boolean) => {
          setTranscript(recognizedText);
          if (isFinal && recognizedText.trim()) {
            setStatusMessage('Processing command...');
            handleCommand(recognizedText);
          }
        },
        (errorMsg: string) => {
          setStatusMessage(errorMsg);
          setIsListening(false);
        },
        () => {
          setIsListening(false);
        },
        language
      );

      recognitionRef.current?.start();
    } catch (err) {
      console.warn('Speech recognition start error:', err);
      setIsListening(false);
      setStatusMessage('Microphone access ready. Tap to retry.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsListening(false);
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
      setStatusMessage('Paused. Tap microphone to speak again.');
    } else {
      startListening();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 flex flex-col items-center text-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          aria-label="Close voice assistant"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="flex items-center gap-2 mb-4 text-govblue-700 font-bold text-xs uppercase tracking-widest font-mono">
          <Sparkles className="w-4 h-4 text-sky-500 animate-spin" />
          <span>LogiDrive Voice Assistant</span>
        </div>

        {/* Animated Big Microphone Button */}
        <div className="relative my-4">
          {isListening && (
            <>
              <div className="absolute inset-0 rounded-full bg-govblue-400/30 animate-ping" />
              <div className="absolute -inset-4 rounded-full bg-govblue-500/20 animate-pulse" />
            </>
          )}
          <button
            type="button"
            onClick={toggleListening}
            className={`relative w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-transform active:scale-95 cursor-pointer ${
              isListening
                ? 'bg-gradient-to-tr from-govblue-600 to-sky-500 text-white ring-4 ring-sky-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-2 border-slate-300'
            }`}
            aria-label={isListening ? 'Stop listening' : 'Start listening'}
          >
            {isListening ? (
              <Mic className="w-10 h-10 animate-bounce text-white" />
            ) : (
              <MicOff className="w-10 h-10 text-slate-500" />
            )}
          </button>
        </div>

        {/* Status Text */}
        <div className="font-extrabold text-navy-950 text-base mb-1">
          {isListening ? '🎙️ Listening to you...' : 'Tap to Start Speaking'}
        </div>
        <p className="text-xs text-slate-500 mb-4 font-medium px-4">
          {statusMessage}
        </p>

        {/* Live Transcript Display Box */}
        <div className="w-full min-h-[72px] bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-4 mb-4 flex items-center justify-center text-center">
          {transcript ? (
            <p className="text-base font-extrabold text-navy-900 leading-snug">
              “{transcript}”
            </p>
          ) : (
            <p className="text-xs text-slate-400 italic">
              Say something like: <strong className="text-slate-600 font-sans">“Find nearest hospital”</strong>, <strong className="text-slate-600 font-sans">“Go to map”</strong>, or <strong className="text-slate-600 font-sans">“Start delivery”</strong>
            </p>
          )}
        </div>

        {/* Feedback Response Box if recognized */}
        {feedbackResponse && (
          <div className="w-full bg-emerald-50 border border-emerald-300 rounded-2xl p-3.5 mb-4 text-left flex items-start gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider">AI Voice Response</div>
              <div className="text-xs text-emerald-800 font-medium mt-0.5">{feedbackResponse}</div>
            </div>
          </div>
        )}

        {/* Quick Suggestion Chips */}
        <div className="w-full pt-2 border-t border-slate-100">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
            Or Tap Quick Voice Commands:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => handleCommand('Find nearest hospital')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-govblue-50 hover:text-govblue-700 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Hospital className="w-3.5 h-3.5 text-rose-600" />
              <span>🏥 Nearest Hospital</span>
            </button>
            <button
              onClick={() => handleCommand('Go to map')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-govblue-50 hover:text-govblue-700 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-govblue-600" />
              <span>🗺️ Go to Map</span>
            </button>
            <button
              onClick={() => handleCommand('Start delivery')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-govblue-50 hover:text-govblue-700 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5 text-emerald-600" />
              <span>🚚 Start Delivery</span>
            </button>
            <button
              onClick={() => handleCommand('Help and SOS')}
              className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              <span>🚨 SOS Help</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
