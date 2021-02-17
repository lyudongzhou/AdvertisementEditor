import circle1 from "./circle1";
import circle2 from "./circle2";
import circle3 from "./circle3";
import circle4 from "./circle4";
import circle5 from "./circle5";
const arr = [
  circle1,
  circle2,
  circle3,
  circle4,
  circle5,
  circle1,
  circle2,
  circle3,
  circle3,
  circle4,
  circle3,
];
export default {
  circle: {
    name: "圆形",
    fun: arr,
    defaultSchema: {
      type: "svgCmp",
      layoutConfig: {
        width: 200,
        height: 200,
      },
      props: {
        type: "circle_0",
        color: "#F00",
      },
      animation: [],
      events: [],
      children: [],
    },
  },
};
import { register } from "@/register";
import { SVGS } from "@/const";
arr.forEach((ele, index) => {
  register(SVGS, {
    type: `circle_${index}`,
    payload: ele,
  });
});
