import { action, observable } from 'mobx'
class AirpotStoresMobx {
    @observable airportlist = []
    @action setAirportlist(value) {
        this.airportlist = value
        console.log(this.airportlist)
    }
}
export default AirpotStoresMobx
