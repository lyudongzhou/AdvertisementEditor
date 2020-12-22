/*
 * @Author: LyuDongzhou
 * @Date: 2020-12-19 01:22:04
 * @LastEditTime: 2020-12-19 01:30:49
 * @Description: file content
 */
const express = require('express')
const app = express()
const port = 3000
const serverRouter = require("../server/enhanceApp");
app.use(express.static('../dist/Designer'))
serverRouter(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));