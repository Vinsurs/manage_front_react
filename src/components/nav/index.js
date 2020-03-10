import React, { useState, useEffect } from "react";
import { Menu, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import { routes_manage } from "../../config";
import logo from "../../logo.svg";
import "./nav.less";
const { SubMenu } = Menu;
const hasChildrenNav = routes_manage.filter(item => item.children);
function Nav({ location, user, priviledges }) {
  let openKeys = checkOpenKeys(location.pathname);
  let [selectedKey, setSelectedKey] = useState([]);
  useEffect(() => {
    function checkSelectKeys(pathname) {
      let selectedKeys = [];
      if (openKeys.length > 0) {
        for (let i = 0; i < hasChildrenNav.length; i++) {
          for (let j = 0; j < hasChildrenNav[i].children.length; j++) {
            const child = hasChildrenNav[i].children[j];
            if (pathname.indexOf(child.key) !== -1) {
              selectedKeys.push(child.key);
              break;
            }
          }
        }
      } else {
        selectedKeys.push(pathname);
      }
      return selectedKeys;
    }
    setSelectedKey(checkSelectKeys(location.pathname));
  }, [location.pathname, openKeys.length]);
  // function setNavListWithMap(navList) {
  //   return navList.map(item => {
  //     if (item.children) {
  //       return (
  //         <SubMenu
  //           key={item.key}
  //           title={
  //             <span>
  //               <Icon type={item.icon} />
  //               <span>{item.label}</span>
  //             </span>
  //           }
  //         >
  //           {setNavList(item.children)}
  //         </SubMenu>
  //       );
  //     } else {
  //       return (
  //         <Menu.Item key={item.key}>
  //           <Link to={item.key}>
  //             <span>
  //               <Icon type={item.icon} />
  //               <span>{item.label}</span>
  //             </span>
  //           </Link>
  //         </Menu.Item>
  //       );
  //     }
  //   });
  // }
  function handleAuth(item) {
    /*
    权限说明
      1.如果是管理员，则直接放行
      2.如果是public权限，放行
      3.判断该用户是否具备item相关权限
    */
    if (user.username === "admin") return true;
    if (item.public) return true;
    if (priviledges.includes(item.key)) return true;
    return false;
  }
  function setNavList(navList) {
    return navList.reduce((pre, item, i) => {
      if (handleAuth(item)) {
        if (item.children) {
          pre.push(
            <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type={item.icon} />
                  <span>{item.label}</span>
                </span>
              }
            >
              {setNavList(item.children)}
            </SubMenu>
          );
        } else {
          pre.push(
            <Menu.Item key={item.key}>
              <Link to={item.key}>
                <span>
                  <Icon type={item.icon} />
                  <span>{item.label}</span>
                </span>
              </Link>
            </Menu.Item>
          );
        }
      }
      return pre;
    }, []);
  }
  function checkOpenKeys(comparator) {
    let childrenList = hasChildrenNav;
    let shouldOpenKeys = [];
    childrenList.forEach(item => {
      item.children.forEach(child => {
        if (comparator.indexOf(child.key) !== -1) {
          shouldOpenKeys.push(item.key);
        }
      });
    });
    return shouldOpenKeys;
  }
  return (
    <>
      <div className="logo">
        <img src={logo} alt="logo" />
        <span>React 后台</span>
      </div>
      <div className="nav">
        <Menu
          selectedKeys={selectedKey}
          mode="inline"
          theme="dark"
          defaultOpenKeys={openKeys}
        >
          {setNavList(routes_manage)}
        </Menu>
      </div>
    </>
  );
}
export default withRouter(Nav);
