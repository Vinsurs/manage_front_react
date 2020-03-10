import ajax from "../libs/ajax";
export const addUser = async data =>
  await ajax("/api/user/register", data, "POST");
export const delUser = async id =>
  await ajax("/api/user/remove", { id }, "POST");
export const modifyUser = async data =>
  await ajax("/api/user/update", data, "POST");
export const getUser = async id => await ajax("/api/user/find", { id });
