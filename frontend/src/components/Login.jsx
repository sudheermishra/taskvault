import { useEffect, useState } from "react";
import "../style/addtask.css";
import { Link, useNavigate } from "react-router";
function Login() {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("login")) {
      navigate("/");
    }
  });
  const handleLogin = async () => {
    console.log(userData);
    const response = await fetch("http://localhost:3200/login", {
      method: "Post",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "Application/Json",
      },
    });
    const result = await response.json();
    if (result.success) {
      document.cookie = "token=" + result.token;
      localStorage.setItem("login", userData.email);
      window.dispatchEvent(new Event("localStorage-change"));
      navigate("/");
    } else {
      alert("Try after sometimes");
    }
  };
  return (
    <div className="container">
      <h1>Login</h1>

      <label htmlFor=""> Email</label>
      <input
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        type="text"
        name="email"
        placeholder="Enter user email"></input>

      <label htmlFor=""> Password</label>
      <input
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        type="password"
        name="password"
        placeholder="Enter user password"></input>
      <button onClick={handleLogin} className="submit">
        Login
      </button>
      <Link className="link" to={"/signup"}>
        Sign Up
      </Link>
    </div>
  );
}

export default Login;
