import { combineReducers } from "redux"
import auth from "./auth"
import house from "./house"

export default combineReducers({
    auth,
    house
})