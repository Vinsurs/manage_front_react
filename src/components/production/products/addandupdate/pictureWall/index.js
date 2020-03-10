import React from "react";
import { Upload, Icon, Modal, Form, message } from "antd";
import { delProductImg } from "../../../../../api/product";
import "./index.less";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default class PicturesWall extends React.Component {
  state = {
    loading: false,
    previewVisible: false,
    previewImage: "",
    fileList: []
  };
  UNSAFE_componentWillMount() {
    let imgUrl = this.props.imgUrl;
    if (imgUrl) {
      imgUrl = imgUrl.map((url, index) => {
        return {
          uid: -1 * index,
          name: url,
          url: "/public/uploads/" + url
          // url: api_base + "/public/uploads/" + url
        };
      });
      this.setState({
        fileList: imgUrl
      });
    }
  }
  getUploadImgs = () => {
    return this.state.fileList.map(file => file.name);
  };
  handleCancel = () => this.setState({ previewVisible: false });
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  handleChange = async ({ file, fileList }) => {
    if (file.status === "uploading") {
      this.setState({ loading: true });
    } else {
      if (file.status === "done") {
        // 上传
        let { filename, url } = file.response.data;
        // fileList 最后一个即为当前上传的文件,修正name和url属性
        file = fileList[fileList.length - 1];
        file.name = filename;
        file.url = url;
      } else if (file.status === "removed") {
        // 删除
        let res = await delProductImg(file.name);
        if (res.status !== 1) {
          message.error(res.msg);
        }
      }
      this.setState({ loading: false });
    }
    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Form.Item
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 22 }}
        label="商品图片"
      >
        <Upload
          accept="image/*"
          action={"/api/uploadImg"}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </Form.Item>
    );
  }
}
