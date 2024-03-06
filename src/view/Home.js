import "antd/dist/antd.css";
import '../css/Home.css';
import React, {useState, useEffect, useContext} from 'react';
import {Input, Button, Card, Row, Col, Carousel, List} from 'antd';
import {Link} from 'react-router-dom';
import {getBooksList, getBooksListByTag, getBooksListByTitle, getBookTagWordCount} from '../service/bookService';
import SideMenuBar from "../component/SideMenuBar";
import TopNavigation from "../component/TopNavigation";
import {useLocation} from "react-router-dom";
import {b} from "caniuse-lite/data/browserVersions";
import axios from "axios";


const {Meta} = Card;
const default_url = "";
const Home = () => {
    axios.post('/api/neo4j')
        .then(response => {
            console.log('neo4j succeed:', response);
        })
        .catch(error => {
            console.error('Error init:', error);
        });
    const [books, setBooks] = useState([]);
    const [wordCountMsg, setWordCountMsg] = useState([]);
    const [wordCountMsgByHadoop, setWordCountMsgByHadoop] = useState([]);  // 新增wordCountMsgByHadoop
    let userId = localStorage.getItem('userId');
    const location = useLocation();
    if (location.state != null) {
        userId = location.state ? location.state.userId : null;
    }
    const [searchTerm, setSearchTerm] = useState(""); // 新增搜索框的状态
    const [searchTermTitle, setSearchTermTitle] = useState("");
    const handleSearch = () => {
        // 调用接口，获取搜索结果
        getBooksListByTag(searchTerm, (bookList) => {
            setBooks(bookList);
        });
    };
    const handleSearchByTitle = () => {
        // 调用接口，获取搜索结果
        getBooksListByTitle(searchTermTitle, (bookList) => {
            let bookList1 = [];
            bookList1.push(bookList);
            setBooks(bookList1);
        });
    };


    useEffect(() => {
        getBooksList((bookList) => {
            setBooks(bookList);
        });
    }, []);
    // console.log("home页现在的用户id是"+userId)
    localStorage.setItem('userId', userId)
    userId = localStorage.getItem('userId');
    console.log("home页现在的用户是" + userId)
    console.log("books", books)



    useEffect(() => {
        if (wordCountMsg !== null&&wordCountMsg.length!==0){
            alert("根据关键词检索书籍描述："+JSON.stringify(wordCountMsg));  // 使用JSON.stringify将对象转换为字符串
        }
    }, [wordCountMsg]);  // 这里监视wordCountMsg的变化
    useEffect(() => {
        if (wordCountMsgByHadoop !== null&&wordCountMsgByHadoop.length!==0){
            alert("根据关键词检索书籍描述："+JSON.stringify(wordCountMsgByHadoop));  // 使用JSON.stringify将对象转换为字符串
        }
    }, [wordCountMsgByHadoop]);  // 这里监视wordCountMsg的变化
    const handleTagWordCount = () => {
        fetch("/api/getBookWordCount")
            .then(response => response.json())
            .then(data => {
                if (data["data"] !== null) {
                    setWordCountMsg(data["data"]);  // 更新wordCountMsg
                }
            })
            .catch(error => console.error(error));
    };
    const handleTagWordCountByHadoop = () => {
        fetch("/api/getBookWordCountHadoop")
            .then(response => response.json())
            .then(data => {
                if (data["data"] !== null) {
                    setWordCountMsgByHadoop(data["data"]);  // 更新wordCountMsg
                }
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <TopNavigation/>
            <div className="home-container">
                <SideMenuBar/>
                <div className="home" style={{marginLeft: '30px'}}>
                    <div style={{marginTop: '40px', marginBottom: '40px'}}>

                        {/*<div className="search-container">*/}
                        {/*    <Input.Search placeholder="Search books..." enterButton />*/}
                        {/*</div>*/}
                        <div className="zoumadeng"
                             style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Carousel className="caro" style={{width: '800px', height: '300px'}} autoplay>
                                <div>
                                    <img alt="book" src={require("../images/image11.png")}
                                         style={{width: '800px', height: '300px'}}/>
                                </div>
                                <div>
                                    <img alt="book" src={require("../images/image12.png")}
                                         style={{width: '800px', height: '300px'}}/>
                                </div>
                                <div>
                                    <img alt="book" src={require("../images/image13.png")}
                                         style={{width: '800px', height: '300px'}}/>
                                </div>
                            </Carousel>
                        </div>
                    </div>
                    <div className="search-container">
                        <Input
                            placeholder="Search books by tag..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{marginRight: '10px'}}
                        />
                        <Button type="primary" onClick={handleSearch}>Search</Button>
                    </div>
                    <div className="search-container">
                        <Input
                            placeholder="Search books by title..."
                            value={searchTermTitle}
                            onChange={(e) => setSearchTermTitle(e.target.value)}
                            style={{marginRight: '10px'}}
                        />
                        <Button type="primary" onClick={handleSearchByTitle}>
                            Search
                        </Button>
                    </div>
                    <Button type="primary" onClick={handleTagWordCount}>
                        用Spark展示书籍描述统计
                    </Button>
                    <Button type="primary" onClick={handleTagWordCountByHadoop}>
                        用Hadoop展示书籍描述统计
                    </Button>
                    <List
                        style={{margin: "20px"}}
                        grid={{gutter: 16, column: 4}}
                        dataSource={books.filter(book => book.in_stock === true).map(book => ({
                            ...book,
                            key: book.id // 添加一个唯一的键值，可以是book的id或其他唯一标识符
                        }))}
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 20,
                        }}
                        renderItem={(book) => (
                            <List.Item>
                                {/*navigate("/home", { state: { userId } });*/}
                                <Link to={`/book/${book.id}?userId=${userId}`}>
                                    <Card
                                        cover={<img alt={default_url}
                                                    src={book.image ? book.image : default_url}
                                                    style={{width: "90%", margin: "10 auto"}}/>}
                                        title={book.title}

                                    >
                                        简介
                                        <Card.Meta description={book.description}/>
                                        评分：{book.rating}
                                        <br/>
                                        价格：{book.price}
                                        <br/>
                                        标签：{book.tag}
                                    </Card>
                                </Link>
                            </List.Item>
                        )}
                    />
                    <h1>已下架书籍</h1>
                    <List
                        style={{margin: "20px"}}
                        grid={{gutter: 16, column: 4}}
                        dataSource={books.filter(book => book.in_stock === false).map(book => ({
                            ...book,
                            key: book.id // 添加一个唯一的键值，可以是book的id或其他唯一标识符
                        }))}
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 20,
                        }}
                        renderItem={(book) => (
                            <List.Item>
                                {/*navigate("/home", { state: { userId } });*/}
                                <Link to={`/book/${book.id}?userId=${userId}`}>
                                    <Card
                                        cover={<img alt={default_url}
                                                    src={book.image ? book.image : default_url}
                                                    style={{width: "90%", margin: "10 auto"}}/>}
                                        title={book.title}

                                    >
                                        简介
                                        <Card.Meta description={book.description}/>
                                        评分：{book.rating}
                                        <br/>
                                        价格：{book.price}
                                        <br/>
                                        标签：{book.tag}
                                    </Card>
                                </Link>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;

