import React, {useEffect, useState} from 'react';
import {useAuth} from "../../../../guard/AuthProvider";
import axios from "axios";
import {Button, Table, Tag} from "antd";
import {Link} from "react-router-dom";

function AuditList(props) {

    const [dataSource, setDataSource] = useState([])

    const {user: {username}} = useAuth()

    useEffect(() => {
        axios.get(`/news?auth=${username}&auditState_ne=0&publishState_lte=1&_expand=category`).then(res => {
            setDataSource(res.data)
        })
    }, [username])

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
            title: "审核状态",
            dataIndex: 'auditState',
            render: (auditState) => {
                const colorList = ["", 'orange', 'green', 'red']
                const auditList = ["草稿箱", "审核中", "已通过", "未通过"]
                return <Tag color={colorList[auditState]}>{auditList[auditState]}</Tag>
            }
        },
        {
            title: "操作",
            render: (item) => {
                return <div>
                    {
                        item.auditState === 1 && <Button>撤销</Button>
                    }
                    {
                        item.auditState === 2 && <Button danger>发布</Button>
                    }
                    {
                        item.auditState === 3 && <Button type="primary">更新</Button>
                    }
                </div>
            }
        }
    ];

    return (
        <div>
            <Table columns={columns} dataSource={dataSource} pagination={{pageSize: 5}} rowKey={item => item.id}/>
        </div>
    );
}

export default AuditList;