import React from "react";
import css from "./Navbar.module.css"
import {NavLink} from "react-router-dom";
import {Menu} from "antd";

const Navbar = () => {
    return (
        <Menu theme="dark" mode="horizontal" >
            <Menu.Item key="1"><NavLink to='/timer' className={({isActive})=> isActive ?`${css.active}`:""}>Timer</NavLink></Menu.Item>
            <Menu.Item key="2"><NavLink to='/diary' className={({isActive})=> isActive ?`${css.active}`:""}>Diary</NavLink></Menu.Item>
        </Menu>
    )
}

export default Navbar