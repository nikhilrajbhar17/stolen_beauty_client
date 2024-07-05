import React, { useEffect, useState } from "react";
import "./common.css";
import note from "../images/note.png";
import { useNavigate, useHistory } from "react-router-dom";
import "./clues.css";

export const One = () => {
  const [ans, setAns] = useState("");
  const [wrong, setWrong] = useState(false);
  const [countWrong, setCountWrong] = useState(0);

  const navigate = useNavigate();

  // const history = useHistory();
  useEffect(() => {
    const visited = localStorage.getItem("oneVisited");

    if (visited) {
      navigate("/two", { replace: true });
    }
  }, []);

  const check = () => {
    if (ans.toLowerCase() === "legacy") {
      const oneRes = {
        countWrong: countWrong,
        elapsedTime: elapsedTime,
      };
      const json = JSON.stringify(oneRes);
      sessionStorage.setItem("one", json);

      localStorage.setItem("oneVisited", "true");
      navigate("/two");
    } else if (ans.toLowerCase() === "ovtzxb") {
      localStorage.setItem("twoVisited", "true");
      localStorage.setItem("threeVisited", "true");
      localStorage.setItem("fourVisited", "true");
      localStorage.setItem("fiveVisited", "true");
      navigate("/result");
    } else {
      // alert("Oops! Wrong Answer");
      setWrong(true);
      setCountWrong(countWrong + 1);

      setTimeout(() => {
        setWrong(false);
      }, 2000);
      setAns("");
    }
  };

  const [elapsedTime, setElapsedTime] = useState(
    parseFloat(localStorage.getItem("oneElapsedTime")) || 0
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
      localStorage.setItem("oneElapsedTime", elapsedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  // time end

  return (
    <header class="tasks one-tasks">
      <div class="overlay"></div>
      <nav className="navbar tasks-nav">
        <h3>Stolen Beauty</h3>
        <button
          onClick={() => {
            localStorage.setItem("oneVisited", "true");
            navigate("/two");
          }}
        >
          Skip
        </button>
      </nav>
      <div class="tasks-content">
        <h1 class="tasks-title">The Torn Note</h1>
        <p class="tasks-subtitle">
          {" "}
          As you investigate the crime scene, you discover a cryptic note left
          behind by the thief. After looking carefully at the note, it seems
          like the thieves have planned something on 9th May 2023 at a special
          place. But the name of the building written in the note is scrambled.
          The note is attached below.
        </p>
        <img src={note} className="note-newimg" alt="note" />
        <p class="tasks-subtitle">
          You remember a puzzle from your detective training that might help you
          decode the message: <br></br>
          <b>"If GRASP is coded as TIZHK, what will be coded as OVTZXB?"</b>
        </p>

        <p class="tasks-subtitle">
          Using your codebreaking skills, you must decipher the code and figure
          out the name of the building. Once you've solved the puzzle, you'll be
          one step closer to uncovering the truth behind the heist.
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
