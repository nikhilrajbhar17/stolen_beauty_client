import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./authentication.css";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./leader.css";

export const Leaderboard = () => {
  const [userScores, setUserScores] = useState([]);
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };

  useEffect(() => {
    try {
      axios
        .get("https://stolen-beauty-backend.onrender.com/result/")
        .then((res) => {
          setUserScores(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);


  function groupScoresByTotal(scores) {
    const groups = {};
    scores.forEach((score) => {
      if (!groups[score.total]) {
        groups[score.total] = [score];
      } else {
        groups[score.total].push(score);
      }
    });
  
    let rank = 1;
    const result = [];
    Object.keys(groups)
      .sort((a, b) => b - a)
      .forEach((total) => {
        const group = groups[total];
        group.sort((a, b) => {
          if (a.total !== b.total) {
            return b.total - a.total; // sort by total score first
          } else {
            return a.time - b.time; // if scores are equal, sort by time
          }
        });
        group.forEach((score) => {
          score.rank = rank;
          result.push(score);
        });
        // rank += 1;
      });
  
    return result;
  }

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
                  className="leader-rem-btn"
                  onClick={() => {
                    navigate("/result");
                  }}
                >
                  Result
                </button>
              </li>
              <li class="nav-item">
                <button class="leader-btn-logout" onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="result-main">
        <div className="result-main-first">
          <div className="leader-main-div">
            <h3>LEADERBOARD</h3>
            <table>
              <thead>
                <tr>
                  <th>RANK</th>
                  <th>USER</th>
                  <th>SCORE</th>
                  <th>TIME TAKEN</th>
                </tr>
              </thead>
              <tbody>
                {groupScoresByTotal(userScores).map((score, index) => (
                  <tr key={score._id}>
                    <td>{index+1}</td>
                    <td>{score.email}</td>
                    <td>{score.total}</td>
                    <td>{score.time} mins</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
