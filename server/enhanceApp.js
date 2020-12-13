/*
 * @Author: LyuDongzhou
 * @Date: 2020-12-13 01:56:42
 * @LastEditTime: 2020-12-13 17:54:51
 * @Description: file content
 */
const api = require('./api');
// const express = require("express");
// const bodyParser = require("body-parser");
module.exports = app => {
  app.use('/api', api);
  // app.use(bodyParser.json({limit:"1mb"}));
  // app.use(bodyParser.urlencoded({
  //   extended:true
  // }));
}
