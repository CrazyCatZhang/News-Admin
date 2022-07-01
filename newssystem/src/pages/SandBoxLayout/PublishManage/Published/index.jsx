import React from 'react';
import usePublish from "../../../../components/usePublish";
import NewsPublish from "../../../../components/NewsPublish";
import {Button} from "antd";

function Published(props) {
    const {dataSource, handleSunset} = usePublish(2)

    return (
        <div>
            <NewsPublish dataSource={dataSource}
                         button={(id) => <Button danger onClick={() => handleSunset(id)}>下线</Button>}/>
        </div>
    );
}

export default Published;