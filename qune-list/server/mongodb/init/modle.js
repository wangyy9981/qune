var mongoose = require('mongoose')
var Schema = mongoose.Schema

//创建Schema对象（约束）
// 用户
var airportSchema = new Schema({
    starTime: String,
    starAddress: String,
    endTime: String,
    endAddress: String,
    planeInfo: String, //飞机信息
    price: Number,
    duration: String, //飞行时间
    discount: String, //折扣
    relay: String, //中转信息
})

//将stuSchema映射到一个MongoDB collection并定义这个文档的构成，创建表
var airportModle = mongoose.model('airportList', airportSchema)

const modleList = {
    airportModle,
}
export default modleList
