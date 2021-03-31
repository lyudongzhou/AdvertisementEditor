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
import circle12 from "./circle12";
import circle13 from "./circle13";
import circle14 from "./circle14";
import circle15 from "./circle15";
import circle16 from "./circle16";
import circle17 from "./circle17";
import circle18 from "./circle18";
import circle19 from "./circle19";
import circle20 from "./circle20";
import circle21 from "./circle21";
import circle22 from "./circle22";
// import circle23 from "./circle23";
import circle24 from "./circle24";

const arr = [circle1, circle2, circle3, circle4, circle5, circle6, circle7, circle8, circle9, circle10, circle11, circle12, circle13, circle14, circle15, circle16, circle17, circle18, circle19, circle20, circle21, circle22, //circle23, 
    circle24
];
export default {
    decoration: {
        name: "装饰",
        fun: arr,
        defaultSchema: {
            type: "svgCmp",
            layoutConfig: {
                width: 200,
                height: 200,
            },
            props: {
                type: "decoration_0",
                color: "#F00",
            },
            animation: [],
            events: [],
            children: [],
        }
    }
};
import { register } from "@/register";
import { SVGS } from "@/const";
arr.forEach((ele, index) => {
    register(SVGS, {
        type: `decoration_${index}`,
        payload: ele
    });
});