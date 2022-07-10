import {configureStore} from "@reduxjs/toolkit";
import CollapsedReducer from "./reducers/CollapsedReducer";
import LoadingReducer from "./reducers/LoadingReducer";

export default configureStore({
    reducer: {
        collapsed: CollapsedReducer,
        loading: LoadingReducer
    }
})