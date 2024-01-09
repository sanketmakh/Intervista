import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import { Alert } from "@mui/material";
import { useCookies } from "react-cookie";
export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  // const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showwrnAlert, setShowwrnAlert] = useState(false);
  const [cookies] = useCookies(["token1"]);
  const cookieValue = cookies.token1;
  async function createNewPost(ev) {
    console.log("create post " + cookieValue);
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("cookie", cookieValue);
    // data.set('file', files[0]);
    ev.preventDefault();

    console.log(data);
    try {
      const response = await fetch("http://localhost:4000/post", {
        method: "POST",
        body: data,
        credentials: "include",
      });

      if (response.ok) {
        setShowSuccessAlert(true);
      }
    } catch (error) {
      console.log("server error!");
      setShowwrnAlert(true);
    }
  }
  useEffect(() => {
    if (showSuccessAlert) {
      const timer = setTimeout(() => {
        setShowSuccessAlert(false);
        setRedirect(true);
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
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showwrnAlert]);

  if (showSuccessAlert) {
    return (
      <Alert variant="filled" severity="success">
        Post Created!
      </Alert>
    );
  } else if (showwrnAlert) {
    return (
      <Alert variant="filled" severity="error">
        eroor!
      </Alert>
    );
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form onSubmit={createNewPost}>
      <h3>Company title:</h3>
      <input
        type="title"
        required
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        style={{ margin: "10px", height: "40px" }}
      />
      <h3>Summary:</h3>
      <input
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
        style={{ margin: "10px", height: "40px" }}
      />
      {/* <h3>Company Logo:</h3>
      <input type="file"
              required
             onChange={ev => setFiles(ev.target.files)} 
             style={{margin:'10px',height:'40px'}}/> */}
      <h3>Process:</h3>
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: "5px" }}>Create post</button>
    </form>
  );
}
