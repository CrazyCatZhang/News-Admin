import {combineReducers, configureStore} from "@reduxjs/toolkit";
import CollapsedReducer from "./reducers/CollapsedReducer";
import LoadingReducer from "./reducers/LoadingReducer";
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const rootReducer = combineReducers({
    collapsed: CollapsedReducer,
    loading: LoadingReducer
})

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['loading']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    reducer: persistedReducer
})
const persistor = persistStore(store)

export {
    store,
    persistor
}