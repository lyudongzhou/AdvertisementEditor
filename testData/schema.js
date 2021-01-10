window.renderData = {
  "version": "1.0",
  "description": "",
  "container": {
      "width": 1000,
      "height": 700,
      "bgm": {
          "autoPlay": true,
          "src": "audios/audio.mp3",
          "volume": 50
      },
      "paging": {
          "position": "center&bottom",
          "fmt": "${CURRENT}/${TOTAL}",
          "color": "#E41C1C",
          "size": 20,
          "family": "",
          "bgColor":"#000000"
      }
  },
  "change": {
      "type": 70,
      "loop": true,
      "singlePagePlayTime": 2,
      "changeHint":true,
      "backTime":6000
  },
  "pages": [
      {
          "name": "页面3",
          "id": "3",
          "container": {
              "backGround": {
                  "type": "image",
                  "value": "images/Jellyfish.jpg"
              }
          },
          "components": [
              {
                  "props": {
                      "videoSrc": "",
                      "bgUrl": "video/test.mp4"
                  },
                  "animation": [],
                  "events": [],
                  "type": "VideoCmp",
                  "layoutConfig": {
                      "width": 300,
                      "height": 300,
                      "hidden": false,
                      "rotation": 0,
                      "top": 0,
                      "left": 0,
                      "opacity": 1,
                      "pivotX": 0,
                      "pivotY": 0,
                      "scaleX": 1,
                      "scaleY": 1,
                      "aniRotation": 0,
                      "skewX": 0,
                      "skewY": 0,
                      "positionX": 0,
                      "positionY": 0,
                      "alpha": 1,
                      "zIndex": 6
                  },
                  "children": [],
                  "name": "视频1",
                  "id": "a34e67a0-5037-11eb-91a5-174fe8a128fa"
              },
              {
                  "props": {
                      "text": "文本1",
                      "fontFamily": "微软雅黑",
                      "fontWeight": 10,
                      "fontStyle": "normal",
                      "fontSize": 30,
                      "color": "#000000"
                  },
                  "animation": [],
                  "events": [],
                  "name": "文本2",
                  "type": "textCmp",
                  "layoutConfig": {
                      "width": 100,
                      "height": 30,
                      "zIndex": 5,
                      "hidden": false,
                      "rotation": 0,
                      "top": 0,
                      "left": 0,
                      "pivotX": 0,
                      "pivotY": 0,
                      "scaleX": 1,
                      "scaleY": 1,
                      "aniRotation": 0,
                      "skewX": 0,
                      "skewY": 0,
                      "positionX": 0,
                      "positionY": 0,
                      "opacity": 1,
                      "alpha": 1
                  },
                  "children": [],
                  "id": "345600d0-4658-11eb-a3ca-bb193d389b3f"
              },
              {
                  "props": {
                      "bgUrl": "images/Koala.jpg"
                  },
                  "animation": [
                      {
                          "type": "enfromtop",
                          "duration": 1,
                          "delay": 0,
                          "times": 2
                      }
                  ],
                  "events": [],
                  "type": "ImageCmp",
                  "layoutConfig": {
                      "width": 147,
                      "height": 166,
                      "zIndex": 4,
                      "hidden": false,
                      "rotation": 0,
                      "top": 200,
                      "left": 82,
                      "pivotX": 0,
                      "pivotY": 0,
                      "scaleX": 1,
                      "scaleY": 1,
                      "aniRotation": 0,
                      "skewX": 0,
                      "skewY": 0,
                      "positionX": 0,
                      "positionY": 0,
                      "opacity": 1,
                      "alpha": 1
                  },
                  "children": [],
                  "name": "图2212",
                  "id": "c648f020-4657-11eb-a3ca-bb193d389b3f"
              },
              {
                  "props": {
                      "bgUrl": "images/Koala.jpg"
                  },
                  "animation": [],
                  "events": [],
                  "type": "ImageCmp",
                  "layoutConfig": {
                      "width": 147,
                      "height": 166,
                      "zIndex": 3,
                      "hidden": false,
                      "rotation": 0,
                      "top": 117.99999999999999,
                      "left": 472,
                      "pivotX": 0,
                      "pivotY": 0,
                      "scaleX": 1,
                      "scaleY": 1,
                      "aniRotation": 0,
                      "skewX": 0,
                      "skewY": 0,
                      "positionX": 0,
                      "positionY": 0,
                      "opacity": 1,
                      "alpha": 1
                  },
                  "children": [],
                  "name": "图片2",
                  "id": "8b7e2050-4657-11eb-a3ca-bb193d389b3f"
              },
              {
                  "props": {
                      "text": "文本",
                      "fontFamily": "微软雅黑",
                      "fontWeight": 10,
                      "fontStyle": "normal",
                      "fontSize": 30,
                      "color": "#E41C1C"
                  },
                  "animation": [],
                  "events": [],
                  "name": "文本1",
                  "type": "textCmp",
                  "layoutConfig": {
                      "width": 100,
                      "height": 30,
                      "zIndex": 2,
                      "hidden": false,
                      "rotation": 0,
                      "top": 64,
                      "left": 45,
                      "pivotX": 0,
                      "pivotY": 0,
                      "scaleX": 1,
                      "scaleY": 1,
                      "aniRotation": 0,
                      "skewX": 0,
                      "skewY": 0,
                      "positionX": 0,
                      "positionY": 0,
                      "opacity": 1,
                      "alpha": 1
                  },
                  "children": [],
                  "id": "82348070-4657-11eb-a3ca-bb193d389b3f"
              }
          ]
      },
      {
          "name": "页面3",
          "id": "3111",
          "container": {
              "backGround": {
                  "type": "image",
                  "value": "images/Jellyfish.jpg"
              }
          },
          "components": [
          ]
      }
  ],
  "dialogs": [],
  "resource": [
      "video/test.mp4",
      "images/Koala.jpg"
  ]
}