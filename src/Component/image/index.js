/*
 * @Author: LyuDongzhou
 * @Date: 2020-11-30 04:01:05
 * @LastEditTime: 2020-12-02 23:07:58
 * @Description: file content
 */
import image from "./image";
import schema from "./config";
import editorConfig from "./editorConfig";
import fun from "./filterResource";
import {register} from "@/register";
import {REG_COMPONENTS,REG_COMPONENTSSCHEMA,REG_TITLECONFIG,REG_GETRES} from "@/const";
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
register(REG_GETRES,{
    type:image.name,
    payload:fun
});