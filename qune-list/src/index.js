import React from 'react'
import ReactDOM from 'react-dom/client'
// 引入 redux
// import { Provider } from 'react-redux'
// import store from './redux/store'

// 引入 mobx
// import { Provider } from 'mobx-react'
// import Stores from './mobx/stores'

import './assets/js/rem.js'
import './index.css'
import './assets/iconfont/iconfont.css'
import App from './pages/App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    // redux
    // <Provider store={store}>
    //     <React.StrictMode>
    //         <App />
    //     </React.StrictMode>
    // </Provider>

    // mobx
    // <Provider {...Stores}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
    // </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
