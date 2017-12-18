var url = require('../../../../vuex/project/server/data/arrd.json')
module.exports = function (req, res) {
  res.end(JSON.stringify(url))
}