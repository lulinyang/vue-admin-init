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
    path: "/user",
    component: Layout,
    name: "User",
    meta: {
      title: "用户中心",
    },
    children: [
      {
        path: "/userlist",
        name: "Userlist",
        component: () => import("@/views/ucenter/user/index"),
        meta: {
          title: "用户管理",
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: "/adduser",
        name: "Adduser",
        component: () => import("@/views/ucenter/user/add-user"),
        meta: {
          title: "新增用户",
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: "/rolelist",
        name: "Rolelist",
        component: () => import("@/views/ucenter/role/index"),
        meta: {
          title: "角色列表",
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: "/addrole",
        name: "Addrole",
        component: () => import("@/views/ucenter/role/add-role"),
        meta: {
          title: "新增角色",
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: "/editrole",
        name: "Editrole",
        component: () => import("@/views/ucenter/role/edit-role"),
        meta: {
          title: "编辑角色",
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: "/menulist",
        name: "Menulist",
        component: () => import("@/views/ucenter/menu/index"),
        meta: {
          title: "菜单管理",
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: "/apiurl",
        name: "Apiurl",
        component: () => import("@/views/ucenter/menu/apilist"),
        meta: {
          title: "接口管理",
          affix: false,
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
