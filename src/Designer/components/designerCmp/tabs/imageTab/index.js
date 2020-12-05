import { register } from "@/register";
import { REG_TABS } from "@/const.js";
import tab from "./imageTab";
register(REG_TABS, {
  type: "imageTab",
  payload: tab
});