import editor from "./label";
import { register } from "@/register";
import { REG_EDITORS } from "@/const";
register(REG_EDITORS, {
    type: "label",
    payload: editor
});
