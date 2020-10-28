import VabQueryForm from "./index";
import VabQueryFormTopPanel from "./VabQueryFormTopPanel";
import VabQueryFormBottomPanel from "./VabQueryFormBottomPanel";
import VabQueryFormLeftPanel from "./VabQueryFormLeftPanel";
import VabQueryFormRightPanel from "./VabQueryFormRightPanel";
export default {
  install(Vue) {
    Vue.component("VabQueryForm", VabQueryForm);
    Vue.component("VabQueryFormLeftPanel", VabQueryFormLeftPanel);
    Vue.component("VabQueryFormRightPanel", VabQueryFormRightPanel);
    Vue.component("VabQueryFormTopPanel", VabQueryFormTopPanel);
    Vue.component("VabQueryFormBottomPanel", VabQueryFormBottomPanel);
  },
};
