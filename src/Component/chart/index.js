import pie from "./pie/pie";
import pieSchema from "./pie/config";
import pieEditorConfig from "./pie/editorConfig";
import line from "./line/line";
import lineSchema from "./line/config";
import lineEditorConfig from "./line/editorConfig";
import bar from "./bar/bar";
import barSchema from "./bar/config";
import barEditorConfig from "./bar/editorConfig";
import linecode from "./linecode/linecode";
import linecodeSchema from "./linecode/config";
import linecodeEditorConfig from "./linecode/editorConfig";
import {register} from "@/register";
import {REG_TITLECONFIG, REG_COMPONENTS, REG_COMPONENTSSCHEMA} from "@/const";

register(REG_TITLECONFIG,{
  type: pie.name,
  payload: pieEditorConfig
});
register(REG_COMPONENTS,{
  type: pie.name,
  payload: pie
});
register(REG_COMPONENTSSCHEMA,{
  type: pie.name,
  payload: pieSchema
});

register(REG_TITLECONFIG,{
  type: line.name,
  payload: lineEditorConfig
});
register(REG_COMPONENTS,{
  type: line.name,
  payload: line
});
register(REG_COMPONENTSSCHEMA,{
  type: line.name,
  payload: lineSchema
});

register(REG_TITLECONFIG,{
  type: bar.name,
  payload: barEditorConfig
});
register(REG_COMPONENTS,{
  type: bar.name,
  payload: bar
});
register(REG_COMPONENTSSCHEMA,{
  type: bar.name,
  payload: barSchema
});

register(REG_TITLECONFIG,{
  type: linecode.name,
  payload: linecodeEditorConfig
});
register(REG_COMPONENTS,{
  type: linecode.name,
  payload: linecode
});
register(REG_COMPONENTSSCHEMA,{
  type: linecode.name,
  payload: linecodeSchema
});
