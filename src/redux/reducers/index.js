import { combineReducers } from "redux";
import filters from "./filters";
import tasks from "./tasks"
const rootReducers = combineReducers({tasks, filters});

export default rootReducers;
