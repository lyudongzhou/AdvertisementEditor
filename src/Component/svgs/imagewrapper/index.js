import circle from "./circle";
import { register } from "@/register";
import { SVGS_DETAIL } from "@/const";
register(SVGS_DETAIL, {
    type: "imagewrapper",
    payload: { name: "图片容器", items: circle },
});