import { get } from "@/register";
import {REG_ANIMATIONS} from "@/const";
//register animation instance
import "./fadeout";
import "./enfrom";
import "./shaking";
const animations = get(REG_ANIMATIONS);
export default function (cmpConfig, obj) {
    if(!obj.currentAni){
        obj.currentAni = [];
    }else if(obj.currentAni.length){
        while(obj.currentAni.length){
            let aniObj = obj.currentAni.pop();
            aniObj.cancel && aniObj.cancel();
        }
    }
    cmpConfig.animation.forEach(ele=>{
        let aniType = ele.type;
        if (aniType) {
          obj.currentAni.push(animations[aniType](obj, ele));
            // obj.currentAni.push(animations[aniType].fun(obj, ele));
        }
    });
}
