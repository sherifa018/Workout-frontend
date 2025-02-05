import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      return;
    }
    axios
      .post("https://workout-backend-1-2.onrender.com/user/login", {
        username,
        password,
      })
      .then((response) => {
        const { username } = response.data;
        //  Local Storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.username);

        navigate("/home", { state: { username } }).catch((error) => {
          console.error(error);
        });
      });
  };
  return (
    <div>
      {" "}
      <div className="p-4">
        <h1 className="mx-4 my-4">Login</h1>
        <div className="p-4">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button className="btn btn-primary mt-3" onClick={handleLogin}>
            Login
          </button>
          <div className="mt-3">
            <p className="mx-4">
              Don not have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
