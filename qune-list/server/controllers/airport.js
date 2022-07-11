import modleList from '../mongodb/init/modle'
const { airportModle } = modleList

const airportList = [
    {
        starTime: '07:55',
        starAddress: '大兴',
        endTime: '07:55',
        endAddress: '太平T2',
        planeInfo: '东航MU5197 空客320(中)', //飞机信息
        price: 448,
        duration: '2时20分',
        discount: '经济舱2.7折',
        relay: '',
    },
    {
        starTime: '08:30',
        starAddress: '首都T3',
        endTime: '10:30',
        endAddress: '太平T2',
        planeInfo: '国航CA1643 空客321(中)', //飞机信息
        price: 500,
        duration: '2时',
        discount: '经济舱2.7折',
        relay: '',
    },
    {
        starTime: '12:45',
        starAddress: '首都T3',
        endTime: '14:40',
        endAddress: '太平T2',
        planeInfo: '国航CA1623 空客321(中)', //飞机信息
        price: 550,
        duration: '1时55分',
        discount: '经济舱3折',
        relay: '',
    },
    {
        starTime: '15:30',
        starAddress: '大兴',
        endTime: '17:45',
        endAddress: '太平T2',
        planeInfo: '南航CZ6218 空客321(中)', //飞机信息
        price: 750,
        duration: '2时12分',
        discount: '经济舱4.5折',
        relay: '',
    },
    {
        starTime: '6:40',
        starAddress: '大兴',
        endTime: '8:40',
        endAddress: '太平T2',
        planeInfo: '南航CZ6218 空客321(中)', //飞机信息
        price: 800,
        duration: '2时',
        discount: '经济舱4.5折',
        relay: '',
    },
    {
        starTime: '06:45',
        starAddress: '首都T2',
        endTime: '20:35',
        endAddress: '太平T2',
        planeInfo: '大新华CN7615 青岛航QW9794', //飞机信息
        price: 615,
        duration: '13时50分',
        discount: '经济舱2.2折',
        relay: '海拉尔',
    },
    {
        starTime: '6:50',
        starAddress: '大兴',
        endTime: '8:55',
        endAddress: '太平T2',
        planeInfo: '南航CZ6218 空客321(中)', //飞机信息
        price: 800,
        duration: '2时',
        discount: '经济舱4.5折',
        relay: '',
    },
    {
        starTime: '7:20',
        starAddress: '大兴',
        endTime: '9:20',
        endAddress: '太平T2',
        planeInfo: '国航CZ6218 空客321(中)', //飞机信息
        price: 800,
        duration: '2时',
        discount: '经济舱4.5折',
        relay: '',
    },
    {
        starTime: '07:00',
        starAddress: '大兴',
        endTime: '21:50',
        endAddress: '太平T2',
        planeInfo: '中联航KN5969 川航3U8126', //飞机信息
        price: 667,
        duration: '14时50分',
        discount: '经济舱3.3折',
        relay: '烟台',
    },
]

let resObj = {
    code: 200,
    status: 'success',
    message: '',
    data: {},
}

var priceSort = (arr) => {
    arr.sort((a, b) => {
        return a.price - b.price
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
            newArr = [
                ...timeSort(directArr).reverse(),
                ...timeSort(relayArr).reverse(),
            ]
            break
        case 4:
            newArr = [...priceSort(directArr), ...priceSort(relayArr)]
            break
        case 5:
            newArr = [
                ...priceSort(directArr).reverse(),
                ...priceSort(relayArr).reverse(),
            ]
            break
        default:
            newArr = arr
    }
    return newArr
}

var fn_airporList = async (ctx, next) => {
    const reqbody = ctx.query
    const { listtype } = reqbody
    // const airportList = await airportModle.find()
    const newAirlist = airportSort(airportList, parseInt(listtype))
    resObj.data = newAirlist
    ctx.response.body = resObj
}

var timeFormat = (time) => {
    return time > 9 ? time : '0' + time
}

var fn_timeList = async (ctx, next) => {
    const date = new Date()
    const month = timeFormat(date.getMonth() + 1)
    const dates = timeFormat(date.getDate())
    const day = date.getDay()
    const arr = [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
    ]
    const timelist = [
        {
            month: month,
            dates: dates,
            week: arr[day % 7],
        },
        {
            month: month,
            dates: dates + 1,
            week: arr[(day + 1) % 7],
        },
        {
            month: month,
            dates: dates + 2,
            week: arr[(day + 2) % 7],
        },
        {
            month: month,
            dates: dates + 3,
            week: arr[(day + 3) % 7],
        },
        {
            month: month,
            dates: dates + 4,
            week: arr[(day + 4) % 7],
        },
    ]
    resObj.data = timelist
    ctx.response.body = resObj
}

module.exports = {
    'GET /api/airporList': fn_airporList,
    'GET /api/getTimeList': fn_timeList,
}
