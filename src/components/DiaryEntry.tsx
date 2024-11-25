import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const DiaryEntry: React.FC = () => {
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const [text, setText] = useState<string>("");

  // Speech Recognition
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Error</span>;
  }

  const handleStartListening = () => {
    SpeechRecognition.startListening({
      continuous: true,
      interimResults: true,
    });
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    if (transcript.trim()) {
      setText((prev) => `${prev} ${transcript.trim()}`);
      resetTranscript();
    }
  };

  const handleResetTranscript = () => {
    resetTranscript();
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        {/* date */}
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Date:
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={handleDateChange}
            className="w-full max-w-xs border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* text area */}
        <textarea
          className="w-full h-[60vh] resize-none border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="feelings"
          value={text}
          onChange={handleTextChange}
        ></textarea>

        {/* voice controls */}
        <div className="mt-6">
          <p className="text-lg font-medium mb-4">
            Mic:{" "}
            {listening ? (
              <span className="text-green-500">Open</span>
            ) : (
              <span className="text-red-500">Close</span>
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
        </div>
      </div>
    </div>
  );
};

export default DiaryEntry;
