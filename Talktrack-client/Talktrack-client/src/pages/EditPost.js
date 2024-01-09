import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";
import { Alert } from "@mui/material";
import { useCookies } from "react-cookie";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  // const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showwrnAlert, setShowwrnAlert] = useState(false);
  const [cookies] = useCookies(["token1"]);
  const cookieValue = cookies.token1;
  useEffect(() => {
    fetch("http://localhost:4000/post/" + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
    });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("id", id);
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("cookie", cookieValue);

    // if (files?.[0]) {
    //   data.set('file', files?.[0]);
    // }
    // console.log(data);
    try {
      const response = await fetch("http://localhost:4000/post", {
        method: "PUT",
        body: data,
        credentials: "include",
      });
      console.log();
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
        setRedirect(true);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showwrnAlert]);

  if (showSuccessAlert) {
    return (
      <Alert variant="filled" severity="success">
        Post Updated!
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
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <form onSubmit={updatePost}>
      <h3>Company title:</h3>
      <input
        type="title"
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
      {/* <input type="file"
             onChange={ev => setFiles(ev.target.files)} /> */}
      <h3>Process:</h3>
      <Editor onChange={setContent} value={content} />
      <button style={{ marginTop: "5px" }}>Update post</button>
    </form>
  );
}
