// eslint-disable-next-line no-unused-vars
import { legacy_createStore as createStore, combineReducers } from "redux";
import expenseTrackerReducer from "./features/expenseTracker";
// const rootReducers = combineReducers({
//   expenseTracker: expenseTrackerReducer,
// });

// const store = createStore(rootReducers);

const store = createStore(expenseTrackerReducer);
export default store;
