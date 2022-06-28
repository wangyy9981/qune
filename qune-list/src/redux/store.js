import { createStore } from 'redux'
import airportReducer from './reducer'
let store = createStore(airportReducer) //传入reducer
export default store //导出仓库
// toolkit
