import React, { useEffect, useState } from "react";
import { Form, Input, Icon, Tree } from "antd";
import { routes_manage } from "../../config";
const { TreeNode } = Tree;
function RoleForm(props) {
  const { form, bindForm, type, wantToSetRole } = props;
  const { getFieldDecorator } = form;
  const [checkedKeys, setCheckedKeys] = useState();
  useEffect(() => {
    setCheckedKeys(wantToSetRole.priviledges);
  }, [wantToSetRole]);
  useEffect(() => {
    bindForm(form, checkedKeys);
  }, [bindForm, form, checkedKeys]);
  const renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode
            title={item.label}
            key={item.key}
            dataRef={{
              title: item.label,
              key: item.key,
              children: item.children
            }}
          >
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={item.label} />;
    });
  const onCheck = checkedKeys => {
    setCheckedKeys(checkedKeys);
  };

  return (
    <div>
      <Form.Item>
        {getFieldDecorator("role_name", {
          initialValue: wantToSetRole.role_name,
          rules: [
            { required: true, message: "Please input new roleName!" },
            {
              pattern: /^[a-zA-Z\u4E00-\u9FA5]{2,10}$/,
              message: "请输入合法的角色名称"
            }
          ]
        })(
          <Input
            prefix={
              <Icon
                type="safety-certificate"
                style={{ color: "rgba(0,0,0,.25)" }}
              />
            }
            placeholder="input rolename here"
            disabled={type === "setPriviledges"}
          />
        )}
      </Form.Item>

      {type === "setPriviledges" ? (
        <Tree
          checkable
          onCheck={onCheck}
          defaultExpandAll
          checkedKeys={checkedKeys}
        >
          <TreeNode key="priviledges" title="设置角色权限">
            {renderTreeNodes(routes_manage)}
          </TreeNode>
        </Tree>
      ) : null}
    </div>
  );
}
export default Form.create()(RoleForm);
