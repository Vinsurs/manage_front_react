import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Spin, message, Input, Icon, Card } from "antd";
import LinkButton from "../../linkbutton";
import {
  getCategory,
  addCategory,
  updateCategory
} from "../../../api/category";
import { pageSize } from "../../../config";
let curRecord = null;
export default function Sort() {
  let [dataSource, setDataSource] = useState([]);
  let [shouldFetchSource, setShouldFetchSource] = useState(true);
  let [spinning, setSpinning] = useState(true);
  let [visible, setVisible] = useState(false);
  let [inpVal, setInpVal] = useState("");
  useEffect(() => {
    async function fetchSort() {
      let res = await getCategory();
      if (res.status === 1) {
        setSpinning(false);
        setDataSource(res.data);
      } else {
        message.error("加载分类数据失败");
      }
      setShouldFetchSource(false);
    }
    if (shouldFetchSource) {
      setSpinning(true);
      fetchSort();
    }
  }, [shouldFetchSource]);
  const handleAddUpdateClick = record => {
    if (record) {
      curRecord = record;
      setInpVal(curRecord.name);
    } else {
      curRecord = null;
    }
    setVisible(true);
  };
  const handleOk = async () => {
    if (inpVal === "") {
      Modal.error({
        title: "操作失败",
        content: "请输入合法商品名称后再提交!"
      });
    } else {
      let res;
      if (curRecord) {
        //modify
        res = await updateCategory(curRecord._id, { name: inpVal });
      } else {
        //add
        res = await addCategory({ name: inpVal });
      }
      if (res.status === 1) {
        message.success("操作成功");
      } else {
        message.success("操作失败");
      }
      handleCancel();
      setShouldFetchSource(true);
    }
  };
  const handleCancel = () => {
    setVisible(false);
    setInpVal("");
  };
  const columns = [
    {
      title: "分类名称",
      align: "center",
      dataIndex: "name"
    },
    {
      title: "操作",
      align: "center",
      render: record => (
        <LinkButton onClick={() => handleAddUpdateClick(record)}>
          修改
        </LinkButton>
      )
    }
  ];

  return (
    <div className="sort-content">
      <Modal
        title={curRecord && curRecord._id ? "修改商品分类" : "添加商品分类"}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          value={inpVal}
          onChange={e => setInpVal(e.target.value)}
          placeholder="Enter a category"
          prefix={<Icon type="bars" style={{ color: "rgba(0,0,0,.25)" }} />}
        />
      </Modal>
      <Card
        title="商品种类"
        extra={
          <Button
            type="primary"
            icon="plus"
            onClick={() => handleAddUpdateClick()}
          >
            添加
          </Button>
        }
      >
        <Spin spinning={spinning} delay="500">
          <Table
            bordered
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize }}
            rowKey="_id"
          />
        </Spin>
      </Card>
    </div>
  );
}
