import { TweenMax, Power3 } from "gsap";
export function shaking(cmpConfig, { duration, delay }) {
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