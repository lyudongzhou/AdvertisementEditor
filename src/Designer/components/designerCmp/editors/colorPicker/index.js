import editor from "./colorPicker";
import { reg } from "@/registor";
import { REG_EDITORS } from "@/const";
reg(REG_EDITORS, {
    type: "colorPicker",
    payload: editor
});