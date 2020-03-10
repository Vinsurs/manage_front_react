import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Layout, Modal, Affix } from "antd";
import { withRouter } from "react-router-dom";
import MyHeader from "../../components/header";
import LeftNav from "../../components/nav";
import caches from "../../libs/cache";
import local from "../../libs/local";
import Home from "../../components/home";
import Sort from "../../components/production/sort";
import Product from "../../components/production/products";
import User from "../../components/user";
import Role from "../../components/role";
import Bar from "../../components/charts/bar";
import Line from "../../components/charts/line";
import Pie from "../../components/charts/pie";
import { findRole } from "../../api/role";

import "./manage.less";
const { Header, Sider, Footer, Content } = Layout;
const routes = [
  { path: "/manage/home", component: Home },
  { path: "/manage/production/sort", component: Sort },
  { path: "/manage/production/products", component: Product },
  { path: "/manage/user", component: User },
  { path: "/manage/role", component: Role },
  { path: "/manage/charts/bar", component: Bar },
  { path: "/manage/charts/line", component: Line },
  { path: "/manage/charts/pie", component: Pie }
];
function Manage({ location }) {
  const [user, setUser] = useState(caches.user);
  let [priviledges, setPriviledges] = useState([]);
  let [authRoutes, setAuthRoutes] = useState([]);
  function mapPriviledgesToRoutes(newPriviledges) {
    let afteRroutes = routes.filter(route =>
      newPriviledges.includes(route.path)
    );
    setAuthRoutes(afteRroutes);
  }
  useEffect(() => {
    async function getPriviledges() {
      if (user.username === "admin") {
        setAuthRoutes(routes);
      } else {
        let id = user.role_id;
        let res = await findRole(id);
        let newPriviledges = res.data.priviledges;
        if (newPriviledges) {
          mapPriviledgesToRoutes(newPriviledges);
          setPriviledges(newPriviledges);
        }
      }
    }
    getPriviledges();
  }, [user]);
  function logout() {
    Modal.confirm({
      title: "info",
      content: "确认退出吗?",
      onOk: () => {
        local.removeLocalItem("user");
        caches.user = {};
        setUser({});
      }
    });
  }
  return user._id ? (
    <Layout className="manage-layout">
      <Affix>
        <Sider className="manage-sider">
          <LeftNav user={user} priviledges={priviledges} />
        </Sider>
      </Affix>
      <Layout className="manage-right">
        <Affix offsetTop="0">
          <Header className="manage-header">
            <MyHeader user={user} logout={logout} path={location.pathname} />
          </Header>
        </Affix>
        <Content className="manage-content">
          <Switch>
            {/* 权限路由配置 */}
            {authRoutes.map(({ path, component }) => (
              <Route path={path} component={component} key={path} />
            ))}
            <Redirect from="/manage" exact to="/manage/home" />
          </Switch>
        </Content>
        <Footer className="manage-footer">
          推荐使用谷歌浏览器,享受更好的用户操作体验!
        </Footer>
      </Layout>
    </Layout>
  ) : (
    <Redirect to="/login" />
  );
}
export default withRouter(Manage);
