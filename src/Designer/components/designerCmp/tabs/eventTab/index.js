import {register} from "@/register";
import {REG_TABS} from "@/const.js";
import tab from "./eventTab.vue";
register(REG_TABS,{
    type:"eventTab",
    payload:tab
});