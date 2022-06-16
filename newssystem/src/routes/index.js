import Login from "../pages/Login";
import NewsSendBox from "../pages/SandBox";
import {Navigate} from "react-router-dom";

const routes = [
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/',
        element: <NewsSendBox/>
    }
]

export default routes