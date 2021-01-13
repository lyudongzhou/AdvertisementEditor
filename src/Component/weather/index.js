import realTimeWeather from "./realTime/weather";
import realTimeSchema from "./realTime/config";
import realTimeEditorConfig from "./realTime/editorConfig";
import oneDayWeather from "./oneDay/weather";
import oneDaySchema from "./oneDay/config";
import oneDayEditorConfig from "./oneDay/editorConfig";
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
register(REG_TITLECONFIG,{
  type: oneDayWeather.name,
  payload: oneDayEditorConfig
});
register(REG_COMPONENTS,{
  type: oneDayWeather.name,
  payload: oneDayWeather
});
register(REG_COMPONENTSSCHEMA,{
  type: oneDayWeather.name,
  payload: oneDaySchema
});
