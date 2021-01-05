import { register } from "@/register";
import { REG_TABS } from "@/const.js";
import tab from "./videoTab";
register(REG_TABS, {
  type: "videoTab",
  payload: tab
});