import {postRequest} from "../utils/ajax";
export const logout=(userId)=>{
    let opts ={
        method:"POST",
        body:JSON.stringify(null),
        headers:{
            'Content-Type': 'application/json'
        },
        credentials:"include"
    };
    fetch(`/api/logout`,opts)
    // fetch(`/api/mainservice/logout`,opts)
        .then(response => response.json())
        .then(data =>{
            // callback(data.data);
            alert("user "+userId+" "+data.msg)
        })
        .catch(error =>{
            console.log(error);
        })
}
export const getUserById = (userId, callback) => {
    //postRequest(`/api/getUserById?userId=${userId}`, null, callback);
    let opts ={
        method:"POST",
        body:JSON.stringify(null),
        headers:{
            'Content-Type': 'application/json'
        },
        credentials:"include"
    };
    fetch(`/api/getUserById?userId=${userId}`,opts)
    // fetch(`/api/mainservice/getUserById?userId=${userId}`,opts)
        .then(response => response.json())
        .then(data =>{
            callback(data.data);
        })
        .catch(error =>{
            console.log(error);
        })
}

export const getUserList = (callback) => {
    console.log('getUserList called');
    fetch("/api/getUserList")
    // fetch("/api/mainservice/getUserList")
        .then(response => response.json())
        .then(data => {
            // 在这里处理返回的数据，将用户列表传递给回调函数
            const userList = data.data.map(user => ({
                id: user.id,
                username: user.username,
                email: user.email,
                address: user.address,
                comments:user.comments,
                userType: user.user_type,
                status:user.status
            }));
            console.log(userList)
            callback(userList);
        })
        .catch(error => console.error(error));
}
export const getUserListByUserType = (callback) => {
    fetch("/api/getUserListByUserType?userType=1")
    // console.log('getUserList called');
    // fetch("/api/mainservice/getUserListByUserType?userType=1")
        .then(response => response.json())
        .then(data => {
            // 在这里处理返回的数据，将用户列表传递给回调函数
            const userList = data.data.map(user => ({
                id: user.id,
                username: user.username,
                email: user.email,
                address: user.address,
                comments:user.comments,
                userType: user.user_type,
                status:user.status
            }));

            callback(userList);
        })
        .catch(error => console.error(error));
}
export const getUserListByUserType0 = (callback) => {
    fetch("/api/getUserListByUserType?userType=0")
    // console.log('getUserList called');
    // fetch("/api/mainservice/getUserListByUserType?userType=0")
        .then(response => response.json())
        .then(data => {
            // 在这里处理返回的数据，将用户列表传递给回调函数
            const userList = data.data.map(user => ({
                id: user.id,
                username: user.username,
                email: user.email,
                address: user.address,
                comments:user.comments,
                userType: user.user_type,
                status:user.status
            }));

            callback(userList);
        })
        .catch(error => console.error(error));
}
