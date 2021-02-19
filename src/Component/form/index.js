import Vote from "./Form.vue";
import schema from "./config";
import editorConfig from "./editorConfig";
import fun from "./filterResource";
import {register} from "@/register";
import {REG_COMPONENTS,REG_COMPONENTSSCHEMA,REG_TITLECONFIG,REG_GETRES} from "@/const";

register(REG_TITLECONFIG,{
  type: Vote.name,
  payload: editorConfig
});
register(REG_COMPONENTS,{
  type: Vote.name,
  payload: Vote
});
register(REG_COMPONENTSSCHEMA,{
  type: Vote.name,
  payload: schema
});
register(REG_GETRES,{
  type: Vote.name,
  payload:fun
});