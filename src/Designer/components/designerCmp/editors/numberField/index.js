import editor from "./numberField";
import { register } from "@/register";
import { REG_EDITORS } from "@/const";
register(REG_EDITORS, {
    type: "numberField",
    payload: editor
});