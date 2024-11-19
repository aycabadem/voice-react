import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [savedTranscripts, setSavedTranscripts] = useState<string[]>([]);
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleStartListening = () => {
    SpeechRecognition.startListening();
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    if (transcript.trim()) {
      setSavedTranscripts((prev) => [...prev, transcript.trim()]);
      resetTranscript();
    }
  };

  const handleResetTranscript = () => {
    resetTranscript();
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-800 text-gray-200 rounded shadow-md max-w-md mx-auto">
      <p className="text-lg font-medium mb-4">
        Microphone:{" "}
        {listening ? (
          <span className="text-green-400">on</span>
        ) : (
          <span className="text-red-400">off</span>
        )}
      </p>
      <div className="flex space-x-3">
        <button
          onClick={handleStartListening}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded border border-gray-600"
        >
          Start
        </button>
        <button
          onClick={handleStopListening}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded border border-gray-600"
        >
          Stop
        </button>
        <button
          onClick={handleResetTranscript}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded border border-gray-600"
        >
          Reset
        </button>
      </div>
      <p className="mt-4 text-gray-400 text-sm">
        {transcript || "Your transcript will appear here."}
      </p>
      {/* saved transcripts */}
      <div className="mt-6 w-full">
        <h2 className="text-lg font-bold text-gray-300 mb-2">
          Saved Transcripts:
        </h2>
        {savedTranscripts.length > 0 ? (
          <ul className="space-y-2">
            {savedTranscripts.map((saved, index) => (
              <li
                key={index}
                className="p-2 bg-gray-700 rounded text-gray-200 text-sm border border-gray-600"
              >
                {index + 1}. {saved}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No transcripts saved yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dictaphone;
