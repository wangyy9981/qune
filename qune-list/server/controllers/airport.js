import modleList from '../mongodb/init/modle'
const { airportModle } = modleList

let resObj = {
    code: 200,
    status: 'success',
    message: '',
    data: {},
}

var priceSort = (arr) => {
    arr.sort((a, b) => {
        return a.type - b.type
    })
    return arr
}

var timeSort = (arr) => {
    arr.sort((a, b) => {
        var date = new Date()
        var t1 = a.starTime.split(':')
        var t2 = b.starTime.split(':')
        return date.setHours(t1[0], t1[1]) > date.setHours(t2[0], t2[1])
            ? 1
            : -1
    })
    return arr
}

var airportSort = (arr, type) => {
    console.log('type :', type)
    let directArr = [] //直飞数组
    let relayArr = [] //转机数组
    let newArr = []
    arr.forEach((element) => {
        element.relay === '' ? directArr.push(element) : relayArr.push(element)
    })
    switch (type) {
        case 1:
            newArr = [...priceSort(directArr), ...priceSort(relayArr)]
            break
        case 2:
            newArr = [...timeSort(directArr), ...timeSort(relayArr)]
            break
        case 3:
            newArr = [...priceSort(directArr), ...priceSort(relayArr)]
            break
        default:
            newArr = arr
    }
    return newArr
}

var fn_airporList = async (ctx, next) => {
    const reqbody = ctx.query
    const { listtype } = reqbody
    const airportList = await airportModle.find()
    const newAirlist = airportSort(airportList, parseInt(listtype))
    resObj.data = newAirlist
    ctx.response.body = resObj
}

module.exports = {
    'GET /api/airporList': fn_airporList,
}
