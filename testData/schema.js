window.renderData ={
    "container": {
     "bgm": {
     },
     "paging": {
      "color": "#E41C1C",
      "fmt": "${CURRENT}/${TOTAL}",
      "size": 20,
      "bgColor": "#000000",
      "position": "center&amp;bottom",
      "family": ""
     },
     "width": 1920,
     "height": 1080
    },
    "resource": [
     {
      "uuid": "45adcfc78f6f168bf55e5d2ddc7431cd",
      "url": "http://rongmeiyun.s3-ipv6.cn-south-1.jdcloud-oss.com/upload/20210421/0e976b48573f6512ba9acdebc85fbaf6.mp4",
      "name": "1.mp4"
     },
     {
      "uuid": "51782323871d584189467333150acd76",
      "url": "http://rongmeiyun.s3-ipv6.cn-south-1.jdcloud-oss.com/upload/20210421/5ce9dc12e16cfa6c296af1567d228c7d.png",
      "name": "QQ截图20210421140810.png"
     }
    ],
    "change": {
     "singlePagePlayTime": 1800,
     "type": 70,
     "loop": true,
     "changeHint": true,
     "backTime": 6000
    },
    "description": "",
    "version": "1.0",
    "dialogs": [
    ],
    "pages": [
     {
      "container": {
       "backGround": {
        "type": "",
        "value": ""
       },
       "bgMusic": {
        "type": 1,
        "music": [
        ]
       }
      },
      "components": [
       {
        "type": "VideoCmp",
        "props": {
         "videoSrc": "",
         "arrResources": [
          {
           "uuid": "45adcfc78f6f168bf55e5d2ddc7431cd",
           "url": "http://rongmeiyun.s3-ipv6.cn-south-1.jdcloud-oss.com/upload/20210421/0e976b48573f6512ba9acdebc85fbaf6.mp4",
           "name": "1.mp4"
          }
         ],
         "bgUrl": "http://rongmeiyun.s3-ipv6.cn-south-1.jdcloud-oss.com/upload/20210421/0e976b48573f6512ba9acdebc85fbaf6.mp4"
        },
        "animation": [
        ],
        "layoutConfig": {
         "aniRotation": 0,
         "hidden": false,
         "rotation": 0,
         "skewX": 0,
         "skewY": 0,
         "pivotY": 0,
         "pivotX": 0,
         "positionX": 0,
         "scaleX": 1,
         "positionY": 0,
         "scaleY": 1,
         "top": 173,
         "left": 370.909090909091,
         "alpha": 1,
         "width": 829.090909090909,
         "opacity": 100,
         "height": 699.7402597402597,
         "zIndex": 2
        },
        "children": [
        ],
        "name": "视频",
        "id": "711d7b50-a26b-11eb-917a-73f86fc38f72",
        "events": [
        ]
       },
       {
        "type": "ImageCmp",
        "props": {
         "introduce": [
          "QQ截图20210421140810.png"
         ],
         "changeType": "",
         "autoChange": true,
         "changeTime": 5,
         "arrResources": [
          {
           "uuid": "51782323871d584189467333150acd76",
           "url": "http://rongmeiyun.s3-ipv6.cn-south-1.jdcloud-oss.com/upload/20210421/5ce9dc12e16cfa6c296af1567d228c7d.png",
           "name": "QQ截图20210421140810.png"
          }
         ],
         "bgUrl": [
          "http://rongmeiyun.s3-ipv6.cn-south-1.jdcloud-oss.com/upload/20210421/5ce9dc12e16cfa6c296af1567d228c7d.png"
         ]
        },
        "animation": [
        ],
        "layoutConfig": {
         "aniRotation": 0,
         "hidden": false,
         "rotation": 0,
         "skewX": 0,
         "skewY": 0,
         "pivotY": 0,
         "pivotX": 0,
         "positionX": 0,
         "scaleX": 1,
         "positionY": 0,
         "scaleY": 1,
         "top": 0,
         "left": 0,
         "alpha": 1,
         "width": 200,
         "opacity": 100,
         "height": 200,
         "zIndex": 1
        },
        "children": [
        ],
        "name": "图片",
        "id": "6f0cead0-a26b-11eb-917a-73f86fc38f72",
        "events": [
        ]
       }
      ],
      "name": "页面1",
      "id": "1"
     },
     {
      "container": {
       "backGround": {
        "type": "",
        "value": ""
       },
       "bgMusic": {
        "type": 1,
        "music": [
        ]
       }
      },
      "components": [
       {
        "type": "svgCmp",
        "props": {
         "color": "#F00",
         "type": "0.0"
        },
        "animation": [
        ],
        "layoutConfig": {
         "aniRotation": 0,
         "hidden": false,
         "rotation": 0,
         "skewX": 0,
         "skewY": 0,
         "pivotY": 0,
         "pivotX": 0,
         "positionX": 0,
         "scaleX": 1,
         "positionY": 0,
         "scaleY": 1,
         "top": 182,
         "left": 56,
         "alpha": 1,
         "width": 200,
         "opacity": 100,
         "height": 200,
         "zIndex": 5
        },
        "children": [
        ],
        "name": "svgs",
        "id": "8ccf7a60-a26b-11eb-917a-73f86fc38f72",
        "events": [
        ]
       },
       {
        "type": "weekdayCmp",
        "props": {
         "color": "#000",
         "font-size": 40,
         "background": "transparent",
         "width": 100,
         "font-family": "黑体",
         "height": 50
        },
        "animation": [
        ],
        "layoutConfig": {
         "aniRotation": 0,
         "hidden": false,
         "rotation": 0,
         "skewX": 0,
         "skewY": 0,
         "pivotY": 0,
         "pivotX": 0,
         "positionX": 0,
         "scaleX": 1,
         "positionY": 0,
         "scaleY": 1,
         "top": 40,
         "left": 821,
         "alpha": 1,
         "width": 208.8311688311688,
         "opacity": 100,
         "height": 88.83116883116882,
         "zIndex": 4
        },
        "children": [
        ],
        "name": "星期",
        "id": "8a60eb60-a26b-11eb-917a-73f86fc38f72",
        "events": [
        ]
       },
       {
        "type": "weekCmp",
        "props": {
         "color": "#000",
         "font-size": 40,
         "background": "transparent",
         "width": 100,
         "font-family": "黑体",
         "height": 50
        },
        "animation": [
        ],
        "layoutConfig": {
         "aniRotation": 0,
         "hidden": false,
         "rotation": 0,
         "skewX": 0,
         "skewY": 0,
         "pivotY": 0,
         "pivotX": 0,
         "positionX": 0,
         "scaleX": 1,
         "positionY": 0,
         "scaleY": 1,
         "top": 59,
         "left": 612,
         "alpha": 1,
         "width": 100,
         "opacity": 100,
         "height": 50,
         "zIndex": 3
        },
        "children": [
        ],
        "name": "周",
        "id": "887c4ce0-a26b-11eb-917a-73f86fc38f72",
        "events": [
        ]
       },
       {
        "type": "dateCmp",
        "props": {
         "color": "#000",
         "font-size": 40,
         "background": "transparent",
         "width": 100,
         "font-family": "黑体",
         "text": "2021-04-21",
         "height": 50
        },
        "animation": [
        ],
        "layoutConfig": {
         "aniRotation": 0,
         "hidden": false,
         "rotation": 0,
         "skewX": 0,
         "skewY": 0,
         "pivotY": 0,
         "pivotX": 0,
         "positionX": 0,
         "scaleX": 1,
         "positionY": 0,
         "scaleY": 1,
         "top": 55,
         "left": 274,
         "alpha": 1,
         "width": 264.93506493506493,
         "opacity": 100,
         "height": 81.03896103896103,
         "zIndex": 2
        },
        "children": [
        ],
        "name": "日期",
        "id": "8595f5d0-a26b-11eb-917a-73f86fc38f72",
        "events": [
        ]
       },
       {
        "type": "timeCmp",
        "props": {
         "color": "#000",
         "font-size": 40,
         "background": "transparent",
         "width": 100,
         "font-family": "黑体",
         "height": 50
        },
        "animation": [
        ],
        "layoutConfig": {
         "aniRotation": 0,
         "hidden": false,
         "rotation": 0,
         "skewX": 0,
         "skewY": 0,
         "pivotY": 0,
         "pivotX": 0,
         "positionX": 0,
         "scaleX": 1,
         "positionY": 0,
         "scaleY": 1,
         "top": 0,
         "left": 0,
         "alpha": 1,
         "width": 216.6233766233766,
         "opacity": 100,
         "height": 73.24675324675324,
         "zIndex": 1
        },
        "children": [
        ],
        "name": "时间",
        "id": "842a30d0-a26b-11eb-917a-73f86fc38f72",
        "events": [
        ]
       }
      ],
      "name": "页面",
      "id": "8256a950-a26b-11eb-917a-73f86fc38f72"
     }
    ]
   }