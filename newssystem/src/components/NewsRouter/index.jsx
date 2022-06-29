import React, {useEffect, useState} from 'react';
import Home from "../../pages/SandBoxLayout/Home";
import UserList from "../../pages/SandBoxLayout/UserManage";
import RoleList from "../../pages/SandBoxLayout/RightManage/Role";
import RightList from "../../pages/SandBoxLayout/RightManage/Right";
import NewsAdd from "../../pages/SandBoxLayout/NewsManage/NewsAdd";
import NewsDraft from "../../pages/SandBoxLayout/NewsManage/NewsDraft";
import NewsCategory from "../../pages/SandBoxLayout/NewsManage/NewsCategory";
import Audit from "../../pages/SandBoxLayout/AduitManage/Audit";
import AuditList from "../../pages/SandBoxLayout/AduitManage/AuditList";
import Unpublished from "../../pages/SandBoxLayout/PublishManage/Unpublished";
import Published from "../../pages/SandBoxLayout/PublishManage/Published";
import Sunset from "../../pages/SandBoxLayout/PublishManage/Sunset";
import axios from "axios";
import {useAuth} from "../../guard/AuthProvider";
import {Navigate, Route, Routes} from "react-router-dom";
import NoPermission from "../../pages/SandBoxLayout/NoPermission";
import NewsPreview from "../../pages/SandBoxLayout/NewsManage/NewsPreview";
import NewsUpdate from "../../pages/SandBoxLayout/NewsManage/NewsUpdate";

const LocalRouterMap = {
    "/home": <Home/>,
    "/user-manage/list": <UserList/>,
    "/right-manage/role/list": <RoleList/>,
    "/right-manage/right/list": <RightList/>,
    "/news-manage/add": <NewsAdd/>,
    "/news-manage/draft": <NewsDraft/>,
    "/news-manage/category": <NewsCategory/>,
    "/news-manage/preview/:id": <NewsPreview/>,
    "/news-manage/update/:id": <NewsUpdate/>,
    "/audit-manage/audit": <Audit/>,
    "/audit-manage/list": <AuditList/>,
    "/publish-manage/unpublished": <Unpublished/>,
    "/publish-manage/published": <Published/>,
    "/publish-manage/sunset": <Sunset/>
}

function NewsRouter(props) {

    const [BackRouteList, setBackRouteList] = useState([])
    useEffect(() => {
        Promise.all([
            axios.get("/rights"),
            axios.get("/children"),
        ]).then(res => {
            setBackRouteList([...res[0].data, ...res[1].data])
        })
    }, [])

    const {user: {role: {rights}}} = useAuth()

    const checkRoute = (item) => {
        return LocalRouterMap[item.key] && (item.pagepermisson || item.routepermisson)
    }

    const checkUserPermission = (item) => {
        return rights.includes(item.key)
    }

    return (
        <Routes>
            {
                BackRouteList.map(item => {
                        if (checkRoute(item) && checkUserPermission(item)) {
                            return <Route path={item.key} key={item.key} element={LocalRouterMap[item.key]}/>
                        }
                        return null
                    }
                )
            }
            <Route path="/" element={<Navigate to='/home'/>}/>
            <Route path="*" element={<NoPermission/>}/>
        </Routes>
    );
}

export default NewsRouter;