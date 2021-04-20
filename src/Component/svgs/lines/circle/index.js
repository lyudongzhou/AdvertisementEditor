import circle1 from "./circle1";
import circle2 from "./circle2";
import circle3 from "./circle3";
import circle4 from "./circle4";
import circle5 from "./circle5";
import circle6 from "./circle6";
import circle7 from "./circle7";
import circle8 from "./circle8";
import circle9 from "./circle9";
import circle10 from "./circle10";
import circle11 from "./circle11";
// import circle12 from "./circle12";
const arr = [circle1, circle2, circle3, circle4, circle5, circle6, circle7, circle8, circle9, circle10, circle11, //circle12, 
];
export default {
    line: { name: "线和箭头", fun: arr }
};
import { register } from "@/register";
import { SVGS } from "@/const";
arr.forEach((ele, index) => {
    register(SVGS, {
        type: `line_${index}`,
        payload: ele
    });
});