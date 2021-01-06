import { register } from "@/register";
import { REG_TABS } from "@/const.js";
import tab from "./buttonTab";
register(REG_TABS, {
  type: "buttonTab",
  payload: tab
});