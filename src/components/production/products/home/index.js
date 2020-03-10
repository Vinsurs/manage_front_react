import React, { Component } from "react";
import { Card, Table, message, Button, Select, Input, Tag } from "antd";
import { pageSize } from "../../../../config";
import LinkButton from "../../../linkbutton";
import { getProduct, updateProduct } from "../../../../api/product";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.columns = [
      {
        title: "商品名称",
        dataIndex: "name"
      },
      {
        title: "商品描述",
        ellipsis: true,
        dataIndex: "description"
      },
      {
        title: "价格(￥)",
        dataIndex: "price"
      },
      {
        title: "库存",
        dataIndex: "store"
      },
      {
        title: "状态",
        align: "center",
        dataIndex: "isOnSale",
        render: (isOnSale, record) => (
          <>
            <Tag
              style={{ padding: "0 10px" }}
              color={isOnSale ? "#108ee9" : "#f50"}
            >
              {isOnSale ? "在售" : "已下架"}
            </Tag>
            <Button
              type="primary"
              size="small"
              onClick={() => this.handleSaleClick(record)}
            >
              {isOnSale ? "下架" : "上架"}
            </Button>
          </>
        )
      },
      {
        title: "操作",
        align: "center",
        render: record => (
          <span>
            <LinkButton
              onClick={() =>
                this.handleNavigation(
                  "/manage/production/products/detail",
                  record
                )
              }
            >
              详情
            </LinkButton>
            <LinkButton
              onClick={() =>
                this.handleNavigation(
                  "/manage/production/products/addandupdate",
                  record
                )
              }
            >
              修改
            </LinkButton>
          </span>
        )
      }
    ];
    this.state = {
      loading: false,
      dataSource: [],
      tableData: [],
      keyVal: "",
      searchType: "name"
    };
  }
  UNSAFE_componentWillMount() {
    this.fetchData();
  }
  componentWillUnmount() {
    //关闭函数防抖的定时器
    clearTimeout(this.timer);
  }
  fetchData = async () => {
    this.setState({
      loading: true
    });
    let res = await getProduct();
    if (res.status === 1) {
      this.setState({
        dataSource: res.data,
        tableData: res.data,
        loading: false
      });
    } else {
      message.error("获取商品数据失败");
    }
  };
  handleSearch = () => {
    let { searchType, keyVal, dataSource } = this.state;
    let newDataSource = dataSource.filter(
      product => product[searchType].match(new RegExp(keyVal, "i")) !== null
    );
    this.setState({
      tableData: newDataSource
    });
  };
  handleSaleClick = record => {
    //为防止频繁点击切换状态,函数防抖处理,只会执行最后一次的点击效果
    clearTimeout(this.timer);
    this.timer = setTimeout(async () => {
      let res = await updateProduct(record._id, { isOnSale: !record.isOnSale });
      if (res.status === 1) {
        message.success("商品状态修改成功");
        await this.fetchData();
      } else {
        message.error("商品状态修改失败");
      }
    }, 500);
  };
  //路由处理
  handleNavigation = (url, record) => {
    //详情,修改(record),添加(无record)
    this.props.history.push(url, record);
  };
  handleInputChange = val => {
    this.setState({ keyVal: val });
    if (val === "") {
      this.setState({
        tableData: [...this.state.dataSource]
      });
    }
  };
  render() {
    const { tableData, loading, searchType, keyVal } = this.state;
    const title = (
      <span>
        <Select
          value={searchType}
          style={{
            display: "inline-block",
            width: "120px",
            marginRight: "15px"
          }}
          onChange={val => this.setState({ searchType: val })}
        >
          <Select.Option value="name">按名称搜索</Select.Option>
          <Select.Option value="description">按描述搜索</Select.Option>
        </Select>
        <Input
          style={{ width: "250px", marginRight: "15px" }}
          placeholder="关键字"
          value={keyVal}
          onChange={e => this.handleInputChange(e.target.value)}
        />
        <Button type="primary" onClick={this.handleSearch}>
          搜索
        </Button>
      </span>
    );
    return (
      <div>
        <Card
          title={title}
          extra={
            <Button
              type="primary"
              icon="plus"
              onClick={() =>
                this.handleNavigation(
                  "/manage/production/products/addandupdate"
                )
              }
            >
              添加
            </Button>
          }
        >
          <Table
            rowKey="_id"
            bordered
            loading={loading}
            dataSource={tableData}
            columns={this.columns}
            pagination={{ pageSize }}
          />
        </Card>
      </div>
    );
  }
}
