const express = require('express')
const app = express()
var Mock = require('mockjs')
require('./mock')

app.get('/*', temp)
app.post('/*', temp)
app.delete('/*', temp)
app.put('/*', temp)

function temp(req, res) {
    console.log(req.path)
    console.log(req.method)
    let path = req.path + req.method.toLowerCase()
    if (typeof Mock._mocked[path] === 'undefined') {
        // 没有设置代理，请求原数据
        res.send('no')
    } else {
        let resTemplate = Mock._mocked[path].template
        let response = Mock.mock(resTemplate)
        res.send(response)
    }
}


app.listen(80, () => console.log('auto test app listening on port 80!'))