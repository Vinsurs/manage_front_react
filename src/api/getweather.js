import jsonp from "jsonp";
import { message } from "antd";
export default async city => {
  const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
  return await new Promise(resolve => {
    jsonp(url, (err, data) => {
      if (!err && data.status === "success") {
        let {
          dayPictureUrl,
          weather,
          nightPictureUrl
        } = data.results[0].weather_data[0];
        resolve({ dayPictureUrl, weather, nightPictureUrl });
      } else {
        message.error("获取天气数据失败");
      }
    });
  });
};
