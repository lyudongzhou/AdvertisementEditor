import mixplay from "./mixplay";
import schema from "./config";
import editorConfig from "./editorConfig";
import resFun from "./filterResource";
import {register} from "@/register";
import {REG_TITLECONFIG, REG_COMPONENTS, REG_COMPONENTSSCHEMA,REG_GETRES} from "@/const";

register(REG_TITLECONFIG,{
  type: mixplay.name,
  payload: editorConfig
});
register(REG_COMPONENTS,{
  type: mixplay.name,
  payload: mixplay
});
register(REG_COMPONENTSSCHEMA,{
  type: mixplay.name,
  payload: schema
});
register(REG_GETRES,{
  type:mixplay.name,
  payload:resFun
})