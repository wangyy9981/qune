import modleList from './modle'
//向student数据库中插入数据
function creatModal() {
    const { airportModle } = modleList
    airportModle.create(
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
        (err, docs) => {
            if (!err) {
                console.log('插入成功' + docs)
            }
        }
    )
}

export default creatModal
