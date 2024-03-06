import "antd/dist/antd.css";
import React, {useEffect, useState} from 'react';
import {getAllOrders} from "../service/orderService";
import TopNavigation from "../component/TopNavigation";
import SideMenuBar from "../component/SideMenuBar";
import AdminSideMenuBar from "../component/AdminSideMenuBar";
import '../css/AdminLayout.css'
import {getUserList, getUserListByUserType, getUserListByUserType0} from "../service/userService";
import {Button} from "antd";
import {postRequest} from "../utils/ajax";

const UserAdmin = () => {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUserListByUserType((userList) => {
            setUsers(userList);
        });
    }, []);
    const [users0, setUsers0] = useState([]);
    useEffect(() => {
        getUserListByUserType0((userList0) => {
            setUsers0(userList0);
        });
    }, []);
    const [reviewComments, setReviewComments] = useState({});

    const handleButtonClick = (userId) => {
        setReviewComments((prevState) => ({
            ...prevState,
            [userId]: true
        }));
    };

    const handleInputChange = (event, userId) => {
        setReviewComments((prevState) => ({
            ...prevState,
            [userId]: event.target.value
        }));
    };

    const saveReviewComment = (userId) => {
        const comment = reviewComments[userId];
        // 将审核意见保存到数据库或执行其他操作
        console.log(`用户 ${userId} 的审核意见: ${comment}`);
        postRequest('/api/saveReviewComment', {userId, comment}, res => {
        // postRequest('/api/mainservice/saveReviewComment', {userId, comment}, res => {
            console.log("response is: " + JSON.stringify(res));
            console.log("msg is: " + res["msg"])
            if (res["ok"] === true) {
                alert(res["msg"]);
            } else
                alert("审核意见修改失败");
        })
        window.location.reload();

        // 保存完成后，隐藏输入框
        setReviewComments((prevState) => ({
            ...prevState,
            [userId]: false
        }));
    };

    const handleBanUser = (userId) => {
        postRequest('/api/banUsers', {userId}, res => {
        // postRequest('/api/mainservice/banUsers', {userId}, res => {
            console.log("response is: " + JSON.stringify(res));
            console.log("msg is: " + res["msg"])
            if (res["ok"] === true) {
               console.log(res["msg"]);
            } else
                alert("审核意见修改失败");
        })
        window.location.reload();
    }
    const handleNoBanUser = (userId) => {
        postRequest('/api/noBanUsers', {userId}, res => {
        // postRequest('/api/mainservice/noBanUsers', {userId}, res => {
            console.log("response is: " + JSON.stringify(res));
            console.log("msg is: " + res["msg"])
            if (res["ok"] === true) {
                console.log(res["msg"]);
            } else
                alert("审核意见修改失败");
        })
        window.location.reload();
    }
    return (
        <div>
            <TopNavigation/>

            <div className="container">
                <div className="sidebar">
                    <AdminSideMenuBar/>
                </div>
                <div className="content">
                    <div>
                        {/*<h1>userAdmin</h1>*/}

                        <div className="book-list" style={{marginLeft: '30px'}}>
                            <h1>All User Basic Information</h1>
                            <div>
                                <h2>普通用户</h2>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>用户权限设置</th>
                                        <th>用户权限</th>
                                        <th>UserId</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Address</th>
                                        <th>已有审核意见</th>
                                        <th>审核意见</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td><Button onClick={() => handleBanUser(user.id)}>禁用</Button><Button
                                                onClick={() => handleNoBanUser(user.id)}>解禁</Button></td>
                                            <td>{user&&user.status===1 ? "可登录":"被禁用"}</td>
                                            <td>{user.id}</td>
                                            <td>{user.username}</td>
                                            {/*<td>*/}
                                            {/*    <img src={book.image} alt={book.title} style={{ width: '100px', height: '100px' }} />*/}
                                            {/*</td>*/}
                                            <td>{user.email}</td>
                                            <td>{user.address}</td>
                                            <td>{user.comments}</td>
                                            <td>
                                                <Button size="small"
                                                        onClick={() => handleButtonClick(user.id)}>添加审核意见</Button>
                                                {reviewComments[user.id] && (
                                                    <div>
                                                        <input type="text" value={reviewComments[user.id]}
                                                               onChange={(event) => handleInputChange(event, user.id)}/>
                                                        <Button size="small"
                                                                onClick={() => saveReviewComment(user.id)}>保存</Button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <h2>管理员</h2>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>UserId</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Address</th>
                                        <th>已有审核意见</th>
                                        <th>审核意见</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users0.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.username}</td>
                                            {/*<td>*/}
                                            {/*    <img src={book.image} alt={book.title} style={{ width: '100px', height: '100px' }} />*/}
                                            {/*</td>*/}
                                            <td>{user.email}</td>
                                            <td>{user.address}</td>
                                            <td>{user.comments}</td>
                                            <td>
                                                <Button size="small"
                                                        onClick={() => handleButtonClick(user.id)}>添加审核意见</Button>
                                                {reviewComments[user.id] && (
                                                    <div>
                                                        <input type="text" value={reviewComments[user.id]}
                                                               onChange={(event) => handleInputChange(event, user.id)}/>
                                                        <Button size="small"
                                                                onClick={() => saveReviewComment(user.id)}>保存</Button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );

};
export default UserAdmin;