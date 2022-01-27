import React from "react";
import css from './Header.module.css'
import {NavLink} from "react-router-dom";

type HeaderPropsType = {
    isAuth: boolean
    username: string
    logout: () => void
}

const Header: React.FC<HeaderPropsType> = ({isAuth, username, logout}) => {

    return (
        <header className={css.header}>
            <div className={css.logo}><h1>Nofapp</h1></div>

            <div className={css.login}>
                {isAuth
                    ? <div>{username} - <button onClick={logout}>Logout</button></div>
                    : <div><NavLink to={'/login'}>Login</NavLink></div>}
            </div>



        </header>
    )
}

export default Header