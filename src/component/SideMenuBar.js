import {NavLink, Outlet} from "react-router-dom";
import React from "react";
import TopNavigation from "./TopNavigation";


const SideMenuBar = () => {
    return (
        <layout>
            {/*<TopNavigation/>*/}
            <div id='content'>
                <div id='left menu'>
                    <nav style={{ borderBottom: 'solid 1px', paddingBottom: '1rem' }}>
                        <NavLink to="/home">Main View</NavLink>&nbsp;&nbsp;&nbsp;
                        {/*<NavLink to="/bookdetail/">Book Detail</NavLink>&nbsp;&nbsp;&nbsp;*/}
                        <NavLink to="/shopcard">Shopping Cart </NavLink>&nbsp;&nbsp;&nbsp;
                        <NavLink to="/PersonalInfo">Personal Info</NavLink>&nbsp;&nbsp;&nbsp;
                        <NavLink to="/booklist">Book List</NavLink>&nbsp;&nbsp;&nbsp;

                    </nav>
                </div>
                <div id='mainbox'>
                    <Outlet />
                </div>
            </div>
        </layout>
    );
}
export default SideMenuBar;