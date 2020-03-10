import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import caches from "./libs/cache";
import local from "./libs/local";
caches.user = local.getLocalItem("user");

ReactDOM.render(<App />, document.getElementById("root"));
