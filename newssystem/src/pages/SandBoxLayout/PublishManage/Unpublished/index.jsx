import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useAuth} from "../../../../guard/AuthProvider";
import NewsPublish from "../../../../components/NewsPublish";

function Unpublished(props) {

    const {user: {username}} = useAuth()

    const [dataSource,setDataSource] = useState([])

    useEffect(() => {
        axios.get(`/news?author=${username}&publishState=1&_expand=category`).then(res => {
            setDataSource(res.data)
        })
    }, [username])

    return (
        <div>
            <NewsPublish dataSource={dataSource}/>
        </div>
    );
}

export default Unpublished;