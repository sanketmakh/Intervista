import { useState, useEffect } from "react";
import { Alert } from "@mui/material";
import { Navigate } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [batch, setbatch] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showwrnAlert, setShowwrnAlert] = useState(false);
  const [msg, setmsg] = useState("");
  const [redirect, setredirect] = useState(-1); //to move to particular page after an operation is done
  //for 0 on same page
  //for 1 on login page

  async function register(ev) {
    ev.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        body: JSON.stringify({ username, password, batch }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        setShowSuccessAlert(true);
        setmsg("User Registered!");
      } else if (response.status === 401) {
        setmsg("User already Present!");
        setShowwrnAlert(true);
      }
    } catch (error) {
      setShowwrnAlert(true);
      setmsg("Server Error!");
    }
  }

  useEffect(() => {
    if (showSuccessAlert) {
      const timer = setTimeout(() => {
        setShowSuccessAlert(false);
        setredirect(1);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showSuccessAlert]);

  useEffect(() => {
    if (showwrnAlert) {
      const timer = setTimeout(() => {
        setShowwrnAlert(false);
        setredirect(0);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showwrnAlert]);

  if (showSuccessAlert) {
    return (
      <Alert variant="filled" severity="success">
        {msg}
      </Alert>
    );
  } else if (showwrnAlert) {
    return (
      <Alert variant="filled" severity="warning">
        {msg}
      </Alert>
    );
  }

  if (redirect === 0) {
    return <Navigate to={"/"} />;
  } else if (redirect == 1) {
    return <Navigate to={"/login"} />;
  }

  return (
    // <form className="register" onSubmit={register}>
    //   <h1>Register</h1>
    //   <input type="text"
    //          placeholder="username"
    //          value={username}
    //          onChange={ev => setUsername(ev.target.value)}/>
    //   <input type="password"
    //          placeholder="password"
    //          value={password}
    //          onChange={ev => setPassword(ev.target.value)}/>
    //   <button>Register</button>
    // </form>

    <form
      className="register"
      onSubmit={register}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "350px",
        // marginTop:'100px',
        margin: "0 auto",
        marginBottom: "78px",
        padding: "40px",
        border: "1px solid #e1e1e1",
        borderRadius: "10px",
        backgroundColor: "#f7f7f7",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          marginBottom: "20px",
          fontSize: "28px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Register
      </h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
        style={{
          padding: "12px",
          marginBottom: "20px",
          border: "none",
          borderRadius: "8px",
          backgroundColor: "#f0f0f0",
          fontSize: "16px",
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
        style={{
          padding: "12px",
          marginBottom: "25px",
          border: "none",
          borderRadius: "8px",
          backgroundColor: "#f0f0f0",
          fontSize: "16px",
        }}
      />

      <select
        id="batch"
        style={{
          padding: "12px",
          marginBottom: "25px",
          border: "none",
          borderRadius: "8px",
          backgroundColor: "#f0f0f0",
          fontSize: "16px",
          width: "280px",
        }}
        onChange={(ev) => setbatch(ev.target.value)}
      >
        <option value="#">Choose Batch</option>
        <option value="2026">2026</option>
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
      </select>

      <button
        type="submit"
        style={{
          padding: "12px 30px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "18px",
          fontWeight: "bold",
          letterSpacing: "0.5px",
          transition: "background-color 0.3s ease",
        }}
      >
        Register
      </button>
    </form>
  );
}
