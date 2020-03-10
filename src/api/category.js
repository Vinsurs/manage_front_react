import ajax from "../libs/ajax";
export const getCategory = async id => await ajax("/api/category/get", { id });
export const delCategory = async () =>
  await ajax("/api/category/del", {}, "POST");
export const updateCategory = async (id, data) =>
  await ajax("/api/category/update", { id, ...data }, "POST");
export const addCategory = async category =>
  await ajax("/api/category/add", category, "POST");
