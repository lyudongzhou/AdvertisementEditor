import editor from "./textField";
import { register } from "@/register";
import { REG_EDITORS } from "@/const";
register(REG_EDITORS, {
    type: "textField",
    payload: editor
});
