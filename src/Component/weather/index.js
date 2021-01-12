import realTimeWeather from "./realTime/weather";
import realTimeSchema from "./realTime/config";
import realTimeEditorConfig from "./realTime/editorConfig";
import {register} from "@/register";
import {REG_TITLECONFIG, REG_COMPONENTS, REG_COMPONENTSSCHEMA} from "@/const";

register(REG_TITLECONFIG,{
  type: realTimeWeather.name,
  payload: realTimeEditorConfig
});
register(REG_COMPONENTS,{
  type: realTimeWeather.name,
  payload: realTimeWeather
});
register(REG_COMPONENTSSCHEMA,{
  type: realTimeWeather.name,
  payload: realTimeSchema
});
