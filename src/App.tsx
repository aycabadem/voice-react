import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

import DiaryEntry from "./components/DiaryEntry";
import FirebaseAuth from "./components/FirebaseAuth";

function App() {
  const [user, setUser] = useState<null | object>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return <div>{user ? <DiaryEntry /> : <FirebaseAuth />}</div>;
}

export default App;
