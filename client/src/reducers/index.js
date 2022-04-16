import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import search from "./search";
import items from "./items";
import ui from "./ui";
import users from "./users";
import collection from "./collection";

export default combineReducers({
  alert,
  auth,
  search,
  items,
  ui,
  users,
  collection,
});
