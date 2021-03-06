export const renderData = {
    version: "1.0",
    description: "",
    container: {
        width: 1000,
        height: 700,
        bgm: {
            autoPlay: true,
            src: "http://xes-h5-icourse.oss-cn-beijing.aliyuncs.com/test1/lvdongzhou/mapproject1021local/audio/Satie%20Gymnopedie%20No.1.mp3"
        }
    },
    change: {
      type: 3,
      loop: true,
      singlePagePlayTime: 20
    },
    pages: [
        {
            name: "页面1",
            id: 1,
            container: {
                backGround: { type: "color", value: "lightcyan" },
            },
            components: [
                {
                    id: 1,
                    name: "按钮1",
                    type: "BtnCmp",
                    layoutConfig: {
                        zIndex: 1,
                        top: 100,
                        left: 100,
                        rotation: Math.PI * 10,
                        width: 100,
                        height: 100,
                        opacity: 1
                    },
                    props: {
                        text:"111"
                    },
                    animation: [
                        { type: "shaking", duration: 100, delay: 0, times: 1 }
                    ],
                    events: [
                        {
                            type: "log",
                            value: "Dialog1"
                        }
                    ],
                    children: []
                },
                {
                    id: 2,
                    name: "图片1",
                    type: "ImageCmp",
                    layoutConfig: {
                        zIndex: 1,
                        top: 200,
                        left: 200,
                        rotation: Math.PI,
                        width: 200,
                        height: 200,
                        opacity: 1
                    },
                    props: {
                        bgUrl: "http://xes-h5-icourse.oss-cn-beijing.aliyuncs.com/test1/lvdongzhou/KungFu_Qiu/static/images/gameScene/bulletScreenIntroduceArr.png"
                    },
                    animation: [
                        { type: "shaking", duration: 100, delay: 0, times: 2 }
                    ],
                    events: [
                        {
                            type: "nextPage",
                            value: ""
                        }
                    ],
                    children: []
                }
            ],
        },
        {
            name: "页面2",
            id: 2,
            container: {
                backGround: { type: "image", value: "http://dik.img.kttpdq.com/pic/39/27153/5b61cb116a13028f_1680x1050.jpg" },
            },
            components: [
                {
                    id: 1,
                    name: "按钮2",
                    type: "ImageCmp",
                    layoutConfig: {
                        zIndex: 1,
                        top: 100,
                        left: 100,
                        rotation: Math.PI,
                        width: 200,
                        height: 100,
                        opacity: 1
                    },
                    props: {
                        bgUrl: "http://xes-h5-icourse.oss-cn-beijing.aliyuncs.com/test1/lvdongzhou/mapproject1021local/audio/si-glyph-comb.svg"
                    },
                    animation: [
                        { type: "shaking", duration: 100, delay: 0, times: 2 }
                    ],
                    events: [
                        {
                            type: "prePage",
                            value: ""
                        }
                    ],
                    children: []
                }
            ],
        },
        {
            name: "页面3",
            id: 3,
            container: {
                backGround: { type: "color", value: "lightcyan" },
            },
            components: [
                {
                    id: 1,
                    name: "图片1",
                    type: "ImageCmp",
                    layoutConfig: {
                        zIndex: 1,
                        top: 200,
                        left: 200,
                        rotation: Math.PI,
                        width: 200,
                        height: 200,
                        opacity: 1
                    },
                    props: {
                        bgUrl: "http://xes-h5-icourse.oss-cn-beijing.aliyuncs.com/test1/13/resource/assets/images/1598609619472.png"
                    },
                    animation: [

                    ],
                    events: [
                        {
                            type: "nextPage",
                            value: ""
                        }
                    ],
                    children: []
                }
            ],
        },
        {
            name: "页面4",
            id: 4,
            container: {
                backGround: { type: "image", value: "http://xes-h5-icourse.oss-cn-beijing.aliyuncs.com/test1/13/resource/assets/images/1599205350126.jpg" },
            },
            components: [
                {
                    id: 1,
                    name: "按钮2",
                    type: "ImageCmp",
                    layoutConfig: {
                        zIndex: 1,
                        top: 100,
                        left: 100,
                        rotation: Math.PI,
                        width: 1,
                        height: 1,
                        opacity: 1
                    },
                    props: {
                        bgUrl: "http://xes-h5-icourse.oss-cn-beijing.aliyuncs.com/test1/13/resource/assets/images/1599205350126.jpg"
                    },
                    animation: [

                    ],
                    events: [
                        {
                            type: "prePage",
                            value: ""
                        }
                    ],
                    children: []
                }
            ],
        }
    ],
    dialogs: []
};
export const staticEditorData = {
    Button: {
        name: '按钮',
        type: 'Button',
        notSupport: [
            {
                type: "layout"
            },
            {
                type: "animation"
            }
        ],
        userDefine: [
            {
                title: "图片",
                key: 1,
                props: {
                    bgUrl: {
                        editor: {
                            type: "imageUploader",
                            props: {}
                        },
                        defaultValue: {

                        }
                    }
                }
            },
            {
                title: "图片",
                key: 2,
                props: {
                    bgUrl: {
                        label: "上传图片",
                        editor: {
                            type: "imageUploader",

                        },
                        defaultValue: {

                        }
                    }
                }
            }
        ]
    }
};
