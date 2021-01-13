import realTimeWeather from "./realTime/weather";
import realTimeSchema from "./realTime/config";
import realTimeEditorConfig from "./realTime/editorConfig";
import oneDayWeather from "./oneDay/weather";
import oneDaySchema from "./oneDay/config";
import oneDayEditorConfig from "./oneDay/editorConfig";
import weekdayWeather from "./weekday/weather";
import weekdaySchema from "./weekday/config";
import weekdayEditorConfig from "./weekday/editorConfig";
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
register(REG_TITLECONFIG,{
  type: weekdayWeather.name,
  payload: weekdayEditorConfig
});
register(REG_COMPONENTS,{
  type: weekdayWeather.name,
  payload: weekdayWeather
});
register(REG_COMPONENTSSCHEMA,{
  type: weekdayWeather.name,
  payload: weekdaySchema
});
