import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useEffect } from "react";
import { Alert } from "@mui/material";
import styled from "styled-components";
import { useCookies } from "react-cookie";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showwrnAlert, setShowwrnAlert] = useState(false);

  const [cookies, setCookie] = useCookies(["token1"]);

  const [msg, setmsg] = useState("");
  async function login(ev) {
    ev.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        withCredntials: true,
        credentials: "include",
      });

      console.log(response);
      if (response.ok) {
        response.json().then((userInfo) => {
          setCookie("token", userInfo.token, { path: "/", maxAge: 43200 });
          console.log("cookie" + cookies.token1);
          setUserInfo(userInfo);
          setShowSuccessAlert(true);
          setmsg("Succesful Login!");
        });
      } else {
        response.json().then((userInfo) => {
          setmsg(userInfo);
        });
        setShowwrnAlert(true);
      }
    } catch (error) {
      console.log(error);
      setShowwrnAlert(true);
      setmsg("Server not woring! Try After some time ");
    }
  }

  useEffect(() => {
    if (showSuccessAlert) {
      const timer = setTimeout(() => {
        setShowSuccessAlert(false);
        setRedirect(true);
        setmsg("");
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
        setmsg("");
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showwrnAlert]);

  const Pop = styled(Alert)({
    // justifyContent:'center',
    // alignItems:'center',
    // margin:'50px',
    // width:'500px',
    // height:'500px',
    // color:'black'
  });

  if (showSuccessAlert) {
    return (
      <Pop variant="filled" severity="success">
        {msg}
      </Pop>
    );
  } else if (showwrnAlert) {
    return (
      <Alert variant="filled" severity="error">
        {msg}
      </Alert>
    );
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    // <form className="login" onSubmit={login}>
    //   <h1>Login</h1>
    //   <input type="text"
    //          placeholder="username"
    //          value={username}
    //          onChange={ev => setUsername(ev.target.value)}/>
    //   <input type="password"
    //          placeholder="password"
    //          value={password}
    //          onChange={ev => setPassword(ev.target.value)}/>
    //   <button>Login</button>
    // </form>
    <form
      className="login"
      onSubmit={login}
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
        Welcome Back
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
        Login
      </button>

      {/* <p style={{
        marginTop: "15px",
        color: "#777",
        fontSize: "14px",
        textAlign: "center",
      }}>Forgot your password? <a href="#" style={{ color: "#007bff", textDecoration: "none" }}>Reset here</a></p> */}
    </form>
  );
}
