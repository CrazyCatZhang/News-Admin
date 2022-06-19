import React, {useEffect, useState} from 'react';
import Sider from "antd/es/layout/Sider";
import {Menu} from "antd";
import {
    UserOutlined,
} from '@ant-design/icons';
import './index.css'
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

function SideMenu(props) {

    const rootSubmenuKeys = ['/user-manage', '/right-manage', '/news-manage', '/audit-manage', '/publish-manage']
    const defaultSelectedKeys = [useLocation().pathname]
    const defaultOpenKeys = ["/" + useLocation().pathname.split('/')[1]]

    const [items, setItems] = useState([])
    const [openKeys, setOpenKeys] = useState(defaultOpenKeys)

    const navigate = useNavigate()

    const iconList = {
        "/home": <UserOutlined/>,
        "/user-manage": <UserOutlined/>,
        "/user-manage/list": <UserOutlined/>,
        "/right-manage": <UserOutlined/>,
        "/right-manage/role/list": <UserOutlined/>,
        "/right-manage/right/list": <UserOutlined/>
        //.......
    }


    function checkPagePermissions(items) {
        return items.map(item => {
            item.children = item.children.filter(arr => arr.pagepermisson === 1).map(arr => {
                return {key: arr.key, label: arr.label}
            })
            if (item.children.length > 0) {
                return {key: item.key, label: item.label, children: item.children, icon: iconList[item.key]}
            }
            return {key: item.key, label: item.label, icon: iconList[item.key]}
        })
    }

    function onOpenChange(keys) {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    }

    useEffect(() => {
        axios.get('http://localhost:5001/rights?_embed=children').then(res => {
            setItems(checkPagePermissions(res.data))
        })
    }, [])

    return (
        <Sider trigger={null} collapsible collapsed={false}>
            <div className="logo">全球新闻发布管理系统</div>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={defaultSelectedKeys}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                items={items}
                onClick={(e) => {
                    navigate(e.key)
                }}
            />
        </Sider>
    );
}

export default SideMenu;