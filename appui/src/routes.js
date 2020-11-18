import React from "react";

// load react components lazily through code splitting
const Home = React.lazy(() => import("./pages/Home/Home.js"));
const Post = React.lazy(() => import("./pages/Post/Post.js"));
const PostView = React.lazy(() => import("./pages/Post/PostView.js"));
const Recent = React.lazy(() => import("./pages/Recent/Recent.js"));
const Search = React.lazy(() => import("./pages/Search/Search.js"));

// set path for every page
const routes = [
  { path: "/", exact: true, name: "Home", component: Home },
  { path: "/pages/post", name: "Post", component: Post },
  { path: "/pages/postView/:postId", name: "PostView", component: PostView },
  { path: "/pages/recent", name: "Recent", component: Recent },
  { path: "/pages/search", name: "Search", component: Search },
];

export default routes;
