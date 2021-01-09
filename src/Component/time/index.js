import time from "./time/time";
import timeSchema from "./time/config";
import timeEditorConfig from "./time/editorConfig";
import date from "./date/date";
import dateSchema from "./date/config";
import dateEditorConfig from "./date/editorConfig";
import week from "./week/week";
import weekSchema from "./week/config";
import weekEditorConfig from "./week/editorConfig";
import weekday from "./weekday/weekday";
import weekdaySchema from "./weekday/config";
import weekdayEditorConfig from "./weekday/editorConfig";
import {register} from "@/register";
import {REG_TITLECONFIG, REG_COMPONENTS, REG_COMPONENTSSCHEMA} from "@/const";

register(REG_TITLECONFIG,{
  type: time.name,
  payload: timeEditorConfig
});
register(REG_COMPONENTS,{
  type: time.name,
  payload: time
});
register(REG_COMPONENTSSCHEMA,{
  type: time.name,
  payload: timeSchema
});

register(REG_TITLECONFIG,{
  type: date.name,
  payload: dateEditorConfig
});
register(REG_COMPONENTS,{
  type: date.name,
  payload: date
});
register(REG_COMPONENTSSCHEMA,{
  type: date.name,
  payload: dateSchema
});

register(REG_TITLECONFIG,{
  type: week.name,
  payload: weekEditorConfig
});
register(REG_COMPONENTS,{
  type: week.name,
  payload: week
});
register(REG_COMPONENTSSCHEMA,{
  type: week.name,
  payload: weekSchema
});

register(REG_TITLECONFIG,{
  type: weekday.name,
  payload: weekdayEditorConfig
});
register(REG_COMPONENTS,{
  type: weekday.name,
  payload: weekday
});
register(REG_COMPONENTSSCHEMA,{
  type: weekday.name,
  payload: weekdaySchema
});
