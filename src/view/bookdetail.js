import "antd/dist/antd.css";
import '../css/Home.css';
import '../css/bookdetail.css';
import React, { useEffect, useState } from 'react';
import { Input, Button, Card, Row, Col, List } from 'antd';
import { getBooksList } from '../service/bookService';

import TopNavigation from "../component/TopNavigation";
import SideMenuBar from "../component/SideMenuBar";
import { useLocation, useParams } from "react-router-dom";
import {updateCart} from "../service/cartSevice";

const { Meta } = Card;

const BookDetail = () => {
    const { bookId } = useParams();
    const [addedToCart, setAddedToCart] = useState(false);
    const [book, setBook] = useState(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');
    // const userId = 2;
    localStorage.setItem('userId', userId);
    console.log("bookdetail页面现在的用户是"+userId)
    useEffect(() => {
        getBooksList((books) => {
            if (books.length > 0) {
                setBook(books[bookId - 1]);
            }
        });
    }, [bookId]);
    const handleAddToCartButtonClick = () => {
        if(book.in_stock===false){
            alert("本书已下架，无法添加到购物车")
            return;
        }
        updateCart(userId, bookId)
            .then(() => {
                console.log("ok");
                setAddedToCart(true);
            })
            .catch(error => {
                console.error(error.message);
            });
    };


    useEffect(() => {
        if (addedToCart) {
            // 在这里执行您想要在每次 handleAddToCartButtonClick 后运行的逻辑
            // 例如，可以在这里调用 addToCart 函数或更新购物车状态
        }
    }, [addedToCart]);

    if (!book) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <TopNavigation />
            <div className="home-container">
                <SideMenuBar />
                <div className="book-card-container" style={{ marginLeft: '30px' }}>
                    <div className="book-card">
                        <div className="details">
                            <h1>{book.title}</h1>
                            <img src={book.image} style={{ width: '200px', height: '200px' }} alt={book.title} />
                            <div className="table-container">
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>Author:</td>
                                        <td>{book.author}</td>
                                    </tr>
                                    <tr>
                                        <td>Price:</td>
                                        <td>${book.price.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Rating:</td>
                                        <td>{book.rating}</td>
                                    </tr>
                                    <tr>
                                        <td>Quantity:</td>
                                        <td>{book.quantity}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div className="introduction">
                                    <h2> Introduction</h2>
                                    <p>{book.description}</p>
                                </div>
                                <Row>
                                    <Col span="12">
                                        <Button type="primary">Purchase Now!</Button>
                                    </Col>
                                    <Col span="12">
                                        <button type="primary" onClick={handleAddToCartButtonClick} disabled={addedToCart}>
                                            {addedToCart ? '已添加到购物车' : 'Add to cart'}
                                        </button>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
