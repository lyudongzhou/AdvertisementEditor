import editor from "./colorpickerFiled";
import { register } from "@/register";
import { REG_EDITORS } from "@/const";
register(REG_EDITORS, {
  type: "colorpickerFiled",
  payload: editor
});
