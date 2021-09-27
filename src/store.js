import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'

const persistConfig = { // configuration object for redux-persist
  key: 'root',
  storage, // define which storage to use
}

const persistedReducer = persistReducer(persistConfig, rootReducer); // create a persisted reducer


const initialState = {};
// const middleware = [thunk,logger];
const middleware = [thunk];
const devTools =  window.__REDUX_DEVTOOLS_EXTENSION__
? window.__REDUX_DEVTOOLS_EXTENSION__()
: f => f

const configStore = createStore(
  persistedReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    devTools
  )
)
const  persistor = persistStore(configStore);
export {configStore, persistor}


