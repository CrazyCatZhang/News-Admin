import React, {useEffect, useState} from 'react';
import './App.css'
import {Navigate, useRoutes} from "react-router-dom";
import routes from "./routes";
import {useAuth} from "./guard/AuthProvider";
import Login from "./pages/Login";
import Home from "./pages/SandBoxLayout/Home";
import UserList from "./pages/SandBoxLayout/UserManage";
import RoleList from "./pages/SandBoxLayout/RightManage/Role";
import RightList from "./pages/SandBoxLayout/RightManage/Right";
import NewsAdd from "./pages/SandBoxLayout/NewsManage/NewsAdd";
import NewsDraft from "./pages/SandBoxLayout/NewsManage/NewsDraft";
import NewsCategory from "./pages/SandBoxLayout/NewsManage/NewsCategory";
import Audit from "./pages/SandBoxLayout/AduitManage/Audit";
import AuditList from "./pages/SandBoxLayout/AduitManage/AuditList";
import Unpublished from "./pages/SandBoxLayout/PublishManage/Unpublished";
import Published from "./pages/SandBoxLayout/PublishManage/Published";
import Sunset from "./pages/SandBoxLayout/PublishManage/Sunset";
import axios from "axios";
import NewsSendBoxLayout from "./pages/SandBoxLayout";
import NoPermission from "./pages/SandBoxLayout/NoPermission";

function App(props) {

    const {user} = useAuth()

    const [BackRouteList, setBackRouteList] = useState([
        {
            path: '/login',
            element: <Login/>
        },
        {
            path: '/',
            element: <NewsSendBoxLayout/>
        }
    ])

    const LocalRouterMap = {
        "/home": <Home/>,
        "/user-manage/list": <UserList/>,
        "/right-manage/role/list": <RoleList/>,
        "/right-manage/right/list": <RightList/>,
        "/news-manage/add": <NewsAdd/>,
        "/news-manage/draft": <NewsDraft/>,
        "/news-manage/category": <NewsCategory/>,
        "/audit-manage/audit": <Audit/>,
        "/audit-manage/list": <AuditList/>,
        "/publish-manage/unpublished": <Unpublished/>,
        "/publish-manage/published": <Published/>,
        "/publish-manage/sunset": <Sunset/>
    }

    const checkRoute = (item) => {
        return LocalRouterMap[item.key] && item.pagepermisson
    }

    const checkUserPermission = (item) => {
        return user.role.rights.includes(item.key)
    }

    const setBackRoute = (item) => {
        if (user) {
            setBackRouteList([
                {
                    path: '/',
                    element: <NewsSendBoxLayout/>,
                    children: [
                        {
                            path: '/',
                            element: <Navigate to='/home'/>
                        },
                        ...item.map(item => {
                            if (checkRoute(item) && checkUserPermission(item)) {
                                return {
                                    path: item.key,
                                    element: LocalRouterMap[item.key]
                                }
                            }
                            return null
                        }).filter(item => item !== null),
                        {
                            path: '*',
                            element: <NoPermission/>
                        }
                    ]
                }
            ])
        }
    }

    useEffect(() => {
        console.log('useEffect')
        Promise.all([
            axios.get("http://localhost:5001/rights"),
            axios.get("http://localhost:5001/children"),
        ]).then(res => {
            setBackRoute([...res[0].data, ...res[1].data])
        })
    }, [user])

    const element = useRoutes(BackRouteList)

    return (
        <>
            {element}
        </>
    );
}

export default App;