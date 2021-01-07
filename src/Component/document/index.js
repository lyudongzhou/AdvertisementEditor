import document from "./document";
import schema from "./config";
import editorConfig from "./editorConfig";
import fun from "./filterResource";
import {register} from "@/register";
import {REG_TITLECONFIG, REG_COMPONENTS, REG_COMPONENTSSCHEMA,REG_GETRES} from "@/const";

register(REG_TITLECONFIG,{
  type: document.name,
  payload: editorConfig
});
register(REG_COMPONENTS,{
  type: document.name,
  payload: document
});
register(REG_COMPONENTSSCHEMA,{
  type: document.name,
  payload: schema
});
register(REG_GETRES,{
  type:document.name,
  payload:fun
});