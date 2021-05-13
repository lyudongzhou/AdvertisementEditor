<template>
    <div
        id="app"
        :style="{
            position: 'absolute',
            width: deviceWidth + 'px',
            height: deviceHeight + 'px',
            'background-color': 'lightgray',
        }"
    >
        <render
            v-if="renderData"
            :renderData="renderData"
            :currentPage="currentPage"
            @click="onClick"
            :designMode="false"
            :baseUrl="baseUrl"
            :style="{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }"
        ></render>
    </div>
</template>
<script>
import render from "./render";
// import { renderData } from "../../interface";
// var a = {"version":"1.0","description":"","container":{"width":1920,"height":1080,"bgm":{},"paging":{"position":"center&bottom","fmt":"${CURRENT}/${TOTAL}","color":"#E41C1C","size":20,"family":"","bgColor":"#000000"}},"change":{"type":70,"loop":true,"singlePagePlayTime":1800,"changeHint":true,"backTime":6000},"pages":[{"name":"页面1","id":"1","container":{"backGround":{"type":"","value":""},"bgMusic":{"type":1,"music":[]}},"components":[{"props":{"videoSrc":"","bgUrl":["http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210430/cf2a247ce9ca39e6f070eb31d2d08b5c.mp4","http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210506/13c91010044d87b41100568ef818b40a.mp4"],"arrResources":[{"name":"3.mp4","uuid":"1f9eb015c9c743d6af4e2ca62cd73dfc","url":"http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210430/cf2a247ce9ca39e6f070eb31d2d08b5c.mp4","payload":{"resId":502,"resName":"3.mp4","resType":2,"sourcePaht":"http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210430/cf2a247ce9ca39e6f070eb31d2d08b5c.mp4","pdfPaht":"","imgList":[],"thumbnail":"http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210430/131e292edd505d20b02adaf8b0242aea.jpg","priceType":1,"approveState":1,"uuid":"1f9eb015c9c743d6af4e2ca62cd73dfc"}},{"name":"3 (1).mp4","uuid":"d648d13937c21d5616d36fc17264b0e1","url":"http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210506/13c91010044d87b41100568ef818b40a.mp4","payload":{"resId":517,"resName":"3 (1).mp4","resType":2,"sourcePaht":"http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210506/13c91010044d87b41100568ef818b40a.mp4","pdfPaht":"","imgList":[],"thumbnail":"http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210506/e85423f4e4161be1d1928127863b6e19.jpg","priceType":1,"approveState":1,"uuid":"d648d13937c21d5616d36fc17264b0e1"}}]},"animation":[],"events":[],"type":"VideoCmp","layoutConfig":{"width":300,"height":300,"hidden":false,"rotation":0,"top":0,"left":0,"opacity":100,"pivotX":0,"pivotY":0,"scaleX":1,"scaleY":1,"aniRotation":0,"skewX":0,"skewY":0,"positionX":0,"positionY":0,"alpha":1,"zIndex":1},"children":[],"name":"视频","id":"4105ca40-b331-11eb-8890-05ad1188ee6f"}]}],"dialogs":[],"resource":[]}
export default {
    components: {
        render,
    },
    methods: {
        onClick() {},
    },
    created() {
    },
    data() {
        return {
            containerStyle: {},
            deviceWidth: document.body.clientWidth,
            deviceHeight: document.body.clientHeight,
            renderData: {
          container: {
            bgm: {},
            paging: {
              color: "#E41C1C",
              fmt: "${CURRENT}/${TOTAL}",
              size: 20,
              bgColor: "#000000",
              position: "center&amp;top",
              family: "",
            },
            width: 1660,
            height: 954,
          },
          resource: [
            {
              uuid: "af4463075c60d93f8fce09ef7acbbc02",
              url:
                "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/7ccead3ade36472fb8a4873af2db9633.png",
              name: "6",
            },
            {
              uuid: "2ff19bc767a53f1d6b6f675076ac6a37",
              url:
                "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/58cc076b499ae18df50bfc3bac2dbf51.mp4",
              name: "中国",
            },
            {
              url:
                "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/6cada7f2286e4d5eb83e3c721121b170.png",
            },
            {
              uuid: "af4463075c60d93f8fce09ef7acbbc02",
              url:
                "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/7ccead3ade36472fb8a4873af2db9633.png",
              name: "6",
            },
            {
              uuid: "2ff19bc767a53f1d6b6f675076ac6a37",
              url:
                "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/58cc076b499ae18df50bfc3bac2dbf51.mp4",
              name: "中国",
            },
            {
              uuid: "6d79f40f23f16a4ebbb126e420171d62",
              url:
                "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/7ccead3ade36472fb8a4873af2db9633.png",
              payload: {
                thumbnail:
                  "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/7ccead3ade36472fb8a4873af2db9633.png",
                resType: 1,
                sourcePaht:
                  "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/7ccead3ade36472fb8a4873af2db9633.png",
                priceType: 1,
                resId: 177,
                uuid: "6d79f40f23f16a4ebbb126e420171d62",
                pdfPaht: "",
                resName: "6",
                imgList: [],
                approveState: 1,
              },
              name: "6",
            },
            {
              url:
                "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/6cada7f2286e4d5eb83e3c721121b170.png",
            },
          ],
          change: {
            singlePagePlayTime: 1800,
            type: 70,
            loop: true,
            changeHint: true,
            backTime: 6000,
          },
          description: "",
          version: "1.0",
          dialogs: [],
          pages: [
            {
              container: {
                backGround: {
                  type: "",
                  value: "",
                },
                bgMusic: {
                  type: 1,
                  music: [],
                },
              },
              components: [
                {
                  type: "mixplayCmp",
                  props: {
                    components: [
                      {
                        thumbnail:
                          "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/7ccead3ade36472fb8a4873af2db9633.png",
                        resType: 1,
                        sourcePaht:
                          "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/7ccead3ade36472fb8a4873af2db9633.png",
                        priceType: 1,
                        resId: 568,
                        uuid: "af4463075c60d93f8fce09ef7acbbc02",
                        pdfPaht: "",
                        resName: "6",
                        imgList: [],
                        approveState: 1,
                      },
                      {
                        thumbnail:
                          "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/36f792060335e6b0c4d92aea0d4ab6ed.jpg",
                        resType: 2,
                        sourcePaht:
                          "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/58cc076b499ae18df50bfc3bac2dbf51.mp4",
                        priceType: 1,
                        resId: 570,
                        uuid: "2ff19bc767a53f1d6b6f675076ac6a37",
                        pdfPaht: "",
                        resName: "中国",
                        imgList: [],
                        approveState: 1,
                      },
                      {
                        sourcePaht:
                          "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/6cada7f2286e4d5eb83e3c721121b170.png",
                        resType: 1,
                      },
                    ],
                    changeTime: 3,
                    arrResources: [
                      {
                        uuid: "af4463075c60d93f8fce09ef7acbbc02",
                        url:
                          "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/7ccead3ade36472fb8a4873af2db9633.png",
                        name: "6",
                      },
                      {
                        uuid: "2ff19bc767a53f1d6b6f675076ac6a37",
                        url:
                          "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/58cc076b499ae18df50bfc3bac2dbf51.mp4",
                        name: "中国",
                      },
                      {
                        url:
                          "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/6cada7f2286e4d5eb83e3c721121b170.png",
                      },
                    ],
                  },
                  animation: [],
                  layoutConfig: {
                    aniRotation: 0,
                    hidden: false,
                    rotation: 0,
                    skewX: 0,
                    skewY: 0,
                    pivotY: 0,
                    pivotX: 0,
                    positionX: 0,
                    scaleX: 1,
                    positionY: 0,
                    scaleY: 1,
                    top: 489,
                    left: 120,
                    alpha: 1,
                    width: 200,
                    opacity: 100,
                    height: 200,
                    zIndex: 4,
                  },
                  children: [],
                  name: "混播",
                  id: "10020c70-b399-11eb-aab0-f539ee7e6001",
                  events: [],
                },
                {
                  type: "mixplayCmp",
                  props: {
                    components: [
                      {
                        thumbnail:
                          "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/7ccead3ade36472fb8a4873af2db9633.png",
                        resType: 1,
                        sourcePaht:
                          "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/7ccead3ade36472fb8a4873af2db9633.png",
                        priceType: 1,
                        resId: 568,
                        uuid: "af4463075c60d93f8fce09ef7acbbc02",
                        pdfPaht: "",
                        resName: "6",
                        imgList: [],
                        approveState: 1,
                      },
                      {
                        thumbnail:
                          "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/36f792060335e6b0c4d92aea0d4ab6ed.jpg",
                        resType: 2,
                        sourcePaht:
                          "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/58cc076b499ae18df50bfc3bac2dbf51.mp4",
                        priceType: 1,
                        resId: 570,
                        uuid: "2ff19bc767a53f1d6b6f675076ac6a37",
                        pdfPaht: "",
                        resName: "中国",
                        imgList: [],
                        approveState: 1,
                      },
                    ],
                    changeTime: 3,
                    arrResources: [
                      {
                        uuid: "af4463075c60d93f8fce09ef7acbbc02",
                        url:
                          "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/7ccead3ade36472fb8a4873af2db9633.png",
                        name: "6",
                      },
                      {
                        uuid: "2ff19bc767a53f1d6b6f675076ac6a37",
                        url:
                          "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/58cc076b499ae18df50bfc3bac2dbf51.mp4",
                        name: "中国",
                      },
                    ],
                  },
                  animation: [],
                  layoutConfig: {
                    aniRotation: 0,
                    hidden: false,
                    rotation: 0,
                    skewX: 0,
                    skewY: 0,
                    pivotY: 0,
                    pivotX: 0,
                    positionX: 0,
                    scaleX: 1,
                    positionY: 0,
                    scaleY: 1,
                    top: 65,
                    left: 733,
                    alpha: 1,
                    width: 200,
                    opacity: 100,
                    height: 200,
                    zIndex: 3,
                  },
                  children: [],
                  name: "混播",
                  id: "04a4ced0-b399-11eb-aab0-f539ee7e6001",
                  events: [],
                },
                {
                  type: "ImageCmp",
                  props: {
                    introduce: ["6"],
                    changeType: "",
                    autoChange: true,
                    changeTime: 5,
                    arrResources: [
                      {
                        uuid: "6d79f40f23f16a4ebbb126e420171d62",
                        url:
                          "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/7ccead3ade36472fb8a4873af2db9633.png",
                        payload: {
                          thumbnail:
                            "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/7ccead3ade36472fb8a4873af2db9633.png",
                          resType: 1,
                          sourcePaht:
                            "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/7ccead3ade36472fb8a4873af2db9633.png",
                          priceType: 1,
                          resId: 177,
                          uuid: "6d79f40f23f16a4ebbb126e420171d62",
                          pdfPaht: "",
                          resName: "6",
                          imgList: [],
                          approveState: 1,
                        },
                        name: "6",
                      },
                    ],
                    bgUrl: [
                      "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/7ccead3ade36472fb8a4873af2db9633.png",
                    ],
                  },
                  animation: [],
                  layoutConfig: {
                    aniRotation: 0,
                    hidden: false,
                    rotation: 0,
                    skewX: 0,
                    skewY: 0,
                    pivotY: 0,
                    pivotX: 0,
                    positionX: 0,
                    scaleX: 1,
                    positionY: 0,
                    scaleY: 1,
                    top: 98,
                    left: 135,
                    alpha: 1,
                    width: 200,
                    opacity: 100,
                    height: 200,
                    zIndex: 2,
                  },
                  children: [],
                  name: "图片",
                  id: "de6e1840-b31e-11eb-bda9-1da2011c327e",
                  events: [],
                },
                {
                  type: "documentCmp",
                  props: {
                    changeType: "",
                    autoChange: true,
                    changeTime: 5,
                    arrResources: [
                      {
                        url:
                          "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/6cada7f2286e4d5eb83e3c721121b170.png",
                      },
                    ],
                    bgUrl: [
                      "http://rongmeiyun.s3.cn-south-1.jdcloud-oss.com/upload/20210512/6cada7f2286e4d5eb83e3c721121b170.png",
                    ],
                  },
                  animation: [],
                  layoutConfig: {
                    aniRotation: 0,
                    hidden: false,
                    rotation: 0,
                    skewX: 0,
                    skewY: 0,
                    pivotY: 0,
                    pivotX: 0,
                    positionX: 0,
                    scaleX: 1,
                    positionY: 0,
                    scaleY: 1,
                    top: 280,
                    left: 426,
                    alpha: 1,
                    width: 761.2824675324675,
                    opacity: 100,
                    height: 619.8051948051948,
                    zIndex: 1,
                  },
                  children: [],
                  name: "文档",
                  id: "061e7e50-b31c-11eb-be68-890c0e0db92f",
                  events: [],
                },
              ],
              name: "页面1",
              id: "1",
            },
          ],
        },
            currentPage: window.renderData.pages[0].id,
            baseUrl: '',
        };
    },
};
</script>
<style scoped></style>
