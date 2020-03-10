import axios from "axios";
import { message } from "antd";
export default function(url, data, method = "GET") {
  let promise = null;
  if (/^GET$/i.test(method)) {
    promise = axios.get(url, {
      params: data
    });
  }
  if (/^POST$/i.test(method)) {
    promise = axios.post(url, data);
  }
  return promise
    .then(res => res.data)
    .catch(reason => {
      message.error(reason.message);
    });
}
