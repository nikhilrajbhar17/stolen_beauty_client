import { React, useState, useEffect } from "react";
import "./common.css";
import poker from "../images/poker.jpg";
import { useNavigate } from "react-router-dom";

export const Five = () => {
  const [ans, setAns] = useState("");
  const [wrong, setWrong] = useState(false);
  const [countWrong, setCountWrong] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("fourVisited", true);
    localStorage.setItem("threeVisited", true);
    localStorage.setItem("twoVisited", true);
    localStorage.setItem("oneVisited", true);
    const visited = localStorage.getItem("fiveVisited");
    if (visited) {
      // window.location.href = "/result"; // Redirect to homepage or any other page
      navigate("/result", { replace: true });
    }
  }, []);

  const check = () => {
    if (ans.toLowerCase() === "g") {
      const fiveRes = {
        countWrong: countWrong,
        elapsedTime: elapsedTime,
      };
      const json = JSON.stringify(fiveRes);
      sessionStorage.setItem("five", json);

      localStorage.setItem("fiveVisited", "true");
      navigate("/result");
    } else {
      setWrong(true);
      setCountWrong(countWrong + 1);
      console.log(countWrong);
      setTimeout(() => {
        setWrong(false);
      }, 2000);
      setAns("");
    }
  };

  //time
  const [elapsedTime, setElapsedTime] = useState(
    parseFloat(localStorage.getItem("fiveElapsedTime")) || 0
  );
  // time
  useEffect(() => {
    const startTime = performance.now();
    const interval = setInterval(() => {
      const currentTime = performance.now();
      const elapsedTime = currentTime - startTime;
      setElapsedTime(
        (prevElapsedTime) => (prevElapsedTime + elapsedTime) / 1000
      );
      localStorage.setItem("fiveElapsedTime", elapsedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  // time end

  return (
    <header class="tasks five-tasks">
      <div class="overlay"></div>
      <nav className="navbar tasks-nav">
        <h3>Stolen Beauty</h3>
        <button
          onClick={() => {
            localStorage.setItem("fiveVisited", "true");
            navigate("/result");
          }}
        >
          Skip
        </button>
      </nav>
      <div class="tasks-content">
        <h1 class="tasks-title">The Last Game</h1>
        <p class="tasks-subtitle">
          When you reach the final destination with your team, you find five
          persons sitting in a circle and playing poker. All you know is one of
          them is a thief, and others are innocent. You can't arrest all 5
          persons, so you have to choose one. Each person is identified with an
          English Alphabet. Below are some of the hints to identify the right
          person.
        </p>
        <img src={poker} className="leader-building-img" alt="poker" />
        <p class="tasks-subtitle">
          <b>
            2 persons are continuously looking at their cards, while one person
            is drinking for quite a long time. B looks at the person before him
            drinking so much and cracks a joke about it. To this, everyone
            laughs except J and X, while X is quietly looking at his cards. Some
            rounds went by, and only one of them won every single round with
            quads of face cards every time. To this, G is furious and wants to
            leave the game but calms down. A says, "Let us have some wins too!"
            This time G wins and says, "Nothing stays forever with someone!".
            While this happens, B snatches a drink from the other side without
            her knowing and drinks it.
          </b>
        </p>
        <div className="input-group tasks-input-grp">
          <input
            type="text"
            className="input tasks-input"
            placeholder="Enter your answer"
            value={ans}
            onChange={(event) => setAns(event.target.value)}
          />
          <button
            className="btn-main btn-submit tasks-submit-btn"
            onClick={check}
          >
            Submit
          </button>
        </div>
        {wrong && <p className="wrongans">Oops! Wrong Answer</p>}
      </div>
    </header>
  );
};
