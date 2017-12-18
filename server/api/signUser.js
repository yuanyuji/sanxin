var fs = require('fs')
var maxs
var url = '../../../../vuex/project/server/data/userList.json'
var maxs = 0
module.exports = function (req, res) {
  var msg = JSON.parse(fs.readFileSync(url, 'utf8'))
  msg.forEach((v, i) => {
    if(v.id > maxs){
      maxs = v.id
    }
  })
  var obj = {
    "id": maxs+1,
    "name": req.body.username,
    "age": 33,
    "send": "已通知",
    "tel": req.body.tel,
    "sex": "男",
    "info": req.body.info,
    "time": "2017-12-07"
  }
  msg.unshift(obj)
  if (!obj.name){
    res.end(JSON.stringify('ERROR')) 
  }else{
    if(!obj.tel){
      res.end(JSON.stringify('ERROR')) 
    }else{
      fs.writeFileSync(url, JSON.stringify(msg))
      res.end(JSON.stringify('SUCCESS'))       
    }
  }
  
   
}