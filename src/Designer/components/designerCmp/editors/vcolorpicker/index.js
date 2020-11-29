import editor from "./vcolorpicker";
import { reg } from "@/registor";
import { REG_EDITORS } from "@/const";
reg(REG_EDITORS, {
    type: "vcolorpicker",
    payload: editor
});