import { fromtop } from "./fromtop";
import { shaking } from "./shaking";
import { fadeout } from "./fadeout";
const o = { fromtop, shaking, fadeout };
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
            obj.currentAni.push(o[aniType](obj, ele));
        }
    });  
}