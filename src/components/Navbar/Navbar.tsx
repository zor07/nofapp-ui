import React from "react";
import css from "./Navbar.module.css"
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={css.navbar}>
            <div className={css.item}>
                <div><NavLink to='/timer' className={({isActive})=> isActive ?`${css.active}`:""}>Timer</NavLink></div>
                <div><NavLink to='/diary' className={({isActive})=> isActive ?`${css.active}`:""}>Diary</NavLink></div>
                <div><NavLink to='/editor' className={({isActive})=> isActive ?`${css.active}`:""}>Editor</NavLink></div>
            </div>
        </nav>
    )
}

export default Navbar