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

const getSuccessResult = data => {
  return {
    "code":0,
    "data":{
      "errorCode": 0,
      "errorMessage":"",
      ...data,
      "category": [
        {
          "resources": {
            "fileId": 1,
            "fileUrl": "http://localhost:8080/images/Koala.jpg",
            "fileName": "Koala",
            "fileSize": "0"
          }
        }
      ],
    },
    "msg": "",
    "success":true
  }
}

router.get('/testSchema', (req, res) => {
  let result = fs.readFileSync(path.resolve(__dirname, "../testData/schema.json"), 'utf8');
  res.send(result)
});
router.get('/program/get/id', (req, res) => {
  let result = fs.readFileSync(path.resolve(__dirname, "../testData/designer/schema.json"), 'utf8');
  res.send(createSuccessResult({programData: JSON.parse(result)}))
});

router.get('/template/get/id', (req, res) => {
  let result = fs.readFileSync(path.resolve(__dirname, "../testData/designer/schema.json"), 'utf8');
  res.send(createSuccessResult({bodyJson: JSON.parse(result)}));
});

router.post('/res/upload', multipartMiddleware, (req, res) => {
  res.send(uploadSuccessResult(req.body))
})

router.get('/res/get', (req, res) => {
  res.send(getSuccessResult(req.query));
})

module.exports = router;
