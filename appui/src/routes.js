import React from "react";

// load react components lazily through code splitting
const AboutUs = React.lazy(() => import("./pages/aboutUs/AboutUs.js"));
const Post = React.lazy(() => import("./pages/post/Post.js"));
const PostView = React.lazy(() => import("./pages/post/PostView.js"));
const Recent = React.lazy(() => import("./pages/recent/Recent.js"));
const Search = React.lazy(() => import("./pages/search/Search.js"));

// set path for every page
const routes = [
  { path: "/", exact: true, name: "Recent", component: Recent },
  { path: "/pages/post", name: "Post", component: Post },
  { path: "/pages/postView/:postId", name: "PostView", component: PostView },
  { path: "/pages/recent", name: "Recent", component: Recent },
  { path: "/pages/search", name: "Search", component: Search },
  { path: "/pages/aboutUs", name: "AboutUs", component: AboutUs },
];

export default routes;
