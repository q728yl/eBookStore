import { NavLink, Outlet } from "react-router-dom";
import React, { useState } from "react";
import '../css/AdminSideMenuBar.css';
import TopNavigation from "./TopNavigation";

const AdminSideMenuBar = () => {
    const [selectedMenu, setSelectedMenu] = useState('userAdmin');

    const handleMenuClick = (menuId) => {
        setSelectedMenu(menuId);
    };

    return (
        <layout>
            {/*<TopNavigation />*/}
            <div id='content' className="menu-container">
                <div id='left-menu' className="menu">
                    <nav>
                        <NavLink
                            to="/userAdmin"
                            activeClassName="active"
                            className={selectedMenu === 'userAdmin' ? 'active-link' : ''}
                            onClick={() => handleMenuClick('userAdmin')}
                        >
                            用户管理
                        </NavLink>
                        <NavLink
                            to="/bookAdmin"
                            activeClassName="active"
                            className={selectedMenu === 'bookAdmin' ? 'active-link' : ''}
                            onClick={() => handleMenuClick('bookAdmin')}
                        >
                            书籍管理
                        </NavLink>
                        <NavLink
                            to="/orderAdmin"
                            activeClassName="active"
                            className={selectedMenu === 'orderAdmin' ? 'active-link' : ''}
                            onClick={() => handleMenuClick('orderAdmin')}
                        >
                            订单管理
                        </NavLink>
                    </nav>
                </div>
                <div id='mainbox'>
                    <Outlet />
                </div>
            </div>
        </layout>
    );
}

export default AdminSideMenuBar;
