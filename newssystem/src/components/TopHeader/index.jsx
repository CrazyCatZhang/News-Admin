import React, {useState} from 'react';
import {Header} from "antd/es/layout/layout";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {Avatar, Dropdown, Menu} from "antd";
import {useAuth} from "../../guard/AuthProvider";

function TopHeader(props) {

    const {user: {role: {roleName}, username}, logout} = useAuth()

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: roleName
                },
                {
                    key: '2',
                    danger: true,
                    label: 'Logout',
                    onClick: () => {
                        logout()
                    }
                },
            ]}
        />
    );
    const [collapsed, setCollapsed] = useState(false)

    return (
        <Header
            className="site-layout-background"
            style={{
                padding: '0 16px',
            }}
        >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
            })}
            <div style={{float: 'right'}}>
                <span>
                    欢迎
                    <span style={{color: '#1890ff'}}>
                    {username}
                    </span>
                    回来
                </span>
                <Dropdown overlay={menu}>
                    <Avatar src="https://joeschmoe.io/api/v1/random"/>
                </Dropdown>
            </div>
        </Header>
    );
}

export default TopHeader;