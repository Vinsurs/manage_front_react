import React, { useState, useEffect } from "react";
import LinkButton from "../linkbutton";
import { routes_manage } from "../../config";
import getWeather from "../../api/getweather";
//import formatTime from "../../libs/formatTime";
import formate from "date-fm";
import getLocation from "../../api/getlocation";
import "./header.less";
function Header(props) {
  let [t, setT] = useState();
  let [w, setW] = useState({});
  let [city, setCity] = useState();
  let [isAm, setIsAm] = useState();
  useEffect(() => {
    (async () => {
      let c = await getLocation();
      setCity(c.nm);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (city) {
        let weather = await getWeather(city);
        setW(weather);
      }
    })();
  }, [city]);
  useEffect(() => {
    let nowH = new Date().getHours();
    setIsAm(nowH < 18);
    // let timer = setInterval(() => {
    //   setT(formatTime(Date.now()));
    // }, 1000);
    let timer = setInterval(() => {
      setT(
        formate("YYYY年MM月DD日 HH:II:SS WW", new Date(), {
          weekdays: [
            "星期天",
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六"
          ]
        })
      );
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  function getTitle() {
    let title = "";
    let pathname = props.path;
    routes_manage.forEach(route => {
      if (!route.children) {
        if (pathname.indexOf(route.key) !== -1) title = route.label;
      } else {
        let item = route.children.find(
          item => pathname.indexOf(item.key) !== -1
        );
        if (item) title = item.label;
      }
    });
    return title;
  }
  let title = getTitle();
  return (
    <header className="header">
      <div className="header-top">
        <span>
          欢迎&nbsp;&nbsp;{props.user.username}&nbsp;&nbsp;
          <LinkButton onClick={props.logout}>退出</LinkButton>
        </span>
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">{title}</div>
        <div className="header-bottom-right">
          <span style={{ paddingRight: "15px" }}>{t}</span>
          <span>[{city}]</span>
          <img
            className="header-bottom-img"
            src={isAm ? w.dayPictureUrl : w.nightPictureUrl}
            alt="weather"
          />
          <span className="header-bottom-txt">{w.weather}</span>
        </div>
      </div>
    </header>
  );
}
export default Header;
