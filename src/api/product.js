import ajax from "../libs/ajax";
export const addProduct = async product =>
  await ajax("/api/product/add", product, "POST");
export const delProduct = async id =>
  await ajax("/api/product/del", { id }, "POST");
export const getProduct = async id => await ajax("/api/product/get", { id });
export const updateProduct = async (id, data) =>
  await ajax("/api/product/update", { id, ...data }, "POST");
// 删除产品图片
export const delProductImg = async filename =>
  await ajax("/api/delUploadImg", { filename }, "POST");
