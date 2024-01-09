import { Button } from "@mui/material";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export default function UserPost() {
  const [postInfo, setPostInfo] = useState(null);
  //   const {userInfo} = useContext(UserContext);
  const [user, setuser] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/profile/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  if (!postInfo) return "";

  return (
    <>
      <h1 style={{ width: "100%", textAlign: "center" }}>Post</h1>
      <table
        style={{
          fontFamily: "arial, sans-serif",
          borderCollapse: "collapse",
          width: "100%",
        }}
      >
        <tr>
          <th
            style={{
              border: "1px solid #dddddd",
              textAlign: "left",
              padding: "8px",
            }}
          >
            Sr.No
          </th>
          <th
            style={{
              border: "1px solid #dddddd",
              textAlign: "left",
              padding: "8px",
            }}
          >
            Title
          </th>
          <th
            style={{
              border: "1px solid #dddddd",
              textAlign: "left",
              padding: "8px",
            }}
          >
            View Post
          </th>
          <th
            style={{
              border: "1px solid #dddddd",
              textAlign: "left",
              padding: "8px",
            }}
          >
            Delete
          </th>
        </tr>
        {postInfo.length > 0 &&
          postInfo.map((postInfo, index) => (
            <tr>
              <td
                style={{
                  border: "1px solid #dddddd",
                  textAlign: "left",
                  padding: "8px",
                }}
              >
                {index + 1}
              </td>
              <td
                style={{
                  border: "1px solid #dddddd",
                  textAlign: "left",
                  padding: "8px",
                }}
              >
                {postInfo.title}
              </td>
              {/* <td style={{"border":"1px solid #dddddd","textAlign":"left","padding":"8px"}}>{postInfo.}</td> */}
              <td
                style={{
                  border: "1px solid #dddddd",
                  textAlign: "center",
                  padding: "8px",
                }}
              >
                <Link to={`/post/${postInfo._id}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-box-arrow-in-up-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0v-5z"
                    />
                  </svg>
                </Link>
              </td>
              <td
                style={{
                  border: "1px solid #dddddd",
                  textAlign: "center",
                  padding: "8px",
                }}
              >
                <Button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash3-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                  </svg>
                </Button>
              </td>
            </tr>
          ))}
      </table>
    </>
  );
}
