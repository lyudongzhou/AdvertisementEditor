import circle from "./circle";
import { register } from "@/register";
import { SVGS_DETAIL } from "@/const";
register(SVGS_DETAIL, {
    type: "line",
    payload: { name: "线和箭头", items: circle },
});