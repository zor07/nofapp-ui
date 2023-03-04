import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TimerContainer from "./components/Timer/TimerContainer";
import Login from "./components/Login/Login";
import React, {Component} from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer.ts";
import store from "./redux/redux-store.ts";
import {Layout} from "antd";
import 'antd/dist/antd.css';
import HeaderContainer from "./components/Header/HeaderContainer";
import PracticeListContainer from "./components/Practice/PracticeListContainer";
import PracticeContainer from "./components/Practice/PracticeContainer";
import PracticeEditorContainer from "./components/Practice/PracticeEditorContainer";
import NotebookListContainer from "./components/Notebook/NotebookListContainer";
import NoteListContainer from "./components/Note/NoteListContainer";
import NoteEditorContainer from "./components/Note/NoteEditorContainer";
import ProfileList from "./components/Profile/list/ProfileListContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import LevelsContainer from "./components/Levels/LevelsContainer";
import TaskListContainer from "./components/Levels/Tasks/TaskListContainer";
import TaskContentListContainer from "./components/Levels/Tasks/TaskContent/TaskContentListContainer";
import TaskContentEditorContainer from "./components/Levels/Tasks/TaskContent/TaskContentEditorContainer";
import TherapyContainer from "./components/Therapy/TherapyContainer";

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
                                <Route path='/profiles' element={<ProfileList/>}/>
                                <Route path='/profile' element={<ProfileContainer/>}/>
                                <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                                <Route path='/notebooks' element={<NotebookListContainer/>}/>
                                <Route path='/notebooks/:notebookId/notes' element={<NoteListContainer/>}/>
                                <Route path='/notebooks/:notebookId/notes/:noteId' element={<NoteEditorContainer/>}/>
                                <Route path='/practices' element={<PracticeListContainer isPublic={true}/>}/>
                                <Route path='/my-practices' element={<PracticeListContainer isPublic={false}/>}/>
                                <Route path='/practice/:practiceId' element={<PracticeContainer/>}/>
                                <Route path='/practice/editor/:practiceId' element={<PracticeEditorContainer/>}/>
                                <Route path='/config/levels' element={<LevelsContainer/>}/>
                                <Route path='/config/levels/:levelId/tasks' element={<TaskListContainer/>}/>
                                <Route path='/config/levels/:levelId/tasks/:taskId/content' element={<TaskContentListContainer/>}/>
                                <Route path='/config/levels/:levelId/tasks/:taskId/content/:taskContentId' element={<TaskContentEditorContainer/>}/>
                                <Route path='/therapy' element={<TherapyContainer/>}/>
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