let fs = require('fs')
let url = '../../../../vuex/project/server/data/userList.json'
module.exports = function (req, res) {
    let acts = JSON.parse(fs.readFileSync(url, 'utf8'))
    acts.forEach((v, i) => {
        if(v.id === req.body.id) {
          v.info = req.body.val
        }
    })
    fs.writeFileSync(url, JSON.stringify(acts))
    res.end(JSON.stringify('SUCCESS'))
}
