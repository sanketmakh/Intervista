import { Group } from "@mui/icons-material";
import { Paper } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
export default function VisitorCount() {
  const [count, setcount] = useState(0);
  const [flag, setflag] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:4000/visitor").then((response) => {
      response.json().then((counts) => {
        setcount(counts);
        setflag(false);
      });
    });
  }, []);

  return (
    <>
      {flag ? (
        <></>
      ) : (
        // <Paper elevation={8} style={{width:'150px',height:'150px',alignContent:'center',alignItems:'center',margin:"auto",display:"grid",textAlign:'center'}}>
        // <Group style={{margin:'auto',height:'35px',width:'auto'}}/>
        // <p style={{height:'0px',fontFamily:'sans-serif',fontWeight:'bold'}}>{count}+</p>
        // <p style={{height:'0px',fontFamily:'sans-serif',fontWeight:'bold'}}>Page Views</p>
        // </Paper>

        <Paper
          elevation={6}
          style={{
            width: "150px",
            height: "80px",
            textAlign: "center",
            margin: "auto",
            display: "grid",
          }}
        >
          <div
            style={{
              height: "40px",
              padding: "10px",
              fontFamily: "sans-serif",
              fontWeight: "bold",
              fontSize: "20px",
              background:
                "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(200,242,182,1) 100%)",
            }}
          >
            Page Views
          </div>
          {/* <hr style={{color:"black",width:"100%"}}/> */}
          <div
            style={{
              height: "40px",
              padding: "10px",
              fontFamily: "sans-serif",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            {count}+
          </div>
        </Paper>
      )}
    </>
  );
}
