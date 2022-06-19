import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Table, Tag} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

function RightList(props) {
    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5001/rights?_embed=children").then(res => {
            let list = res.data
            list[0].children = null
            setDataSource(list)
        })
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '权限名称',
            dataIndex: 'label'
        },
        {
            title: "权限路径",
            dataIndex: 'key',
            render: (key) => {
                return <Tag color="geekblue">{key}</Tag>
            }
        },
        {
            title: "操作",
            render: () => {
                return <div>
                    <Button danger shape="circle" icon={<DeleteOutlined/>}/>
                    <Button type="primary" shape="circle" icon={<EditOutlined/>}/>
                </div>
            }
        }
    ]
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} pagination={{pageSize: 5}}/>
        </div>
    );
}

export default RightList;