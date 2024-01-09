import Post from "../Post";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import styled from "styled-components";
import { formatISO9075 } from "date-fns";
import VisitorCount from "./Count";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
        setLoading(false);
      });
    });
  }, []);

  // useEffect(() => {
  //   async function fetchPosts() {
  //     try {
  //       const response = await fetch('http://localhost:4000/post');
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       setPosts(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       setLoading(false);
  //     }
  //   }

  //   fetchPosts();
  // }, []);
  const Wrap = styled(Box)({
    // marginTop:'100px'
  });
  return (
    <Wrap>
      {loading ? (
        <Wrap>
          <CircularProgress
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          <p>Loading...</p>
        </Wrap>
      ) : (
        <Wrap>
          {posts.length > 0 &&
            posts.map((post, index) => <Post key={index} {...post} />)}
          {/* <VisitorCount/> */}
        </Wrap>
      )}
    </Wrap>
  );
}
