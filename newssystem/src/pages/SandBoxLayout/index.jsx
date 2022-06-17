import React from 'react';
import {useAuth} from "../../guard/AuthProvider";
import {Navigate} from "react-router-dom";

function NewsSendBoxLayout(props) {
    const {user} = useAuth()

    if (!user) {
        return <Navigate to='/login'/>
    }

    return (
        <div>
            NewsSendBox
        </div>
    );
}

export default NewsSendBoxLayout;