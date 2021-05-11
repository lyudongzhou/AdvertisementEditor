<template>
  <baseCmp ref="parent" :cmpConfig="cmpConfig">
    <!-- <div v-for="(ele, index) in cmpConfig.props.bgUrl" :key="index"> -->
    <video
      ref="videoEl"
      autoplay
      :src="currentUrl"
      style="width: 100%; height: 100%"
    />
    <!-- </div> -->
  </baseCmp>
</template>
<script>
import baseCmp from "../Base.vue";
import { mapGetters } from "../../Render/store/";
// import editorConfig from "./editorConfig";
export default {
  name: "VideoCmp",
  components: {
    baseCmp,
  },
  data() {
    return {
      currentPlayIndex: 0,
    };
  },
  mounted() {
    // var vm = this;
    // let video = this.$refs.videoEl;
    // setTimeout(() => {
    //   let canvas = document.createElement("canvas");
    //   let ctx = canvas.getContext("2d");
    //   ctx.drawImage(video, 0, 0, 1280, 720);
    //   video.style.backgroundImage = "url(" + canvas.toDataURL() + ")";
    // },1000);

    // this.$refs.videoEl.addEventListener("canplay", function () {
    //   // if (!document.querySelector(".totalPreviewContainer")) {
    //   //     vm.autoChangeVideoSize(this.videoWidth, this.videoHeight)
    //   // }
    // });
    this.$refs.videoEl.onended = () => {
      if (
        this.currentPlayIndex + 1 === this.cmpConfig.props.bgUrl.length &&
        !this.cmpConfig.props.loop
      ) {
        this.currentPlayIndex = 0;
        return;
      }
      // if(this.currentPlayIndex+1===this.cmpConfig.props.bgUrl.length){
      //     this.currentPlayIndex = 0;
      // }else{
      this.currentPlayIndex++;
      // }
    };
    this.parent = this.$refs["parent"];
  },
  methods: {
    // autoChangeVideoSize(videoWidth, videoHeight) {
    // //   const rate = videoWidth / videoHeight;
    // //   let width = editorConfig[0]["defaultSchema"]["layoutConfig"]["width"];
    // //   let height = editorConfig[0]["defaultSchema"]["layoutConfig"]["height"];
    // //   if (rate > 1) {
    // //     height = height / rate;
    // //   } else {
    // //     width = width * rate;
    // //   }
    // //   this.$event &&
    // //     this.$event.emit("changeContainerSize", {
    // //       left: 0,
    // //       top: 0,
    // //       width,
    // //       height,
    // //     });
    // },
  },
  computed: {
    ...mapGetters(["handleUrl"]),
    currentUrl() {
      return this.cmpConfig.props.bgUrl[this.currentPlayIndex];
    },
  },
  beforeDestroy() {},
  props: ["cmpConfig"],
};
</script>
