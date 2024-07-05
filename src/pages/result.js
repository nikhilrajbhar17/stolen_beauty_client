import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useGetEmail } from "../hooks/useGetEmail.js";

import axios from "axios";
import "./common.css";
import "./result.css";

import Chart from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";

export const Result = () => {
  const email = useGetEmail();

  const [totalTime, setTotalTime] = useState(0);
  const [totalWrong, setTotalWrong] = useState(0);
  const [totalLevel, setTotalLevel] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [softSkill, setSoftSkill] = useState([]);

  const [one, setOne] = useState(JSON.parse(sessionStorage.getItem("one")));
  const [two, setTwo] = useState(JSON.parse(sessionStorage.getItem("two")));
  const [three, setThree] = useState(
    JSON.parse(sessionStorage.getItem("three"))
  );
  const [four, setFour] = useState(JSON.parse(sessionStorage.getItem("four")));
  const [five, setFive] = useState(JSON.parse(sessionStorage.getItem("five")));

  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };

  useEffect(() => {
    setTotalTime(
      (
        (one.elapsedTime +
          two.elapsedTime +
          three.elapsedTime +
          four.elapsedTime +
          five.elapsedTime) /
        60
      ).toFixed(2)
    );

    // console.log(totalTime);
    setTotalWrong(
      one.countWrong +
        two.countWrong +
        three.countWrong +
        four.countWrong +
        five.countWrong
    );

    if (one.elapsedTime !== 0) {
      setTotalLevel((totalLevel) => totalLevel + 1);
      setTotalScore((totalScore) => totalScore + 200 - one.countWrong * 20);
      setSoftSkill((softSkill) => [...softSkill, 200 - one.countWrong * 20]);
    } else {
      setSoftSkill((softSkill) => [...softSkill, 0]);
    }

    if (two.elapsedTime !== 0) {
      setTotalLevel((totalLevel) => totalLevel + 1);
      setTotalScore((totalScore) => totalScore + 200 - two.countWrong * 20);
      setSoftSkill((softSkill) => [...softSkill, 200 - two.countWrong * 20]);
    } else {
      setSoftSkill((softSkill) => [...softSkill, 0]);
    }
    if (three.elapsedTime !== 0) {
      setTotalLevel((totalLevel) => totalLevel + 1);
      setTotalScore((totalScore) => totalScore + 200 - three.countWrong * 20);
      setSoftSkill((softSkill) => [...softSkill, 200 - three.countWrong * 20]);
    } else {
      setSoftSkill((softSkill) => [...softSkill, 0]);
    }
    if (four.elapsedTime !== 0) {
      setTotalLevel((totalLevel) => totalLevel + 1);
      setTotalScore((totalScore) => totalScore + 200 - four.countWrong * 20);
      setSoftSkill((softSkill) => [...softSkill, 200 - four.countWrong * 20]);
    } else {
      setSoftSkill((softSkill) => [...softSkill, 0]);
    }
    if (five.elapsedTime !== 0) {
      setTotalLevel((totalLevel) => totalLevel + 1);
      setTotalScore((totalScore) => totalScore + 200 - five.countWrong * 20);
      setSoftSkill((softSkill) => [...softSkill, 200 - five.countWrong * 20]);
    } else {
      setSoftSkill((softSkill) => [...softSkill, 0]);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        axios.post("https://stolen-beauty-backend.onrender.com/result/", {
          email: email,
          total: totalScore,
          time: totalTime,
          rank: 0,
        });
      } catch (err) {
        console.log(err);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [totalScore]);

  const barlabels = [
    "Attention to detail",
    "Creative Thinking",
    "Logical Reasoning",
    "Deductive Reasoning",
    "Spatial Reasoning",
  ];
  const labels = ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"];
  const bardata = {
    labels: barlabels,
    datasets: [
      {
        label: "Soft Skill Scores",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: softSkill,
      },
    ],
  };

  const piedata = {
    labels: labels,
    datasets: [
      {
        label: "Time Spent",
        data: [
          one.elapsedTime,
          two.elapsedTime,
          three.elapsedTime,
          four.elapsedTime,
          five.elapsedTime,
        ],
      },
    ],
  };

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <div className="leader-main">
      <nav
        class="navbar navbar-expand-lg leader-nav bg-dark"
        data-bs-theme="dark"
      >
        <div class="container-fluid">
          <h5 className="navbar-brand leader-nav-heading">Stolen Beauty</h5>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="#navbarSupportedContent"
            aria-expanded={!isNavCollapsed ? true : false}
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div
            class={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
            id="navbarSupportedContent"
          >
            <ul
              class={`${
                isNavCollapsed ? "navbar-links" : ""
              } navbar-nav me-auto mb-2 mb-lg-0`}
            >
              <li class="nav-item">
                <button
                  className="leader-btn-restart leader-rem-btn"
                  onClick={() => {
                    sessionStorage.clear();
                    localStorage.removeItem("oneVisited");
                    localStorage.removeItem("twoVisited");
                    localStorage.removeItem("threeVisited");
                    localStorage.removeItem("fourVisited");
                    localStorage.removeItem("fiveVisited");
                    setTotalWrong(0);
                    setTotalLevel(0);
                    setTotalScore(0);
                    setSoftSkill({});
                    setTotalTime(0);

                    navigate("/");
                  }}
                >
                  Restart
                </button>
              </li>
              <li class="nav-item">
                <button
                  className="leader-rem-btn"
                  onClick={() => {
                    navigate("/leaderboard");
                  }}
                >
                  Leaderboard
                </button>
              </li>
              <li class="nav-item">
                <button class="leader-btn-logout" onClick={logout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="result-main">
        <div className="result-main-first">
          <div className="result-main-first-inner">
            <h5>Total Score</h5>
            <h1>{totalScore}/1000</h1>
          </div>
          <div className="result-main-first-inner">
            <h5>Total Levels Cleared</h5>
            <h1>{totalLevel}/5</h1>
          </div>
          <div className="result-main-first-inner">
            <h5>Total Time Spent</h5>
            <h1>{totalTime} mins</h1>
          </div>

          <div className="result-main-first-inner">
            <h5>Total Wrong Attempts</h5>
            <h1>{totalWrong}</h1>
          </div>
        </div>

        <div className="result-main-second">
          <div className="result-main-second-inner">
            <Bar data={bardata} />
            <h5>Soft Skill Scores</h5>
          </div>
          <div className="result-main-second-inner">
            <Doughnut data={piedata} className="piechart" />
            <h5>Time Elapsed</h5>
          </div>
        </div>
      </div>
    </div>
  );
};
