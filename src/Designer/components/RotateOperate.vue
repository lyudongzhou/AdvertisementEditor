<template>
  <div class="rotate" @mousedown="handleMouseDown">
    <i class="el-icon-refresh"></i>
  </div>
</template>

<script>
  import {
    AFTER_UPDATE_COMPONENT_POSITION,
    BEFORE_UPDATE_COMPONENT_POSITION,
    UPDATING_COMPONENT_POSITION,
  } from '../constant/schema';
  import {mapMutations, mapGetters} from '../store';
  import {ROTATE_ADSORBENT_VALUE} from '../constant/base';

  const ROTATE_SET = Array.from(new Array(9), (_, i) => i * 45);

  export default {
    props: {
      active: Boolean,
    },
    computed: {
      ...mapGetters(['currentComponent']),
    },
    mounted() {
      document.addEventListener('mousemove', this.handleMouseMove)
      document.addEventListener('mouseup', this.handleMouseUp)
    },
    destroyed() {
      document.removeEventListener('mousemove', this.handleMouseMove)
      document.removeEventListener('mouseup', this.handleMouseUp)
    },
    methods: {
      handleMouseMove(e) {
        if (!this.active) {
          return;
        }
        const rotation = this.calculateRotate(e);
        this.updateSchema({
          type: UPDATING_COMPONENT_POSITION,
          value: {
            rotation,
          }
        });
      },
      handleMouseDown(e) {
//        this.active = true;
        this.$emit('activeChange', true);
        const { clientX, clientY } = e;
        // 注意直接取了parent，如果层级变化可能会出问题
        const t = this.$parent.$el.getBoundingClientRect(),
          cx = t.left + t.width / 2,
          cy = t.top + t.height / 2,
          startAngle = (180 / Math.PI) * Math.atan2(clientY - cy, clientX - cx),
          rotation = this.currentComponent.layoutConfig.rotation;
        this.rotateOpt = { cx, cy, startAngle, rotation };
        this.updateSchema({
          type: BEFORE_UPDATE_COMPONENT_POSITION,
        });
      },
      handleMouseUp(e) {
        if (this.active) {
          const rotation = this.calculateRotate(e);
          this.updateSchema({
            type: AFTER_UPDATE_COMPONENT_POSITION,
            value: {
              rotation,
            }
          });
        }
        this.$emit('activeChange', false);
      },
      calculateRotate(e) {
        const {clientX, clientY} = e;
        const { cx, cy, startAngle, rotation } = this.rotateOpt;
        let x = clientX - cx,
          y = clientY - cy,
          angle = (180 / Math.PI) * Math.atan2(y, x),
          currentAngle = angle - startAngle,
          r = rotation + currentAngle;
        r = r % 360;
        r = r < 0 ? r + 360 : r;
        const result = Math.floor(r);
        let find = ROTATE_SET.find(x => Math.abs(result - x) < ROTATE_ADSORBENT_VALUE);
        if (find === 360) {
          find = 0;
        }
        return find === undefined ? result : find;
      },
      ...mapMutations(['updateSchema']),
    },
  }
</script>

<style lang="less">
  .rotate {
    position: absolute;
    top: -50px;
    /*width: 10px;*/
    /*height: 10px;*/
    border-radius: 50%;
    background-color: #fff;
    padding: 5px 8px;
    left: 50%;
    cursor: url("data:image/ico;base64,AAABAAEAFBQAAAEAIAC4BgAAFgAAACgAAAAUAAAAKAAAAAEAIAAAAAAAQAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGZmZgRmZmYmZmZmdGZmZqlmZmbJZmZmzWZmZrFmZmZ+ZmZmLGZmZgYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmZmYcaWlp/319ff+srKz/y8vL/97e3v/h4eH/0NDQ/7Kysv+BgYH/ampq/2ZmZioAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZmZmWHd3d/+1tbX/9vb2//////////////////////////////////r6+v++vr7/fHx8/2ZmZmwAAAAAAAAAAAAAAAAAAAAAAAAAAGZmZmKBgYH/2tra////////////7Ozs/9PT0/++vr7/u7u7/8fHx//i4uL////////////m5ub/jY2N/2ZmZnwAAAAAAAAAAAAAAABmZmY6eXl5/+Dg4P///////////8rKyv+IiIj/ZmZmtWZmZpNmZmaNZmZmo3V1df+vr6//8fHx///////v7+//iIiI/2ZmZmgAAAAAZmZmBGlpaf/IyMj///////39/f+2trb/a2tr/2ZmZjwAAAAAAAAAAAAAAAAAAAAAZmZmGGZmZn6Ojo7/7u7u///////k5OT/cnJy/wAAAABmZmY8i4uL///////9/f3/zMzM/2lpaf9mZmYcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGZmZnqgoKD/+fn5/9ra2v9tbW3/AAAAAGZmZpnCwsL///////Hx8f+CgoL/ZmZmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZmZmBGhoaP/BwcH/dHR0/7Kysp8AAAAAZmZm1ebm5v//////1tbW/2ZmZrsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG1tbf+/v7+dAAAAAAAAAABmZmbl7+/v//39/f++vr7/ZmZmkwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZmZmCGZmZuPu7u7//f39/7u7u/9mZmaPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZmZm0+Xl5f//////0NDQ/2ZmZrEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmZmabwsLC///////r6+v/dXV1/2ZmZiYAAAAAAAAAAAAAAAAAAAAAAAAAAGZmZiJ7e3v/aGho/2hoaP9oaGj/aGho/2hoaP9oaGj/AAAAAGZmZjyKior//v7+//v7+/+8vLz/ZmZmkQAAAAAAAAAAAAAAAAAAAAAAAAAAZmZmJHx8fP///////////////////////////2ZmZv8AAAAAZmZmBGhoaP/Jycn///////j4+P+jo6P/ZmZmi2ZmZh4AAAAAAAAAAAAAAAAAAAAAAAAAAHR0dP/j4+P/////////////////ZmZm/wAAAAAAAAAAZmZmPHp6ev/i4uL///////j4+P+4uLj/dXV1/2ZmZptmZmZ6ZmZmeGZmZpdxcXH/qamp//z8/P////////////////9mZmb/AAAAAAAAAAAAAAAAZmZmZoKCgv/e3t7////////////h4eH/w8PD/7CwsP+vr6//wMDA/97e3v/+/v7///////7+/v///////////2ZmZv8AAAAAAAAAAAAAAAAAAAAAZmZmXnl5ef+2trb/9fX1/////////////v7+//39/f/////////////////a2tr/k5OT/3V1df/T09P/ZmZmtwAAAAAAAAAAAAAAAAAAAAAAAAAAZmZmHmlpaf98fHz/r6+v/9TU1P/k5OT/5ubm/9zc3P/BwcH/jo6O/25ubv8AAAAAAAAAAG1tbf9mZmZMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZmZmBGZmZiRmZmZ6ZmZmuWZmZtNmZmbVZmZmxWZmZpdmZmZCZmZmDAAAAAAAAAAAZmZmDAAAAAAAAAAA/w/wAPgB8ADwAPAA4ABwAMAAMACB/BAAg/4QAAf+EAAH/zAAB//wAAf/8AAH//AAB/AQAIPwEACB+BAAwGAQAOAAEADwABAA+AGwAP8H8AA=") 10 10, default;
    transform: translateX(-50%);
    /*&:after {*/
    /*content: '';*/
    /*display: block;*/
    /*border-left: 1px solid aqua;*/
    /*position: absolute;*/
    /*left: 50%;*/
    /*bottom: -20px;*/
    /*top: 0;*/
    /*}*/
  }
  .rotate-guide {
    position: absolute;
    .rotate-guide-item {
      border: 1px solid;
    }
  }

</style>