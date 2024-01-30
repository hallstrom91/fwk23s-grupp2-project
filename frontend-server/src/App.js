import React, { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      localStorage.setItem("access_token", result.token);
      setAuthenticated(true);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      alert("Registration successful! You can now login.");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setAuthenticated(false);
    setData(null);
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://localhost:3002/data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch data from backend");
      }

      setData(result);
    } catch (error) {
      if (error.message === "Unauthorized") {
        handleLogout();
        alert("Session expired. Please login again.");
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {isAuthenticated ? (
          <>
            {data ? (
              <p>{JSON.stringify(data)}</p>
            ) : (
              <button onClick={fetchData}>Fetch Data</button>
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <div className="auth-container">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="input-field"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="input-field"
            />
            <button onClick={handleLogin} className="auth-button">
              Login
            </button>
            <button onClick={handleRegister} className="auth-button">
              Register
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
