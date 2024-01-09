import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import { Box } from "@mui/material";

import { useCookies } from "react-cookie";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(["token1"]);
  const cookieValue = cookies.token1;
  const data = new FormData();

  data.set("cookie", cookieValue);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      body: data,
      method: "GET",
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
    removeCookie("token1");
  }

  const username = userInfo?.username;
  const password = userInfo?.password;
  // const [gate, setgate] = useState(0);
  // if (username==="admin"){
  //   setgate(1)

  // }

  const headerStyle = {
    // position: 'fixed',
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    backgroundColor: "grey",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const logoStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textDecoration: "none",
    color: "#333",
  };

  const navStyle = {
    display: "flex",
    gap: "1rem",
  };

  const navLinkStyle = {
    textDecoration: "none",
    color: "#555",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  };
  return (
    // <header>
    //   <Link to="/" className="logo">InterVista</Link>
    //   <nav>
    //     {username && (
    //       <>
    //         <Link to="/create">Create new post</Link>
    //         <a onClick={logout}>Logout ({username})</a>
    //       </>
    //     )}
    //     {!username && (
    //       <>
    //         <Link to="/login">Login</Link>
    //         <Link to="/register">Register</Link>
    //       </>
    //     )}
    //   </nav>
    // </header>

    <header style={headerStyle}>
      <Box>
        {/* <AirplanemodeActiveIcon/> */}
        <img
          src="/logo192.png"
          style={{ height: "30px", width: "30px", marginBottom: "-6px" }}
        ></img>
        <Link to="/" style={logoStyle}>
          InterVista
        </Link>
      </Box>
      <nav style={navStyle}>
        {username ? (
          <>
            <Link to="/create" style={navLinkStyle}>
              Create new post
            </Link>
            <a onClick={logout} style={navLinkStyle}>
              Logout ({username})
            </a>
          </>
        ) : (
          <>
            <Link to="/admin" style={navLinkStyle}>
              {" "}
              Users
            </Link>
            <Link to="/login" style={navLinkStyle}>
              Login
            </Link>
            <Link to="/register" style={navLinkStyle}>
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
