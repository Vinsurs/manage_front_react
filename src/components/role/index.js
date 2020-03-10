import React, { useState, useEffect, useRef } from "react";
import { Card, Button, Table, message, Modal } from "antd";
import LinkButton from "../linkbutton";
import { findRole, addRole, modifyRole, delRole } from "../../api/role";
import caches from "../../libs/cache";
import local from "../../libs/local";
import formatTime from "../../libs/formatTime";
import { pageSize } from "../../config";
import RoleForm from "./rolefom";
export default function Role(props) {
  let [type, setType] = useState("addRole");
  let [shouldFetchRoleList, setShouldFetchRoleList] = useState(true);
  let [visible, setVisible] = useState(false);
  let [roleList, setRoleList] = useState([]);
  let [selectedRowKeys, setSelectedRowKeys] = useState([]);
  let [selectedRow, setSelectedRow] = useState({});
  //获取角色列表
  let formRef = useRef();
  let treeData = [];
  useEffect(() => {
    async function getRoleList() {
      let res = await findRole();
      if (res.status === 1) {
        setRoleList(res.data);
      } else {
        message.error("获取角色列表失败");
      }
    }
    (async () => {
      if (shouldFetchRoleList) {
        await getRoleList();
        setShouldFetchRoleList(false);
      }
    })();
  }, [shouldFetchRoleList]);
  const bindForm = (form, treeKeys) => {
    formRef.current = form;
    treeData = treeKeys;
  };
  const handleCancel = () => {
    setVisible(false);
    formRef.current.resetFields();
  };
  const handleOk = async () => {
    if (type === "addRole") {
      formRef.current.validateFields(async (err, values) => {
        if (!err) {
          let res = await addRole(values);
          if (res.status === 1) {
            message.success("创建角色成功");
            setVisible(false);
            setShouldFetchRoleList(true);
          } else {
            message.error("创建角色失败");
          }
          formRef.current.resetFields();
        }
      });
    } else if (type === "setPriviledges") {
      let authorizedby = caches.user.username;
      let priviledges = treeData.filter(item => item !== "priviledges");
      let res = await modifyRole({
        id: selectedRow._id,
        priviledges,
        authorizedby,
        authorizedwhen: Date.now()
      });
      if (res.status === 1) {
        message.success("设置角色权限成功");
        if (caches.user.role_id === selectedRow._id) {
          local.removeLocalItem("user");
          caches.user = {};
          message.info("当前角色权限已修改,请重新登录");
          props.history.replace("/login");
        } else {
          setShouldFetchRoleList(true);
        }
      } else {
        message.error("设置角色权限失败");
      }
      setVisible(false);
    }
  };
  const handleClick = opt_type => {
    setType(opt_type);
    setVisible(true);
  };
  const handleRowClick = row => {
    handleRadioChange([row._id], [row]);
  };
  const handleRadioChange = (selectedKeys, selectedRows) => {
    let row = selectedRows[0];
    setSelectedRowKeys(selectedKeys);
    setSelectedRow(row);
  };
  const handleDel = id => {
    Modal.confirm({
      title: "删除角色",
      content: "您确定要删除此角色吗?",
      onOk: async () => {
        let res = await delRole(id);
        if (res.status === 1) {
          message.success("删除角色成功");
          setShouldFetchRoleList(true);
        } else {
          message.error("删除角色失败");
        }
      }
    });
  };
  const title = (
    <span className="title">
      <Button
        type="primary"
        className="btn"
        style={{ marginRight: "15px" }}
        onClick={() => handleClick("addRole")}
      >
        创建角色
      </Button>
      <Button
        disabled={selectedRowKeys.length === 0}
        type="primary"
        className="btn"
        onClick={() => handleClick("setPriviledges")}
      >
        设置角色权限
      </Button>
    </span>
  );
  const columns = [
    {
      title: "角色名称",
      dataIndex: "role_name"
    },
    {
      title: "创建时间",
      dataIndex: "create_time",
      render: time => <span>{formatTime(time)}</span>
    },
    {
      title: "授权时间",
      dataIndex: "authorizedwhen",
      render: time => <span>{formatTime(time)}</span>
    },
    {
      title: "授权人",
      dataIndex: "authorizedby"
    },
    {
      title: "操作",
      render: record => (
        <LinkButton onClick={() => handleDel(record._id)}>删除</LinkButton>
      )
    }
  ];
  return (
    <div className="card">
      <Card title={title}>
        <Modal
          maskClosable={false}
          title={type === "addRole" ? "创建角色" : "设置角色权限"}
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <RoleForm
            bindForm={bindForm}
            type={type}
            wantToSetRole={selectedRow}
          />
        </Modal>
        <Table
          dataSource={roleList}
          columns={columns}
          rowSelection={{
            type: "radio",
            onChange: handleRadioChange,
            selectedRowKeys
          }}
          rowKey="_id"
          pagination={{ defaultPageSize: pageSize }}
          onRow={record => {
            return {
              onClick: () => handleRowClick(record)
            };
          }}
        />
      </Card>
    </div>
  );
}
