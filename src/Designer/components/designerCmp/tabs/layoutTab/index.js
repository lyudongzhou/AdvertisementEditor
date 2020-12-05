import { register } from "@/register";
import { REG_TABS } from "@/const.js";
import tab from "./layoutTab";
register(REG_TABS, {
  type: "layoutTab",
  payload: tab
});