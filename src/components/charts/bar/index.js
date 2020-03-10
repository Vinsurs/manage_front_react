import React, { useEffect, useState } from "react";
import { Card } from "antd";
import ReactEcharts from "echarts-for-react";
import { getOptionData } from "../getOptionData";
export default function Bar() {
  let [option, setOption] = useState({});
  useEffect(() => {
    async function getOption() {
      let res = await getOptionData();
      let names = [],
        stores = [];
      res.forEach(({ name, store }) => {
        names.push(name);
        stores.push(store);
      });
      return {
        title: {
          text: "商品库存图",
          left: "center"
        },
        legend: {
          data: ["库存"],
          right: 0
        },
        tooltip: {},
        yAxis: {},
        xAxis: {
          data: names
        },
        series: [
          {
            name: "库存",
            type: "bar",
            data: stores
          }
        ]
      };
    }
    (async () => {
      let option = await getOption();
      setOption(option);
    })();
  }, []);
  return (
    <Card title={<span>Echarts 图表统计</span>}>
      <ReactEcharts
        option={option}
        notMerge={true}
        lazyUpdate={true}
        opts={{
          height: 400
        }}
      />
    </Card>
  );
}
