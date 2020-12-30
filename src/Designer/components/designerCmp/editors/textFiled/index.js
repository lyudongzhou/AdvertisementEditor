import editor from "./textFiled";
import { register } from "@/register";
import { REG_EDITORS } from "@/const";
register(REG_EDITORS, {
    type: "textFiled",
    payload: editor
});
