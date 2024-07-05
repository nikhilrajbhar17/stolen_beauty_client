import { React, useState, useEffect } from "react";
import "./common.css";
import room from "../images/room.jpg";
import { useNavigate } from "react-router-dom";

export const Four = () => {
  const [ans, setAns] = useState("");
  const [wrong, setWrong] = useState(false);
  const [countWrong, setCountWrong] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("threeVisited", true);
    localStorage.setItem("twoVisited", true);
    localStorage.setItem("oneVisited", true);
    const visited = localStorage.getItem("fourVisited");
    if (visited) {
      // window.location.href = "/five";
      navigate("/five", { replace: true });
    }
  }, []);

  const check = () => {
    if (ans.toLowerCase() === "alessandro") {
      const fourRes = {
        countWrong: countWrong,
        elapsedTime: elapsedTime,
      };
      const json = JSON.stringify(fourRes);
      sessionStorage.setItem("four", json);

      localStorage.setItem("fourVisited", "true");
      navigate("/five");
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
    parseFloat(localStorage.getItem("fourElapsedTime")) || 0
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
      localStorage.setItem("fourElapsedTime", elapsedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  // time end

  return (
    <header class="tasks four-tasks">
      <div class="overlay"></div>
      <nav className="navbar tasks-nav">
        <h3>Stolen Beauty</h3>
        <button
          onClick={() => {
            localStorage.setItem("fourVisited", "true");
            navigate("/five");
          }}
        >
          Skip
        </button>
      </nav>
      <div class="tasks-content">
        <h1 class="tasks-title">The Illusionary Indicator</h1>
        <p class="tasks-subtitle">
          When you entered the room, you found a painting on the wall, but do
          you think the thieves were that dumb? The painting is worth 1M
          dollars, and this is how they will treat it. Anyways, Good job!
        </p>
        <img src={room} className="leader-building-img" alt="room" />
        <p class="tasks-subtitle">
          After investigating the painting, you found two signatures on the
          picture. One of them is the signature of the artist, but the other one
          seems unusual. You decided to investigate further as it made you
          think whether this painting was original.
        </p>
        <p class="tasks-subtitle">
          <b>The signature reads "Nelots07IG"</b>
        </p>

        <p class="tasks-subtitle">
          You are left with nothing but this signature. It seems this signature
          is cryptic and might give the thief's name.You need to figure out a
          10-letter name!
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
