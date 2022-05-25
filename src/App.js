import './App.css';
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
import {Layout} from "antd";
import 'antd/dist/antd.css';
import HeaderContainer from "./components/Header/HeaderContainer";
import PracticeListContainer from "./components/Practice/PracticeListContainer";
import PracticeContainer from "./components/Practice/PracticeContainer";
import PracticeEditorContainer from "./components/Practice/PracticeEditorContainer";
import NotebookListContainer from "./components/Notebook/NotebookListContainer";
import NoteListContainer from "./components/Notebook/NoteListContainer";
import NoteEditorContainer from "./components/Notebook/NoteEditorContainer";

class App extends Component {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        const {Header, Content} = Layout;
        return (
            <Layout>
                <Header className="header" theme="light">
                    <HeaderContainer/>
                </Header>
                <Layout>
                    <Layout style={{padding: '12px 12px 12px'}}>
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
                                <Route path='/notebooks' element={<NotebookListContainer/>}/>
                                <Route path='/notebooks/:notebookId/notes' element={<NoteListContainer/>}/>
                                <Route path='/notebooks/:notebookId/notes/:noteId' element={<NoteEditorContainer/>}/>
                                <Route path='/diary/editor/:diaryId' element={<DiaryEditorContainer/>}/>
                                <Route path='/diary/editor' element={<DiaryEditorContainer/>}/>
                                <Route path='/practices' element={<PracticeListContainer isPublic={true}/>}/>
                                <Route path='/my-practices' element={<PracticeListContainer isPublic={false}/>}/>
                                <Route path='/practice/:practiceId' element={<PracticeContainer/>}/>
                                <Route path='/practice/editor/:practiceId' element={<PracticeEditorContainer/>}/>
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