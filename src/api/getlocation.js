import ajax from "../libs/ajax";
async function doLocation() {
  let res = await ajax("/api/getlocation", {}, "GET");
  if (res && res.data) return res.data.data;
  return {};
}
export default doLocation;
