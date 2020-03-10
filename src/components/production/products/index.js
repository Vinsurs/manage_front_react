import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./home";
import Detail from "./detail";
import AddAndUpdate from "./addandupdate";
export default function Product() {
  return (
    <Switch>
      <Route path="/manage/production/products" exact component={Home} />
      <Route path="/manage/production/products/detail" component={Detail} />
      <Route
        path="/manage/production/products/addandupdate"
        component={AddAndUpdate}
      />
    </Switch>
  );
}
