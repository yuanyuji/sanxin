var fs = require('fs')
var url = '../../../../vuex/project/server/data/activity.json'
var maxs
module.exports = function (req, res) {
  var act = JSON.parse(fs.readFileSync(url, 'utf8'))
  act.list.forEach((v, i) => {
    maxs = Math.max(v.categoryId)
  });
  req.body.categoryId = maxs + 1
  act.list.push(req.body)
  fs.writeFileSync(url, JSON.stringify(act))
  res.end(JSON.stringify('SUCCESS'))
}
