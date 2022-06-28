import React from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import NewsSendBoxLayout from "./pages/SandBoxLayout";

import './App.css'
import './utils/http'

function App(props) {

    return (
        <>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/*" element={<NewsSendBoxLayout/>}/>
            </Routes>
        </>
    );
}

export default App;