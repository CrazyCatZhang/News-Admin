import React from 'react';
import {Header} from "antd/es/layout/layout";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {Avatar, Dropdown, Menu} from "antd";
import {useAuth} from "../../guard/AuthProvider";
import {useDispatch, useSelector} from "react-redux";
import {changeCollapsed} from "../../redux/reducers/CollapsedReducer";

function TopHeader(props) {

    const dispatch = useDispatch()
    const {isCollapsed} = useSelector(state => state.collapsed)

    const {user: {role: {roleName}, username}, logout} = useAuth()

    const handleChangeCollapsed = () => {
        dispatch(changeCollapsed())
    }

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

    return (
        <Header
            className="site-layout-background"
            style={{
                padding: '0 16px',
            }}
        >
            {React.createElement(isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: handleChangeCollapsed,
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

export default TopHeader