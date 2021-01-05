import mixplay from "./mixplay";
import schema from "./config";
import editorConfig from "./editorConfig";
import {register} from "@/register";
import {REG_TITLECONFIG, REG_COMPONENTS, REG_COMPONENTSSCHEMA} from "@/const";

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
