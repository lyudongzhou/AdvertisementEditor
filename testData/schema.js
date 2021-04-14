window.renderData = {
    "container": {
        "bgm": {},
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
    "resource": [{
            "uuid": "9186df8d0b80e847dd0a31e39fb60c24",
            "url": "https://cdnxf.rz-edu.cn/upload/20210407/58556d157447f8ca0f2ef2719bdf12ee.png",
            "name": "Lingo_tex.png"
        },
        {
            "uuid": "26e0a67c4964a48652282f407dc3266e",
            "url": "https://cdnxf.rz-edu.cn/upload/20210412/ca14b3bb378a854b64b3bef118ab926a.mp4",
            "name": "10.mp4"
        },
        {
            "uuid": "2adbab636f2616ee000177d9902ea162",
            "url": "https://cdnxf.rz-edu.cn/upload/20210412/344db2be8b9ec264aca969ec22f01fbd.png",
            "name": "11.png"
        },
        {
            "uuid": "25c5a4782798fb2aa5aded5e17e05aa3",
            "url": "https://cdnxf.rz-edu.cn/upload/20210412/cff06711e07cc205f5e0e3e6dae60e70.png",
            "name": "13.png"
        }
    ],
    "change": {
        "singlePagePlayTime": 1800,
        "type": 70,
        "loop": false,
        "changeHint": false,
        "backTime": 6000
    },
    "description": "",
    "version": "1.0",
    "dialogs": [],
    "pages": [{
            "container": {
                "backGround": {
                    "type": "",
                    "value": ""
                },
                "bgMusic": {
                    "type": 1,
                    "music": []
                }
            },
            "components": [{
                    "type": "ImageCmp",
                    "props": {
                        "introduce": [
                            "Lingo_tex.png"
                        ],
                        "changeType": "",
                        "autoChange": true,
                        "changeTime": 5,
                        "arrResources": [{
                            "uuid": "9186df8d0b80e847dd0a31e39fb60c24",
                            "url": "https://cdnxf.rz-edu.cn/upload/20210407/58556d157447f8ca0f2ef2719bdf12ee.png",
                            "name": "Lingo_tex.png"
                        }],
                        "bgUrl": [
                            "https://cdnxf.rz-edu.cn/upload/20210407/58556d157447f8ca0f2ef2719bdf12ee.png"
                        ]
                    },
                    "animation": [],
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
                        "top": 348,
                        "left": 743,
                        "alpha": 1,
                        "width": 200,
                        "opacity": 100,
                        "height": 200,
                        "zIndex": 8
                    },
                    "children": [],
                    "name": "图片",
                    "id": "c1bd34a0-9b55-11eb-b18f-dd3c53588026",
                    "events": []
                },
                {
                    "type": "qrcodeCmp",
                    "props": {
                        "text": "http://saberxf.rz-edu.cn/editor/"
                    },
                    "animation": [],
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
                        "top": 249,
                        "left": 342,
                        "alpha": 1,
                        "width": 200,
                        "opacity": 100,
                        "height": 200,
                        "zIndex": 7
                    },
                    "children": [],
                    "name": "二维码",
                    "id": "bb5cef80-9b49-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "btnProps": {
                        "border-color": "#4A92ED",
                        "border-radius": "4px",
                        "background": "#4A92ED",
                        "width": 240,
                        "border-width": "0px",
                        "opacity": 1,
                        "border-style": "solid",
                        "height": 72,
                        "text-align": "center"
                    },
                    "type": "buttonCmp",
                    "props": {
                        "color": "#4D4D4D",
                        "font-weight": 600,
                        "font-size": 40,
                        "font-family": "PingFangSC-Semibold, PingFang SC",
                        "text": "跳到第二页"
                    },
                    "animation": [],
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
                        "top": 320,
                        "left": 8,
                        "alpha": 1,
                        "width": 300,
                        "opacity": 100,
                        "height": 167.70186335403727,
                        "zIndex": 6
                    },
                    "children": [],
                    "name": "按钮配置",
                    "id": "b114f270-9b49-11eb-9dd8-1502958c41c2",
                    "events": [{
                        "type": "openTheWindow",
                        "props": {
                            "openId": "bf3ee4a0-9b49-11eb-9dd8-1502958c41c2",
                            "backTime": 1
                        }
                    }]
                },
                {
                    "type": "documentCmp",
                    "props": {
                        "changeType": "kenburn",
                        "autoChange": true,
                        "changeTime": 5,
                        "arrResources": [],
                        "bgUrl": []
                    },
                    "animation": [],
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
                        "top": 51,
                        "left": 880,
                        "alpha": 1,
                        "width": 200,
                        "opacity": 100,
                        "height": 200,
                        "zIndex": 5
                    },
                    "children": [],
                    "name": "文档",
                    "id": "aaab19f0-9b49-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "VideoCmp",
                    "props": {
                        "videoSrc": "",
                        "arrResources": [{
                            "uuid": "26e0a67c4964a48652282f407dc3266e",
                            "url": "https://cdnxf.rz-edu.cn/upload/20210412/ca14b3bb378a854b64b3bef118ab926a.mp4",
                            "name": "10.mp4"
                        }],
                        "bgUrl": "https://cdnxf.rz-edu.cn/upload/20210412/ca14b3bb378a854b64b3bef118ab926a.mp4"
                    },
                    "animation": [],
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
                        "top": 63,
                        "left": 460,
                        "alpha": 1,
                        "width": 300,
                        "opacity": 100,
                        "height": 167.70186335403727,
                        "zIndex": 4
                    },
                    "children": [],
                    "name": "视频",
                    "id": "a55a0470-9b49-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "ImageCmp",
                    "props": {
                        "introduce": [
                            "11.png"
                        ],
                        "changeType": "",
                        "autoChange": true,
                        "changeTime": 5,
                        "arrResources": [{
                            "uuid": "2adbab636f2616ee000177d9902ea162",
                            "url": "https://cdnxf.rz-edu.cn/upload/20210412/344db2be8b9ec264aca969ec22f01fbd.png",
                            "name": "11.png"
                        }],
                        "bgUrl": [
                            "https://cdnxf.rz-edu.cn/upload/20210412/344db2be8b9ec264aca969ec22f01fbd.png"
                        ]
                    },
                    "animation": [{
                        "type": "stshake",
                        "duration": 1,
                        "times": 1,
                        "delay": 0
                    }],
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
                        "_gsap": {},
                        "top": 55,
                        "left": 231,
                        "alpha": 1,
                        "width": 200,
                        "opacity": 100,
                        "height": 200,
                        "zIndex": 3
                    },
                    "children": [],
                    "name": "图片",
                    "id": "9fe31770-9b49-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "ImageCmp",
                    "props": {
                        "introduce": [
                            "13.png"
                        ],
                        "changeType": "",
                        "autoChange": true,
                        "changeTime": 5,
                        "arrResources": [{
                            "uuid": "25c5a4782798fb2aa5aded5e17e05aa3",
                            "url": "https://cdnxf.rz-edu.cn/upload/20210412/cff06711e07cc205f5e0e3e6dae60e70.png",
                            "name": "13.png"
                        }],
                        "bgUrl": [
                            "https://cdnxf.rz-edu.cn/upload/20210412/cff06711e07cc205f5e0e3e6dae60e70.png"
                        ]
                    },
                    "animation": [{
                        "type": "enfromright",
                        "duration": 1,
                        "times": 1,
                        "delay": 0
                    }],
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
                        "_gsap": {},
                        "top": 49,
                        "left": 14,
                        "alpha": 1,
                        "width": 200,
                        "opacity": 100,
                        "height": 200,
                        "zIndex": 2
                    },
                    "children": [],
                    "name": "图片",
                    "id": "9804ee70-9b49-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "textCmp",
                    "props": {
                        "color": "#000000",
                        "fontStyle": "normal",
                        "fontFamily": "微软雅黑",
                        "fontSize": 30,
                        "fontAlign": "left",
                        "text": "这是第一页",
                        "fontWeight": "normal"
                    },
                    "animation": [],
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
                        "height": 34.43037974683544,
                        "zIndex": 1
                    },
                    "children": [],
                    "name": "文本",
                    "id": "934ae8d0-9b49-11eb-9dd8-1502958c41c2",
                    "events": []
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
                    "music": []
                }
            },
            "components": [{
                    "type": "textCmp",
                    "props": {
                        "color": "#000000",
                        "fontStyle": "normal",
                        "fontFamily": "微软雅黑",
                        "fontSize": 30,
                        "fontAlign": "left",
                        "text": "这是第二页",
                        "fontWeight": "normal"
                    },
                    "animation": [],
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
                        "top": 780,
                        "left": 905,
                        "alpha": 1,
                        "width": 200,
                        "opacity": 100,
                        "height": 34.43037974683544,
                        "zIndex": 11
                    },
                    "children": [],
                    "name": "文本",
                    "id": "ec218630-9b49-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "weekdayForecastCmp",
                    "props": {},
                    "animation": [],
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
                        "top": 560,
                        "left": 20,
                        "alpha": 1,
                        "width": 580,
                        "opacity": 100,
                        "height": 360,
                        "zIndex": 10
                    },
                    "children": [],
                    "name": "文档",
                    "id": "e85b7d80-9b49-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "oneDayForecastCmp",
                    "props": {},
                    "animation": [],
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
                        "top": 194,
                        "left": 668,
                        "alpha": 1,
                        "width": 800,
                        "opacity": 100,
                        "height": 200,
                        "zIndex": 9
                    },
                    "children": [],
                    "name": "文档",
                    "id": "e62feaf0-9b49-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "realTimeForecastCmp",
                    "props": {},
                    "animation": [],
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
                        "top": 120,
                        "left": 32,
                        "alpha": 1,
                        "width": 400,
                        "opacity": 100,
                        "height": 300,
                        "zIndex": 8
                    },
                    "children": [],
                    "name": "文档",
                    "id": "e405b7f0-9b49-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "informCmp",
                    "props": {
                        "color": "#000",
                        "font-size": 30,
                        "background": "transparent",
                        "width": 200,
                        "text": "这是通知",
                        "height": 100
                    },
                    "animation": [],
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
                        "left": 22,
                        "alpha": 1,
                        "width": 200,
                        "opacity": 100,
                        "height": 100,
                        "zIndex": 7
                    },
                    "children": [],
                    "name": "通知",
                    "id": "d9f4d070-9b49-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "countCmp",
                    "props": {
                        "color": "#000",
                        "format": "ddHHmmss",
                        "countTime": 10,
                        "background": "transparent",
                        "fontSize": "30",
                        "startTime": 1618202571622,
                        "fontAlign": "center",
                        "text": "这是正计时"
                    },
                    "animation": [],
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
                        "top": 8,
                        "left": 889,
                        "alpha": 1,
                        "width": 300,
                        "opacity": 100,
                        "height": 50,
                        "zIndex": 6
                    },
                    "children": [],
                    "name": "正计时",
                    "id": "d4178080-9b49-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "countdownCmp",
                    "props": {
                        "color": "#000",
                        "format": "ddHHmmss",
                        "background": "transparent",
                        "fontSize": "30",
                        "fontAlign": "center",
                        "endTime": 1620448971000,
                        "text": "这是倒计时"
                    },
                    "animation": [],
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
                        "top": 10,
                        "left": 610,
                        "alpha": 1,
                        "width": 300,
                        "opacity": 100,
                        "height": 50,
                        "zIndex": 5
                    },
                    "children": [],
                    "name": "倒计时",
                    "id": "cd0b2670-9b49-11eb-9dd8-1502958c41c2",
                    "events": []
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
                    "animation": [],
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
                        "top": 6,
                        "left": 462,
                        "alpha": 1,
                        "width": 131.64556962025316,
                        "opacity": 100,
                        "height": 50.63291139240506,
                        "zIndex": 4
                    },
                    "children": [],
                    "name": "星期",
                    "id": "c993b2f0-9b49-11eb-9dd8-1502958c41c2",
                    "events": []
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
                    "animation": [],
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
                        "left": 360,
                        "alpha": 1,
                        "width": 100,
                        "opacity": 100,
                        "height": 50,
                        "zIndex": 3
                    },
                    "children": [],
                    "name": "周",
                    "id": "c78badf0-9b49-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "dateCmp",
                    "props": {
                        "color": "#000",
                        "font-size": 40,
                        "background": "transparent",
                        "width": 100,
                        "font-family": "黑体",
                        "text": "2021-04-12",
                        "height": 50
                    },
                    "animation": [],
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
                        "top": 2,
                        "left": 130,
                        "alpha": 1,
                        "width": 212.65822784810126,
                        "opacity": 100,
                        "height": 58.734177215189874,
                        "zIndex": 2
                    },
                    "children": [],
                    "name": "日期",
                    "id": "c25d89c0-9b49-11eb-9dd8-1502958c41c2",
                    "events": []
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
                    "animation": [],
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
                        "width": 100,
                        "opacity": 100,
                        "height": 50,
                        "zIndex": 1
                    },
                    "children": [],
                    "name": "时间",
                    "id": "c1a27720-9b49-11eb-9dd8-1502958c41c2",
                    "events": []
                }
            ],
            "name": "页面",
            "id": "bf3ee4a0-9b49-11eb-9dd8-1502958c41c2"
        },
        {
            "container": {
                "backGround": {
                    "type": "",
                    "value": ""
                },
                "bgMusic": {
                    "type": 1,
                    "music": []
                }
            },
            "components": [{
                    "type": "linecodeChartCmp",
                    "props": {
                        "xAxis": {
                            "type": "value"
                        },
                        "legend": {
                            "show": true
                        },
                        "yAxis": {
                            "data": [
                                "Mon",
                                "Tue",
                                "Wed"
                            ],
                            "type": "category"
                        },
                        "grid": {
                            "width": "auto",
                            "height": "auto"
                        },
                        "series": [{
                                "data": [
                                    120,
                                    200,
                                    150
                                ],
                                "type": "bar",
                                "name": "A"
                            },
                            {
                                "data": [
                                    70,
                                    110,
                                    130
                                ],
                                "type": "bar",
                                "name": "B"
                            }
                        ]
                    },
                    "animation": [],
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
                        "top": 510,
                        "left": 470,
                        "alpha": 1,
                        "width": 400,
                        "opacity": 100,
                        "height": 400,
                        "zIndex": 4
                    },
                    "children": [],
                    "name": "条形图",
                    "id": "53053ef0-9b4a-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "barChartCmp",
                    "props": {
                        "xAxis": {
                            "data": [
                                "Mon",
                                "Tue",
                                "Wed"
                            ],
                            "type": "category"
                        },
                        "legend": {
                            "show": true
                        },
                        "yAxis": {
                            "type": "value"
                        },
                        "grid": {
                            "width": "auto",
                            "height": "auto"
                        },
                        "series": [{
                                "data": [
                                    120,
                                    200,
                                    150
                                ],
                                "type": "bar",
                                "name": "A"
                            },
                            {
                                "data": [
                                    70,
                                    110,
                                    130
                                ],
                                "type": "bar",
                                "name": "B"
                            }
                        ]
                    },
                    "animation": [],
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
                        "top": 338,
                        "left": 40,
                        "alpha": 1,
                        "width": 400,
                        "opacity": 100,
                        "height": 400,
                        "zIndex": 3
                    },
                    "children": [],
                    "name": "柱状图",
                    "id": "50ca1c00-9b4a-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "lineChartCmp",
                    "props": {
                        "xAxis": {
                            "data": [
                                "Mon",
                                "Tue"
                            ],
                            "type": "category"
                        },
                        "legend": {
                            "show": true
                        },
                        "yAxis": {
                            "type": "value"
                        },
                        "grid": {
                            "width": "auto",
                            "height": "auto"
                        },
                        "series": [{
                                "data": [
                                    "120",
                                    "20"
                                ],
                                "type": "line",
                                "name": "A"
                            },
                            {
                                "data": [
                                    "100",
                                    "40"
                                ],
                                "type": "line",
                                "name": "B"
                            }
                        ]
                    },
                    "animation": [],
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
                        "top": 28,
                        "left": 514,
                        "alpha": 1,
                        "width": 500,
                        "opacity": 100,
                        "height": 500,
                        "zIndex": 2
                    },
                    "null": [{
                            "data": [
                                "120",
                                "20"
                            ],
                            "type": "line",
                            "name": "A"
                        },
                        {
                            "data": [
                                "100",
                                "40"
                            ],
                            "type": "line",
                            "name": "B"
                        }
                    ],
                    "children": [],
                    "name": "折线图",
                    "id": "48b886f0-9b4a-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "pieChartCmp",
                    "props": {
                        "legend": {
                            "show": true
                        },
                        "grid": {
                            "width": "auto",
                            "height": "auto"
                        },
                        "series": [{
                            "data": [{
                                    "name": "直接访问",
                                    "value": "5"
                                },
                                {
                                    "name": "搜索引擎",
                                    "value": "5"
                                }
                            ],
                            "label": {
                                "formatter": "{c}"
                            },
                            "type": "pie",
                            "name": "访问来源",
                            "radius": "55%"
                        }]
                    },
                    "animation": [],
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
                        "width": 300,
                        "opacity": 100,
                        "height": 300,
                        "zIndex": 1
                    },
                    "children": [],
                    "name": "饼图",
                    "id": "168ff370-9b4a-11eb-9dd8-1502958c41c2",
                    "events": []
                }
            ],
            "name": "页面",
            "id": "f57dc3b0-9b49-11eb-9dd8-1502958c41c2"
        },
        {
            "container": {
                "backGround": {
                    "type": "",
                    "value": ""
                },
                "bgMusic": {
                    "type": 1,
                    "music": []
                }
            },
            "components": [{
                    "type": "svgCmp",
                    "props": {
                        "color": "#F00",
                        "type": "2.4"
                    },
                    "animation": [],
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
                        "top": 581,
                        "left": 984,
                        "alpha": 1,
                        "width": 200,
                        "opacity": 100,
                        "height": 200,
                        "zIndex": 16
                    },
                    "children": [],
                    "name": "svgs",
                    "id": "b8ed59a0-9b4a-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "svgCmp",
                    "props": {
                        "color": "#F00",
                        "type": "2.3"
                    },
                    "animation": [],
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
                        "top": 600,
                        "left": 745,
                        "alpha": 1,
                        "width": 200,
                        "opacity": 100,
                        "height": 200,
                        "zIndex": 15
                    },
                    "children": [],
                    "name": "svgs",
                    "id": "b6d85c50-9b4a-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "svgCmp",
                    "props": {
                        "color": "#F00",
                        "type": "2.2"
                    },
                    "animation": [],
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
                        "top": 579,
                        "left": 494,
                        "alpha": 1,
                        "width": 200,
                        "opacity": 100,
                        "height": 200,
                        "zIndex": 14
                    },
                    "children": [],
                    "name": "svgs",
                    "id": "b4b0c160-9b4a-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "svgCmp",
                    "props": {
                        "color": "#F00",
                        "type": "2.1"
                    },
                    "animation": [],
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
                        "top": 543,
                        "left": 267,
                        "alpha": 1,
                        "width": 200,
                        "opacity": 100,
                        "height": 200,
                        "zIndex": 13
                    },
                    "children": [],
                    "name": "svgs",
                    "id": "b2e465d0-9b4a-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "svgCmp",
                    "props": {
                        "color": "#F00",
                        "type": "2.0"
                    },
                    "animation": [],
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
                        "top": 514,
                        "left": 36,
                        "alpha": 1,
                        "width": 200,
                        "opacity": 100,
                        "height": 200,
                        "zIndex": 12
                    },
                    "children": [],
                    "name": "svgs",
                    "id": "b15d0280-9b4a-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "svgCmp",
                    "props": {
                        "color": "#F00",
                        "type": "1.4"
                    },
                    "animation": [],
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
                        "top": 350,
                        "left": 1051,
                        "alpha": 1,
                        "width": 200,
                        "opacity": 100,
                        "height": 200,
                        "zIndex": 11
                    },
                    "children": [],
                    "name": "svgs",
                    "id": "adaf3cc0-9b4a-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "svgCmp",
                    "props": {
                        "color": "#F00",
                        "type": "1.3"
                    },
                    "animation": [],
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
                        "top": 400,
                        "left": 760,
                        "alpha": 1,
                        "width": 200,
                        "opacity": 100,
                        "height": 200,
                        "zIndex": 10
                    },
                    "children": [],
                    "name": "svgs",
                    "id": "ac3c72e0-9b4a-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "svgCmp",
                    "props": {
                        "color": "#F00",
                        "type": "1.2"
                    },
                    "animation": [],
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
                        "top": 397,
                        "left": 520,
                        "alpha": 1,
                        "width": 200,
                        "opacity": 100,
                        "height": 200,
                        "zIndex": 9
                    },
                    "children": [],
                    "name": "svgs",
                    "id": "a891ba60-9b4a-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "svgCmp",
                    "props": {
                        "color": "#F00",
                        "type": "1.1"
                    },
                    "animation": [],
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
                        "top": 348,
                        "left": 267,
                        "alpha": 1,
                        "width": 200,
                        "opacity": 100,
                        "height": 200,
                        "zIndex": 8
                    },
                    "children": [],
                    "name": "svgs",
                    "id": "a7460080-9b4a-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "svgCmp",
                    "props": {
                        "color": "#F00",
                        "type": "1.0"
                    },
                    "animation": [],
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
                        "top": 304,
                        "left": 30,
                        "alpha": 1,
                        "width": 200,
                        "opacity": 100,
                        "height": 200,
                        "zIndex": 7
                    },
                    "children": [],
                    "name": "svgs",
                    "id": "a5bca160-9b4a-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "svgCmp",
                    "props": {
                        "color": "#F00",
                        "type": "0.4"
                    },
                    "animation": [],
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
                        "top": 160,
                        "left": 1067,
                        "alpha": 1,
                        "width": 200,
                        "opacity": 100,
                        "height": 200,
                        "zIndex": 6
                    },
                    "children": [],
                    "name": "svgs",
                    "id": "a29f82e0-9b4a-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "svgCmp",
                    "props": {
                        "color": "#F00",
                        "type": "0.3"
                    },
                    "animation": [],
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
                        "top": 152,
                        "left": 778,
                        "alpha": 1,
                        "width": 200,
                        "opacity": 100,
                        "height": 200,
                        "zIndex": 5
                    },
                    "children": [],
                    "name": "svgs",
                    "id": "a0ae6140-9b4a-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "svgCmp",
                    "props": {
                        "color": "#F00",
                        "type": "0.2"
                    },
                    "animation": [],
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
                        "top": 170,
                        "left": 569,
                        "alpha": 1,
                        "width": 200,
                        "opacity": 100,
                        "height": 200,
                        "zIndex": 4
                    },
                    "children": [],
                    "name": "svgs",
                    "id": "9b751980-9b4a-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "svgCmp",
                    "props": {
                        "color": "#F00",
                        "type": "0.1"
                    },
                    "animation": [],
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
                        "top": 158,
                        "left": 300,
                        "alpha": 1,
                        "width": 200,
                        "opacity": 100,
                        "height": 200,
                        "zIndex": 3
                    },
                    "children": [],
                    "name": "svgs",
                    "id": "9948eab0-9b4a-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "svgCmp",
                    "props": {
                        "color": "#F00",
                        "type": "0.0"
                    },
                    "animation": [],
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
                        "top": 140,
                        "left": 51,
                        "alpha": 1,
                        "width": 200,
                        "opacity": 100,
                        "height": 200,
                        "zIndex": 2
                    },
                    "children": [],
                    "name": "svgs",
                    "id": "721b0270-9b4a-11eb-9dd8-1502958c41c2",
                    "events": []
                },
                {
                    "type": "captionCmp",
                    "props": {
                        "color": "#000",
                        "font-size": 70,
                        "background": "#ccc",
                        "width": 800,
                        "location": "顶部",
                        "text": "这是从右往左字母",
                        "height": 100,
                        "direction": "从右往左"
                    },
                    "animation": [],
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
                        "width": 800,
                        "opacity": 100,
                        "height": 100,
                        "zIndex": 1
                    },
                    "children": [],
                    "name": "字幕",
                    "id": "5f3c3ac0-9b4a-11eb-9dd8-1502958c41c2",
                    "events": []
                }
            ],
            "name": "页面",
            "id": "5d43c620-9b4a-11eb-9dd8-1502958c41c2"
        }
    ]
}