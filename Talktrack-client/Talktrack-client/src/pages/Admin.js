import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Admin_dis() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/admin").then((response) => {
      response.json().then((users) => {
        setPosts(users);
      });
    });
  }, []);

  return (
    <>
      <h1 style={{ width: "100%", textAlign: "center" }}>Users</h1>
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
            Name
          </th>
          <th
            style={{
              border: "1px solid #dddddd",
              textAlign: "left",
              padding: "8px",
            }}
          >
            Batch
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
        </tr>
        {posts.length > 0 &&
          posts.map((post, index) => (
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
                {post.username}
              </td>
              <td
                style={{
                  border: "1px solid #dddddd",
                  textAlign: "left",
                  padding: "8px",
                }}
              >
                {post.batch}
              </td>
              <td
                style={{
                  border: "1px solid #dddddd",
                  textAlign: "center",
                  padding: "8px",
                }}
              >
                <Link to={`/profile/${post._id}`}>
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
            </tr>
          ))}
      </table>
    </>
  );
}
