import "antd/dist/antd.css";
import React, {useEffect, useState} from 'react';

import UserAdmin from "./userAdmin";
import {useLocation} from "react-router-dom";
import {getBooksList} from "../service/bookService";

const Adminhome = () => {


    let userId = localStorage.getItem('userId');
    const location = useLocation();
    if(location.state != null){
        userId = location.state ? location.state.userId : null;
    }

    // console.log("home页现在的用户id是"+userId)
    localStorage.setItem('userId',userId)
    userId = localStorage.getItem('userId');
    console.log("Admin页现在的用户是"+userId)

    return (
        <div>
           <UserAdmin/>
        </div>
    );

};
export default Adminhome;