import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const DiaryEntry: React.FC = () => {
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const [text, setText] = useState<string>("");
  const [entries, setEntries] = useState<{ [date: string]: string }>({}); // Stores diary entries

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return (
      <span>Error: Your browser does not support speech recognition.</span>
    );
  }

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      alert("You have been logged out.");
      window.location.reload(); // Optional: Redirect to login page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setDate(newDate);
    setText(entries[newDate] || "");
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSave = () => {
    if (text.trim()) {
      setEntries((prev) => ({
        ...prev,
        [date]: text.trim(),
      }));
      alert("Entry saved!");
    } else {
      alert("Cannot save empty entry.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Log Out Button */}
      <button
        onClick={handleLogOut}
        className="absolute top-4 right-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
      >
        Log Out
      </button>

      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="date" className="text-sm font-medium text-gray-600">
              Date:
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={handleDateChange}
              className="border border-gray-300 rounded-lg p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium text-gray-600">Mic:</p>
            <span
              className={`text-sm font-medium ${
                listening ? "text-green-500" : "text-red-500"
              }`}
            >
              {listening ? "Open" : "Close"}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={handleStartListening}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-xs border border-gray-400"
              >
                Start
              </button>
              <button
                onClick={handleStopListening}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-xs border border-gray-400"
              >
                Stop
              </button>
            </div>
          </div>
        </div>

        <textarea
          className="w-full h-[60vh] resize-none border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="How do you feel today? Write your thoughts here..."
          value={text}
          onChange={handleTextChange}
        ></textarea>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiaryEntry;
