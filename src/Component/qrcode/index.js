import qrcode from "./qrcode";
import schema from "./config";
import editorConfig from "./editorConfig";
import {register} from "@/register";
import {REG_TITLECONFIG, REG_COMPONENTS, REG_COMPONENTSSCHEMA} from "@/const";

register(REG_TITLECONFIG,{
  type: qrcode.name,
  payload: editorConfig
});
register(REG_COMPONENTS,{
  type: qrcode.name,
  payload: qrcode
});
register(REG_COMPONENTSSCHEMA,{
  type: qrcode.name,
  payload: schema
});
