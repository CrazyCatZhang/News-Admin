import React from 'react';
import NewsPublish from "../../../../components/NewsPublish";
import usePublish from "../../../../components/usePublish";
import {Button} from "antd";

function Unpublished(props) {

    const {dataSource, handlePublish} = usePublish(1)

    return (
        <div>
            <NewsPublish dataSource={dataSource}
                         button={(id) => <Button type="primary" onClick={() => handlePublish(id)}>发布</Button>}/>
        </div>
    );
}

export default Unpublished;