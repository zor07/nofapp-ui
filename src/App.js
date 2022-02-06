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
        const { Header, Content } = Layout;
        return (
            <Layout>
                <Header className="header" theme="light" >
                    <div className="logo" >
                        NoFapp
                    </div>
                    <Navbar/>
                </Header>
                <Layout>
                    <Layout style={{ padding: '12px 12px 12px' }}>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: '0 50px',
                                margin: 0,
                                minHeight: 280,
                            }}>
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