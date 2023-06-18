import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const signInWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Navigate to ChatRoom
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="p-12 bg-white rounded shadow-xl w-96">
        <h1 className="text-3xl font-bold mb-8">Sign In</h1>
        <div className="mb-4">
          <label className="block text-sm text-gray-00" for="email">
            Email
          </label>
          <input
            className="w-full px-5 py-3 mt-2 border border-gray-400 rounded outline-none focus:ring-2 focus:ring-indigo-400"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            id="email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm text-gray-00" for="password">
            Password
          </label>
          <input
            className="w-full px-5 py-3 mt-2 border border-gray-400 rounded outline-none focus:ring-2 focus:ring-indigo-400"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            id="password"
          />
        </div>
        <button
          className="w-full py-3 px-4 text-white bg-indigo-500 rounded mb-4 hover:bg-indigo-600"
          onClick={signInWithEmail}
        >
          Sign In with Email
        </button>
        <button
          className="w-full py-3 px-4 text-white bg-red-500 rounded hover:bg-red-600"
          onClick={signInWithGoogle}
        >
          Sign In with Google
        </button>
        <p className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-500 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
