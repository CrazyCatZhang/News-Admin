import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Modal, Table} from "antd";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from "@ant-design/icons";

const {confirm} = Modal


function RoleList(props) {

    const [dataSource, setDataSource] = useState([])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '角色名称',
            dataIndex: 'roleName'
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

    const confirmMethod = (item) => {
        confirm({
            title: '你确定要删除?',
            icon: <ExclamationCircleOutlined/>,
            onOk() {
                deleteMethod(item)
            },
            onCancel() {
                //   console.log('Cancel');
            },
        });

    }
    //删除
    const deleteMethod = (item) => {
        // console.log(item)
        setDataSource(dataSource.filter(data => data.id !== item.id))
        axios.delete(`http://localhost:50001/roles/${item.id}`)
    }

    useEffect(() => {
        axios.get('http://localhost:5001/roles').then(res => {
            console.log(res.data)
            setDataSource(res.data)
        })
    }, [])

    return (
        <div>
            <Table dataSource={dataSource} columns={columns} rowKey={(item) => item.id}></Table>
        </div>
    );
}

export default RoleList;