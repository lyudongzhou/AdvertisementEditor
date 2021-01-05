import { register } from "@/register";
import { REG_TABS } from "@/const.js";
import tab from "./mixPlayTab";
register(REG_TABS, {
  type: "mixPlayTab",
  payload: tab
});