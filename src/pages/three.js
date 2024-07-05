import { React, useState, useEffect } from "react";
import "./common.css";
import door from "../images/door.jpg";
import { Link, useNavigate } from "react-router-dom";

export const Three = () => {
  const [ans, setAns] = useState("");
  const [wrong, setWrong] = useState(false);
  const [countWrong, setCountWrong] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const visited = localStorage.getItem("threeVisited");
    localStorage.setItem("twoVisited", true);
    localStorage.setItem("oneVisited", true);
    if (visited) {
      // window.location.href = "/four"; // Redirect to homepage or any other page
      navigate("/four", { replace: true });
    }
  }, []);

  const check = () => {
    if (ans === "2538" || ans === "2758") {
      const threeRes = {
        countWrong: countWrong,
        elapsedTime: elapsedTime,
      };
      const json = JSON.stringify(threeRes);
      sessionStorage.setItem("three", json);

      localStorage.setItem("threeVisited", "true");
      navigate("/four");
    } else {
      // alert("Oops! Wrong Answer");
      setWrong(true);
      setCountWrong((countWrong) => countWrong + 1);

      if (countWrong === 4) {
        localStorage.setItem("threeVisited", "true");
        localStorage.setItem("fourVisited", "true");
        localStorage.setItem("fiveVisited", "true");
        navigate("/result");
      }

      setTimeout(() => {
        setWrong(false);
      }, 2000);

      setAns("");
    }
  };

  //time
  const [elapsedTime, setElapsedTime] = useState(
    parseFloat(localStorage.getItem("threeElapsedTime")) || 0
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
      localStorage.setItem("threeElapsedTime", elapsedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  // time end

  return (
    <header class="tasks three-tasks">
      <div class="overlay"></div>
      <nav className="navbar tasks-nav">
        <h3>Stolen Beauty</h3>
        <button
          onClick={() => {
            localStorage.setItem("threeVisited", "true");
            navigate("/four");
          }}
        >
          Skip
        </button>
      </nav>
      <div class="tasks-content">
        <h1 class="tasks-title">Game of Numbers</h1>
        <p class="tasks-subtitle">
          {" "}
          Congrats! You have successfully reached the right place. But but! The
          door is locked. The door is equipped with a high-security lock which
          opens only after entering a four-digit code. Be cautious while trying
          to open the door, as upon entering 5 wrong passwords, it immediately
          sends a warning to the owner and in no time, they will come and kill
          you!
        </p>
        <img src={door} className="leader-building-img" alt="door" />
        <p class="tasks-subtitle">
          Remember that mathematician uncle? He gave you a hint regarding the
          door too :
        </p>
        <p class="tasks-subtitle">
          <b>
            "All the digits are unique and the positioning of the digits are from left to right as 1, 2, 3, 4. Each digit is either greater than or
            less than both of its neighbour digits. The sum of first and the third digits is
            equal to the second digit. One of the digit is equal to the first digit
            multiplied by the position of that digit. Three of the four digits are prime."
          </b>  
        </p>

        <p class="tasks-subtitle">
          Try your luck by entering the password, and remember, if it's 5, your
          game is over!!!
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
