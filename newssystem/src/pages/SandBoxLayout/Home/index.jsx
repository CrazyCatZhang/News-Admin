import React, {useEffect, useRef, useState} from 'react';
import {Avatar, Card, Col, Drawer, List, Row} from "antd";
import {EditOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import axios from "axios";
import {Link} from "react-router-dom";
import {useAuth} from "../../../guard/AuthProvider";
import * as echarts from 'echarts';
import _ from 'lodash'

function Home(props) {

    const [viewList, setViewList] = useState([])
    const [starList, setStarList] = useState([])
    const [visible, setVisible] = useState(false)
    const [personList, setPersonList] = useState([])
    const {user: {username, region, role: {roleName}}} = useAuth()
    const barRef = useRef()
    const pieRef = useRef()
    let myChart

    useEffect(() => {
        axios.get('/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6').then((res) => {
            setViewList(res.data)
        })
        axios.get('/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6').then((res) => {
            setStarList(res.data)
        })

        axios.get('/news?publishState=2&_expand=category').then(res => {
            setPersonList(res.data.filter(item => item.author === username))
            renderBarView(_.groupBy(res.data, item => item.category.title))
        })

        return () => {
            window.resize = null
        }
    }, [])

    const renderBarView = (obj) => {
        const myChart = echarts.init(barRef.current);
        // 绘制图表
        myChart.setOption({
            title: {
                text: '新闻分类图示'
            },
            tooltip: {},
            xAxis: {
                data: Object.keys(obj)
            },
            yAxis: {
                minInterval: 1
            },
            series: [
                {
                    name: '数量',
                    type: 'bar',
                    data: Object.values(obj).map(item => item.length)
                }
            ]
        });
        window.onresize = () => {
            myChart.resize()
        }
    }

    const renderPieView = (obj) => {
        const currentList = _.groupBy(obj, item => item.category.title)
        let list = []
        for (const currentListKey in currentList) {
            list.push({
                name: currentListKey,
                value: currentList[currentListKey].length
            })
        }
        if (myChart !== null && myChart !== "" && myChart !== undefined) {
            myChart.dispose();
        }
        myChart = echarts.init(pieRef.current);
        let option;

        option = {
            title: {
                text: `${username}用户新闻分类图示`,
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                left: 'center',
                top: 'bottom',
                data: Object.keys(currentList)
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            series: [
                {
                    name: '发布数量',
                    type: 'pie',
                    radius: [20, 140],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 5
                    },
                    data: list
                }
            ]
        };

        option && myChart.setOption(option);
    }

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
                            <SettingOutlined key="setting" onClick={async () => {
                                await setVisible(true)
                                renderPieView(personList)
                            }}/>,
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
            <Drawer width='600px' title="个人新闻分类" placement="right" onClose={() => {
                setVisible(false)
            }} visible={visible}>
                <div ref={pieRef} style={{
                    width: '550px',
                    height: '400px',
                    marginTop: '30px'
                }}></div>
            </Drawer>
            <div ref={barRef} style={{
                height: '400px',
                marginTop: '30px'
            }}></div>
        </div>
    );
}

export default Home;