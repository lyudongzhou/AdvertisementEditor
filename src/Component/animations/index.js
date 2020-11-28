import animations from "./reg";
//reg animation instance
import "./fadeout";
import "./fromtop";
import "./shaking";

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
            obj.currentAni.push(animations[aniType].fun(obj, ele));
        }
    });  
}