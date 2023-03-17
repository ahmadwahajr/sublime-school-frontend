import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userGetReducer
} from "./redux/reducers/user-reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const reducer = combineReducers({
  loggedInUser: userLoginReducer,
  userData: userGetReducer
});
const persistConfig = {
  key: "root",
  storage
};
const persistedReducer = persistReducer(persistConfig, reducer);
const middleware = [thunk];

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
export const persistor = persistStore(store);
export default store;
