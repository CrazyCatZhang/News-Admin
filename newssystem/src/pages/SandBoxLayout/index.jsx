import React from 'react';
import {useAuth} from "../../guard/AuthProvider";
import {Navigate, Outlet} from "react-router-dom";
import SideMenu from "../../components/SideMenu";
import TopHeader from "../../components/TopHeader";

function NewsSendBoxLayout(props) {
    const {user} = useAuth()

    if (!user) {
        return <Navigate to='/login'/>
    }

    return (
        <div>
            <SideMenu/>
            <TopHeader/>
            <Outlet/>
        </div>
    );
}

export default NewsSendBoxLayout;