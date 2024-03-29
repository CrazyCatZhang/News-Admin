import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Card, Col, List, PageHeader, Row} from "antd";
import _ from 'lodash'
import {Link} from "react-router-dom";

function News(props) {

    const [list, setList] = useState([])

    useEffect(() => {
        axios.get('/news?publishState=2&_expand=category').then(res => {
            setList(Object.entries(_.groupBy(res.data, item => item.category.title)))
        })
    }, [])

    return (
        <div style={{
            width: '95%',
            margin: '0 auto'
        }}>
            <PageHeader
                title="全球大新闻"
                subTitle="查看新闻"
            />
            <div className="site-card-wrapper" style={{
                marginTop: '30px'
            }}>
                <Row gutter={[16, 16]}>
                    {
                        list.map(item =>
                            <Col span={8} key={item[0]}>
                                <Card title={item[0]} bordered={true} hoverable={true}>
                                    <List
                                        size="small"
                                        dataSource={item[1]}
                                        pagination={{
                                            pageSize: 3
                                        }}
                                        renderItem={data => <List.Item>
                                            <Link to={`/detail/${data.id}`}>{data.title}</Link>
                                        </List.Item>}
                                    />
                                </Card>
                            </Col>
                        )
                    }
                </Row>
            </div>
        </div>
    );
}

export default News;