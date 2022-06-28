import React, {useEffect} from 'react';
import {useAuth} from "../../guard/AuthProvider";
import {Navigate, Outlet} from "react-router-dom";
import SideMenu from "../../components/SideMenu";
import TopHeader from "../../components/TopHeader";
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";

import 'accessible-nprogress/dist/accessible-nprogress.min.css'
import './index.css'
import NewsRouter from "../../components/NewsRouter";

function NewsSendBoxLayout(props) {
    const {user} = useAuth()

    if (!user) {
        return <Navigate to='/login'/>
    }

    return (
        <Layout>
            <SideMenu/>
            <Layout className="site-layout">
                <TopHeader/>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        overflow: "auto",
                    }}
                >
                    <NewsRouter/>
                </Content>
            </Layout>
        </Layout>
    );
}

export default NewsSendBoxLayout;