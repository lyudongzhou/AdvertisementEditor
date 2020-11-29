import image from "./text";
import schema from "./config";
import {register} from "@/register";
import {REG_COMPONENTS,REG_COMPONENTSSCHEMA} from "@/const";
register(REG_COMPONENTS,{
    type:image.name,
    payload:image
});
register(REG_COMPONENTSSCHEMA,{
    type:image.name,
    payload:schema
});