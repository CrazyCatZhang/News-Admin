import React, {useEffect} from 'react';
import './App.css'
import {Navigate, useRoutes} from "react-router-dom";
import routes from "./routes";
import {useAuth} from "./guard/AuthProvider";
import Login from "./pages/Login";

function App(props) {

    const {user} = useAuth()

    let elementRoutes = null

    if (user) {
        elementRoutes = routes[user.roleId - 1]
    } else {
        elementRoutes = [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/',
                element: <Navigate to="/login"/>
            },
        ]
    }

    const element = useRoutes(elementRoutes)

    return (
        <>
            {element}
        </>
    );
}

export default App;