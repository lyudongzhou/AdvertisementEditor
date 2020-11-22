const express = require('express');
const app = express();
const fs = require("fs");
const path = require("path");
app.all('/schema', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use(express.static(path.resolve(__dirname, "../testData")));
app.get('/schema', (req, res) => {
    let result = fs.readFileSync(path.resolve(__dirname, "../testData/schema.json"), 'utf8');
    res.json(result)
});
app.listen(8888, () => {
    console.log('Server is running at http://localhost:8888')
})