import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Navigate to ChatRoom
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="p-12 bg-white rounded shadow-xl w-96">
        <h1 className="text-3xl font-bold mb-8">Sign Up</h1>
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
          className="w-full py-3 px-4 text-white bg-indigo-500 rounded hover:bg-indigo-600"
          onClick={signUp}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default SignUp;
