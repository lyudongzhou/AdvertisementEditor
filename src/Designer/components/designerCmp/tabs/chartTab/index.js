import {register} from "@/register";
import {REG_TABS} from "@/const.js";
import tab from "./chartTab.vue";

register(REG_TABS,{
  type: "chartTab",
  payload: tab
});
