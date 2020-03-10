export const pageSize = 6;
export const routes_manage = [
  {
    label: "首页",
    key: "/manage/home",
    icon: "home",
    public: true // 首页公开对所有用户可见
  },
  {
    label: "商品",
    key: "production",
    icon: "appstore",
    children: [
      {
        label: "品类管理",
        key: "/manage/production/sort",
        icon: "bars"
      },
      {
        label: "商品管理",
        key: "/manage/production/products",
        icon: "tool"
      }
    ]
  },
  {
    label: "用户管理",
    key: "/manage/user",
    icon: "user"
  },
  {
    label: "角色管理",
    key: "/manage/role",
    icon: "safety-certificate"
  },
  {
    label: "图形图表",
    key: "charts",
    icon: "area-chart",
    children: [
      {
        label: "柱状图",
        key: "/manage/charts/bar",
        icon: "bar-chart"
      },
      {
        label: "折线图",
        key: "/manage/charts/line",
        icon: "line-chart"
      },
      {
        label: "饼图",
        key: "/manage/charts/pie",
        icon: "pie-chart"
      }
    ]
  }
];
