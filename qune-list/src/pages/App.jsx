import { useState, useEffect } from 'react'
import './App.scss'

function App() {
    const [tabIndex, setTabIndex] = useState(1)
    const [airportList, setAirportList] = useState([])
    // let timer = null
    // let scrollTop = 0

    const handleTab = (event) => {
        const tab = isNaN(parseInt(event.target.getAttribute('index')))
            ? event.target.parentNode.getAttribute('index')
            : event.target.getAttribute('index')
        setTabIndex(parseInt(tab))
    }

    useEffect(() => {
        fetch(`http://localhost:8080/api/airporList?listtype=${tabIndex}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data) //data是请求数据
                if (data.code === 200) {
                    console.log(data.data)
                    setAirportList(data.data)
                }
            })
            .catch((e) => {
                console.log(e) //e是异常信息
            })
    }, [tabIndex])

    // window.onscroll = function (event) {
    //     clearTimeout(timer)
    //     const footbar = document.getElementsByClassName('footer')[0]
    //     footbar.classList.contains('action')
    //         ? console.log('滚动')
    //         : footbar.classList.add('action')
    //     let newTop =
    //         document.documentElement.scrollTop || document.body.scrollTop
    //     console.log('newTop', newTop)
    //     newTop === scrollTop
    //         ? footbar.classList.remove('action')
    //         : (scrollTop = newTop)
    //     console.log(footbar.classList)
    // }

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
                <div className='time-list'>
                    <div className='time-content'>
                        <p className='time'>06-21</p>
                        <p className='week'>周二</p>
                        <p className='price'>￥550</p>
                    </div>
                    <div className='time-content'>
                        <p className='time'>06-22</p>
                        <p className='week'>周三</p>
                        <p className='price'>￥550</p>
                    </div>
                    <div className='time-content'>
                        <p className='time'>06-23</p>
                        <p className='week'>周四</p>
                        <p className='price'>￥550</p>
                    </div>
                    <div className='time-content'>
                        <p className='time'>06-24</p>
                        <p className='week'>周五</p>
                        <p className='price'>￥550</p>
                    </div>
                    <div className='time-content'>
                        <p className='time'>06-25</p>
                        <p className='week'>周六</p>
                        <p className='price'>￥550</p>
                    </div>
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
                            <li className='list-row item'>
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
                        className={`footter-row ${
                            tabIndex === 0 ? 'action' : null
                        }`}
                        index={0}
                    >
                        <i className='iconfont'>&#xe613;</i>
                        <p className='title'>筛选</p>
                    </li>
                    <li
                        className={`footter-row ${
                            tabIndex === 1 ? 'action' : null
                        }`}
                        index={1}
                    >
                        <i className='iconfont'>&#xe706;</i>
                        <p className='title'>推荐排序</p>
                    </li>
                    <li
                        className={`footter-row ${
                            tabIndex === 2 ? 'action' : null
                        }`}
                        index={2}
                    >
                        <i className='iconfont'>&#xe64d;</i>
                        <p className='title'>时间</p>
                    </li>
                    <li
                        className={`footter-row ${
                            tabIndex === 3 ? 'action' : null
                        }`}
                        index={3}
                    >
                        <i className='iconfont'>&#xe644;</i>
                        <p className='title'>价格</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default App
