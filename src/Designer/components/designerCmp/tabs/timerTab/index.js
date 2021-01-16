import {register} from "@/register";
import {REG_TABS} from "@/const.js";
import TimerTab from "./TimerTab.vue";
import CountdownTab from "./CountdownTab.vue";
import CountTab from "./CountTab.vue";

register(REG_TABS,{
  type: "TimerTab",
  payload: TimerTab
});

register(REG_TABS,{
  type: "CountdownTab",
  payload: CountdownTab
});

register(REG_TABS,{
  type: "CountTab",
  payload: CountTab
});
