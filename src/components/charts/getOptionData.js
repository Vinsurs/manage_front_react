import { getProduct } from "../../api/product";
import { message } from "antd";
export async function getOptionData() {
  let data = [];
  let res = await getProduct();
  if (res.status === 1) {
    data = res.data.map(({ name, store }) => ({ name, store }));
  } else {
    message.error("获取数据失败");
  }
  return data;
}
