import "antd/dist/antd.css";
import React, { useEffect, useState } from 'react';
import TopNavigation from "../component/TopNavigation";
import AdminSideMenuBar from "../component/AdminSideMenuBar";
import '../css/AdminLayout.css'
import {getBooksList, UpdateBook} from "../service/bookService";
import {Button, Input} from "antd";
import BookAddingForm from "../component/BookAddingForm";
import UpdateBookForm from "../component/UpdateBookForm";

const BookAdmin = () => {
    const [books, setBooks] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState(null); // 添加selectedBookId状态
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getBooksList((bookList) => {
            setBooks(bookList);
        });
    }, []);
    console.log(books)
    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
        setShowUpdateForm(false);
    };

    const toggleUpdateForm = (bookId) => {
        setSelectedBookId(bookId);
        setShowUpdateForm(!showUpdateForm);
        setShowAddForm(false);

    };

    const handleSearchInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        searchBooks(query);
    };

    const searchBooks = (query) => {
        getBooksList((bookList) => {
            const filteredBooks = bookList.filter((book) =>
                book.title.toLowerCase().includes(query.toLowerCase())
            );
            setBooks(filteredBooks);
        });
    };

    let content;

    function handleDelBook(id) {
        fetch('/api/delBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "bookId":id
            }),
        })
            .then(response => {
                if (response.ok) {
                   console.log(response.ok)
                }
            })
            .then(data => {
                console.log('del book succeed:', data);

            })
            .catch(error => {
                console.error('Error:', error);
            });
        window.location.reload()
    }

    if (showAddForm) {
        content = <BookAddingForm />;
    } else if (showUpdateForm) {
        console.log("bookId "+selectedBookId)
        content = <UpdateBookForm bookId={selectedBookId} />;
    } else  {
        content = (
            <div>
                <div>
                    <Input
                        placeholder="搜索书籍"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                    <Button onClick={searchBooks}></Button>
                </div>
                <div className="home-container">
                    <div className="book-list" style={{ marginLeft: '30px' }}>
                        <div>
                            <table>
                                {/* 表头 */}
                                <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Image</th>
                                    <th>Author</th>
                                    <th>Price</th>
                                    <th>Rating</th>
                                    <th>Description</th>
                                    <th>Quantity</th>
                                    <th>审核</th>
                                </tr>
                                </thead>
                                {/* 表格内容 */}
                                <tbody>
                                {books.filter(book => book.in_stock === true).map(book => (
                                    <tr key={book.id}>
                                        <td>{book.title}</td>
                                        {/*<td>{book.in_stock}</td>*/}
                                        <td>
                                            <img src={book.image} alt={book.title} style={{ width: '100px', height: '100px' }} />
                                        </td>
                                        <td>{book.author}</td>
                                        <td>{book.price}</td>
                                        <td>{book.rating}</td>
                                        <td>{book.description}</td>
                                        <td>{book.quantity}</td>
                                        <td>
                                            <div>
                                                <Button type="primary" onClick={()=>toggleUpdateForm(book.id)}>更新</Button>
                                            </div>
                                            <div>
                                                <Button type="primary" onClick={() => handleDelBook(book.id)}>删除</Button>

                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <h1>已下架书籍</h1>
                <div className="home-container">
                    <div className="book-list" style={{ marginLeft: '30px' }}>
                        <div>
                            <table>
                                {/* 表头 */}
                                <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Image</th>
                                    <th>Author</th>
                                    <th>Price</th>
                                    <th>Rating</th>
                                    <th>Description</th>
                                    <th>Quantity</th>
                                    {/*<th>审核</th>*/}
                                </tr>
                                </thead>
                                {/* 表格内容 */}
                                <tbody>
                                {books.filter(book => book.in_stock === false).map(book => (
                                    <tr key={book.id}>
                                        <td>{book.title}</td>
                                        {/*<td>{book.in_stock}</td>*/}
                                        <td>
                                            <img src={book.image} alt={book.title} style={{ width: '100px', height: '100px' }} />
                                        </td>
                                        <td>{book.author}</td>
                                        <td>{book.price}</td>
                                        <td>{book.rating}</td>
                                        <td>{book.description}</td>
                                        <td>{book.quantity}</td>
                                        <td>
                                            {/*<div>*/}
                                            {/*    <Button type="primary" onClick={()=>toggleUpdateForm(book.id)}>更新</Button>*/}
                                            {/*</div>*/}
                                            {/*<div>*/}
                                            {/*    <Button type="primary" onClick={()=>handleDelBook(book.id)}>删除</Button>*/}
                                            {/*</div>*/}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <TopNavigation />
            <div className="container">
                <div className="sidebar">
                    <AdminSideMenuBar />
                </div>
                <div className="content">
                    <div>
                        <h1>bookAdmin</h1>
                        <Button onClick={toggleAddForm}>增加书籍</Button>
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookAdmin;
