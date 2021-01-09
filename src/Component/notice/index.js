import inform from "./inform/inform";
import informSchema from "./inform/config";
import informEditorConfig from "./inform/editorConfig";
import caption from "./caption/caption";
import captionSchema from "./caption/config";
import captionEditorConfig from "./caption/editorConfig";
import {register} from "@/register";
import {REG_TITLECONFIG, REG_COMPONENTS, REG_COMPONENTSSCHEMA} from "@/const";

register(REG_TITLECONFIG,{
  type: inform.name,
  payload: informEditorConfig
});
register(REG_COMPONENTS,{
  type: inform.name,
  payload: inform
});
register(REG_COMPONENTSSCHEMA,{
  type: inform.name,
  payload: informSchema
});

register(REG_TITLECONFIG,{
  type: caption.name,
  payload: captionEditorConfig
});
register(REG_COMPONENTS,{
  type: caption.name,
  payload: caption
});
register(REG_COMPONENTSSCHEMA,{
  type: caption.name,
  payload: captionSchema
});
