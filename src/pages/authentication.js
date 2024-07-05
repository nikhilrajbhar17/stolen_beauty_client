import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./authentication.css";
import { useState } from "react";
import axios from "axios";

export const Authenti = () => {
  const [newUser, setNewUser] = useState(false);

  const handleChildChange = (data) => {
    if (data === false) setNewUser(data);
  };

  const navigate = useNavigate();

  return (
    <div className="authenti-main">
      <header className="authenti">
        <div className="overlay"></div>
        <div className="authenti-content">
          <h1 className="authenti-title">Stolen Beauty</h1>
          <p className="authenti-subtitle"> Sign up / Login to proceed</p>
        </div>
      </header>
      {newUser ? <Register onChildChange={handleChildChange} /> : <Login />}
      <button
        className="btn-user"
        onClick={() => {
          setNewUser(!newUser);
        }}
      >
        {!newUser ? `New User? Sign up Instead` : `Already an user? Login Now`}
      </button>
      <button className="btn-user admin-btn" onClick={()=>navigate("/admin")}>Admin Login</button>
    </div>
  );
};

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://stolen-beauty-backend.onrender.com/auth/register",
        {
          email,
          password,
        }
      );
      alert("Registration Completed! Please login to start the game.");
      props.onChildChange(false);
    } catch (err) {
      const message = err.response.data.message;
      alert(message);
    }
  };

  return (
    <Form
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      label="SIGN UP"
      onSubmit={onSubmit}
    />
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://stolen-beauty-backend.onrender.com/auth/login",
        {
          email,
          password,
        }
      );
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      window.localStorage.setItem("emailID", email);
      alert(
        "Login Succesful!"
      );
      // navigate("/");
      navigate("/", { replace: true });
      document.location.reload();
    } catch (err) {
      const message = err.response.data.message;
      alert(message);
    }
  };

  return (
    <Form
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      label="LOGIN"
      onSubmit={onSubmit}
    />
  );
};

const Form = ({ email, password, setEmail, setPassword, label, onSubmit }) => {
  return (
    <div className="login-box">
      <div className="login-title">{label}</div>

      <div className="login-form">
        <div className="login-form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="form-control-label authenti-label">EMAIL</label>
              <input
                type="email"
                className="form-control authenti-input"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                required
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
                minLength="6"
                required
              />
            </div>

            <div className="col-lg-12">
              <div className="col-lg-6 login-text"></div>

              <div className="col-lg-6 login-button">
                <button type="submit" className="btn btn-outline-primary">
                  {label}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};