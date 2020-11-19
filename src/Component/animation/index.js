import {fromtop} from "./fromtop";
const o = {fromtop};
export default function(type,cmpConfig,obj){
   let aniType = cmpConfig.animation[type];
   o[aniType.type](obj,aniType);
}