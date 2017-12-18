var fs = require('fs')
var url = '../../../../vuex/project/server/data/userList.json'

module.exports = function (req, res) {
  let {count, pageSize} = req.body
  var list = JSON.parse(fs.readFileSync(url, 'utf8'))
  var clist = list.slice(count * (pageSize - 1), count * pageSize)
  res.end(JSON.stringify(clist))
}
