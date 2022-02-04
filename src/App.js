import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TimerContainer from "./components/Timer/TimerContainer";
import Login from "./components/Login/Login";
import React, {Component} from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer.ts";
import store from "./redux/redux-store.ts";
import DiaryListContainer from "./components/Diary/DiaryListContainer";
import DiaryEditorContainer from "./components/Diary/DiaryEditorContainer";
import {Layout, Menu} from "antd";
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';

class App extends Component {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        const { SubMenu } = Menu;
        const { Header, Content, Sider } = Layout;
        return (
            // <div className="app-wrapper">
            //     <HeaderContainer/>
            //     <Navbar/>
            //     <div className="app-wrapper-content">
            //         <Routes>
            //             <Route path='/' element={<TimerContainer/>}/>
            //             <Route path='/timer' element={<TimerContainer/>}/>
            //             <Route path='/diary' element={<DiaryListContainer/>}/>
            //             <Route path='/diary/editor/:diaryId' element={<DiaryEditorContainer/>}/>
            //             <Route path='/diary/editor' element={<DiaryEditorContainer/>}/>
            //             <Route path='/login' element={<Login/>}/>
            //         </Routes>
            //     </div>
            // </div>

            <Layout>
                <Header className="header" theme="light" >
                    <div className="logo" >
                        NoFapp
                    </div>
                    <Navbar/>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                                <Menu.Item key="1">option1</Menu.Item>
                                <Menu.Item key="2">option2</Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                                <Menu.Item key="9">option9</Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '12px 12px 12px' }}>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <Routes>
                                <Route path='/' element={<TimerContainer/>}/>
                                <Route path='/timer' element={<TimerContainer/>}/>
                                <Route path='/diary' element={<DiaryListContainer/>}/>
                                <Route path='/diary/editor/:diaryId' element={<DiaryEditorContainer/>}/>
                                <Route path='/diary/editor' element={<DiaryEditorContainer/>}/>
                                <Route path='/login' element={<Login/>}/>
                            </Routes>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
})

const AppContainer = compose(
    connect(mapStateToProps, {initializeApp}))
(App);

const AppMain = () => {
    return <Provider store={store}>
        <BrowserRouter>
            <AppContainer/>
        </BrowserRouter>
    </Provider>
}

export default AppMain