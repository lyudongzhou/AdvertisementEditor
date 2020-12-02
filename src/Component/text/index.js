/*
 * @Author: LyuDongzhou
 * @Date: 2020-11-30 04:01:05
 * @LastEditTime: 2020-12-02 23:17:03
 * @Description: file content
 */
import image from "./text";
import schema from "./config";
import editorConfig from "./editorConfig";
import {register} from "@/register";
import {REG_COMPONENTS,REG_COMPONENTSSCHEMA,REG_TITLECONFIG} from "@/const";
register(REG_TITLECONFIG,{
    type:image.name,
    payload:editorConfig
});
register(REG_COMPONENTS,{
    type:image.name,
    payload:image
});
register(REG_COMPONENTSSCHEMA,{
    type:image.name,
    payload:schema
});