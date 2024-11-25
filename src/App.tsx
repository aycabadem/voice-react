import * as React from "react";

import VoiceRecorder from "./components/VoiceRecorder";
import Dictaphone from "./components/Dictaphone";
import DiaryEntry from "./components/DiaryEntry";
import FirebaseAuth from "./components/FirebaseAuth";

function App() {
  return (
    <div>
      <FirebaseAuth />
      {/* <DiaryEntry /> */}
      {/* <VoiceRecorder />
      <Dictaphone /> */}
    </div>
  );
}

export default App;
