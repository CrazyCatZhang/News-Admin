import React from 'react';
import Sider from "antd/es/layout/Sider";
import {Menu} from "antd";
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import './index.css'

function SideMenu(props) {

    const items = [
        {
            key: "/home",
            label: "首页",
            icon: <UserOutlined/>
        },
        {
            key: "/user-manage",
            label: "用户管理",
            icon: <UserOutlined/>,
            children: [
                {
                    key: "/user-manage/list",
                    label: "用户列表",
                    icon: <UserOutlined/>
                }
            ]
        },
        {
            key: "/right-manage",
            label: "权限管理",
            icon: <UserOutlined/>,
            children: [
                {
                    key: "/right-manage/role/list",
                    label: "角色列表",
                    icon: <UserOutlined/>
                },
                {
                    key: "/right-manage/right/list",
                    label: "权限列表",
                    icon: <UserOutlined/>
                }
            ]
        }
    ]

    return (
        <Sider trigger={null} collapsible collapsed={false}>
            <div className="logo">全球新闻发布管理系统</div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={items}
            />
        </Sider>
    );
}

export default SideMenu;