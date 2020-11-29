import editor from "./vcolorpicker";
import { register } from "@/register";
import { REG_EDITORS } from "@/const";
register(REG_EDITORS, {
    type: "vcolorpicker",
    payload: editor
});