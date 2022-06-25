import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Modal, Table, Tree} from "antd";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from "@ant-design/icons";

const {confirm} = Modal


function RoleList(props) {

    const [dataSource, setDataSource] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [rightList, setRightList] = useState([])
    const [currentRightList, setCurrentRightList] = useState([])
    const [currentID, setCurrentID] = useState(0)

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
                    <Button type="primary" shape="circle" icon={<EditOutlined/>} onClick={() => {
                        setIsModalVisible(true)
                        setCurrentRightList(item.rights)
                        setCurrentID(item.id)
                    }}/>
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
        axios.get('/roles').then(res => {
            setDataSource(res.data)
        })
        axios.get('/rights?_embed=children').then(res => {
            let results = res.data.map(item => {
                if (item.children?.length > 0) {
                    item.children.forEach(child => {
                        child.title = child.label
                    })
                }
                item.title = item.label
                return item
            })
            setRightList(results)
        })
    }, [])

    const handleOk = () => {
        setIsModalVisible(false)
        setDataSource(dataSource.map(item => {
            if (item.id === currentID) {
                return {
                    ...item,
                    rights: currentRightList
                }
            }
            return item
        }))
        axios.patch(`/roles/${currentID}`, {
            rights: currentRightList
        })
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const onCheck = (checkedKeys) => {
        setCurrentRightList(checkedKeys.checked)
    }

    return (
        <div>
            <Table dataSource={dataSource} columns={columns} rowKey={(item) => item.id}></Table>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Tree
                    checkable
                    treeData={rightList}
                    checkedKeys={currentRightList}
                    onCheck={onCheck}
                    checkStrictly={true}
                >
                </Tree>
            </Modal>
        </div>
    );
}

export default RoleList;