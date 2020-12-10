const fs = require("fs");
const path = require("path");
const express = require('express');
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

module.exports = router;