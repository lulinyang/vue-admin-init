import Vue from "vue";
import "./element";
import "@/styles/vab.scss";
import "@/config/permission";
import "@/utils/errorLog";
import "./vabIcon";
import "@/styles/common.css";
import MyPlugin from "@/utils/myPlugin"; //自定义全局方法

import Vab from "@/utils/vab";
import { VabDrag, VabPermissions, VabQueryForm } from "@/layouts/components";

Vue.use(Vab);
Vue.use(VabPermissions);
Vue.use(VabDrag);
Vue.use(VabQueryForm);
Vue.use(MyPlugin);
