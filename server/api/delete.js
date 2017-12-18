var fs = require('fs')
var url = '../../../../vuex/project/server/data/userList.json'
var urls = '../../../../vuex/project/server/data/admin.json'
const jwt = require('jsonwebtoken')
var msg
module.exports = function (req, res) {
  jwt.verify(req.body.token, 'syj', (eorr, decoded) => {
    if(eorr) {
      eorr.code = 1001 // 登录超时
      res.end(JSON.stringify(eorr))
    } else {
      var act = JSON.parse(fs.readFileSync(url, 'utf8'))
      var acts = JSON.parse(fs.readFileSync(urls, 'utf8')) 
      acts.list.forEach((v, i) => {
        if (v.users_registry === decoded.users) {
          if (v.authorization == 'admin') {
            act.forEach((vv, ii) => {
                if(vv.id === req.body.id) {
                  act.splice(ii, 1)
                }
            })
            msg = "SUCCESS"
            fs.writeFileSync(url, JSON.stringify(act))
          } else {
            msg = "ERROR"
          }
        }
      })
      res.end(JSON.stringify(msg))
    }
  })
}
