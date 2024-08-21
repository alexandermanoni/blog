////// React Component to View the Contents of a Post (No Comments) //////

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Post = (props) => (
    <div className="rounded-lg bg-white shadow-md space-y-3 p-6 m-1 w-1/2">
        <div className="text-2xl font-semibold text-black">
            {props.post.posttitle}
        </div>
        <div className="text-md font-small text-black text-justify">
            {props.post.postbody}
        </div>
    </div>
);

export default function PostView() {
  const {postid} = useParams();
  const [posts, setPosts] = useState([]);
  
  // get post
  useEffect(() => {
    async function getPost() {
      // get record given key
      const response = await fetch(`http://localhost:5050/record/${postid}`);

      if (!response) {
        console.error(`An error occurred: ${response.statusText}`);
        return;
      }

      const post = await response.json();
      setPosts(post);
    }

    getPost();
    return;
  }, [posts.length]);

  // map it to post object
  function createPost() {
    return posts.map((post) => {
      return (
        <Post
          post={post}
          key={post.postid}
        />
      );
    });
  }

  // display it
  return (
    <>
      <div className="flex overflow-visible space-y-10 items-center flex-col">
        { createPost() }
      </div>
    </>
  );
}