import ajax from "../libs/ajax";

async function doLogin(user) {
  return await ajax("/api/user/login", user, "POST");
}
export default doLogin;
