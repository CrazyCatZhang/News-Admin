import React from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import NewsSendBoxLayout from "./pages/SandBoxLayout";
import {Provider} from "react-redux";
import store from "./redux/store";

import './App.css'
import './utils/http'

function App(props) {
    return (
        <Provider store={store}>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/*" element={<NewsSendBoxLayout/>}/>
            </Routes>
        </Provider>
    );
}

export default App;