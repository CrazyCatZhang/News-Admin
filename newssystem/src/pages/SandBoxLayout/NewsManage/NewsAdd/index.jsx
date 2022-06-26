import React, {useEffect, useRef, useState} from 'react';
import {Button, PageHeader, Steps, message, Form, Input, Select} from "antd";
import './index.css'
import axios from "axios";
import NewsEditor from "../../../../components/NewsEditor";

const {Step} = Steps;
const {Option} = Select;

function NewsAdd(props) {

    const [current, setCurrent] = useState(0);
    const [category, setCategory] = useState([])

    const NewsRef = useRef()

    useEffect(() => {
        axios.get('/categories').then(res => {
            setCategory(res.data)
        })
    }, [])

    const next = () => {
        if (current === 0) {
            NewsRef.current.validateFields().then(res => {
                console.log(res)
                setCurrent(current + 1);
            }).catch(err => {
                console.log(err)
            })
        } else {
            setCurrent(current + 1);
        }
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const onChange = () => {

    }

    const onSearch = () => {

    }

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
                        name="category"
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
                                category.map(item => <Option key={item.id} value={item.id}>{item.label}</Option>)
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
                console.log(value)
            }}/>,
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
                // onBack={() => null}
                title="撰写新闻"
                subTitle="This is a subtitle"
            />
            <Steps current={current} onChange={current => {
            }}>
                {
                    steps.map(step => <Step key={step.title} title={step.title} description={step.description}/>)
                }
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action" style={{marginTop: "50px"}}>
                {current > 0 && (
                    <Button
                        style={{
                            margin: '0 8px',
                        }}
                        onClick={() => prev()}
                    >
                        Previous
                    </Button>
                )}
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
            </div>
        </>

    );
}

export default NewsAdd;