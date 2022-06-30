import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useAuth} from "../../../../guard/AuthProvider";
import {Link} from "react-router-dom";
import {Button, notification, Table, Tag} from "antd";

function Audit(props) {

    const [dataSource, setDataSource] = useState([])
    const {user: {username, roleId, region}} = useAuth()

    useEffect(() => {
        axios.get(`/news?auditState=1&_expand=category`).then(res => {
            const list = res.data
            setDataSource(roleId === 1 ? list : [
                ...list.filter(item => item.author === username),
                ...list.filter(item => item.region === region && item.roleId === 3)
            ])
        })
    }, [username, roleId, region])

    const columns = [
        {
            title: '新闻标题',
            dataIndex: 'title',
            render: (title, item) => {
                return <Link to={`/news-manage/preview/${item.id}`}>{title}</Link>
            }
        },
        {
            title: '作者',
            dataIndex: 'author'
        },
        {
            title: "新闻分类",
            dataIndex: 'category',
            render: (category) => {
                return <div>{category.title}</div>
            }
        },
        {
            title: "操作",
            render: (item) => {
                return <div>
                    <Button type="primary" onClick={() => handleAudit(item, 2, 1)}>通过</Button>
                    <Button danger onClick={() => handleAudit(item, 3, 0)}>驳回</Button>
                </div>
            }
        }
    ];

    const handleAudit = (item, auditState, publishState) => {
        setDataSource(dataSource.filter(data => data.id !== item.id))
        axios.patch(`/news/${item.id}`, {
            auditState,
            publishState
        }).then(res => {
            notification.info({
                message: `通知`,
                description:
                    `您可以到【审核管理/审核列表】中查看您的新闻审核状态`,
                placement: 'bottomRight',
            });
        })
    }

    return (
        <div>
            <Table columns={columns} dataSource={dataSource} pagination={{pageSize: 5}} rowKey={item => item.id}/>
        </div>
    );
}

export default Audit;