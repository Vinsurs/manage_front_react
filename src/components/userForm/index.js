import React from "react";
import { Form, Input, Select } from "antd";
const Option = Select.Option;
class UserForm extends React.Component {
  componentDidMount() {
    this.props.bindForm(this.props.form);
  }
  render() {
    const { roleList, form, record } = this.props;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 }
    };
    let isUpdate = !!(record && record._id);
    return (
      <Form autoComplete="off">
        <Form.Item {...formItemLayout} label="账号" hasFeedback>
          {getFieldDecorator("username", {
            initialValue: isUpdate ? record.username : "",
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Please input username"
              },
              {
                pattern: /\w+/,
                message: "必须由英文字母,数字,下划线组成"
              },
              {
                min: 6,
                message: "不能少于6位"
              },
              {
                max: 24,
                message: "不能大于24位"
              }
            ]
          })(
            <Input placeholder="Please input  username" disabled={isUpdate} />
          )}
        </Form.Item>
        {isUpdate ? null : (
          <Form.Item {...formItemLayout} label="密码" hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Please input password"
                },
                {
                  pattern: /\w+/,
                  message: "必须由英文字母,数字,下划线组成"
                },
                {
                  min: 6,
                  message: "不能少于6位"
                },
                {
                  max: 24,
                  message: "不能大于24位"
                }
              ]
            })(<Input.Password placeholder="Please input  password" />)}
          </Form.Item>
        )}
        <Form.Item {...formItemLayout} label="电话" hasFeedback>
          {getFieldDecorator("phone", {
            initialValue: isUpdate ? record.phone : "",
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Please input phone"
              },
              {
                pattern: /^1[3,4,5,7,8][0-9]{9}$/,
                message: "请输入合法的手机号"
              }
            ]
          })(<Input placeholder="Please input phone" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="邮箱" hasFeedback>
          {getFieldDecorator("email", {
            initialValue: isUpdate ? record.email : "",
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Please input  email"
              },
              {
                type: "email",
                message: "请输入合法的邮箱"
              }
            ]
          })(<Input placeholder="Please input email" />)}
        </Form.Item>
        <Form.Item label="角色" {...formItemLayout}>
          {getFieldDecorator("role_id", {
            initialValue: isUpdate ? record.role_id : "",
            rules: [{ required: true, message: "Please select your gender!" }]
          })(
            <Select placeholder="Select a role for the new user">
              {roleList.map(role => (
                <Option value={role._id} key={role._id}>
                  {role.role_name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Form>
    );
  }
}
export default Form.create()(UserForm);
