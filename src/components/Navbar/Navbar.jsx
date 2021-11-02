import React from "react";
import css from "./Navbar.module.css"
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={css.navbar}>
            <div className={css.item}>
                <NavLink to='/timer' activeClassName={css.active}>Timer</NavLink>
            </div>
        </nav>
    )
}

export default Navbar