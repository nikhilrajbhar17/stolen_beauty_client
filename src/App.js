import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useGetUserID } from "./hooks/useGetUserID";

import { Home } from "./pages/home";
import { One } from "./pages/one";
import { Two } from "./pages/two";
import { Three } from "./pages/three";
import { Four } from "./pages/four";
import { Five } from "./pages/five";
import { Authenti } from "./pages/authentication";
import { Result } from "./pages/result";
import { Leaderboard } from "./pages/leaderboard";
import { Admin } from "./pages/admin";

export const App = () => {
  const userID = useGetUserID();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={userID != null ? <Home /> : <Authenti />} />
          <Route
            path="/one"
            element={userID != null ? <One /> : <Authenti />}
          />
          <Route
            path="/two"
            element={userID != null ? <Two /> : <Authenti />}
          />
          <Route
            path="/three"
            element={userID != null ? <Three /> : <Authenti />}
          />
          <Route
            path="/four"
            element={userID != null ? <Four /> : <Authenti />}
          />
          <Route
            path="/five"
            element={userID != null ? <Five /> : <Authenti />}
          />
          <Route path="/auth" element={<Authenti />} />
          <Route
            path="/result"
            element={userID != null ? <Result /> : <Authenti />}
          />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </div>
  );
};
