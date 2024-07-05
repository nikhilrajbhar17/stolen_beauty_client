import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./home.css";

export const Home = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const resInit = {
    countWrong: 0,
    elapsedTime: 0,
  };
  const json = JSON.stringify(resInit);
  sessionStorage.setItem("one", json);
  sessionStorage.setItem("two", json);
  sessionStorage.setItem("three", json);
  sessionStorage.setItem("four", json);
  sessionStorage.setItem("five", json);

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };

  return (
    <header class="header">
      <div class="overlay"></div>
      <button class="btn btn-theme-color modal-toggle logout" onClick={logout}>
        Logout
      </button>
      <div class="header-content">
        <h1 class="header-title">Stolen Beauty</h1>
        <p class="header-subtitle">
          {" "}
          You play a detective tasked with solving a high-profile art heist that
          has taken place at a prestigious museum in a major city. The thief
          left only a cryptic note, a clue to the painting's whereabouts. It's
          up to you to unravel the mystery and solve the case!
        </p>

        <button
          class="btn btn-theme-color modal-toggle"
          onClick={() => navigate("/one")}
        >
          Start Game
        </button>
      </div>
    </header>
  );
};
