import React from 'react';
import './App.css'
import {useRoutes} from "react-router-dom";
import routes from "./routes";
import {AuthProvider} from "./guard/AuthProvider";

function App(props) {
    const element = useRoutes(routes)

    return (
        <AuthProvider>
            <div>
                {element}
            </div>
        </AuthProvider>
    );
}

export default App;