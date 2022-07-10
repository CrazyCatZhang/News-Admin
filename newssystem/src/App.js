import React from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import NewsSendBoxLayout from "./pages/SandBoxLayout";
import {Provider} from "react-redux";
import {store, persistor} from "./redux/store";
import {PersistGate} from 'redux-persist/integration/react'


import './App.css'
import './utils/http'

function App(props) {
    console.log(store)
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/*" element={<NewsSendBoxLayout/>}/>
                </Routes>
            </PersistGate>
        </Provider>
    );
}

export default App;