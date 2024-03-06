import TopNavigation from "./TopNavigation";
import AdminSideMenuBar from "./AdminSideMenuBar";
import React, { useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import moment from "moment/moment";
import { getBooksList } from "../service/bookService";
import { DatePicker } from "antd";
import SideMenuBar from "./SideMenuBar";
import {fetchOrdersById} from "../service/orderService";

const { RangePicker } = DatePicker;

RangePicker.propTypes = {
    onChange: PropTypes.any,
    value: PropTypes.any,
};

const UserConsumptionDetails = () => {
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
        fetchOrdersById(userId)
            .then((data) => {
                setOrderData(data);
            })
            .catch((error) => {
                console.error(error.message);
            });
    }, [userId]);

    const getBookDetails = (bookId) => {
        return books.find((book) => book.id === bookId);
    };

    const handleDateRangeChange = (dates) => {
        setSelectedDateRange(dates);
    };

    const calculateTotalPrice = (price, quantity) => {
        return price * quantity;
    };

    const calculateUserConsumption = () => {
        if (!orderData) {
            return {
                consumption: [],
                totalQuantity: 0,
                totalAccount: 0,
            };
        }

        const filteredOrders = filterOrdersByDateRange(orderData.orderItems);
        const userConsumption = {};
        let totalQuantity = 0;
        let totalAccount = 0;

        filteredOrders.forEach((orderItem) => {
            const bookDetails = getBookDetails(orderItem.bookDetailsId);

            if (bookDetails) {
                const { id, title, author, price } = bookDetails;
                const totalPrice = calculateTotalPrice(price, orderItem.quantity);

                if (userConsumption[id]) {
                    userConsumption[id].quantity += orderItem.quantity;
                    userConsumption[id].totalPrice += totalPrice;
                } else {
                    userConsumption[id] = {
                        id: id,
                        title: title,
                        author: author,
                        quantity: orderItem.quantity,
                        price:price,
                        totalPrice: totalPrice,
                    };
                }
                totalQuantity += orderItem.quantity;
                totalAccount += totalPrice;
            }
        });

        return {
            consumption: Object.values(userConsumption),
            totalQuantity: totalQuantity,
            totalAccount: totalAccount,
        };
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

    const renderConsumptionTable = () => {
        const { consumption, totalQuantity, totalAccount } = calculateUserConsumption();

        if (consumption.length === 0) {
            return <p>No data available for the selected date range.</p>;
        }

        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Book ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Quantity</th>
                        <th>Single Price</th>
                        <th>Total Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {consumption.map((consumption) => (
                        <tr key={consumption.id}>
                            <td>{consumption.id}</td>
                            <td>{consumption.title}</td>
                            <td>{consumption.author}</td>
                            <td>{consumption.quantity}</td>
                            <td>{consumption.price}</td>
                            <td>{consumption.totalPrice.toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div>Total Quantity: {totalQuantity}</div>
                <div>Total Account: {totalAccount.toFixed(2)}</div>
            </div>
        );
    };

    return (
        <div>
            <TopNavigation />
            <div className="home-container">
                <SideMenuBar />
                <div className="book-list" style={{ marginLeft: "30px" }}>
                    <h2>User Consumption</h2>
                    <div className="date-range-picker-container">
                        <RangePicker onChange={handleDateRangeChange} value={selectedDateRange} />
                    </div>
                    {renderConsumptionTable()}
                </div>
            </div>
        </div>
    );
};

export default UserConsumptionDetails;
