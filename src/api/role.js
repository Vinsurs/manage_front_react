import ajax from "../libs/ajax";
export const findRole = async id => await ajax("/api/role/find", { id }, "GET");
export const addRole = async role => await ajax("/api/role/add", role, "POST");
export const delRole = async id => await ajax("/api/role/del", { id }, "POST");
export const modifyRole = async role =>
  await ajax("/api/role/modify", role, "POST");
