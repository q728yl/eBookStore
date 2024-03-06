import TopNavigation from "./TopNavigation";
import AdminSideMenuBar from "./AdminSideMenuBar";
import React, {useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import moment from "moment/moment";
import {getBooksList} from "../service/bookService";
import {DatePicker} from "antd";

const {RangePicker} = DatePicker;

RangePicker.propTypes = {
    onChange: PropTypes.any,
    value: PropTypes.any,
};

const UserRank = () => {
    const [books, setBooks] = useState([]);
    const [orderData, setOrderData] = useState(null);
    const [selectedDateRange, setSelectedDateRange] = useState([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        getBooksList((bookList) => {
            setBooks(bookList);
        });
    }, []);

    useEffect(() => {
        fetch("/api/allOrders", {
        // fetch("/api/mainservice/allOrders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Failed to place order");
            })
            .then((data) => {
                console.log("Order confirmed:", data);
                setOrderData(data.data);
            })
            .catch((error) => {
                console.error("Error:", error);
                throw new Error(error.message);
            });
    }, [userId]);

    const getBookDetails = (bookId) => {
        return books.find((book) => book.id === bookId);
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

    const calculateTotalPrice = (price, quantity) => {
        return price * quantity;
    };

    const calculateUserRank = () => {
        if (!orderData) {
            return [];
        }

        const filteredOrders = filterOrdersByDateRange(orderData.orderItems);
        const userRank = {};

        filteredOrders.forEach((orderItem) => {
            const userId = orderItem.order.user.id;
            const username = orderItem.order.user.username;
            const bookDetails = getBookDetails(orderItem.bookDetailsId);

            if (bookDetails) {
                const {id, title, author} = bookDetails;
                const totalPrice = calculateTotalPrice(
                    bookDetails.price,
                    orderItem.quantity
                );

                if (userRank[userId]) {
                    userRank[userId].totalAmount += totalPrice;
                    userRank[userId].purchases.push({id, title, author, totalPrice});
                } else {
                    userRank[userId] = {
                        userId: userId,
                        username:username,
                        totalAmount: totalPrice,
                        purchases: [{id, title, author, totalPrice}],
                    };
                }
            }
        });

        return Object.values(userRank).sort((a, b) => b.totalAmount - a.totalAmount);
    };

    const filterOrdersByDateRange = (orders) => {
        if (selectedDateRange.length !== 2) {
            return orders;
        }

        const startDate = moment(selectedDateRange[0]).startOf("day");
        const endDate = moment(selectedDateRange[1]).endOf("day");

        return orders.filter((orderItem) => {
            const orderDate = moment(orderItem.order.orderDate);
            return orderDate.isBetween(startDate, endDate, null, "[]");
        });
    };

    const renderRankTable = () => {
        const filteredRanks = calculateUserRank();

        if (filteredRanks.length === 0) {
            return <p>No data available for the selected date range.</p>;
        }

        return (
            <table>
                <thead>
                <tr>
                    <th>User ID</th>
                    <th>Username</th>
                    <th>Total Amount</th>
                    <th>Purchases(ordered)</th>
                </tr>
                </thead>
                <tbody>
                {filteredRanks.map((user) => (
                    <tr key={user.userId}>
                        <td>{user.userId}</td>
                        <td>{user.username}</td>
                        <td>{user.totalAmount.toFixed(2)}</td>
                        <td>
                            <ul>
                                {user.purchases.map((purchase) => (
                                    <li key={purchase.id}>
                                        {purchase.title} by {purchase.author} (${purchase.totalPrice})
                                    </li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    return (
        <div>
            <TopNavigation/>
            <div className="container">
                <div className="sidebar">
                    <AdminSideMenuBar/>
                </div>
                <div className="content">
                    <div>
                        <h2>User Rank</h2>
                        <div className="date-range-picker-container">
                            <RangePicker onChange={handleDateRangeChange} value={selectedDateRange}/>
                        </div>
                        {renderRankTable()}
                    </div>
                </div>
            </div>
        </div>
    );
};

            export default UserRank;
