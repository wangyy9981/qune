import { useState, useEffect } from 'react'
import './App.scss'

function App() {
    const [tabIndex, setTabIndex] = useState(1)
    const [tabType, setTabType] = useState(1)
    const [timeIndex, setTimeIndex] = useState(1)
    const [timeList, setTimeList] = useState([])
    const [airportList, setAirportList] = useState([])
    const [isScroll, setIsScroll] = useState(false)
    let timeout = null

    const handleTab = (event) => {
        const tab = isNaN(parseInt(event.target.getAttribute('index')))
            ? parseInt(event.target.parentNode.getAttribute('index'))
            : parseInt(event.target.getAttribute('index'))

        if (tab === 2 && tabIndex === 2 && tabType === 3) {
            setTabIndex(2)
            setTabType(2)
        } else if (tabIndex === 4 && tabIndex === 4 && tabType === 5) {
            setTabIndex(4)
            setTabType(4)
        } else if (tab === 2 && tabIndex === 2) {
            setTabIndex(2)
            setTabType(3)
        } else if (tab === 4 && tabIndex === 4) {
            setTabIndex(4)
            setTabType(5)
        } else {
            setTabIndex(tab)
            setTabType(tab)
        }
    }

    const handleTimeAction = (event) => {
        const index = isNaN(parseInt(event.target.getAttribute('index')))
            ? parseInt(event.target.parentNode.getAttribute('index'))
            : parseInt(event.target.getAttribute('index'))
        setTimeIndex(index)
        setTabIndex(1)
        setTabType(1)
    }

    useEffect(() => {
        fetch(`http://localhost:8080/api/getTimeList`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                //data是请求数据
                if (data.code === 200) {
                    setTimeList(data.data)
                }
            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8080/api/airporList?listtype=${tabType}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                //data是请求数据
                if (data.code === 200) {
                    setAirportList(data.data)
                }
            })
            .catch((e) => {
                console.log(e) //e是异常信息
            })
    }, [tabType])

    function debounce() {
        //定义一个定时器
        const footbar = document.getElementsByClassName('footer')[0]
        footbar.classList.add('foot-action')
        if (timeout !== null) clearTimeout(timeout) //清除这个定时器
        timeout = setTimeout(function () {
            footbar.classList.remove('foot-action')
        }, 1000)
    }

    useEffect(() => {
        window.addEventListener('scroll', debounce)
    }, [])

    return (
        <div className='App'>
            <div className='navbar'>
                <div className='header'>
                    <i className='iconfont left'>&#xeb15;</i>
                    <span className='address'>
                        北京
                        <i className='iconfont address-i'>&#xe8ca;</i>
                        哈尔滨
                    </span>
                    <i className='iconfont search'>&#xe622;</i>
                </div>
                <div className='time-list' onClick={(e) => handleTimeAction(e)}>
                    {timeList.map((item, index) => {
                        return (
                            <div
                                className={`time-content ${
                                    timeIndex === index ? 'time-action' : null
                                }`}
                                index={index}
                            >
                                <p className='time'>
                                    {item.month}-{item.dates}
                                </p>
                                <p className='week'>{item.week}</p>
                                <p className='price'>￥550</p>
                            </div>
                        )
                    })}

                    {/* <div
                        className={`time-content ${
                            timeIndex === 1 ? 'time-action' : null
                        }`}
                        index={1}
                    >
                        <p className='time'>06-22</p>
                        <p className='week'>周三</p>
                        <p className='price'>￥550</p>
                    </div>
                    <div
                        className={`time-content ${
                            timeIndex === 2 ? 'time-action' : null
                        }`}
                        index={2}
                    >
                        <p className='time'>06-23</p>
                        <p className='week'>周四</p>
                        <p className='price'>￥550</p>
                    </div>
                    <div
                        className={`time-content ${
                            timeIndex === 3 ? 'time-action' : null
                        }`}
                        index={3}
                    >
                        <p className='time'>06-24</p>
                        <p className='week'>周五</p>
                        <p className='price'>￥550</p>
                    </div>
                    <div
                        className={`time-content ${
                            timeIndex === 4 ? 'time-action' : null
                        }`}
                        index={4}
                    >
                        <p className='time'>06-25</p>
                        <p className='week'>周六</p>
                        <p className='price'>￥550</p>
                    </div> */}
                    <div className='time-content time-last'>
                        <i className='iconfont time-more'>&#xe612;</i>
                        <p className='more'>更多日期</p>
                    </div>
                </div>
            </div>
            <div className='list-box'>
                <ul className='list-content'>
                    {airportList.map((item, idnex) => {
                        return (
                            <li className='list-row item' key={item._id}>
                                <div className='airpot-content'>
                                    <div className='time-content'>
                                        <div className='address-info'>
                                            <p className='time'>
                                                {item.starTime}
                                            </p>
                                            <p className='address'>
                                                {item.starAddress}
                                            </p>
                                        </div>
                                        <div className='from-info'>
                                            <span>{item.duration}</span>
                                            <div className='to'>
                                                <span
                                                    className='relay-icon'
                                                    style={{
                                                        display: `${
                                                            item.relay === ''
                                                                ? 'none'
                                                                : 'inline-block'
                                                        }`,
                                                    }}
                                                >
                                                    转
                                                </span>
                                            </div>
                                            <p className='relay'>
                                                {item.relay}
                                            </p>
                                        </div>
                                        <div className='address-info'>
                                            <p className='time'>
                                                {item.endTime}
                                            </p>
                                            <p className='address end'>
                                                {item.endAddress}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='price-content'>
                                        <p className='price'>￥{item.price}</p>
                                        <p className='more'>{item.discount}</p>
                                    </div>
                                </div>
                                <div className='company-info'>
                                    {item.planeInfo}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className='footer'>
                <ul
                    className='bottom-content'
                    onClick={(event) => handleTab(event)}
                >
                    <li
                        className={`footer-row ${
                            tabIndex === 0 ? 'foorter-action' : null
                        }`}
                    >
                        <div className='box' index={0}>
                            <i className='iconfont footer-icon'>&#xe613;</i>
                            <p className='title'>筛选</p>
                        </div>
                    </li>
                    <li
                        className={`footer-row ${
                            tabIndex === 1 ? 'foorter-action' : null
                        }`}
                    >
                        <div className='box' index={1}>
                            <i className='iconfont footer-icon'>&#xe706;</i>
                            <p className='title'>推荐排序</p>
                        </div>
                    </li>
                    <li
                        className={`footer-row ${
                            tabIndex === 2 ? 'foorter-action' : null
                        }`}
                    >
                        <div className='box' index={2}>
                            <i className='iconfont footer-icon'>&#xe64d;</i>
                            <p className='title'>
                                {tabIndex !== 2
                                    ? '时间'
                                    : tabType === 2
                                    ? '从早到晚'
                                    : '从晚到早'}
                            </p>
                        </div>
                    </li>
                    <li
                        className={`footer-row ${
                            tabIndex === 4 ? 'foorter-action' : null
                        }`}
                    >
                        <div className='box' index={4}>
                            <i className='iconfont footer-icon'>&#xe644;</i>
                            <p className='title'>
                                {tabIndex !== 4
                                    ? '价格'
                                    : tabType === 4
                                    ? '从低到高'
                                    : '从高到低'}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default App
