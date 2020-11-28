import editor from "./numberField";
import { reg } from "@/registor";
import { REG_EDITORS } from "@/const";
reg(REG_EDITORS, {
    type: "numberField",
    payload: editor
});