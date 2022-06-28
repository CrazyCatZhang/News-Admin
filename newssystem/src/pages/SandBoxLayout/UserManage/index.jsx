import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {Button, Switch, Table, Modal} from "antd";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import UserForm from "../../../components/UserForm";
import {useAuth} from "../../../guard/AuthProvider";

const {confirm} = Modal

function UserList(props) {
    const [dataSource, setDataSource] = useState([])
    const [isAddVisible, setIsAddVisible] = useState(false)
    const [roleList, setRoleList] = useState([])
    const [regionList, setRegionList] = useState([])
    const [isUpdateVisible, setIsUpdateVisible] = useState(false)
    const [isUpdateDisabled, setIsUpdateDisabled] = useState(false)
    const [current, setCurrent] = useState(null)

    const {user: {username, roleId, region}} = useAuth()

    const addForm = useRef()
    const updateForm = useRef()

    useEffect(() => {
        axios.get("/users?_expand=role").then(res => {
            const list = res.data
            setDataSource(roleId === 1 ? list : [
                ...list.filter(item => item.username === username),
                ...list.filter(item => item.region === region && item.roleId === 3)
            ])
        })
        axios.get("/regions").then(res => {
            const list = res.data
            setRegionList(list)
        })
        axios.get("/roles").then(res => {
            const list = res.data
            setRoleList(list)
        })
    }, [roleId, region, username])

    const columns = [
        {
            title: '区域',
            dataIndex: 'region',
            filters: [
                ...regionList.map(item => ({
                    text: item.title,
                    value: item.value
                })),
                {
                    text: "全球",
                    value: "全球"
                }

            ],
            onFilter: (value, item) => {
                if (value === "全球") {
                    return item.region === ""
                }
                return item.region === value
            },
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
                return <Switch checked={roleState} disabled={item.default} onChange={() => handleChange(item)}></Switch>
            }
        },
        {
            title: "操作",
            render: (item) => {
                return <div>
                    <Button danger shape="circle" icon={<DeleteOutlined/>} onClick={() => confirmMethod(item)}
                            disabled={item.default}/>

                    <Button type="primary" shape="circle" icon={<EditOutlined/>} disabled={item.default}
                            onClick={() => handleUpdate(item)}/>
                </div>
            }
        }];

    const handleUpdate = async (item) => {
        await setIsUpdateVisible(true)
        if (item.roleId === 1) {
            setIsUpdateDisabled(true)
        } else {
            setIsUpdateDisabled(false)
        }
        updateForm.current.setFieldsValue(item)
        setCurrent(item)
    }

    const handleChange = (item) => {
        item.roleState = !item.roleState
        setDataSource([...dataSource])
        axios.patch(`/users/${item.id}`, {
            roleState: item.roleState
        })
    }

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
        setDataSource(dataSource.filter(data => data.id !== item.id))
        axios.delete(`/users/${item.id}`)
    }

    const addFormOK = () => {
        addForm.current.validateFields().then(value => {
            setIsAddVisible(false)
            addForm.current.resetFields()
            const defaultValue = value.roleId === 1
            const data = {...value, "roleState": true, "default": defaultValue}

            axios.post('/users', data).then((res) => {
                setDataSource([...dataSource, {
                    ...res.data,
                    role: roleList.filter(item => item.id === res.data.roleId)[0]
                }])
            })
        }).catch(err => {
            console.log(err)
        })
    }

    const updateFormOK = () => {
        updateForm.current.validateFields().then((value) => {
            setIsUpdateVisible(false)
            setDataSource(dataSource.map(item => {
                if (item.id === current.id) {
                    return {
                        ...item,
                        ...value,
                        role: roleList.filter(data => data.id === value.roleId)[0]
                    }
                }
                return item
            }))
            axios.patch(`/users/${current.id}`, value)
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
            <Modal
                visible={isUpdateVisible}
                title="更新用户"
                okText="更新"
                cancelText="取消"
                onCancel={() => {
                    setIsUpdateVisible(false)
                }}
                onOk={() => {
                    updateFormOK()
                }}
            >
                <UserForm regionList={regionList} roleList={roleList} ref={updateForm}
                          isUpdateDisabled={isUpdateDisabled} isUpdate={true}/>
            </Modal>
        </div>
    )
}

export default UserList;