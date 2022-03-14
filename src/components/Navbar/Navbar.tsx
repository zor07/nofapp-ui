import React from 'react';
import {NavLink} from 'react-router-dom';
import {Menu} from 'antd';
import {LoginOutlined, LogoutOutlined} from '@ant-design/icons';

type NavbarPropsType = {
    isAuth: boolean
    username: string
    logout: () => void
}

const Navbar: React.FC<NavbarPropsType> = ({isAuth, username, logout}) => {
    const SubMenu = Menu.SubMenu;
    return (
        <Menu theme='dark' mode='horizontal'>
            {isAuth &&
            <>
                <Menu.Item key='timer'>
                    <NavLink to='/timer'>Timer</NavLink>
                </Menu.Item>
                <Menu.Item key='diary'>
                    <NavLink to='/diary'>Diary</NavLink>
                </Menu.Item>
                <SubMenu title={'Practices'} key={'practices'}>
                    <Menu.Item key='AllPractices'>
                        <NavLink to='/practices'>All Practices</NavLink>
                    </Menu.Item>
                    <Menu.Item key='MyPractices'>
                        <NavLink to='/my-practices'>My Practices</NavLink>
                    </Menu.Item>
                </SubMenu>
                <SubMenu title={username} style={{marginLeft: 'auto'}} key={'username'}>
                    <Menu.Item key='logout' icon={<LogoutOutlined/>} onClick={logout}>
                        Logout
                    </Menu.Item>
                </SubMenu>
            </>
            }

            {!isAuth &&
            <>
                <Menu.Item icon={<LoginOutlined/>} key='login'>
                    <NavLink to={'/login'}>Login</NavLink>
                </Menu.Item>
            </>
            }


        </Menu>
    )
}

export default Navbar