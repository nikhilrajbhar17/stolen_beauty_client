import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./authentication.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useGetAdmin } from "../hooks/useGetAdmin";
import "./admin.css";

export const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(useGetAdmin());

  const handleChildChange = (data) => {
    setLoggedIn(data);
  };

  return (
    <>
      {loggedIn === false || loggedIn === null ? (
        <Login onChildChange={handleChildChange} />
      ) : (
        <AdminConsole onChildChange={handleChildChange} />
      )}
    </>
  );
};

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (
      email.toLowerCase() === "nikhilrajbhar135@gmail.com" &&
      password.toLowerCase() === "nikhil@admin"
    ) {
      props.onChildChange(true);
      window.localStorage.setItem("isAdmin", true);
    }
  };

  return (
    <div className="authenti-main">
      <header className="authenti">
        <div className="overlay"></div>
        {/* <button class="btn btn-theme-color modal-toggle logout">Logout</button> */}
        <div className="authenti-content">
          <h1 className="authenti-title">Stolen Beauty</h1>
          <p className="authenti-subtitle"> Admin Console</p>
        </div>
      </header>
      <Form
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        label="ADMIN LOGIN"
        onSubmit={onSubmit}
      />
    </div>
  );
};

const Form = ({ email, password, setEmail, setPassword, label, onSubmit }) => {
  const navigate = useNavigate();
  return (
    <div className="login-box">
      <div className="col-lg-12 login-title">{label}</div>

      <div className="col-lg-12 login-form">
        <div className="col-lg-12 login-form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="form-control-label authenti-label">EMAIL</label>
              <input
                type="email"
                className="form-control authenti-input"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
              />
            </div>

            <div className="form-group">
              <label className="form-control-label authenti-label">
                PASSWORD
              </label>
              <input
                type="password"
                className="form-control authenti-input"
                i
                onChange={(event) => setPassword(event.target.value)}
                value={password}
              />
            </div>

            <div className="col-lg-12">
              <div className="col-lg-6 login-text"></div>

              <div className="col-lg-6 login-button admin-login-btn-div">
                <button type="submit" className="btn btn-outline-primary">
                  {label}
                </button>
                <button
                  className="admin-user-login-btn"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  User Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const AdminConsole = (props) => {
  const [userScores, setUserScores] = useState([]);
  const [highest, setHighest] = useState(0);
  const [average, setAverage] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [averageTime, setAverageTime] = useState(0);

  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.clear();
    props.onChildChange(false);
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
        rank += 1;
      });
  
    return result;
  }

  useEffect(() => {
    const totalscore = userScores.reduce((accumulator, curr) => {
      return accumulator + curr.total;
    }, 0);
    const maxScore = userScores.reduce((accumulator, curr) => {
      return Math.max(accumulator, curr.total);
    }, 0);
    const totalTime = userScores.reduce((accumulator, curr) => {
      return accumulator + curr.time;
    }, 0);
    setAverage((totalscore / userScores.length).toFixed(2));
    setTotalUsers(userScores.length);
    setHighest(maxScore);
    setAverageTime((totalTime / userScores.length).toFixed(2));
  }, [userScores]);

  return (
    <div className="leader-main">
      <nav
        class="navbar navbar-expand-lg leader-nav bg-dark"
        data-bs-theme="dark"
      >
        <div class="container-fluid">
          <h5 className="navbar-brand leader-nav-heading admin-nav-heading-new">Stolen Beauty</h5>
          <div class={`navbar-collapse`} id="navbarSupportedContent">
            <ul class={`navbar-nav me-auto mb-2 mb-lg-0`}>
              <li class="nav-item">
                <button class="admin-btn-logout" onClick={logout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="result-main">
        <h3 className="admin-heading">ADMIN CONSOLE</h3>
        <div className="result-main-first">
          <div className="result-main-first">
            <div className="result-main-first-inner admin-first-inner">
              <h5>Total Users</h5>
              <h1>{totalUsers}</h1>
            </div>
            <div className="result-main-first-inner admin-first-inner">
              <h5>Highest Score</h5>
              <h1>{highest}</h1>
            </div>
            <div className="result-main-first-inner admin-first-inner">
              <h5>Average Score</h5>
              <h1>{average}</h1>
            </div>

            <div className="result-main-first-inner admin-first-inner">
              <h5>Average Time Taken</h5>
              <h1>{averageTime} mins</h1>
            </div>
          </div>
        </div>
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
  );
};