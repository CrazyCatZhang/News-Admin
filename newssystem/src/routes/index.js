import Login from "../pages/Login";
import NewsSendBoxLayout from "../pages/SandBoxLayout";
import Home from "../pages/SandBoxLayout/Home";
import UserList from "../pages/SandBoxLayout/UserManage";
import RoleList from "../pages/SandBoxLayout/RightManage/Role";
import RightList from "../pages/SandBoxLayout/RightManage/Right";
import {Navigate} from "react-router-dom";
import NoPermission from "../pages/SandBoxLayout/NoPermission";

const routes = [
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/',
        element: <NewsSendBoxLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to='/home'/>
            },
            {
                path: 'home',
                element: <Home/>
            },
            {
                path: 'user-manage/list',
                element: <UserList/>
            },
            {
                path: 'right-manage',
                children: [
                    {
                        path: 'role/list',
                        element: <RoleList/>
                    },
                    {
                        path: 'right/list',
                        element: <RightList/>
                    }
                ]
            },
            {
                path: '*',
                element: <NoPermission/>
            }
        ]
    }
]

export default routes