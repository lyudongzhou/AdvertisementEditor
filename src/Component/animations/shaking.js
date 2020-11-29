import { TweenMax, Power3 } from "gsap";
import { register } from "@/register";
import {REG_ANIMATIONS} from "@/const";
register(REG_ANIMATIONS,{
    type:"shaking",
    payload(cmpConfig, { duration, delay }) {
        cmpConfig.left = -10;
        const o = {
            tween:TweenMax.from(cmpConfig, duration / 1000, {
                yoyo: true, repeat: -1, delay: delay / 1000, left: 10, ease: Power3.easeIn
            }),
            cancel(){
                o.tween.kill();
                cmpConfig.left = 0;
            }
        };
        return o;
    }
});