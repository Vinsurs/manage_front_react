import React, { Component } from "react";
import { Form } from "antd";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
export default class RichTextEditor extends Component {
  constructor(props) {
    super(props);
    const html = props.detail || "";
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState
      };
    }
  }
  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };
  getEditorHTMLContent = () => {
    return draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
  };
  render() {
    const { editorState } = this.state;
    return (
      <Form.Item
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 18 }}
        label="商品详情"
      >
        <Editor
          editorState={editorState}
          editorStyle={{
            border: "1px solid black",
            minHeight: "240px",
            padding: "15px"
          }}
          onEditorStateChange={this.onEditorStateChange}
        />
      </Form.Item>
    );
  }
}
