const fs = require("fs");
const path = require("path");
const express = require('express');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

const router = express.Router();

const createSuccessResult = data => {
  return {
    "code": 200,
    "data": {
      "errorCode": 0,
      "errorMessage": "",
      ...data,
    },
    "msg": "",
    "success": true
  };
};

const createFaildResult = data => {
  return {
    "code": 500,
    "data": {
      "errorCode": 0,
      "errorMessage": "出错了",
      ...data,
    },
    "msg": "",
    "success": false
  };
};

const uploadSuccessResult = data => {
  return {
    "code": 0,
    "data": {
      "errorCode": 0,
      "errorMessage": "",
      "fileId": 0,
      ...data
    },
    "msg": "",
    "success": true
  };
};

const realResource = generateFakeResourcesData();
const realProgramResource = getProgramResources();
const realImage = [];
const realVideo = [];
const realAudio = [];
const realDocument = [];
realResource.forEach(ele => {
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
console.log(realImage.length, realVideo.length, realAudio.length, realDocument.length);

function generateFakeResourcesData() {
  function getRandomResource() {
    return trueRes[parseInt(Math.random() * trueRes.length)];
  }
  const trueRes = [
    { resName: "file", resType: 1, resUrl: "http://localhost:8080/images/Koala.jpg" },
    { resName: "image", resType: 1, resUrl: "http://localhost:8080/images/Jellyfish.jpg" },
    { resName: "audio", resType: 3, resUrl: "http://localhost:8080/audios/audio.mp3" },
    {resName:"document",resType:4,resUrl:"http://localhost:8080/document/document.pdf"},
    {resName:"video",resType:2,resUrl:"http://localhost:8080/video/test.mp4"}
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
      "id" :10,
      "name":"节目1",
      "pages" : 10,
      "thumbnail":"http://localhost:8080/images/Koala.jpg",
      "bodyJson": {
        "version": "1.0",
        "description": "",
        "container": {
          "width": 1000,
          "height": 700,
          "bgm": {
            "autoPlay": true,
            "src": "audios/audio.mp3"
          }
        },
        "change": {
          "type": 3,
          "loop": true,
          "singlePagePlayTime": 20000
        },
        "pages": [
          {
            "name": "页面3",
            "id": "3",
            "container": {
              "backGround": {
                "type": "color",
                "value": "#EFEFEF"
              }
            },
            "components": [
              {
                "id": 2,
                "name": "图片1",
                "type": "ImageCmp",
                "layoutConfig": {
                  "zIndex": 1,
                  "top": 200,
                  "left": 200,
                  "rotation": 3.141592653589793,
                  "width": 200,
                  "height": 200,
                  "opacity": 1
                },
                "props": {
                  "bgUrl": "images/Koala.jpg"
                },
                "animation": [
                  {
                    "type": "shaking",
                    "duration": 100,
                    "delay": 0,
                    "times": 2
                  }
                ],
                "events": [
                  {
                    "type": "nextPage",
                    "value": ""
                  }
                ],
                "children": []
              }
            ]
          }
        ],
        "dialogs": []
      },
    },
    {
      "id" : 11,
      "name":"节目2",
      "pages" : 10,
      "thumbnail":"http://localhost:8080/images/Jellyfish.jpg",
      "bodyJson": {
        "version": "1.0",
        "description": "",
        "container": {
          "width": 1000,
          "height": 700,
          "bgm": {
            "autoPlay": true,
            "src": "audios/audio.mp3"
          }
        },
        "change": {
          "type": 3,
          "loop": true,
          "singlePagePlayTime": 2000
        },
        "pages": [
          {
            "name": "页面3",
            "id": "3",
            "container": {
              "backGround": {
                "type": "color",
                "value": "#EFEFEF"
              }
            },
            "components": [
              {
                "id": 2,
                "name": "图片1",
                "type": "ImageCmp",
                "layoutConfig": {
                  "zIndex": 1,
                  "top": 200,
                  "left": 200,
                  "rotation": 3.141592653589793,
                  "width": 200,
                  "height": 200,
                  "opacity": 1
                },
                "props": {
                  "bgUrl": "images/Jellyfish.jpg"
                },
                "animation": [],
                "events": [],
                "children": []
              }
            ]
          }
        ],
        "dialogs": []
      },
    }
  ];
  var aResults = [];
  for (let i = 0; i < 100; i++) {
    var res = getRandomResource();
    res.resId = i;
    aResults.push(res);
  }
  return aResults;
}

router.get('/testSchema', (req, res) => {
  let result = fs.readFileSync(path.resolve(__dirname, "./testData/schema.json"), 'utf8');
  res.send(result)
});
router.get('/program/get/id', (req, res) => {
  let result = fs.readFileSync(path.resolve(__dirname, `./testData/designer/${req.query.programId}.json`), 'utf8');
  res.send(createSuccessResult({ programData: JSON.parse(result) }))
});

router.post('/program/update', (req, res) => {
  const {id, programData} = req.body;
  fs.writeFileSync(path.resolve(__dirname, `./testData/designer/${id}.json`), JSON.stringify(programData, null, 4));
  res.send(createSuccessResult({}))
});

router.post('/program/add', (req, res) => {
  res.send(createSuccessResult({ id: 1 }))
});

router.get('/template/get/id', (req, res) => {
  let result = fs.readFileSync(path.resolve(__dirname, "./testData/designer/schema.json"), 'utf8');
  res.send(createSuccessResult({ bodyJson: JSON.parse(result) }));
});

router.post('/res/upload', multipartMiddleware, (req, res) => {
  res.send(uploadSuccessResult(req.body))
})

router.get('/res/get', (req, res) => {
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
      aResponse = realVideo.slice(start, start + size);;
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
})

router.get('/program/list', (req, res) => {
  let size = parseInt(req.query.size);
  let start = (parseInt(req.query.current) - 1) * size;
  let aResponse;
  let total;
  aResponse = realProgramResource.slice(start, start + size);
  total = realProgramResource.length;
  res.send({ resources: aResponse, size, total: total });
})

module.exports = router;
