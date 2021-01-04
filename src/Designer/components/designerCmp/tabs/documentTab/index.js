import {register} from "@/register";
import {REG_TABS} from "@/const.js";
import tab from "./documentTab.vue";
register(REG_TABS,{
    type:"documentTab",
    payload:tab
});