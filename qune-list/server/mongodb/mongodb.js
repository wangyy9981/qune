import creatModal from './init/init'
var mongoose = require('mongoose')

//连接数据库
module.exports = () => {
    mongoose.connect('mongodb://localhost:27017/airport', {
        useNewUrlParser: true,
    })

    //监听数据库连接状态
    mongoose.connection.once('open', () => {
        console.log('数据库连接成功……')
    })
    mongoose.connection.once('close', () => {
        console.log('数据库断开……')
    })

    // 创建表 如果创建完可以注释掉
    // creatModal()
}
