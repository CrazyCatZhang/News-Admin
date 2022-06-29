import React, {useEffect, useRef, useState} from 'react';
import {Button, PageHeader, Steps, message, Form, Input, Select, notification} from "antd";
import axios from "axios";

import './index.css'

import NewsEditor from "../../../../components/NewsEditor";
import {useAuth} from "../../../../guard/AuthProvider";
import {useNavigate, useParams} from "react-router-dom";

const {Step} = Steps;
const {Option} = Select;

function NewsUpdate(props) {

    const [current, setCurrent] = useState(0);
    const [category, setCategory] = useState([])
    const [formInfo, setFormInfo] = useState({})
    const [content, setContent] = useState("")

    const NewsRef = useRef()
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        axios.get('/categories').then(res => {
            setCategory(res.data)
        })
    }, [])

    useEffect(() => {
        axios.get(`/news/${id}?_expand=category&_expand=role`).then(res => {
            let {title, categoryId, content} = res.data
            NewsRef.current.setFieldsValue({
                title,
                categoryId
            })
            setContent(content)
        })
    }, [id])

    const next = () => {
        if (current === 0) {
            NewsRef.current.validateFields().then(res => {
                console.log(res)
                setFormInfo(res)
                setCurrent(current + 1);
            }).catch(err => {
                console.log(err)
            })
        } else {
            const pattern = /<p>(&nbsp;)*<\/p>/
            if (content === '' || pattern.test(content) || content === '<p><br></p>') {
                message.error('新闻内容不能为空')
            } else {
                setCurrent(current + 1);
            }
        }
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const onChange = () => {

    }

    const onSearch = () => {

    }

    const handleSave = (auditState) => {
        axios.patch(`/news/${id}`, {
            ...formInfo,
            "content": content,
            "auditState": auditState,
        }).then(res => {
            navigate(auditState === 0 ? '/news-manage/draft' : '/audit-manage/list')
            openNotification('bottomRight', auditState)
        })
    }

    const openNotification = (placement, auditState) => {
        notification.info({
            message: `通知`,
            description:
                `您可以到${auditState === 0 ? '草稿箱' : '审核列表'}中查看您的新闻`,
            placement,
        });
    };

    const steps = [
        {
            title: '基本信息',
            content: (
                <Form
                    name="basic"
                    autoComplete="on"
                    ref={NewsRef}
                >
                    <Form.Item
                        label="新闻标题"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="新闻分类"
                        name="categoryId"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                        >
                            {
                                category.map(item => <Option key={item.id} value={item.id}>{item.title}</Option>)
                            }
                        </Select>
                    </Form.Item>

                </Form>
            ),
            description: '新闻标题，新闻分类'
        },
        {
            title: '新闻内容',
            content: <NewsEditor getContent={(value) => {
                setContent(value)
            }} content={content}/>,
            description: '新闻主题内容'
        },
        {
            title: '新闻提交',
            content: 'Last-content',
            description: '保存草稿或提交审核'
        },
    ];

    return (
        <>
            <PageHeader
                className="site-page-header"
                onBack={() => navigate(-1)}
                title="更新新闻"
            />
            <Steps current={current} onChange={current => {
            }}>
                {
                    steps.map(step => <Step key={step.title} title={step.title} description={step.description}/>)
                }
            </Steps>
            <div>
                <div className={current === 0 ? 'steps-content' : 'active'}>{steps[0].content}</div>
                <div className={current === 1 ? 'steps-content' : 'active'}>{steps[1].content}</div>
                <div className={current === 2 ? 'steps-content' : 'active'}>{steps[2].content}</div>
            </div>
            <div className="steps-action" style={{marginTop: "50px"}}>
                {current > 0 && (
                    <Button
                        style={{
                            margin: '0 8px',
                        }}
                        onClick={() => prev()}
                    >
                        上一步
                    </Button>
                )}
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        下一步
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <>
                        <Button type="primary" onClick={() => handleSave(0)}>保存草稿箱</Button>
                        <Button danger onClick={() => handleSave(1)}>提交审核</Button>
                    </>
                )}
            </div>
        </>

    );
}

export default NewsUpdate;