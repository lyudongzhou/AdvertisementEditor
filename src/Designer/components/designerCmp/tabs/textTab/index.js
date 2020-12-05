import { register } from "@/register";
import { REG_TABS } from "@/const.js";
import tab from "./textTab";
register(REG_TABS, {
  type: "textTab",
  payload: tab
});