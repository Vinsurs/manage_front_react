import React from "react";
import { Form, Icon, message, Input, Button } from "antd";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import doLogin from "../../api/login";
import local from "../../libs/local";
import caches from "../../libs/cache";
import "./login.less";

function Login({ form, history }) {
  const { getFieldDecorator, validateFields } = form;
  function handleSubmit(ev) {
    ev.preventDefault();
    validateFields(async (err, values) => {
      if (!err) {
        let res = await doLogin(values);
        if (res.status === 1) {
          // 过滤用户敏感信息后存储本地
          let sanitize = ["password", "phone", "email", "create_time"];
          sanitize.forEach(item => {
            res.user[item] = undefined;
          });
          local.setLocalItem("user", res.user);
          caches.user = res.user;
          message.success("登录成功!");
          history.replace("/manage");
        } else if (res.status === 0) {
          message.error(res.msg);
        }
      }
    });
  }
  return (
    <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo" />

        <h2>
          <Link to="/">React 后台管理系统</Link>
        </h2>
      </header>
      <section className="login-form">
        <h2 className="login-form-header">
          <Icon type="user" style={{ color: "black" }} />
          <span>用户登录</span>
        </h2>
        <Form
          onSubmit={handleSubmit}
          className="login-form-body"
          autoComplete="off"
        >
          <Form.Item label="用户名" hasFeedback>
            {getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "username is required!"
                },
                { min: 5, message: "用户名至少5位!" },
                { max: 12, message: "用户名不超过12位!" },
                {
                  pattern: /^\w+$/,
                  message: "用户名必须由字母、数字、下划线组成!"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="input your username here"
              />
            )}
          </Form.Item>
          <Form.Item label="密码" hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "password is required!"
                },
                { min: 5, message: "密码至少5位!" },
                { max: 16, message: "密码不超过16位!" },
                {
                  pattern: /^\w+$/,
                  message: "密码必须由字母、数字、下划线组成!"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="input your password here"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
}
const LoginForm = Form.create()(Login);
export default LoginForm;
