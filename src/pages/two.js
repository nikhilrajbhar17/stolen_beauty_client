import { React, useState, useEffect } from "react";
import "./common.css";
import building from "../images/building2.jpg";
import { useNavigate } from "react-router-dom";

export const Two = () => {
  const [ans, setAns] = useState("");
  const [wrong, setWrong] = useState(false);
  const [countWrong, setCountWrong] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("oneVisited", true);
    const visited = localStorage.getItem("twoVisited");
    if (visited) {
      // window.location.href = "/three";
      navigate("/three", { replace: true });
    }
  }, []);

  //time

  const check = () => {
    if (ans === "21") {
      const twoRes = {
        countWrong: countWrong,
        elapsedTime: elapsedTime,
      };
      const json = JSON.stringify(twoRes);
      sessionStorage.setItem("two", json);
      localStorage.setItem("twoVisited", "true");
      navigate("/three");
    } else {
      // alert("Oops! Wrong Answer");
      setWrong(true);
      setCountWrong(countWrong + 1);
      console.log(countWrong);
      setTimeout(() => {
        setWrong(false);
      }, 2000);
      setAns("");
    }
  };

  const [elapsedTime, setElapsedTime] = useState(
    parseFloat(localStorage.getItem("twoElapsedTime")) || 0
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
      localStorage.setItem("twoElapsedTime", elapsedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  // time end

  return (
    <header class="tasks two-tasks">
      <div class="overlay"></div>
      <nav className="navbar tasks-nav">
        <h3>Stolen Beauty</h3>
        <button
          onClick={() => {
            localStorage.setItem("twoVisited", "true");
            navigate("/three");
          }}
        >
          Skip
        </button>
      </nav>
      <div class="tasks-content">
        <h1 class="tasks-title">Mystery of Floors</h1>
        <p class="tasks-subtitle">
          {" "}
          You have reached the building to investigate further to find more
          clues about the heist. Now you are standing in front of the building
          but don't know the flat number. You asked an older person about the
          same, but he turned out to be a mathematics teacher. Now instead of
          directly telling the flat number, he gave you the following clues:
        </p>

        <img src={building} className="leader-building-img" alt="building" />
        <p class="tasks-subtitle">
          <b>
            There are 10 floors in the building that are like 1, 2, 3,....10.
            Each even floor has nine flats, and each odd floor has ten flats.
            Flat numbers start from 1 and follow as we go up. Take the fourth
            odd floor and take a round. Descend down, leaving 4 floors in
            between. Now reach the next floor, and finally, you're on the right
            floor! Now wondering about the flat number? Maybe the last floor you
            were on could give you a clue about it...
          </b>
        </p>

        <p class="tasks-subtitle">
          Find the flat number and enter it below; if you successfully find the
          correct one, you will be getting one step closer.
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