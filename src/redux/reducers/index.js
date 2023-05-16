import { combineReducers } from "redux"
import auth from "./auth"
import house from "./house"
import renthouse from "./renthouse"

export default combineReducers({
    auth,
    house,
    renthouse
})