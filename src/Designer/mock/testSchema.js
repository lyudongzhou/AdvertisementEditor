// export default {
//   version: "1.0",
//   description: "",
//   container: {
//     width: 500,
//     height: 500,
//   },
//   change: [{}],
//   pages: [{
//     name: '页面1',
//     id: 1,
//     components: [
//       {
//         id: 1,
//         name: "按钮1",
//         type: "ElButton",
//         layoutConfig: {
//           zIndex: 1,
//           top: 100,
//           left: 100,
//           width: 70,
//           height: 40,
//           opacity: 1,
//         },
//         props: {
//           children: '点我',
//         },
//         animation: [],
//         events: [
//           {
//             type: "alert",
//             value: "hello",
//           },
//         ],
//       },
//     ],
//   }],
// };

export default {
  version: "1.0",
  description: "",
  container: {
    width: 1000,
    height: 700,
    bgm: {
      autoPlay: true,
      src: ""
    }
  },
  change: [{}],
  pages: [{
    name: "页面1",
    id: "1",
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
          rotation: Math.PI,
          width: 1,
          height: 1,
          opacity: 1
        },
        props: {
          bgUrl: "https://www.pixijs.com/wp/wp-content/uploads/pixijs-v5-logo-1.png"
        },
        animation: [

        ],
        events: [
          {
            type: "log",
            value: "Dialog1"
          }
        ],
        children: []
      },

    ],
  },
    {
      name: "页面2",
      id: "2",
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
            width: 1,
            height: 1,
            opacity: 1
          },
          props: {
            bgUrl: "http://img.xz7.com/up/2019-9/20199985738431530.jpg"
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
    }],
  dialogs: []
}