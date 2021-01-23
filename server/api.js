const fs = require("fs");
const path = require("path");
const express = require("express");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();

const router = express.Router();

const createSuccessResult = (data) => {
  return {
    code: 200,
    data: {
      errorCode: 0,
      errorMessage: "",
      ...data,
    },
    msg: "",
    success: true,
  };
};

const createFaildResult = (data) => {
  return {
    code: 500,
    data: {
      errorCode: 0,
      errorMessage: "出错了",
      ...data,
    },
    msg: "",
    success: false,
  };
};

const uploadSuccessResult = (data) => {
  return {
    code: 0,
    data: {
      errorCode: 0,
      errorMessage: "",
      fileId: 0,
      ...data,
    },
    msg: "",
    success: true,
  };
};

const realResource = generateFakeResourcesData();
const realProgramResource = getProgramResources();
const realImage = [];
const realVideo = [];
const realAudio = [];
const realDocument = [];
realResource.forEach((ele) => {
  switch (ele.resType) {
    case 1:
      realImage.push(ele);
      break;
    case 2:
      realVideo.push(ele);
      break;
    case 3:
      realAudio.push(ele);
      break;
    case 4:
      realDocument.push(ele);
      break;
  }
});
for (let i = 0; i < parseInt(Math.random() * 100); i++) {
  realAudio.push({
    resName: "audio",
    resType: 3,
    resUrl: "http://localhost:8080/audios/audio.mp3",
  });
}
console.log(
  realImage.length,
  realVideo.length,
  realAudio.length,
  realDocument.length
);

function generateFakeResourcesData() {
  function getRandomResource() {
    return trueRes[parseInt(Math.random() * trueRes.length)];
  }
  const trueRes = [
    {
      resName: "file",
      resType: 1,
      resUrl: "http://localhost:8080/images/Koala.jpg",
    },
    {
      resName: "image",
      resType: 1,
      resUrl: "http://localhost:8080/images/Jellyfish.jpg",
    },
    {
      resName: "document",
      resType: 4,
      resUrl: "http://localhost:8080/document/document.pdf",
      imgList: [
        "http://localhost:8080/document/document-1.jpeg",
        "http://localhost:8080/document/document-2.jpeg",
      ],
    },
    {
      resName: "video",
      resType: 2,
      resUrl: "http://localhost:8080/video/test.mp4",
      thumbnail: "http://localhost:8080/video/test.jpeg",
    },
  ];
  var aResults = [];
  for (let i = 0; i < 100; i++) {
    var res = getRandomResource();
    let o = JSON.parse(JSON.stringify(res));
    o.resId = i;
    aResults.push(o);
  }
  return aResults;
}

function getProgramResources() {
  function getRandomResource() {
    return trueRes[parseInt(Math.random() * trueRes.length)];
  }
  const trueRes = [
    {
      id: 10,
      name: "节目1",
      pages: 10,
      thumbnail: "http://localhost:8080/images/Koala.jpg",
      bodyJson: {
        version: "1.0",
        description: "",
        container: {
          width: 1000,
          height: 700,
          bgm: {
            autoPlay: true,
            src: "audios/audio.mp3",
          },
        },
        change: {
          type: 3,
          loop: true,
          singlePagePlayTime: 20000,
        },
        pages: [
          {
            name: "页面3",
            id: "3",
            container: {
              backGround: {
                type: "color",
                value: "#EFEFEF",
              },
            },
            components: [
              {
                id: 2,
                name: "图片1",
                type: "ImageCmp",
                layoutConfig: {
                  zIndex: 1,
                  top: 200,
                  left: 200,
                  rotation: 3.141592653589793,
                  width: 200,
                  height: 200,
                  opacity: 1,
                },
                props: {
                  bgUrl: "images/Koala.jpg",
                },
                animation: [
                  {
                    type: "shaking",
                    duration: 100,
                    delay: 0,
                    times: 2,
                  },
                ],
                events: [
                  {
                    type: "nextPage",
                    value: "",
                  },
                ],
                children: [],
              },
            ],
          },
        ],
        dialogs: [],
      },
    },
    {
      id: 11,
      name: "节目2",
      pages: 10,
      thumbnail: "http://localhost:8080/images/Jellyfish.jpg",
      bodyJson: {
        version: "1.0",
        description: "",
        container: {
          width: 1000,
          height: 700,
          bgm: {
            autoPlay: true,
            src: "audios/audio.mp3",
          },
        },
        change: {
          type: 3,
          loop: true,
          singlePagePlayTime: 2000,
        },
        pages: [
          {
            name: "页面3",
            id: "3",
            container: {
              backGround: {
                type: "color",
                value: "#EFEFEF",
              },
            },
            components: [
              {
                id: 2,
                name: "图片1",
                type: "ImageCmp",
                layoutConfig: {
                  zIndex: 1,
                  top: 200,
                  left: 200,
                  rotation: 3.141592653589793,
                  width: 200,
                  height: 200,
                  opacity: 1,
                },
                props: {
                  bgUrl: "images/Jellyfish.jpg",
                },
                animation: [],
                events: [],
                children: [],
              },
            ],
          },
        ],
        dialogs: [],
      },
    },
  ];
  var aResults = [];
  for (let i = 0; i < 100; i++) {
    var res = getRandomResource();
    res.resId = i;
    aResults.push(res);
  }
  return aResults;
}

router.get("/testSchema", (req, res) => {
  let result = fs.readFileSync(
    path.resolve(__dirname, "./testData/schema.json"),
    "utf8"
  );
  res.send(result);
});
router.get("/label/get", (req, res) => {
  res.send({
    code: 200,
    success: true,
    msg: "操作成功",
    data: [
      [{ id: 1, name: "银行" }],
      [{ id: 2, name: "节假日" }],
    ],
  });
});
router.post("/program/get", (req, res) => {
  let result = fs.readFileSync(
    path.resolve(__dirname, `./testData/designer/${req.body.programId}.json`),
    "utf8"
  );
  res.send(
    createSuccessResult({
      programData: JSON.parse(result),
      id: req.body.programId,
    })
  );
});

router.post("/program/update", (req, res) => {
  const { id, programData } = req.body;
  fs.writeFileSync(
    path.resolve(__dirname, `./testData/designer/${id}.json`),
    programData
  );
  res.send(createSuccessResult({}));
});

router.post("/program/add", (req, res) => {
  res.send(createSuccessResult({ id: 1 }));
});

router.get("/template/get/id", (req, res) => {
  let result = fs.readFileSync(
    path.resolve(__dirname, "./testData/designer/schema.json"),
    "utf8"
  );
  res.send(createSuccessResult({ bodyJson: JSON.parse(result) }));
});

router.post("/res/upload", multipartMiddleware, (req, res) => {
  res.send(uploadSuccessResult(req.body));
});

router.get("/res/get", (req, res) => {
  let size = parseInt(req.query.size);
  let start = (parseInt(req.query.current) - 1) * size;
  let aResponse;
  let total;
  switch (req.query.resType) {
    case "1":
      aResponse = realImage.slice(start, start + size);
      total = realImage.length;
      break;
    case "2":
      aResponse = realVideo.slice(start, start + size);
      total = realVideo.length;
      break;
    case "3":
      aResponse = realAudio.slice(start, start + size);
      total = realAudio.length;
      break;
    case "4":
      aResponse = realDocument.slice(start, start + size);
      total = realDocument.length;
      break;
    default:
      aResponse = realResource.slice(start, start + size);
      total = realResource.length;
  }
  res.send({ resources: aResponse, size, total: total });
});

router.get("/program/list", (req, res) => {
  let size = parseInt(req.query.size);
  let start = (parseInt(req.query.current) - 1) * size;
  let aResponse;
  let total;
  aResponse = realProgramResource.slice(start, start + size);
  total = realProgramResource.length;
  res.send({ resources: aResponse, size, total: total });
});

router.get("/program/list", (req, res) => {
  let size = parseInt(req.query.size);
  let start = (parseInt(req.query.current) - 1) * size;
  let aResponse;
  let total;
  aResponse = realProgramResource.slice(start, start + size);
  total = realProgramResource.length;
  res.send({ resources: aResponse, size, total: total });
});

router.get("/weather/get", (req, res) => {
  let realtime = {
      now: {
        prev: "北京省",
        city: "北京市",
        wind_direction: "东北风",
        wind_power: "1级",
        quality: "轻度污染",
        temperature: "0",
        weather: "晴",
        humidity: "32%",
        time: "20:30",
        weather_code: "00",
      },
    },
    oneday = {
      hour: [
        {
          wind_direction: "东风",
          wind_power: "<3级",
          temperature: "1",
          weather: "晴",
          time: "18:00",
          weather_code: "00",
        },
        {
          wind_direction: "东风",
          wind_power: "<3级",
          temperature: "0",
          weather: "晴",
          time: "19:00",
          weather_code: "00",
        },
        {
          wind_direction: "东南风",
          wind_power: "<3级",
          temperature: "-2",
          weather: "晴",
          time: "20:00",
          weather_code: "00",
        },
        {
          wind_direction: "东风",
          wind_power: "<3级",
          temperature: "-2",
          weather: "晴",
          time: "21:00",
          weather_code: "00",
        },
        {
          wind_direction: "东风",
          wind_power: "<3级",
          temperature: "-2",
          weather: "晴",
          time: "22:00",
          weather_code: "00",
        },
        {
          wind_direction: "南风",
          wind_power: "<3级",
          temperature: "-2",
          weather: "晴",
          time: "23:00",
          weather_code: "00",
        },
        {
          wind_direction: "东风",
          wind_power: "<3级",
          temperature: "-3",
          weather: "晴",
          time: "00:00",
          weather_code: "00",
        },
        {
          wind_direction: "东风",
          wind_power: "<3级",
          temperature: "-3",
          weather: "晴",
          time: "01:00",
          weather_code: "00",
        },
        {
          wind_direction: "南风",
          wind_power: "<3级",
          temperature: "-3",
          weather: "晴",
          time: "02:00",
          weather_code: "00",
        },
        {
          wind_direction: "东风",
          wind_power: "<3级",
          temperature: "-5",
          weather: "晴",
          time: "03:00",
          weather_code: "00",
        },
        {
          wind_direction: "东风",
          wind_power: "<3级",
          temperature: "-5",
          weather: "晴",
          time: "04:00",
          weather_code: "00",
        },
        {
          wind_direction: "南风",
          wind_power: "<3级",
          temperature: "-5",
          weather: "晴",
          time: "05:00",
          weather_code: "00",
        },
        {
          wind_direction: "东南风",
          wind_power: "<3级",
          temperature: "-7",
          weather: "晴",
          time: "06:00",
          weather_code: "00",
        },
        {
          wind_direction: "东风",
          wind_power: "<3级",
          temperature: "-7",
          weather: "晴",
          time: "07:00",
          weather_code: "00",
        },
        {
          wind_direction: "南风",
          wind_power: "<3级",
          temperature: "-6",
          weather: "晴",
          time: "08:00",
          weather_code: "00",
        },
        {
          wind_direction: "东南风",
          wind_power: "<3级",
          temperature: "-5",
          weather: "多云",
          time: "09:00",
          weather_code: "01",
        },
        {
          wind_direction: "东南风",
          wind_power: "<3级",
          temperature: "-3",
          weather: "多云",
          time: "10:00",
          weather_code: "01",
        },
        {
          wind_direction: "西北风",
          wind_power: "<3级",
          temperature: "-2",
          weather: "多云",
          time: "11:00",
          weather_code: "01",
        },
        {
          wind_direction: "南风",
          wind_power: "<3级",
          temperature: "0",
          weather: "多云",
          time: "12:00",
          weather_code: "01",
        },
        {
          wind_direction: "南风",
          wind_power: "<3级",
          temperature: "1",
          weather: "多云",
          time: "13:00",
          weather_code: "01",
        },
        {
          wind_direction: "西北风",
          wind_power: "<3级",
          temperature: "2",
          weather: "多云",
          time: "14:00",
          weather_code: "01",
        },
        {
          wind_direction: "西北风",
          wind_power: "<3级",
          temperature: "2",
          weather: "多云",
          time: "15:00",
          weather_code: "01",
        },
        {
          wind_direction: "西北风",
          wind_power: "<3级",
          temperature: "1",
          weather: "多云",
          time: "16:00",
          weather_code: "01",
        },
        {
          wind_direction: "西北风",
          wind_power: "<3级",
          temperature: "0",
          weather: "多云",
          time: "17:00",
          weather_code: "01",
        },
        {
          wind_direction: "西北风",
          wind_power: "<3级",
          temperature: "-1",
          weather: "多云",
          time: "18:00",
          weather_code: "01",
        },
      ],
    },
    weekday = {
      day: [
        {
          date: "01-13",
          night_air_weather: "晴",
          week: "三",
          night_wind_direction: "南风",
          day_air_weather: "晴",
          night_air_temperature: "-7",
          day_weather_code: "00",
          night_weather_code: "00",
          day_wind_power: "<3级",
          day_air_temperature: "8",
          day_wind_direction: "东南风",
          night_wind_power: "<3级",
        },
        {
          date: "01-14",
          night_air_weather: "多云",
          week: "四",
          night_wind_direction: "北风",
          day_air_weather: "多云",
          night_air_temperature: "-7",
          day_weather_code: "01",
          night_weather_code: "01",
          day_wind_power: "<3级",
          day_air_temperature: "3",
          day_wind_direction: "西北风",
          night_wind_power: "<3级",
        },
        {
          date: "01-15",
          night_air_weather: "晴",
          week: "五",
          night_wind_direction: "北风",
          day_air_weather: "晴",
          night_air_temperature: "-8",
          day_weather_code: "00",
          night_weather_code: "00",
          day_wind_power: "3-4级",
          day_air_temperature: "4",
          day_wind_direction: "北风",
          night_wind_power: "<3级",
        },
        {
          date: "01-16",
          night_air_weather: "晴",
          week: "六",
          night_wind_direction: "西北风",
          day_air_weather: "晴",
          night_air_temperature: "-10",
          day_weather_code: "00",
          night_weather_code: "00",
          day_wind_power: "3-4级",
          day_air_temperature: "1",
          day_wind_direction: "西北风",
          night_wind_power: "<3级",
        },
        {
          date: "01-17",
          night_air_weather: "晴",
          week: "日",
          night_wind_direction: "西南风",
          day_air_weather: "晴",
          night_air_temperature: "-10",
          day_weather_code: "00",
          night_weather_code: "00",
          day_wind_power: "<3级",
          day_air_temperature: "4",
          day_wind_direction: "南风",
          night_wind_power: "<3级",
        },
        {
          date: "01-18",
          night_air_weather: "晴",
          week: "一",
          night_wind_direction: "北风",
          day_air_weather: "晴",
          night_air_temperature: "-8",
          day_weather_code: "00",
          night_weather_code: "00",
          day_wind_power: "<3级",
          day_air_temperature: "6",
          day_wind_direction: "东南风",
          night_wind_power: "<3级",
        },
        {
          date: "01-19",
          night_air_weather: "晴",
          week: "二",
          night_wind_direction: "西北风",
          day_air_weather: "晴",
          night_air_temperature: "-7",
          day_weather_code: "04",
          night_weather_code: "033",
          day_wind_power: "<3级",
          day_air_temperature: "5",
          day_wind_direction: "东风",
          night_wind_power: "<3级",
        },
      ],
    };
  switch (req.query.needday) {
    case "1":
      res.send(realtime);
      break;
    case "24":
      res.send(oneday);
      break;
    case "7":
      res.send(weekday);
      break;
    default:
      res.send(null);
  }
});

module.exports = router;
