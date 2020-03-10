import React from "react";
import { Card, Button, Table, Modal, message } from "antd";
import LinkButton from "../linkbutton";
import { addUser, getUser, delUser, modifyUser } from "../../api/user";
import { findRole } from "../../api/role";
import formatTime from "../../libs/formatTime";
import UserForm from "../userForm";
import { pageSize } from "../../config";
export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curSelectedRecord: {},
      visible: false,
      dataSource: [],
      roleList: [],
      columns: [
        {
          title: "账号",
          dataIndex: "username",
          key: "username"
        },
        {
          title: "电话",
          dataIndex: "phone",
          key: "phone"
        },
        {
          title: "email",
          dataIndex: "email",
          key: "email"
        },
        {
          title: "注册时间",
          dataIndex: "create_time",
          render: time => <span>{formatTime(time)}</span>
        },
        {
          title: "所属角色",
          dataIndex: "role_id",
          render: id => <span>{this.mapIdToRole(id)}</span>
        },
        {
          title: "操作",
          dataIndex: "",
          render: (txt, record) => (
            <span>
              <LinkButton onClick={() => this.handleOpenClick(record)}>
                修改
              </LinkButton>
              <LinkButton onClick={() => this.handleDel(record)}>
                删除
              </LinkButton>
            </span>
          )
        }
      ]
    };
  }
  async componentWillMount() {
    await this.fetchRoleList();
    await this.fetchDataSource();
  }
  fetchDataSource = async () => {
    let res = await getUser();
    if (res.status === 1) {
      this.setState({
        dataSource: res.data
      });
    } else {
      message.error("获取用户数据失败,请刷新后重试!");
    }
  };
  fetchRoleList = async () => {
    let res = await findRole();
    if (res.status === 1) {
      this.setState({
        roleList: res.data
      });
    } else {
      message.error("获取角色列表失败");
    }
  };
  handleAddOrModify = async record => {
    //接受输入的表单数据
    let res,
      txt,
      curRecord = this.state.curSelectedRecord;
    if (curRecord._id) {
      //update
      txt = "更新";
      record._id = curRecord._id;
      res = await modifyUser(record);
    } else {
      //add
      txt = "添加";
      res = await addUser(record);
    }
    if (res.status === 1) {
      this.setState({
        visible: false,
        curSelectedRecord: {}
      });
      message.success(`${txt}用户成功!`);
      this.fetchDataSource();
      this.form.resetFields();
    } else {
      message.error(`${txt}用户失败!`);
    }
  };
  handleDel = record => {
    Modal.confirm({
      title: "删除用户",
      content: "确认删除此用户吗?",
      centered: true,
      onOk: async () => {
        let res = await delUser(record._id);
        if (res.status === 1) {
          message.success("删除用户成功");
          this.fetchDataSource();
        } else {
          message.error("删除用户失败");
        }
      }
    });
  };
  handleOpenClick = (record = {}) => {
    this.setState({
      curSelectedRecord: record,
      visible: true
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
      curSelectedRecord: {}
    });
    this.form.resetFields();
  };
  handleOk = () => {
    this.form.validateFields((err, values) => {
      if (!err) {
        this.handleAddOrModify(values);
      }
    });
  };
  handleBindForm = form => {
    this.form = form;
  };
  mapIdToRole = id => {
    return this.state.roleList.find(role => role._id === id).role_name;
  };
  render() {
    let {
      dataSource,
      columns,
      visible,
      roleList,
      curSelectedRecord
    } = this.state;
    return (
      <Card
        title={
          <Button type="primary" onClick={this.handleOpenClick}>
            添加用户
          </Button>
        }
      >
        <Modal
          title={
            curSelectedRecord && curSelectedRecord._id ? "修改用户" : "添加用户"
          }
          maskClosable={false}
          cancelButtonProps={{ type: "danger" }}
          okText={curSelectedRecord && curSelectedRecord._id ? "修改" : "添加"}
          cancelText="取消"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <UserForm
            bindForm={this.handleBindForm}
            roleList={roleList}
            record={curSelectedRecord}
          />
        </Modal>
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="_id"
          pagination={{ defaultPageSize: pageSize }}
        />
        ;
      </Card>
    );
  }
}
