import weather from "./weather";
import schema from "./config";
import editorConfig from "./editorConfig";
import {register} from "@/register";
import {REG_TITLECONFIG, REG_COMPONENTS, REG_COMPONENTSSCHEMA} from "@/const";

register(REG_TITLECONFIG,{
  type: weather.name,
  payload: editorConfig
});
register(REG_COMPONENTS,{
  type: weather.name,
  payload: weather
});
register(REG_COMPONENTSSCHEMA,{
  type: weather.name,
  payload: schema
});