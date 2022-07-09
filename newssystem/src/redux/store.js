import {configureStore} from "@reduxjs/toolkit";
import CollapsedReducer from "./reducers/CollapsedReducer";

export default configureStore({
    reducer: {
        collapsed: CollapsedReducer
    }
})