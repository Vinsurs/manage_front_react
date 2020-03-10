import React, { Component } from "react";
import { Card, Icon, Button, Form, message } from "antd";
import FormData from "./FormData";
import PictureWall from "./pictureWall";
import RichTextEditor from "./richTextEditor";
import { addProduct, updateProduct } from "../../../../api/product";
export default class AddAndUpdate extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.uploadRef = React.createRef();
    this.richTextRef = React.createRef();
    this.state = {
      isUpdate: false
    };
  }
  UNSAFE_componentWillMount() {
    let record = this.props.history.location.state;
    if (record) {
      this.record = record;
      this.setState({ isUpdate: true });
    }
  }
  // 修改, 添加处理
  handleClick = () => {
    this.formRef.current.validateFields(async (err, values) => {
      if (!err) {
        values.detail = this.richTextRef.current.getEditorHTMLContent();
        values.imgUrl = this.uploadRef.current.getUploadImgs();
        let res, msg;
        if (this.state.isUpdate) {
          // 更新
          res = await updateProduct(this.record._id, values);
          msg = "修改";
        } else {
          // 添加
          res = await addProduct(values);
          msg = "添加";
        }
        if (res.status === 1) {
          message.success(msg + "商品成功");
          this.props.history.goBack();
        } else {
          message.error(msg + "商品失败");
        }
      }
    });
  };
  render() {
    const { isUpdate } = this.state;
    const title = (
      <>
        <Icon
          onClick={() => this.props.history.goBack()}
          type="arrow-left"
          style={{ color: "#1da57a", paddingRight: "15px" }}
        />
        <span>{isUpdate ? "修改商品" : "添加商品"}</span>
      </>
    );
    let record = {};
    if (isUpdate) {
      record = this.record;
    }
    let {
      categoryId,
      imgUrl,
      description,
      name,
      price,
      store,
      detail
    } = record;
    return (
      <div>
        <Card title={title}>
          <FormData
            ref={this.formRef}
            data={{ description, name, price, store, categoryId }}
          />
          <PictureWall ref={this.uploadRef} imgUrl={imgUrl} />
          <RichTextEditor ref={this.richTextRef} detail={detail} />
          <Form.Item wrapperCol={{ span: 12, offset: 2 }}>
            <Button type="primary" onClick={this.handleClick}>
              确定
            </Button>
          </Form.Item>
        </Card>
      </div>
    );
  }
}
