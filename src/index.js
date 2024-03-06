import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';


import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './view/Home';
import ShopCard from './view/shopcard';
import PersonalInfo from './view/PersonalInfo';
import BookDetail from "./view/bookdetail";
import Login from "./view/login";
import BookList from "./view/BookList";
import AllOrders from "./view/allorders";
import AdminHome from "./view/AdminHome";
import bookAdmin from "./view/bookAdmin";
import BookAdmin from "./view/bookAdmin";
import UserAdmin from "./view/userAdmin";
import OrderAdmin from "./view/orderAdmin";
import HitRank from "./component/HitRank";
import UserRank from "./component/UserRank";
import UserConsumptionDetails from "./component/UserConsumptionDetails";

const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/*<Route exact path="/" element={<App />} >  //定义了根路由，并指定了匹配成功后要渲染的组件为 App*/}
          <Route exact path="/" element={<App />}></Route>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/book/:bookId" element={<BookDetail/>} />
          <Route exact path="/bookdetail" element={<BookDetail/>} />
          <Route exact path="/shopcard" element={<ShopCard />} />
          <Route exact path="/PersonalInfo" element={<PersonalInfo />} />
          <Route exact path="/booklist" element={<BookList />} />
          <Route exact path="/shopcard/allorders" element={<AllOrders />} />
          <Route exact path="/adminHome" element={<AdminHome />} />
          <Route exact path="/bookAdmin" element={<BookAdmin />} />
          <Route exact path="/userAdmin" element={<UserAdmin />} />
          <Route exact path="/orderAdmin" element={<OrderAdmin />} />
          <Route exact path="/hitRank" element={<HitRank />} />
          <Route exact path="/userRank" element={<UserRank />} />
          <Route exact path="/userConsumptionDetails" element={<UserConsumptionDetails />} />
          {/*<Route path="/bookdetail1/:id" element={<Bookdetail />} />*/}
        {/*</Route>*/}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
