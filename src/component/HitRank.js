import TopNavigation from "./TopNavigation";
import AdminSideMenuBar from "./AdminSideMenuBar";
import React, { useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import moment from "moment/moment";
import { getBooksList } from "../service/bookService";
import {DatePicker} from "antd";
const { RangePicker } = DatePicker;


RangePicker.propTypes = {
    onChange: PropTypes.any,
    value: PropTypes.any
};

const HitRank = () => {
    const [books, setBooks] = useState([]);
    const [orderData, setOrderData] = useState(null);
    const [selectedDateRange, setSelectedDateRange] = useState([]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        getBooksList((bookList) => {
            setBooks(bookList);
        });
    }, []);

    useEffect(() => {
        fetch('/api/allOrders', {
        // fetch('/api/mainservice/allOrders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "userId": userId
            }),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to place order');
            })
            .then(data => {
                console.log('Order confirmed:', data);
                setOrderData(data.data);
            })
            .catch(error => {
                console.error('Error:', error);
                throw new Error(error.message);
            });
    }, [userId]);

    const getBookDetails = (bookId) => {
        return books.find(book => book.id === bookId);
    };
    const formatDateTime = (dateTime) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        };
        return new Date(dateTime).toLocaleDateString(undefined, options);
    };
    const handleDateRangeChange = (dates) => {
        setSelectedDateRange(dates);
    };

    const calculateSalesRank = () => {
        if (!orderData) {
            return [];
        }
        console.log("订单项： " +orderData.orderItems)
        const filteredOrders = filterOrdersByDateRange(orderData.orderItems);
        const salesRank = {};

        filteredOrders.forEach(orderItem => {
            const bookDetails = getBookDetails(orderItem.bookDetailsId);
            if (bookDetails) {
                const { id, title, author } = bookDetails;
                const existingEntry = salesRank[id];
                if (existingEntry) {
                    existingEntry.salesCount += orderItem.quantity;
                } else {
                    salesRank[id] = {
                        id,
                        title,
                        author,
                        salesCount: orderItem.quantity
                    };
                }
            }
        });

        return Object.values(salesRank);
    };


    const filterOrdersByDateRange = (orders) => {
        if (selectedDateRange.length !== 2) {
            return orders;
        }
        const startDate = moment(selectedDateRange[0]).startOf('day');
        const endDate = moment(selectedDateRange[1]).endOf('day');
        return orders.filter((orderIt ) => {
            const orderDateTime = moment(formatDateTime(orderIt.order.orderDate), 'YYYY-MM-DD HH:mm:ss');
            return orderDateTime.isBetween(startDate, endDate);
        });
    };

    const salesRank = calculateSalesRank();

    return (
        <div>
            <TopNavigation />
            <div className="container">
                <div className="sidebar">
                    <AdminSideMenuBar />
                </div>
                <div className="content">
                    <div>
                        <h1>HitRank</h1>
                        <div>
                            <RangePicker value={selectedDateRange} onChange={handleDateRangeChange} />
                        </div>
                        <div>
                            <h3>Sales Rank:</h3>
                            <table>
                                <thead>
                                <tr>
                                    <th>Book ID</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Sales Count</th>
                                </tr>
                                </thead>
                                <tbody>
                                {salesRank.sort((a, b) => b.salesCount - a.salesCount).map(({ id, title, author, salesCount }) => (
                                    <tr key={id}>
                                        <td>{id}</td>
                                        <td>{title}</td>
                                        <td>{author}</td>
                                        <td>{salesCount}</td>
                                    </tr>
                                ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HitRank;
