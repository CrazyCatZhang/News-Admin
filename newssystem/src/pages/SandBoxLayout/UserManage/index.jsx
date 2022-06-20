import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {Button, Switch, Table, Modal} from "antd";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import UserForm from "../../../components/UserForm";

const {confirm} = Modal

function UserList(props) {
    const [dataSource, setDataSource] = useState([])
    const [isAddVisible, setIsAddVisible] = useState(false)
    const [roleList, setRoleList] = useState([])
    const [regionList, setRegionList] = useState([])

    const addForm = useRef()

    useEffect(() => {
        axios.get("http://localhost:5001/users?_expand=role").then(res => {
            const list = res.data
            console.log(list)
            setDataSource(list)
        })
        axios.get("http://localhost:5001/regions").then(res => {
            const list = res.data
            setRegionList(list)
        })
        axios.get("http://localhost:5001/roles").then(res => {
            const list = res.data
            setRoleList(list)
        })
    }, [])

    const columns = [
        {
            title: '区域',
            dataIndex: 'region',
            render: (region) => {
                return <b>{region === "" ? '全球' : region}</b>
            }
        },
        {
            title: '角色名称',
            dataIndex: 'role',
            render: (role) => {
                return role?.roleName
            }
        },
        {
            title: "用户名",
            dataIndex: 'username'
        },
        {
            title: "用户状态",
            dataIndex: 'roleState',
            render: (roleState, item) => {
                return <Switch checked={roleState} disabled={item.default}></Switch>
            }
        },
        {
            title: "操作",
            render: (item) => {
                return <div>
                    <Button danger shape="circle" icon={<DeleteOutlined/>} onClick={() => confirmMethod(item)}
                            disabled={item.default}/>

                    <Button type="primary" shape="circle" icon={<EditOutlined/>} disabled={item.default}/>
                </div>
            }
        }];

    const confirmMethod = (item) => {
        confirm({
            title: '你确定要删除?',
            icon: <ExclamationCircleOutlined/>,
            onOk() {
                deleteMethod(item)
            },
            onCancel() {
            },
        });

    }
    //删除
    const deleteMethod = (item) => {

    }

    const addFormOK = () => {
        addForm.current.validateFields().then(value => {
            setIsAddVisible(false)
            addForm.current.resetFields()
            const defaultValue = value.roleId === 1
            const data = {...value, "roleState": true, "default": defaultValue}

            axios.post('http://localhost:5001/users', data).then((res) => {
                setDataSource([...dataSource, {
                    ...res.data,
                    role: roleList.filter(item => item.id === res.data.roleId)[0]
                }])
            })
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <Button type="primary" onClick={() => {
                setIsAddVisible(true)
            }}>添加用户</Button>
            <Table dataSource={dataSource} columns={columns}
                   pagination={{
                       pageSize: 5
                   }}
                   rowKey={item => item.id}
            />
            <Modal
                visible={isAddVisible}
                title="添加用户"
                okText="确定"
                cancelText="取消"
                onCancel={() => {
                    setIsAddVisible(false)
                }}
                onOk={() => {
                    addFormOK()
                }}
            >
                <UserForm regionList={regionList} roleList={roleList} ref={addForm}/>
            </Modal>
        </div>
    )
}

export default UserList;