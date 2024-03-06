import React, { useState } from "react";
import { Button, Card, Form, Input } from "antd";
import Title from "antd/es/skeleton/Title";

import { AddBook } from "../service/bookService";

const BookAddingForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [ibsn, setIbsn] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const [quantity, setQuantity] = useState('');
    const [in_stock, setIn_stock] = useState('');
    const [price, setPrice] = useState('');
    const [tag, setTag] = useState('');

    const handleAddSubmit = () => {
        AddBook(title, author, ibsn, image, description, rating, quantity, in_stock, price,tag)
            .then((message) => {
                console.log(message);
            })
            .catch((error) => {
                console.log(error.message);
            });
        window.location.reload()
    };

    const handleFinishFailed = (errorInfo) => {

    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Card style={{ width: 400 }}>
                <Title level={2}>书籍信息修改</Title>
                <Form onFinish={handleAddSubmit} onFinishFailed={handleFinishFailed} layout="vertical">
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: "请输入书籍标题",
                            },
                        ]}
                    >
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="作者"
                        name="author"
                        rules={[
                            {
                                required: true,
                                message: "请输入作者",
                            },
                        ]}
                    >
                        <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="IBSN号"
                        name="ibsn"
                        rules={[
                            {
                                required: true,
                                message: "请输入十位IBSN号",
                                pattern: /^\d{10}$/,
                            },
                        ]}
                    >
                        <Input
                            value={ibsn}
                            onChange={(e) => {
                                const value = e.target.value;
                                // 只允许输入10位数字
                                if (/^\d{0,10}$/.test(value)) {
                                    setIbsn(value);
                                }
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="封面"
                        name="image"
                        rules={[
                            {
                                required: true,
                                message: "请输入封面链接",
                            },
                        ]}
                    >
                        <Input value={image} onChange={(e) => setImage(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="详情描述"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: "请输入详情描述",
                            },
                        ]}
                    >
                        <Input value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="价格"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: "请输入正数价格",
                                pattern: /^[+]?([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/,
                            },
                        ]}
                    >
                        <Input
                            value={price}
                            onChange={(e) => {
                                const value = e.target.value;
                                // 只允许输入正数
                                if (/^[+]?([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/.test(value)) {
                                    setPrice(value);
                                } else if (value === "" || value === ".") {
                                    setPrice(value);
                                }
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="评分"
                        name="rating"
                        rules={[
                            {
                                required: true,
                                message: "请输入0-5之间的评分",
                                pattern: /^(?:[0-5](\.\d+)?|5)$/,
                            },
                        ]}
                    >
                        <Input
                            value={rating}
                            onChange={(e) => {
                                const value = e.target.value;
                                // 只允许输入0-5之间的数字
                                if (/^(?:[0-5](\.\d+)?|5)$/.test(value)) {
                                    setRating(value);
                                } else if (value === "" || /^0(\.0+)?$/.test(value)) {
                                    setRating(value);
                                }
                            }}
                        />
                    </Form.Item>


                    <Form.Item
                        label="数量"
                        name="quantity"
                        rules={[
                            {
                                required: true,
                                message: "请输入有效正整数量",
                                pattern: /^[1-9]\d*$/,
                                validator: (rule, value, callback) => {
                                    if (value && !/^[1-9]\d*$/.test(value)) {
                                        callback("请输入有效的正整数");
                                    } else {
                                        callback();
                                    }
                                },
                            },
                        ]}
                    >
                        <Input
                            value={quantity}
                            onChange={(e) => {
                                const value = e.target.value;
                                // 只允许输入正整数
                                if (/^[1-9]\d*$/.test(value)) {
                                    setQuantity(value);
                                } else if (value === "" || /^[0]$/.test(value)) {
                                    setQuantity(value);
                                }
                            }}
                        />
                    </Form.Item>



                    <Form.Item
                        label="是否有现货"
                        name="in_stock"
                        rules={[
                            {
                                required: true,
                                message: "请输入是否有现货",
                            },
                        ]}
                    >
                        <Input value={in_stock} onChange={(e) => setIn_stock(e.target.value)} pattern="[01]"
                               title="Please enter either 0 or 1" />
                    </Form.Item>
                    <Form.Item
                        label="标签"
                        name="tag"
                        rules={[
                            {
                                required: true,
                                message: "请输入书籍标签",
                            },
                        ]}
                    >
                        <Input value={tag} onChange={(e) => setTag(e.target.value)} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            确认
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default BookAddingForm;
