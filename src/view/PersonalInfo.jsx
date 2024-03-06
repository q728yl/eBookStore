/*  */
import React, {useState, useEffect} from 'react';
import bookList from '../book';
import {Card, Button, Col, Row} from "antd";
import TopNavigation from "../component/TopNavigation";
import SideMenuBar from "../component/SideMenuBar";

const PersonalInfo = () => {
    const [name, setName] = useState(localStorage.getItem('name') || '');
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [note, setNote] = useState(localStorage.getItem('note') || '');
    const [avatarUrl, setAvatarUrl] = useState(localStorage.getItem('avatarUrl') || '');

    const handleNameChange = (event) => {
        setName(event.target.value);
        localStorage.setItem('name', event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        localStorage.setItem('email', event.target.value);
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setAvatarUrl(reader.result);
            localStorage.setItem('avatarUrl', reader.result);
        };
    };
    const handleNoteChange = (event) => {
        setNote(event.target.value);
        localStorage.setItem('note', event.target.value);
    };
    return (
        <div>
            <TopNavigation/>
            <div className="home-container">
                <SideMenuBar/>
                <div className="person-container" style={{textAlign: 'left'}}>
                    <Card className="card-container" style={{width: '800px', margin: '5 auto', fontSize: '16px',marginLeft:'30px'}}>
                        <h1 style={{fontSize: '32px', fontWeight: 'bold'}}>My Profile</h1>
                        <Row gutter={16}>
                            <Col span={12}>
                                <h2>Name</h2>
                                <input type="text" value={name} onChange={handleNameChange}/>
                                <h2>Email</h2>
                                <input type="text" value={email} onChange={handleEmailChange}/>
                                <h2>Note</h2>
                                <input type="text" value={note} onChange={handleNoteChange}/>

                            </Col>
                            <Col span={12}>
                                <img src={avatarUrl} alt="Avatar" style={{maxWidth: '100%', height: '200px'}}/>
                                <br/>
                                <div className="centered">
                                    <input type="file" onChange={handleAvatarChange} accept="image/*"
                                           style={{marginTop: '1em'}}/>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={16} justify="end" style={{marginTop: '1em'}}>
                            <Col>
                                <Button type="primary" style={{marginRight: '1em'}}>Save</Button>
                                <Button type="primary">Cancel</Button>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;

