const fs = require('fs')
const jwt = require('jsonwebtoken')
var express = require('express')
var app = express()
var body_parser = require('body-parser')
var multer = require('multer');
app.use(body_parser.json())

// 请求
app.all('*',function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('content-Type', 'application/json;charset=utf8')
  next()
})

// 登录
let login = '/admin/loginUser'
app.post(login, function(req, res){
  res.status(200)
  var admins = JSON.parse(fs.readFileSync('./data/admin.json', 'utf8'))
  var token;
  var response;
  var flag = false;
  admins.list.forEach((item, index) => {
    if (item.users_registry === req.body.users) {
      flag = true
      if (item.pwds_registry === req.body.pwds) {
        token = jwt.sign(req.body, 'syj', {expiresIn: 60 * 30})
        response = {
          "code": 1,
          "token": token,
          "msg": "SUCCESS"
        }
      }else {
        response = {
          "code": 2,
          "error": "error",
          "msg": "密码错误"
        }
      }
    }
  })
  if ( !flag ) {
    response = {
      "code": 3,
      "error": "error",
      "msg": "此用户不存在"
    }
  }
  res.end(JSON.stringify(response))
})

// 注册
let registry = '/admin/registryUser'
app.post(registry, function(req, res){
  res.status(200)
  admin = JSON.parse(fs.readFileSync('./data/admin.json', {encoding: 'utf8'}))
  admin.list.push(req.body);
  fs.writeFileSync('./data/admin.json', JSON.stringify(admin))
  var obj = {
    "code": 1,
    "msg": "SUCCESS"
  }
  res.end(JSON.stringify(obj))
})

// 公众页面菜单接口 public|grid|entry
let publics = '/admin/menu/:name'
app.all(publics, function (req, res) {
  var data = null
  switch (req.params.name) {
    case 'publics': data = fs.readFileSync('../src/static/mock/public.json', 'utf8')
    break
    case 'grid': data = fs.readFileSync('../src/static/mock/grid.json', 'utf8')
    break
    case 'entry': data = fs.readFileSync('../src/static/mock/entry.json', 'utf8')
    break
  }
  res.end(data)
})

// 参加活动
let addAct = '/admin/activity/add'

let addActCall = require('./api/activity.js')
app.post(addAct, addActCall)


// 获取活动信息
let active = '/admin/active'
app.get(active, function (req, res) {
  var con = fs.readFileSync('../../../vuex/project/server/data/activity.json', 'utf8')
  res.end(con)
})

// 请求地址信息
let addrRoot = '/admin/community/location/root'
const addr = require('./api/location.js')
app.get(addrRoot, addr)

// 文件上传
let upload = '/user/upload'
let storage = multer.diskStorage({
  destination: function(req,file,cb){
      cb(null,'./uploads');
  },
  filename: function (req,file,cb) {
      cb(null,file.fieldname+'-'+file.originalname);
  }
});
var uploader = multer({storage:storage})
app.post(upload, uploader.single('file'), function(req, res){
  res.end(JSON.stringify(1))
})

// 分页
let userList = require('./api/userList.js')
app.post('/admin/getUserList', userList)

// 删除分页
let deleted = require('./api/delete.js')
app.post('/admin/deleteResident', deleted)

// 添加备注
let remark = require('./api/remarks.js')
app.post('/admin/getRemarks', remark)

// 居民报名
let signUser = require('./api/signUser.js')
app.post('/admin/signUser', signUser)

//端口 
app.listen(3000,function(){
  console.log('ok!!')
})
