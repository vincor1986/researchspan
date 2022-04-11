import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import search from "./search";
import items from "./items";

export default combineReducers({
  alert,
  auth,
  search,
  items,
});
