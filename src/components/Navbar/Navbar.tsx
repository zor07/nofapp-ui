import React from 'react';
import {NavLink} from 'react-router-dom';
import {Avatar, Menu} from 'antd';
import {FormOutlined, LoginOutlined, LogoutOutlined, SettingOutlined} from '@ant-design/icons';

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
                <Menu.Item key='my-profile'>
                    <NavLink to='/profile'>My Profile</NavLink>
                </Menu.Item>
                <Menu.Item key='therapy'>
                    <NavLink to='/therapy'>Therapy</NavLink>
                </Menu.Item>
                <Menu.Item key='profiles'>
                    <NavLink to='/profiles'>Users</NavLink>
                </Menu.Item>
                <Menu.Item key='timer'>
                    <NavLink to='/timer'>Timer</NavLink>
                </Menu.Item>
                <Menu.Item key='notebooks'>
                    <NavLink to='/notebooks'>Notes</NavLink>
                </Menu.Item>
                <SubMenu title={'Practices'} key={'practices'}>
                    <Menu.Item key='AllPractices'>
                        <NavLink to='/practices'>All Practices</NavLink>
                    </Menu.Item>
                    <Menu.Item key='MyPractices'>
                        <NavLink to='/my-practices'>My Practices</NavLink>
                    </Menu.Item>
                </SubMenu>
                <SubMenu title={<div><Avatar src="https://joeschmoe.io/api/v1/random"/>  {username}</div>} style={{marginLeft: 'auto'}} key={'username'}>
                    <Menu.Item key='logout' icon={<LogoutOutlined/>} onClick={logout}>
                        Logout
                    </Menu.Item>
                    <Menu.Item key='config' icon={<SettingOutlined />}>
                        <NavLink to='/config/levels'>Edit levels</NavLink>
                    </Menu.Item>
                </SubMenu>
            </>
            }

            {!isAuth &&
            <>
                <Menu.Item icon={<LoginOutlined/>} key='login'>
                    <NavLink to={'/login'}>Login</NavLink>
                </Menu.Item>
                <Menu.Item icon={<FormOutlined />} key='register'>
                    <NavLink to={'/register'}>Register</NavLink>
                </Menu.Item>
            </>
            }


        </Menu>
    )
}

export default Navbar