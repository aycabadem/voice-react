import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const FirebaseAuth: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Sign in function
  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(""); // Reset error if login is successful
      alert("Successfully logged in!");
    } catch (err: any) {
      setError("Invalid email or password.");
    }
  };

  // Sign up function
  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError(""); // Reset error if sign-up is successful
      alert("Account created successfully!");
    } catch (err: any) {
      setError("Error creating account.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="flex justify-between">
          <button
            onClick={isSignUp ? handleSignUp : handleSignIn}
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </div>

        <div className="mt-4 text-center">
          <p>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-500 hover:underline"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FirebaseAuth;
