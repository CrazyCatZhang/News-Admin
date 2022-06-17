import Login from "../pages/Login";
import NewsSendBoxLayout from "../pages/SandBoxLayout";

const routes = [
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/index',
        element: <NewsSendBoxLayout/>
    }
]

export default routes