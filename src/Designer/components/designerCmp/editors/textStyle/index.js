import editor from "./textStyle";
import { register } from "@/register";
import { REG_EDITORS } from "@/const";
register(REG_EDITORS, {
  type: "textStyle",
  payload: editor
});