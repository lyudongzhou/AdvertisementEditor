import circle from "./circle";
import { register } from "@/register";
import { SVGS_DETAIL } from "@/const";
register(SVGS_DETAIL, {
  type: "shape",
  payload: {name:"形状",items:circle},
});
