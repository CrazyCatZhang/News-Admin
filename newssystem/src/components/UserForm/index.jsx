import React, {forwardRef, useEffect, useState} from 'react';
import {Form, Input, Select} from "antd";
import {useAuth} from "../../guard/AuthProvider";

const {Option} = Select

const UserForm = forwardRef((props, ref) => {

    const {regionList, roleList, isUpdate, isUpdateDisabled} = props
    const [isDisabled, setIsDisabled] = useState(false)

    const {user: {roleId, region}} = useAuth()

    useEffect(() => {
        setIsDisabled(isUpdateDisabled)
    }, [isUpdateDisabled])

    const changeRegionDisabled = (value) => {
        if (isUpdate) {
            return roleId !== 1;
        } else {
            if (roleId === 1) {
                return false
            } else {
                return value !== region
            }
        }
    }

    const changeRoleDisabled = (item) => {
        if (isUpdate) {
            return roleId !== 1;
        } else {
            if (roleId === 1) {
                return false
            } else {
                return item.id !== 3
            }
        }
    }

    return (
        <Form
            ref={ref}
            layout="vertical"
        >
            <Form.Item
                name="username"
                label="用户名"
                rules={[{required: true, message: 'Please input the title of collection!'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="password"
                label="密码"
                rules={[{required: true, message: 'Please input the title of collection!'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="region"
                label="区域"
                rules={isDisabled ? [] : [{required: true, message: 'Please input the title of collection!'}]}
            >
                <Select disabled={isDisabled}>
                    {
                        regionList.map(item =>
                            <Option value={item.value} key={item.id}
                                    disabled={changeRegionDisabled(item.value)}>{item.title}</Option>
                        )
                    }
                </Select>
            </Form.Item>
            <Form.Item
                name="roleId"
                label="角色"
                rules={[{required: true, message: 'Please input the title of collection!'}]}
            >
                <Select onChange={(value) => {
                    if (value === 1) {
                        setIsDisabled(true)
                        ref.current.setFieldsValue({
                            region: ''
                        })
                    } else {
                        setIsDisabled(false)
                    }
                }}>
                    {
                        roleList.map(item =>
                            <Option value={item.id} key={item.id}
                                    disabled={changeRoleDisabled(item)}>{item.roleName}</Option>
                        )
                    }
                </Select>
            </Form.Item>
        </Form>
    );
})

export default UserForm;