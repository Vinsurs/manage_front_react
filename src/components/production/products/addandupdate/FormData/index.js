import React, { Component } from "react";
import { Form, Input, InputNumber, Select, message } from "antd";
import { getCategory } from "../../../../../api/category";
const Option = Select.Option;
class FormData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }
  UNSAFE_componentWillMount() {
    this.fetchCategories();
  }
  fetchCategories = async () => {
    let res = await getCategory();
    if (res.status === 1) {
      this.setState({
        categories: res.data
      });
    } else {
      message.error("获取分类数据失败");
    }
  };

  render() {
    const formItemLayout = {
      labelCol: {
        span: 2
      },
      wrapperCol: {
        span: 12
      }
    };
    const { categories } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { description, name, price, store, categoryId } = this.props.data;
    return (
      <Form {...formItemLayout} autoComplete="off">
        <Form.Item label="商品名称">
          {getFieldDecorator("name", {
            initialValue: name || "",
            rules: [
              {
                required: true,
                message: "请填写商品名称"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="商品描述">
          {getFieldDecorator("description", {
            initialValue: description || "",
            rules: [
              {
                required: true,
                message: "请填写商品描述"
              }
            ]
          })(<Input.TextArea autoSize />)}
        </Form.Item>
        <Form.Item label="商品价格">
          <>
            {getFieldDecorator("price", {
              initialValue: price || 0,
              rules: [
                {
                  type: "number",
                  message: "请输入合法数据"
                },
                {
                  required: true,
                  message: "请输入价格数据"
                }
              ]
            })(<InputNumber min={0} style={{ minWidth: "200px" }} />)}
            <span style={{ padding: "0 15px" }}>元</span>
          </>
        </Form.Item>
        <Form.Item label="商品库存">
          <>
            {getFieldDecorator("store", {
              initialValue: store || 0,
              rules: [
                {
                  type: "number",
                  message: "请输入合法数据"
                },
                {
                  required: true,
                  message: "请输入库存数据"
                }
              ]
            })(<InputNumber min={0} style={{ minWidth: "200px" }} />)}{" "}
            <span style={{ padding: "0 15px" }}>件/个/台/本/袋</span>
          </>
        </Form.Item>
        <Form.Item label="商品分类">
          {getFieldDecorator("categoryId", {
            initialValue: categoryId || "",
            rules: [{ required: true, message: "Please select category!" }]
          })(
            <Select placeholder="Please select a category">
              {categories.map(category => (
                <Option value={category._id} key={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Form>
    );
  }
}
export default Form.create()(FormData);
