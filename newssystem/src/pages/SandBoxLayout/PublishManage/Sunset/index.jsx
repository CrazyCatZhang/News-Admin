import React from 'react';
import usePublish from "../../../../components/usePublish";
import NewsPublish from "../../../../components/NewsPublish";
import {Button} from "antd";

function SunSet(props) {
    const {dataSource, handleDelete} = usePublish(3)

    return (
        <div>
            <NewsPublish dataSource={dataSource}
                         button={(id) => <Button danger onClick={() => handleDelete(id)}>删除</Button>}/>
        </div>
    );
}

export default SunSet;