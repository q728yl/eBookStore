import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import { getUserList } from "../service/userService";
import axios from "axios";
import { postRequest } from "../utils/ajax";
import UserRegistrationForm from "../component/UserRegistrationForm";
import { Button, Col, Row } from "antd";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [showInputError, setShowInputError] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);

    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (username.trim() === "" || password.trim() === "") {
            // 如果用户名或密码为空，显示输入错误提示
            setShowInputError(true);

        } else {
            // 否则进行登录请求
            postRequest("/api/login", { username, password }, (res) => {
            // postRequest("/api/mainservice/login", { username, password }, (res) => {
                if (res.ok === true) {
                    if (res.data.user_type === 1) {
                        const userId = res.data.id;
                        localStorage.setItem('userId',userId)
                        navigate("/home", { state: { userId } });
                    } else {
                        const userId = res.data.id;
                        localStorage.setItem('userId',userId)
                        navigate("/adminHome",{ state: { userId } });
                    }
                } else {
                    alert(res.msg);
                    window.location.reload()
                }
            });
        }
    };



    const handleRegister = () => {
        setShowRegistrationForm(true);
    };

    return (
        <div>
            {!showRegistrationForm ? (
                <div className="login-card-container">
                    <div className="login-card">
                        <Row gutter={16}>
                            <Col span="20">
                                <h1
                                    className="title"
                                    style={{ fontSize: "32px", fontWeight: "bold" }}
                                >
                                    Login Page
                                </h1>
                            </Col>
                            <Col span="4">
                                <Button onClick={handleRegister}>注册新账号</Button>
                            </Col>
                        </Row>

                        <form className="login-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label
                                    className="username-lable"
                                    htmlFor="username"
                                    style={{ fontSize: "24px", fontWeight: "bold" }}
                                >
                                    Username :
                                </label>
                                <input
                                    className="input"
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={handleUsernameChange}
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    className="password-lable"
                                    style={{ fontSize: "24px", fontWeight: "bold" }}
                                    htmlFor="password"
                                >
                                    Password :
                                </label>
                                <input
                                    className="input"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </div>

                            {showInputError && (
                                <p style={{ color: "red" }}>请输入用户名和密码</p>
                            )}

                            <button className="btn" type="submit" style={{ marginLeft: "80px" }}>
                                登录
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <UserRegistrationForm />
            )}
        </div>
    );
}

export default Login;
