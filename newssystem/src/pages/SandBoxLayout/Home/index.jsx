import React, {useEffect, useState} from 'react';
import {Avatar, Card, Col, List, Row} from "antd";
import {EditOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import axios from "axios";
import {Link} from "react-router-dom";
import {useAuth} from "../../../guard/AuthProvider";

function Home(props) {

    const [viewList, setViewList] = useState([])
    const [starList, setStarList] = useState([])
    const {user: {username, region, role: {roleName}}} = useAuth()

    useEffect(() => {
        axios.get('/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6').then((res) => {
            // console.log(res.data)
            setViewList(res.data)
        })
        axios.get('/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6').then((res) => {
            // console.log(res.data)
            setStarList(res.data)
        })
    }, [])

    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                <Col span={8}>
                    <Card title="用户最常浏览" bordered={true}>
                        <List
                            size="small"
                            dataSource={viewList}
                            renderItem={(item) => <List.Item>
                                <Link to={`/news-manage/preview/${item.id}`}>{item.title}</Link>
                            </List.Item>}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="用户点赞最多" bordered={true}>
                        <List
                            size="small"
                            dataSource={starList}
                            renderItem={(item) => <List.Item>
                                <Link to={`/news-manage/preview/${item.id}`}>{item.title}</Link>
                            </List.Item>}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                        actions={[
                            <SettingOutlined key="setting"/>,
                            <EditOutlined key="edit"/>,
                            <EllipsisOutlined key="ellipsis"/>,
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
                            title={username}
                            description={
                                <div>
                                    <b>{region === '' ? '全球' : region}</b>
                                    <span style={{
                                        paddingLeft: '20px'
                                    }}>{roleName}</span>
                                </div>
                            }
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Home;