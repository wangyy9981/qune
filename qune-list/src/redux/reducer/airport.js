let init = {
    airportList: [],
}
export default function airportReducer(state = [], action) {
    // console.log(state, action)
    switch (action.type) {
        case 'INITAIRPORT':
            return action.payload
            break
        default:
            return state
    }
}
