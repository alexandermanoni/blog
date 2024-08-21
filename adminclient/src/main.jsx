import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import RecordList from "./components/RecordList";
import CreateRecord from "./components/CreateRecord";
import "./index.css";
import CreatePostButton from "./components/CreatePostButton";
import Masthead from "./components/Masthead";
import CommentList from "./components/CommentList";
import CreateComment from "./components/CreateComment";
import PostView from "./components/PostView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <><Masthead /><RecordList /></>,
      },
    ],
  },
  {
    path: "/create",
    element: <App />,
    children: [
      {
        path: "/create",
        element: <CreateRecord />,
      },
    ],
  },
  {
    path: "/view/:postid",
    element: <App />,
    children: [
      {
        path: "/view/:postid",
        element: <><PostView /><CommentList /></>,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
