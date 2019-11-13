const api = require('./api');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();


// 请求体解析格式 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// 请求体解析格式 application/json
app.use(bodyParser.json());

// 后端api路由

// 获取项目列表数据
app.use('/api/getValue', api);


// 监听端口
app.listen(3001);

console.log('success listen at port:3001......');