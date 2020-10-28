import Layout from "@/layouts";
export const asyncRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "/index",
        name: "Index",
        component: () => import("@/views/index/index"),
        meta: {
          title: "首页",
          icon: "home",
          affix: true,
          noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: "/table",
    component: Layout,
    name: "Table",
    meta: {
      title: "表格",
      icon: "table",
    },
    children: [
      {
        path: "/table1",
        name: "Table1",
        component: () => import("@/views/table/index"),
        meta: {
          title: "表格1",
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: "/table2",
        name: "Table1",
        component: () => import("@/views/table/index"),
        meta: {
          title: "表格2",
          affix: false,
          noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];
