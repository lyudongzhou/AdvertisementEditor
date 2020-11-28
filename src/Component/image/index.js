import image from "./image";
import schema from "./config";
import {reg} from "@/registor";
import {REG_COMPONENTS,REG_COMPONENTSSCHEMA} from "@/const";
reg(REG_COMPONENTS,{
    type:image.name,
    payload:image
});
reg(REG_COMPONENTSSCHEMA,{
    type:image.name,
    payload:schema
});