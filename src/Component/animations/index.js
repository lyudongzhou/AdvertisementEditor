import { get } from "@/register";
import {REG_ANIMATIONS} from "@/const";
import "./qtto";
import "./enfrom";
import "./strong";
const animations = get(REG_ANIMATIONS);
export default function (cmpConfig, obj,vm) {
    if(!vm.currentAni){
        vm.currentAni = [];
    }else if(vm.currentAni.length){
        while(vm.currentAni.length){
            let aniObj = vm.currentAni.pop();
            aniObj.cancel && aniObj.cancel();
        }
    }
    cmpConfig.animation.forEach(ele=>{
        let aniType = ele.type;
        if (aniType) {
          vm.currentAni.push(animations[aniType](obj, ele));
            // obj.currentAni.push(animations[aniType].fun(obj, ele));
        }
    });
}
