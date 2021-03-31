import circle from "./circle";
import { register } from "@/register";
import { SVGS_DETAIL } from "@/const";
register(SVGS_DETAIL, {
    type: "decoration",
    payload: { name: "装饰", items: circle },
});