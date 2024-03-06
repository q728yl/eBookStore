/*  */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './css/Book.css';
import image4 from "./images/book4.png";
import image2 from "./images/image2.png";
import image3 from "./images/image3.png";
import image1 from "./images/image1.png";
const bookList = [
    {
        id: 1,
        title: '软件工程原理',
        author: '沈备军 陈昊鹏',
        image: image1,
        description: 'An Easy & Proven Way to understand principles of software engineering',
        price: 3.99,
        rating: 4.5,
        inStock: true,
        quantity:0
    },
    {
        id: 2,
        title: '电路基础',
        author: '陈洪亮 张峰',
        image: image2,
        description: 'How Today’s Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses',
        price: 5.99,
        rating: 4.2,
        inStock: false,
        quantity:0
    },
    {
        id: 3,
        title: '数据结构（C++语言版）',
        author: '邓俊辉',
        image: image3,
        description: 'Rules for data structure with c++',
        price: 4.99,
        rating: 4.7,
        inStock: true,
        quantity:0
    },
    {
        id: 4,
        title: '计算机系统基础汇编',
        author: '兰德尔 布莱恩特',
        image: image4,
        description: 'Rules for Compilation of computer system fundamentals',
        price: 4.99,
        rating: 4.7,
        inStock: true,
        quantity:0
    }
];
//
//
// export default bookList;

export default bookList;
