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
        path: "/edituser",
        name: "Edituser",
        component: () => import("@/views/ucenter/user/edit-user"),
        meta: {
          title: "编辑用户",
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: "/rolelist",
        name: "Rolelist",
        component: () => import("@/views/ucenter/role/index"),
        meta: {
          title: "机构列表",
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: "/addrole",
        name: "Addrole",
        component: () => import("@/views/ucenter/role/add-role"),
        meta: {
          title: "新增机构",
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: "/editrole",
        name: "Editrole",
        component: () => import("@/views/ucenter/role/edit-role"),
        meta: {
          title: "编辑机构",
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
    path: "/goods",
    component: Layout,
    name: "Goods",
    meta: {
      title: "商品管理",
    },
    children: [
      {
        path: "/catelist",
        name: "Catelist",
        component: () => import("@/views/product/cate/index"),
        meta: {
          title: "分类管理",
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: "/addcate",
        name: "Addcate",
        component: () => import("@/views/product/cate/add-cate"),
        meta: {
          title: "新增分类",
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: "/editcate",
        name: "Editcate",
        component: () => import("@/views/product/cate/edit-cate"),
        meta: {
          title: "编辑分类",
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: "/productlist",
        name: "Productlist",
        component: () => import("@/views/product/goods/index"),
        meta: {
          title: "商品管理",
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: "/addgoods",
        name: "Addgoods",
        component: () => import("@/views/product/goods/add-goods"),
        meta: {
          title: "新增商品",
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: "/editgoods",
        name: "Editgoods",
        component: () => import("@/views/product/goods/edit-goods"),
        meta: {
          title: "编辑商品",
          affix: false,
          noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: "/promotion",
    component: Layout,
    name: "Promotion",
    meta: {
      title: "营销管理",
    },
    children: [
      {
        path: "/couponlist",
        name: "Couponlist",
        component: () => import("@/views/marketing/coupon/index"),
        meta: {
          title: "优惠券",
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: "/addcoupon",
        name: "Addcoupon",
        component: () => import("@/views/marketing/coupon/add-coupon"),
        meta: {
          title: "新增优惠券",
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: "/editcoupon",
        name: "Editcoupon",
        component: () => import("@/views/marketing/coupon/edit-coupon"),
        meta: {
          title: "编辑优惠券",
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: "/discountlist",
        name: "Discountlist",
        component: () => import("@/views/marketing/discount/index"),
        meta: {
          title: "限时折扣",
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: "/adddiscount",
        name: "Adddiscount",
        component: () => import("@/views/marketing/discount/add-discount"),
        meta: {
          title: "新增折扣商品",
          affix: false,
          noKeepAlive: true,
        },
      },
      {
        path: "/editdiscount",
        name: "Editdiscount",
        component: () => import("@/views/marketing/discount/edit-discount"),
        meta: {
          title: "编辑则扣商品",
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
