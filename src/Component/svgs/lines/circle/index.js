import circle1 from "./circle1";
const arr = [circle1];
export default {
    line:{name:"圆形",fun:arr}
};
import { register } from "@/register";
import { SVGS } from "@/const";
arr.forEach((ele, index) => {
  register(SVGS, {
    type: `line_${index}`,
    payload: ele
  });
});
