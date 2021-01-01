import { TweenMax, Power0 } from "gsap";
import { register } from "@/register";
import { REG_ANIMATIONS } from "@/const";
function resetPara() {
  let resetPara = {
    pivotX: 0,
    pivotY: 0,
    scaleX: 1,
    scaleY: 1,
    aniRotation: 0,
    skewX: 0,
    skewY: 0,
    positionX: 0,
    positionY: 0,
    alpha: 0,
  };
  Object.assign(this, resetPara);
}
register(REG_ANIMATIONS, {
  type: "qttotop",
  payload(cmpConfig, { duration, delay, times }) {
    cmpConfig._gsap = {};
    resetPara.call(cmpConfig);
    cmpConfig.alpha = 1;
    const o = {
      tween: TweenMax.to(cmpConfig, duration, {
        repeat: times - 1,
        delay: delay,
        alpha: 0,
        positionY: -cmpConfig.height,
        ease: Power0.easeOut,
      }),
      cancel() {
        o.tween.kill();
        resetPara.call(cmpConfig);
      },
    };
    return o;
  },
});
register(REG_ANIMATIONS, {
  type: "qttobotton",
  payload(cmpConfig, { duration, delay, times }) {
    cmpConfig._gsap = {};
    resetPara.call(cmpConfig);
    cmpConfig.alpha = 1;
    const o = {
      tween: TweenMax.to(cmpConfig, duration, {
        repeat: times - 1,
        delay: delay,
        alpha: 0,
        positionY: cmpConfig.height,
        ease: Power0.easeOut,
      }),
      cancel() {
        o.tween.kill();
        resetPara.call(cmpConfig);
      },
    };
    return o;
  },
});
register(REG_ANIMATIONS, {
  type: "qttoright",
  payload(cmpConfig, { duration, delay, times }) {
    cmpConfig._gsap = {};
    resetPara.call(cmpConfig);
    cmpConfig.alpha = 1;
    const o = {
      tween: TweenMax.to(cmpConfig, duration, {
        repeat: times - 1,
        delay: delay,
        alpha: 0,
        positionX: cmpConfig.width,
        ease: Power0.easeOut,
      }),
      cancel() {
        o.tween.kill();
        resetPara.call(cmpConfig);
      },
    };
    return o;
  },
});
register(REG_ANIMATIONS, {
  type: "qttoleft",
  payload(cmpConfig, { duration, delay, times }) {
    cmpConfig._gsap = {};
    resetPara.call(cmpConfig);
    cmpConfig.alpha = 1;
    const o = {
      tween: TweenMax.to(cmpConfig, duration, {
        repeat: times - 1,
        delay: delay,
        alpha: 0,
        positionX: -cmpConfig.width,
        ease: Power0.easeOut,
      }),
      cancel() {
        o.tween.kill();
        resetPara.call(cmpConfig);
      },
    };
    return o;
  },
});
register(REG_ANIMATIONS, {
  type: "qtfadeout",
  payload(cmpConfig, { duration, delay, times }) {
    cmpConfig._gsap = {};
    resetPara.call(cmpConfig);
    cmpConfig.alpha = 1;
    const o = {
      tween: TweenMax.to(cmpConfig, duration, {
        repeat: times - 1,
        delay: delay,
        alpha: 0,
        ease: Power0.easeOut,
      }),
      cancel() {
        o.tween.kill();
        resetPara.call(cmpConfig);
      },
    };
    return o;
  },
});
