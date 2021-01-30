import {register} from "@/register";
import {REG_TABS} from "@/const.js";
import tab from "./captionTab.vue";

register(REG_TABS,{
  type: "captionTab",
  payload: tab
});
