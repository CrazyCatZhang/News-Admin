import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Table, Tag, Modal} from "antd";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from "@ant-design/icons";

const {confirm} = Modal

function RightList(props) {
    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5001/rights?_embed=children").then(res => {
            let list = res.data
            list.forEach(item => {
                if (item.children?.length === 0) {
                    item.children = ''
                }
            })
            setDataSource(list)
        })
    }, [])

    const deleteMethod = async (item) => {
        if (item.grade === 1) {
            setDataSource(dataSource.filter(data => data.id !== item.id))
            await axios.delete(`http://localhost:5001/rights/${item.id}`)
        } else {
            let list = dataSource.filter(data => data.id === item.rightId)
            list[0].children = list[0].children.filter(data => data.id !== item.id)
            setDataSource([...dataSource])
            await axios.delete(`http://localhost:5001/children/${item.id}`)
        }

    }

    const confirmMethod = (item) => {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleOutlined/>,
            content: 'Some descriptions',
            onOk() {
                deleteMethod(item)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

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
            render: (item) => {
                return <div>
                    <Button danger shape="circle" icon={<DeleteOutlined/>} onClick={() => confirmMethod(item)}/>
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