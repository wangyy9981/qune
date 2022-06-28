import { combineReducers } from 'redux'
import airportReducer from './airport'
const rootReducer = combineReducers({
    airportList: airportReducer,
})

export default rootReducer
