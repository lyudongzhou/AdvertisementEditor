import { fromtop } from "./fromtop";
import { shaking } from "./shaking";
import { fadeout } from "./fadeout";
const o = { fromtop, shaking, fadeout };
export default function (type, cmpConfig, obj) {
    let aniType = cmpConfig.animation[type];
    if (obj.currentAni) {
        obj.currentAni.tween && obj.currentAni.tween.kill();
        obj.currentAni.cancel && obj.currentAni.cancel();
    }
    if (aniType) {
        obj.currentAni = o[aniType.type](obj, aniType);
    }

}