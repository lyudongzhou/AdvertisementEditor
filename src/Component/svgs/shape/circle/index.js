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
import circle23 from "./circle23";
import circle24 from "./circle24";
import circle25 from "./circle25";
import circle26 from "./circle26";
import circle27 from "./circle27";
import circle28 from "./circle28";
import circle29 from "./circle29";
import circle30 from "./circle30";
import circle31 from "./circle31";
import circle32 from "./circle32";
import circle33 from "./circle33";
import circle34 from "./circle34";
import circle35 from "./circle35";
import circle36 from "./circle36";
import circle37 from "./circle37";
import circle38 from "./circle38";
import circle39 from "./circle39";
import circle40 from "./circle40";
import circle41 from "./circle41";
import circle42 from "./circle42";
import circle43 from "./circle43";
import circle44 from "./circle44";
import circle45 from "./circle45";
import circle46 from "./circle46";
import circle47 from "./circle47";
import circle48 from "./circle48";
import circle49 from "./circle49";
import circle50 from "./circle50";
import circle51 from "./circle51";
import circle52 from "./circle52";
import circle53 from "./circle53";
import circle54 from "./circle54";
import circle55 from "./circle55";
import circle56 from "./circle56";
import circle57 from "./circle57";
import circle58 from "./circle58";
import circle59 from "./circle59";
import circle60 from "./circle60";
import circle61 from "./circle61";
import circle62 from "./circle62";
import circle63 from "./circle63";
import circle64 from "./circle64";
const arr = [
    circle1,
    circle2,
    circle3,
    circle4,
    circle5,
    circle6,
    circle7,
    circle8,
    circle9,
    circle10,
    circle11,
    circle12,
    circle13,
    circle14,
    circle15,
    circle16,
    circle17,
    circle18,
    circle19,
    circle20,
    circle21,
    circle22,
    circle23,
    circle24,
    circle25,
    circle26,
    circle27,
    circle28,
    circle29,
    circle30,
    circle31,
    circle32,
    circle33,
    circle34,
    circle35,
    circle36,
    circle37,
    circle38,
    circle39,
    circle40,
    circle41,
    circle42,
    circle43,
    circle44,
    circle45,
    circle46,
    circle47,
    circle48,
    circle49,
    circle50,
    circle51,
    circle52,
    circle53,
    circle54,
    circle55,
    circle56,
    circle57,
    circle58,
    circle59,
    circle60,
    circle61,
    circle62,
    circle63,
    circle64,
];
export default {
    circle: {
        name: "形状",
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