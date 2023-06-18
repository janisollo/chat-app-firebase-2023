import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ChatRoom from "./components/ChatRoom";
import SignOut from "./components/SignOut";
import UserProfile from "./components/UserProfile";

function App() {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <div className="App">
        <header>
          <SignOut />
        </header>
        <section>
          {user ? (
            <Routes>
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/" element={<ChatRoom />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<SignIn />} />
            </Routes>
          )}
        </section>
      </div>
    </Router>
  );
}

export default App;
