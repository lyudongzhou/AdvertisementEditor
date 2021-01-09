import {register} from "@/register";
import {REG_TABS} from "@/const.js";
import tab from "./timeTab.vue";

register(REG_TABS,{
  type: "timeTab",
  payload: tab
});
