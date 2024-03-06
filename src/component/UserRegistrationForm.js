import React, { useState } from 'react';
import {Form, Input, Button, Typography, Alert, Card} from 'antd';
import 'antd/dist/antd.css';
import Login from "../view/login";
import {useNavigate} from "react-router-dom";

const { Title } = Typography;

const UserRegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (values) => {
        if (password !== confirmPassword) {
            setErrorMessage('密码和确认密码不匹配');
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage('请输入有效的邮箱地址');
            return;
        }

        fetch('/api/register', {
        // fetch('/api/mainservice/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: values.username,
                password: values.password,
                email: values.email,
                address: values.address,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.ok){
                    console.log(data);
                    setUsername('');
                    setPassword('');
                    setConfirmPassword('');
                    setEmail('');
                    setAddress('');
                    setErrorMessage('');
                    // 弹窗显示后端返回的消息
                    alert(data.msg);
                    window.location.reload()
                }
                else {
                    alert(data.msg)
                }
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('注册失败，请重试');
            });

// 跳转到刚刚的/login页面
        navigate("/");


    }

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(sjtu\.edu\.cn|qq\.com|163\.com)$/;
        return emailRegex.test(email);
    };

    const handleFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ width: 400 }}>
                <Title level={2}>用户注册</Title>
                {errorMessage && <Alert type="error" message={errorMessage} />}
                <Form
                onFinish={handleSubmit}
                onFinishFailed={handleFinishFailed}
                layout="vertical"
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名',
                        },
                    ]}
                >
                    <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码',
                        },
                    ]}
                >
                    <Input.Password
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="确认密码"
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: '请确认密码',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('密码和确认密码不匹配');
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[
                        {
                            required: true,
                            type: 'email',
                            message: '请输入有效的邮箱地址',
                        },
                    ]}
                >
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="地址"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: '请输入地址',
                        },
                    ]}
                >
                    <Input value={address} onChange={(e) => setAddress(e.target.value)} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        注册
                    </Button>
                </Form.Item>
            </Form>
            </Card>
        </div>
    );
};

export default UserRegistrationForm;
