import React, { Component } from "react";
import { Card, Icon, List } from "antd";
import { getCategory } from "../../../../api/category";
import "./index.less";
const Item = List.Item;
export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: ""
    };
  }
  UNSAFE_componentWillMount() {
    this.fetchCategoryFromId();
  }
  fetchCategoryFromId = async () => {
    let { categoryId } = this.props.history.location.state;
    let res = await getCategory(categoryId);
    if (res.status === 1) {
      this.setState({
        category: res.data.name
      });
    }
  };
  render() {
    const {
      description,
      name,
      price,
      store,
      detail,
      imgUrl
    } = this.props.history.location.state;
    let categoryName = this.state.category;
    const title = (
      <>
        <Icon
          onClick={() => this.props.history.goBack()}
          type="arrow-left"
          style={{ color: "#1da57a", paddingRight: "15px" }}
        />
        <span>商品详情</span>
      </>
    );
    return (
      <div className="detail-content">
        <Card title={title}>
          <List>
            <Item>
              <span className="detail-left-label">商品名称:</span>
              <span>{name}</span>
            </Item>
            <Item>
              <span className="detail-left-label">所属分类:</span>
              <span>{categoryName}</span>
            </Item>
            <Item>
              <span className="detail-left-label">商品描述:</span>
              <span>{description}</span>
            </Item>
            <Item>
              <span className="detail-left-label">商品价格:</span>
              <span>{price} 元</span>
            </Item>
            <Item>
              <span className="detail-left-label">商品库存:</span>
              <span>{store} (件/个/台/本/袋)</span>
            </Item>
            <Item>
              <span className="detail-left-label">商品图片:</span>
              <span>
                {imgUrl.map(url => (
                  <img
                    src={"/public/uploads/" + url}
                    alt={url}
                    key={url}
                    className="img"
                  />
                ))}
              </span>
            </Item>
            <Item>
              <span className="detail-left-label">商品详情:</span>
              <span dangerouslySetInnerHTML={{ __html: detail }}></span>
            </Item>
          </List>
        </Card>
      </div>
    );
  }
}
