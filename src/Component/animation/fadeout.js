import { TweenMax, Power0 } from "gsap";
export function fadeout(cmpConfig, { duration, delay }) {
    const o = {
        tween: TweenMax.to(cmpConfig, duration / 1000, { repeat: 0, delay: delay / 1000, opacity: 0, ease: Power0 }),
        cancel() {
            o.tween.kill();
            cmpConfig.opacity = 1;
        }
    };
    return o;
}