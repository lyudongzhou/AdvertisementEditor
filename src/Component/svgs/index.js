import qrcode from "./svg1";
import maskCmp from "./svg2";
import {normal,mask} from "./config";
import {normal as normalEditor,mask as maskEditor} from "./editorConfig";
import {register} from "@/register";
import {REG_TITLECONFIG, REG_COMPONENTS, REG_COMPONENTSSCHEMA} from "@/const";

register(REG_TITLECONFIG,{
  type: qrcode.name,
  payload: normalEditor
});
register(REG_COMPONENTS,{
  type: qrcode.name,
  payload: qrcode
});
register(REG_COMPONENTSSCHEMA,{
  type: qrcode.name,
  payload: normal
});

register(REG_TITLECONFIG,{
  type: maskCmp.name,
  payload: maskEditor
});
register(REG_COMPONENTS,{
  type: maskCmp.name,
  payload: maskCmp
});
register(REG_COMPONENTSSCHEMA,{
  type: maskCmp.name,
  payload: mask
});