import React, { useEffect, useState } from "react";
import { Card } from "antd";
import ReactEcharts from "echarts-for-react";
import { getOptionData } from "../getOptionData";
export default function Line() {
  let [option, setOption] = useState({});
  useEffect(() => {
    async function getOption() {
      let res = await getOptionData();
      let names = [],
        stores = [],
        pieData = [];
      res.forEach(({ name, store }) => {
        names.push(name);
        stores.push(store);
        pieData.push({
          name,
          value: store
        });
      });

      return {
        title: {
          text: "商品库存图",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          bottom: 10,
          left: "center",
          data: names
        },
        series: [
          {
            name: "商品库存",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: pieData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
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
